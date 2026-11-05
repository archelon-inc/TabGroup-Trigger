const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');

function browser(otherTabs, settings) {
  const storage = { lastActiveTabInGroup: { 7: 12 }, ...settings };
  const tabs = [
    { id: 11, windowId: 1, groupId: 7, active: true },
    { id: 12, windowId: 1, groupId: 7, active: false },
    ...otherTabs,
    { id: 19, windowId: 1, groupId: -1, url: 'https://extension.tabgroup-trigger/Work' },
  ];
  const groups = [{ id: 7, windowId: 1, title: 'Work', collapsed: true }];
  const windows = new Set([1]);
  const listeners = {}, timers = [];
  let focused = 1;
  const chrome = {
    runtime: { getURL: file => `chrome-extension://test/${file}` },
    webNavigation: { onBeforeNavigate: { addListener(fn) { listeners.navigate = fn; } } },
    storage: { local: {
      async get(keys) {
        return typeof keys === 'string' ? { [keys]: storage[keys] } : { ...keys, ...storage };
      },
      async set(values) { Object.assign(storage, values); },
    } },
    tabGroups: {
      async query() { return groups.map(group => ({ ...group })); },
      async update(id, change) { Object.assign(groups.find(group => group.id === id), change); },
      async move(id, change) {
        const group = groups.find(group => group.id === id);
        group.windowId = change.windowId;
        tabs.filter(tab => tab.groupId === id).forEach(tab => { tab.windowId = change.windowId; });
        return { ...group };
      },
    },
    tabs: {
      onActivated: { addListener(fn) { listeners.active = fn; } },
      async query(filter) {
        return tabs.filter(tab => Object.entries(filter).every(([key, value]) => tab[key] === value)).map(tab => ({ ...tab }));
      },
      async get(id) { return { ...tabs.find(tab => tab.id === id) }; },
      async update(id, change) {
        const tab = tabs.find(tab => tab.id === id);
        if (change.active) tabs.filter(item => item.windowId === tab.windowId).forEach(item => { item.active = false; });
        Object.assign(tab, change);
        return { ...tab };
      },
      async remove(ids) {
        for (const id of [ids].flat()) {
          const index = tabs.findIndex(tab => tab.id === id);
          if (index !== -1) tabs.splice(index, 1);
        }
        for (const id of windows) if (!tabs.some(tab => tab.windowId === id)) windows.delete(id);
      },
    },
    windows: {
      async create() {
        const id = Math.max(...windows) + 1;
        windows.add(id);
        const tab = { id: 100 + id, windowId: id, groupId: -1, url: 'chrome://newtab/' };
        tabs.push(tab);
        return { id, tabs: [{ ...tab }] };
      },
      async update(id) { focused = id; },
    },
  };
  const context = vm.createContext({ chrome, URL, console, setTimeout: fn => timers.push(fn) });
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../background.js'), 'utf8'), context);
  return {
    tabs, groups, windows,
    get focused() { return focused; },
    async navigate(query) {
      await listeners.navigate({ frameId: 0, tabId: 19, url: `https://extension.tabgroup-trigger/Work${query}` });
      for (const timer of timers) await timer();
    },
  };
}

test('初期設定は通常の URL で対象だけを独立表示し、空タブを残さない', async () => {
  const state = browser([{ id: 13, windowId: 1, groupId: 8, active: false }], {});
  await state.navigate('');
  assert.equal(state.groups[0].windowId, 2);
  assert.equal(state.groups[0].collapsed, false);
  assert.equal(state.focused, 2);
  assert.deepEqual(state.tabs.filter(tab => tab.windowId === 2).map(tab => tab.id), [11, 12]);
  assert.equal(state.tabs.find(tab => tab.id === 12).active, true);
  assert.equal(state.tabs.find(tab => tab.id === 13).windowId, 1);
  assert.equal(state.tabs.some(tab => tab.id === 19), false);
});

test('既に単独の窓にあるグループは同じ窓を再利用する', async () => {
  const state = browser([], {});
  await state.navigate('');
  assert.deepEqual([...state.windows], [1]);
  assert.equal(state.groups[0].windowId, 1);
  assert.deepEqual(state.tabs.map(tab => tab.id), [11, 12]);
});

test('独立表示を OFF にすると通常の URL で他のタブと同居したまま切り替える', async () => {
  const state = browser([{ id: 13, windowId: 1, groupId: -1 }], { separateWindows: false });
  await state.navigate('');
  assert.deepEqual([...state.windows], [1]);
  assert.deepEqual(state.tabs.map(tab => tab.id), [11, 12, 13]);
  assert.equal(state.tabs.find(tab => tab.id === 12).active, true);
});

test('見つからないグループは窓を作らずトリガータブだけ閉じる', async () => {
  const state = browser([{ id: 13, windowId: 1, groupId: -1 }], {});
  state.groups.length = 0;
  await state.navigate('');
  assert.deepEqual([...state.windows], [1]);
  assert.deepEqual(state.tabs.map(tab => tab.id), [11, 12, 13]);
});

test('自動操作用の結果タブには実際に表示した窓の ID を返す', async () => {
  const state = browser([{ id: 13, windowId: 1, groupId: 8 }], {});
  await state.navigate('?result=tab');
  assert.equal(state.tabs.find(tab => tab.id === 19).url, 'chrome-extension://test/result.html#window=2');
  assert.deepEqual(state.tabs.filter(tab => tab.windowId === 2).map(tab => tab.id), [11, 12]);
});

test('自動操作用の結果タブは失敗も結果として返す', async () => {
  const state = browser([], {});
  state.groups.length = 0;
  await state.navigate('?result=tab');
  assert.match(state.tabs.find(tab => tab.id === 19).url, /result\.html#error=Group%20not%20found/);
  assert.deepEqual([...state.windows], [1]);
});

/** Chrome API のある拡張自身の文脈で、試験用の空タブだけを作って URL 経由の表示を確かめる。 */
(async () => {
  const tabs = [];
  let trigger, result;
  try {
    if (chrome.runtime.getManifest().version !== '1.1.0') throw Error('1.1.0 の読み込みが必要です');
    const anchor = await chrome.tabs.getCurrent();
    for (let i = 0; i < 2; i++) {
      const tab = await chrome.tabs.create({ windowId: anchor.windowId, url: 'about:blank', active: false });
      tabs.push(tab.id);
    }
    const group = await chrome.tabs.group({ tabIds: tabs });
    const name = `TGT-test-${crypto.randomUUID()}`;
    await chrome.tabGroups.update(group, { title: name, color: 'grey' });
    trigger = await chrome.tabs.create({ windowId: anchor.windowId, url: `https://extension.tabgroup-trigger/${name}?window=separate&result=tab`, active: false });
    const deadline = Date.now() + 5000;
    let response;
    do {
      response = await chrome.tabs.get(trigger.id);
      if (response.url.includes('/result.html#')) break;
      await new Promise(resolve => setTimeout(resolve, 50));
    } while (Date.now() < deadline);
    const query = new URLSearchParams(new URL(response.url).hash.slice(1));
    if (query.has('error')) throw Error(query.get('error'));
    const destination = Number(query.get('window'));
    if (!destination || destination === anchor.windowId) throw Error('独立した窓が返されません');
    const moved = await chrome.tabs.query({ windowId: destination });
    if (moved.length !== 2 || moved.some(tab => !tabs.includes(tab.id))) throw Error('対象以外のタブか空タブが残っています');
    const source = await chrome.tabs.query({ windowId: anchor.windowId });
    if (!source.some(tab => tab.id === anchor.id)) throw Error('元のタブが元の窓に残っていません');
    result = { destination, tabs: moved.length, sourceUnchanged: true };
  } catch (error) {
    result = { error: error.message };
  } finally {
    await chrome.tabs.ungroup(tabs).catch(() => {});
    for (const id of [...tabs, trigger?.id].filter(Number.isInteger)) await chrome.tabs.remove(id).catch(() => {});
    document.documentElement.dataset.tgtLiveResult = JSON.stringify(result);
  }
})();

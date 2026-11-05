/** Chrome API のある拡張自身の文脈で、試験用の空タブだけを作って URL 経由の表示を確かめる。 */
(async () => {
  const tabs = [];
  const triggers = [];
  let popup, original, restoreSetting = false, result;
  const waitFor = async check => {
    const deadline = Date.now() + 5000;
    do {
      const value = await check();
      if (value) return value;
      await new Promise(resolve => setTimeout(resolve, 50));
    } while (Date.now() < deadline);
    throw Error('Chrome の操作が5秒で完了しませんでした');
  };
  const openPopup = async () => {
    popup?.remove();
    popup = document.createElement('iframe');
    popup.src = chrome.runtime.getURL('popup.html');
    document.body.append(popup);
    return waitFor(() => {
      const checkbox = popup.contentDocument?.getElementById('separate-windows');
      return checkbox && !checkbox.disabled ? checkbox : null;
    });
  };
  try {
    if (chrome.runtime.getManifest().version !== '1.1.0') throw Error('1.1.0 の読み込みが必要です');
    original = await chrome.storage.local.get('separateWindows');
    restoreSetting = true;
    await chrome.storage.local.remove('separateWindows');
    let checkbox = await openPopup();
    if (!checkbox.checked) throw Error('独立表示の初期値が ON ではありません');
    const anchor = await chrome.tabs.getCurrent();
    for (let i = 0; i < 2; i++) {
      const tab = await chrome.tabs.create({ windowId: anchor.windowId, url: 'about:blank', active: false });
      tabs.push(tab.id);
    }
    const group = await chrome.tabs.group({ tabIds: tabs });
    const name = `TGT-test-${crypto.randomUUID()}`;
    await chrome.tabGroups.update(group, { title: name, color: 'grey' });
    const jump = async () => {
      const trigger = await chrome.tabs.create({ windowId: anchor.windowId, url: `https://extension.tabgroup-trigger/${name}?result=tab`, active: false });
      triggers.push(trigger.id);
      const response = await waitFor(async () => {
        const tab = await chrome.tabs.get(trigger.id);
        return tab.url.includes('/result.html#') ? tab : null;
      });
      const query = new URLSearchParams(new URL(response.url).hash.slice(1));
      if (query.has('error')) throw Error(query.get('error'));
      const destination = Number(query.get('window'));
      await chrome.tabs.remove(trigger.id);
      return destination;
    };
    const destination = await jump();
    if (!destination || destination === anchor.windowId) throw Error('独立した窓が返されません');
    const moved = await chrome.tabs.query({ windowId: destination });
    if (moved.length !== 2 || moved.some(tab => !tabs.includes(tab.id))) throw Error('対象以外のタブか空タブが残っています');
    const source = await chrome.tabs.query({ windowId: anchor.windowId });
    if (!source.some(tab => tab.id === anchor.id)) throw Error('元のタブが元の窓に残っていません');
    if (await jump() !== destination) throw Error('独立した窓が再利用されません');

    await chrome.tabGroups.move(group, { windowId: anchor.windowId, index: -1 });
    checkbox.click();
    await waitFor(() => !checkbox.disabled);
    checkbox = await openPopup();
    if (checkbox.checked) throw Error('ポップアップを開き直すと OFF の設定が失われます');
    if (await jump() !== anchor.windowId) throw Error('OFF でも窓が分離されます');
    const unchanged = await chrome.tabs.query({ groupId: group });
    if (unchanged.some(tab => tab.windowId !== anchor.windowId)) throw Error('OFF でも対象の窓が変わります');

    checkbox.click();
    await waitFor(() => !checkbox.disabled);
    checkbox = await openPopup();
    if (!checkbox.checked) throw Error('ポップアップを開き直すと ON の設定が失われます');
    result = { defaultSeparate: true, reused: true, settingOffKeepsWindow: true, settingPersists: true, sourceUnchanged: true };
  } catch (error) {
    result = { error: error.message };
  } finally {
    popup?.remove();
    if (restoreSetting) {
      if (original.separateWindows === undefined) await chrome.storage.local.remove('separateWindows');
      else await chrome.storage.local.set(original);
    }
    await chrome.tabs.ungroup(tabs).catch(() => {});
    for (const id of [...tabs, ...triggers]) await chrome.tabs.remove(id).catch(() => {});
    document.documentElement.dataset.tgtLiveResult = JSON.stringify(result);
  }
})();

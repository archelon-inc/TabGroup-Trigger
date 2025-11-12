/**
 * TabGroup Trigger - Background Service Worker
 * URL経由でChromeタブグループを切り替える拡張機能
 */

/**
 * トリガーURLのドメイン
 */
const TRIGGER_DOMAIN = 'extension.tabgroup-trigger';

/**
 * 各タブグループで最後に選択されたタブIDを記憶するマップ
 * key: groupId, value: tabId
 */
const lastActiveTabInGroup = new Map();

/**
 * 拡張機能がタブをアクティブ化中かどうかのフラグ
 */
let isActivatingTab = false;

/**
 * webNavigationイベントをリッスンして、トリガーURLを検出する
 */
chrome.webNavigation.onBeforeNavigate.addListener(
  async (details) => {
    // メインフレームのナビゲーションのみ処理
    if (details.frameId !== 0) {
      return;
    }

    try {
      const url = new URL(details.url);

      // トリガードメインでない場合はスキップ
      if (url.hostname !== TRIGGER_DOMAIN) {
        return;
      }

      // URLパスから値を抽出（先頭の"/"を除く）
      const rawValue = url.pathname.substring(1);
      const value = decodeURIComponent(rawValue);

      if (!value) {
        console.warn('TabGroup Trigger: 値が指定されていません');
        return;
      }

      // タブグループを切り替える
      await switchTabGroup(value, details.tabId);

    } catch (error) {
      console.error('TabGroup Trigger エラー:', error);
    }
  },
  { url: [{ hostEquals: TRIGGER_DOMAIN }] }
);

/**
 * 指定された値に基づいてタブグループを切り替える
 * @param {string} value - グループ名または位置（1ベース）
 * @param {number} triggerTabId - トリガーURLを開いたタブのID
 */
async function switchTabGroup(value, triggerTabId) {
  try {
    // すべてのタブグループを取得
    const groups = await chrome.tabGroups.query({});

    if (groups.length === 0) {
      console.warn('TabGroup Trigger: タブグループが存在しません');
      await closeTab(triggerTabId);
      return;
    }

    // グループ名での完全一致を試みる
    const targetGroup = groups.find(group => group.title === value);

    if (!targetGroup) {
      console.warn(`TabGroup Trigger: グループが見つかりません: ${value}`);
      await closeTab(triggerTabId);
      return;
    }

    // 対象グループのタブを取得
    const groupTabs = await chrome.tabs.query({ groupId: targetGroup.id });

    if (groupTabs.length === 0) {
      console.warn(`TabGroup Trigger: グループにタブが存在しません: ${targetGroup.title}`);
      await closeTab(triggerTabId);
      return;
    }

    let targetTab = null;

    // 1. このグループで最後に選択されたタブを記憶から取得
    const rememberedTabId = lastActiveTabInGroup.get(targetGroup.id);
    if (rememberedTabId) {
      targetTab = groupTabs.find(tab => tab.id === rememberedTabId);
    }

    // 2. 記憶されたタブが見つからない場合は最初のタブを使用
    if (!targetTab) {
      targetTab = groupTabs[0];
    }

    // 対象タブをアクティブ化（フラグを立てて記録を防ぐ）
    isActivatingTab = true;
    await chrome.tabs.update(targetTab.id, { active: true });
    await chrome.windows.update(targetTab.windowId, { focused: true });

    // 少し待ってからフラグを下ろす（イベント処理が完了するまで）
    setTimeout(() => {
      isActivatingTab = false;
    }, 100);

    // トリガータブをクローズ
    await closeTab(triggerTabId);

  } catch (error) {
    console.error('TabGroup Trigger: グループ切り替えエラー:', error);
    await closeTab(triggerTabId);
  }
}

/**
 * タブを安全にクローズする
 * @param {number} tabId - クローズするタブのID
 */
async function closeTab(tabId) {
  try {
    await chrome.tabs.remove(tabId);
  } catch (error) {
    // タブが既にクローズされている場合などはエラーを無視
    console.debug('TabGroup Trigger: タブクローズ:', error.message);
  }
}

/**
 * タブがアクティブになったときに、そのグループで最後に選択されたタブとして記憶する
 */
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  // 拡張機能自身がアクティブ化した場合は記録しない
  if (isActivatingTab) {
    return;
  }

  try {
    const tab = await chrome.tabs.get(activeInfo.tabId);

    // タブグループに属している場合のみ記録（groupId が -1 でない場合）
    if (tab.groupId !== -1) {
      lastActiveTabInGroup.set(tab.groupId, tab.id);
    }
  } catch (error) {
    // エラーは無視（タブが既に閉じられている場合など）
    console.debug('TabGroup Trigger: タブアクティブ化記録エラー:', error.message);
  }
});

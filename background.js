/**
 * TabGroup Trigger - Background Service Worker
 * URL経由でChromeタブグループを切り替える拡張機能
 */

/**
 * トリガーURLのドメイン
 */
const TRIGGER_DOMAIN = 'extension.tabgroup-trigger';

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

    let targetGroup = null;

    // 1. まずグループ名での完全一致を試みる（優先度高）
    targetGroup = groups.find(group => group.title === value);

    // 2. グループ名で見つからない場合、数値として位置を解釈
    if (!targetGroup && /^\d+$/.test(value)) {
      const position = parseInt(value, 10);

      // タブグループを位置順にソート（左から右）
      const sortedGroups = await sortGroupsByPosition(groups);

      // 1ベースのインデックスを0ベースに変換
      if (position >= 1 && position <= sortedGroups.length) {
        targetGroup = sortedGroups[position - 1];
      }
    }

    if (!targetGroup) {
      console.warn(`TabGroup Trigger: グループが見つかりません: ${value}`);
      await closeTab(triggerTabId);
      return;
    }

    // 対象グループの最初のタブを取得してアクティブ化
    const groupTabs = await chrome.tabs.query({ groupId: targetGroup.id });

    if (groupTabs.length === 0) {
      console.warn(`TabGroup Trigger: グループにタブが存在しません: ${targetGroup.title}`);
      await closeTab(triggerTabId);
      return;
    }

    // 最初のタブをアクティブ化
    const firstTab = groupTabs[0];
    await chrome.tabs.update(firstTab.id, { active: true });
    await chrome.windows.update(firstTab.windowId, { focused: true });

    // トリガータブをクローズ
    await closeTab(triggerTabId);

  } catch (error) {
    console.error('TabGroup Trigger: グループ切り替えエラー:', error);
    await closeTab(triggerTabId);
  }
}

/**
 * タブグループを位置順（左から右）にソートする
 * @param {Array} groups - タブグループの配列
 * @returns {Promise<Array>} ソート済みのタブグループ配列
 */
async function sortGroupsByPosition(groups) {
  // 各グループの最小タブインデックスを取得してソート
  const groupsWithPosition = await Promise.all(
    groups.map(async (group) => {
      const tabs = await chrome.tabs.query({ groupId: group.id });
      const minIndex = Math.min(...tabs.map(tab => tab.index));
      return { group, minIndex };
    })
  );

  // 最小インデックスでソート（左から右）
  groupsWithPosition.sort((a, b) => a.minIndex - b.minIndex);

  return groupsWithPosition.map(item => item.group);
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

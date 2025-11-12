/**
 * TabGroup Trigger - Background Service Worker
 * URL経由でChromeタブグループを切り替える拡張機能
 */

/**
 * トリガーURLのドメイン
 */
const TRIGGER_DOMAIN = 'extension.tabgroup-trigger';

/**
 * セッションから次のタブを復活させるための特別なパス
 */
const RESTORE_NEXT_PATH = '__restore_next__';

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
 * 自分でコマンドURLにリダイレクトしたタブIDを記録するSet
 * これらのタブはセッション復活をスキップする
 */
const redirectedToCommandUrl = new Set();


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

      // 特別なコマンド: セッションから次のタブを復活
      if (value === RESTORE_NEXT_PATH) {
        await restoreNextTabFromSession(details.tabId);
        return;
      }

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
 * トリガーURLのタブは特別なコマンドURLにリダイレクトしてから閉じることで、
 * ⌘+Shift+Tで復活した際にセッションから次のタブを復活させる
 * @param {number} tabId - クローズするタブのID
 */
async function closeTab(tabId) {
  try {
    // このタブIDを記録（⌘+Shift+Tで復活したものと区別するため）
    redirectedToCommandUrl.add(tabId);

    // 特別なコマンドURLにナビゲート（セッション履歴を上書き）
    const restoreUrl = `https://${TRIGGER_DOMAIN}/${RESTORE_NEXT_PATH}`;
    await chrome.tabs.update(tabId, { url: restoreUrl });

    // 少し待ってからタブを閉じる（ナビゲーションが完了するまで）
    setTimeout(async () => {
      try {
        await chrome.tabs.remove(tabId);
        // タブを閉じた後、記録から削除
        redirectedToCommandUrl.delete(tabId);
      } catch (error) {
        console.debug('TabGroup Trigger: タブクローズ:', error.message);
        redirectedToCommandUrl.delete(tabId);
      }
    }, 100);
  } catch (error) {
    // タブが既にクローズされている場合などはエラーを無視
    console.debug('TabGroup Trigger: タブクローズ:', error.message);
    redirectedToCommandUrl.delete(tabId);
  }
}

/**
 * セッションから次のタブを復活させる
 * ⌘+Shift+Tで復活したコマンドURLタブの代わりに、その1つ前のタブを復活させる
 * @param {number} commandTabId - コマンドURLのタブID
 */
async function restoreNextTabFromSession(commandTabId) {
  try {
    // 自分でリダイレクトしたタブの場合は、セッション復活をスキップ
    if (redirectedToCommandUrl.has(commandTabId)) {
      console.log('TabGroup Trigger: 自分でリダイレクトしたコマンドURLをスキップ', commandTabId);
      // タブは既にcloseTab内でクローズされる予定なので、ここでは何もしない
      return;
    }

    // ⌘+Shift+Tで復活したコマンドURL - セッションから次のタブを復活
    console.log('TabGroup Trigger: ⌘+Shift+Tで復活したコマンドURLを検知', commandTabId);

    // 最近閉じたタブを取得
    const sessions = await chrome.sessions.getRecentlyClosed({ maxResults: 1 });

    if (sessions.length === 0) {
      console.log('TabGroup Trigger: 復活させるタブがありません');
      await chrome.tabs.remove(commandTabId);
      return;
    }

    // 最初のエントリ（最後に閉じたタブ）を復活
    const session = sessions[0];
    if (session.tab) {
      await chrome.sessions.restore(session.tab.sessionId);
      console.log('TabGroup Trigger: タブを復活させました', session.tab.url);
    } else if (session.window) {
      await chrome.sessions.restore(session.window.sessionId);
      console.log('TabGroup Trigger: ウィンドウを復活させました');
    }

    // コマンドURLのタブを閉じる
    await chrome.tabs.remove(commandTabId);

  } catch (error) {
    console.error('TabGroup Trigger: タブ復活エラー:', error);
    // エラーが発生した場合でもコマンドタブは閉じる
    try {
      await chrome.tabs.remove(commandTabId);
    } catch (e) {
      console.debug('TabGroup Trigger: コマンドタブクローズエラー:', e.message);
    }
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


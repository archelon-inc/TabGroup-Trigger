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
 * chrome.storage.localのキー名（各タブグループで最後に選択されたタブIDを保存）
 */
const STORAGE_KEY_LAST_ACTIVE_TAB = 'lastActiveTabInGroup';

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
 * ストレージから指定されたタブグループの最後のアクティブタブIDを取得
 * @param {number} groupId - タブグループID
 * @returns {Promise<number|null>} 最後のアクティブタブID、または存在しない場合はnull
 */
async function getLastActiveTab(groupId) {
  try {
    const result = await chrome.storage.local.get(STORAGE_KEY_LAST_ACTIVE_TAB);
    const lastActiveTabInGroup = result[STORAGE_KEY_LAST_ACTIVE_TAB] || {};
    return lastActiveTabInGroup[groupId] || null;
  } catch (error) {
    console.error('TabGroup Trigger: ストレージ読み込みエラー:', error);
    return null;
  }
}

/**
 * 指定されたタブグループの最後のアクティブタブIDをストレージに保存
 * @param {number} groupId - タブグループID
 * @param {number} tabId - タブID
 */
async function setLastActiveTab(groupId, tabId) {
  try {
    const result = await chrome.storage.local.get(STORAGE_KEY_LAST_ACTIVE_TAB);
    const lastActiveTabInGroup = result[STORAGE_KEY_LAST_ACTIVE_TAB] || {};
    lastActiveTabInGroup[groupId] = tabId;
    await chrome.storage.local.set({ [STORAGE_KEY_LAST_ACTIVE_TAB]: lastActiveTabInGroup });
  } catch (error) {
    console.error('TabGroup Trigger: ストレージ保存エラー:', error);
  }
}


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
      // 自分でリダイレクトしたタブの場合は、何もしない（closeTab内で閉じられる）
      if (redirectedToCommandUrl.has(details.tabId)) {
        console.log('TabGroup Trigger: 自分でリダイレクトしたタブのナビゲーションをスキップ', details.tabId);
        return;
      }

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
        await closeTab(details.tabId);
        return;
      }

      // トリガータブをクローズ（先に不要なタブを処分）
      await closeTab(details.tabId);

      // タブグループを切り替える
      await switchTabGroup(value);

    } catch (error) {
      console.error('TabGroup Trigger エラー:', error);
    }
  },
  { url: [{ hostEquals: TRIGGER_DOMAIN }] }
);

/**
 * 指定された値に基づいてタブグループを切り替える
 * @param {string} value - グループ名または位置（1ベース）
 */
async function switchTabGroup(value) {
  try {
    // すべてのタブグループを取得
    const groups = await chrome.tabGroups.query({});

    if (groups.length === 0) {
      console.warn('TabGroup Trigger: タブグループが存在しません');
      return;
    }

    // グループ名での完全一致を試みる
    const targetGroup = groups.find(group => group.title === value);

    if (!targetGroup) {
      console.warn(`TabGroup Trigger: グループが見つかりません: ${value}`);
      return;
    }

    // 対象グループのタブを取得
    const groupTabs = await chrome.tabs.query({ groupId: targetGroup.id });

    if (groupTabs.length === 0) {
      console.warn(`TabGroup Trigger: グループにタブが存在しません: ${targetGroup.title}`);
      return;
    }

    let targetTab = null;

    // 1. このグループで最後に選択されたタブを記憶から取得
    const rememberedTabId = await getLastActiveTab(targetGroup.id);
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

  } catch (error) {
    console.error('TabGroup Trigger: グループ切り替えエラー:', error);
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
    // （タブはcloseTab内のsetTimeoutで閉じられる）
    if (redirectedToCommandUrl.has(commandTabId)) {
      console.log('TabGroup Trigger: 自分でリダイレクトしたコマンドURLをスキップ', commandTabId);
      return;
    }

    // ⌘+Shift+Tで復活したコマンドURL - セッションから次のタブを復活
    console.log('TabGroup Trigger: ⌘+Shift+Tで復活したコマンドURLを検知', commandTabId);

    // 最近閉じたタブを最大数取得（Chromeの制限: MAX_SESSION_RESULTS = 25）
    const maxResults = chrome.sessions.MAX_SESSION_RESULTS || 25;
    const sessions = await chrome.sessions.getRecentlyClosed({ maxResults });

    if (sessions.length === 0) {
      console.log('TabGroup Trigger: 復活させるタブがありません');
      await chrome.tabs.remove(commandTabId);
      return;
    }

    // コマンドURLでない最初のタブを見つける
    let foundNormalTab = false;
    for (const session of sessions) {
      if (session.tab) {
        // コマンドURLでないタブを見つけた
        if (!session.tab.url || !session.tab.url.includes(RESTORE_NEXT_PATH)) {
          await chrome.sessions.restore(session.tab.sessionId);
          console.log('TabGroup Trigger: タブを復活させました', session.tab.url);
          foundNormalTab = true;
          break;
        } else {
          console.log('TabGroup Trigger: コマンドURLをスキップ', session.tab.url);
        }
      } else if (session.window) {
        await chrome.sessions.restore(session.window.sessionId);
        console.log('TabGroup Trigger: ウィンドウを復活させました');
        foundNormalTab = true;
        break;
      }
    }

    if (!foundNormalTab) {
      console.warn(
        'TabGroup Trigger: 通常のタブが見つかりませんでした。' +
        `最近閉じた${maxResults}個のタブがすべてコマンドURLでした。` +
        'これは、短時間に多数のタブグループ移動を行った場合に発生する可能性があります。'
      );
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
      await setLastActiveTab(tab.groupId, tab.id);
    }
  } catch (error) {
    // エラーは無視（タブが既に閉じられている場合など）
    console.debug('TabGroup Trigger: タブアクティブ化記録エラー:', error.message);
  }
});


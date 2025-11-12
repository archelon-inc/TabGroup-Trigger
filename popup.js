// タブグループのカラー定義（Chrome標準のタブグループカラー）
const COLOR_MAP = {
  'grey': '#5f6368',
  'blue': '#1a73e8',
  'red': '#d93025',
  'yellow': '#f9ab00',
  'green': '#34a853',
  'pink': '#f538a0',
  'purple': '#a142f4',
  'cyan': '#24c1e0',
  'orange': '#fa903e'
};

// i18n: data-i18n属性を持つ要素のテキストを置き換え
function localizeHtmlElements() {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const messageName = element.getAttribute('data-i18n');
    const message = chrome.i18n.getMessage(messageName);
    if (message) {
      element.textContent = message;
    }
  });
}

// タブグループを取得して表示
async function loadTabGroups() {
  const container = document.getElementById('groups-container');

  try {
    // すべてのタブグループを取得
    const groups = await chrome.tabGroups.query({});

    if (groups.length === 0) {
      container.innerHTML = `<div class="empty-message">${chrome.i18n.getMessage('noTabGroups')}</div>`;
      return;
    }

    // グループ名でソート
    groups.sort((a, b) => {
      const nameA = a.title || '';
      const nameB = b.title || '';
      return nameA.localeCompare(nameB);
    });

    // グループリストを構築
    container.innerHTML = '';
    groups.forEach(group => {
      const groupItem = createGroupItem(group);
      container.appendChild(groupItem);
    });
  } catch (error) {
    console.error('Error loading tab groups:', error);
    container.innerHTML = `<div class="empty-message">${chrome.i18n.getMessage('errorOccurred')}</div>`;
  }
}

// グループアイテムのHTML要素を作成
function createGroupItem(group) {
  const groupName = group.title || chrome.i18n.getMessage('untitled');
  const encodedName = encodeURIComponent(groupName);
  const url = `https://extension.tabgroup-trigger/${encodedName}`;
  const color = COLOR_MAP[group.color] || COLOR_MAP['grey'];

  const item = document.createElement('div');
  item.className = 'group-item';

  item.innerHTML = `
    <div class="group-header">
      <div class="group-color" style="background-color: ${color}"></div>
      <div class="group-name">${escapeHtml(groupName)}</div>
    </div>
    <div class="group-url">${escapeHtml(url)}</div>
    <button class="copy-button" data-url="${escapeHtml(url)}">${chrome.i18n.getMessage('copyUrl')}</button>
  `;

  // コピーボタンのイベントリスナーを追加
  const copyButton = item.querySelector('.copy-button');
  copyButton.addEventListener('click', () => {
    copyToClipboard(copyButton, url);
  });

  // URL表示部分のクリックでテキスト選択
  const urlElement = item.querySelector('.group-url');
  urlElement.addEventListener('click', () => {
    selectText(urlElement);
  });

  return item;
}

// クリップボードにコピー
async function copyToClipboard(button, text) {
  try {
    await navigator.clipboard.writeText(text);

    // ボタンのテキストとスタイルを一時的に変更
    const originalText = button.textContent;
    button.textContent = chrome.i18n.getMessage('copied');
    button.classList.add('copied');

    // 1.5秒後に元に戻す
    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove('copied');
    }, 1500);
  } catch (error) {
    console.error('Failed to copy:', error);
    button.textContent = chrome.i18n.getMessage('copyFailed');
    setTimeout(() => {
      button.textContent = chrome.i18n.getMessage('copyUrl');
    }, 1500);
  }
}

// HTMLエスケープ（XSS対策）
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// 要素内のテキストを選択
function selectText(element) {
  const range = document.createRange();
  range.selectNodeContents(element);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
}

// ページ読み込み時に実行
document.addEventListener('DOMContentLoaded', () => {
  localizeHtmlElements();
  loadTabGroups();
});

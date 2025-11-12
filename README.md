# TabGroup Trigger

[日本語版はこちら](#日本語版)

A Chrome extension that enables **keyboard shortcut-based tab group switching** by using URL invocation. Combine this extension with keyboard shortcut utilities (BetterTouchTool, AutoHotkey, etc.) to instantly switch between Chrome tab groups using your favorite hotkeys.

## Why This Extension?

Chrome doesn't provide native keyboard shortcuts for switching between tab groups. This extension solves that problem by allowing you to trigger tab group switches via URLs, which can then be mapped to keyboard shortcuts using external utilities. For example, press `Cmd+1` to jump to your "Work" group, `Cmd+2` for "Personal", and so on.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [For Developers](#for-developers)
- [License](#license)

---

## Features

- **Keyboard Shortcut Integration**: Works seamlessly with keyboard shortcut utilities to provide hotkey-based tab group switching
- **URL-based Triggering**: Navigate to `https://extension.tabgroup-trigger/{group-name}` to instantly switch to the specified tab group
- **Active Tab Memory**: Remembers the last active tab in each group and restores it when switching back
- **Automatic Tab Cleanup**: The trigger tab closes automatically after switching groups
- **URL-encoded Support**: Properly handles URL-encoded group names

## Installation

### From Source

1. Clone this repository:
   ```bash
   git clone https://github.com/archelon-inc/TabGroup-Trigger.git
   cd TabGroup-Trigger
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" in the top right corner

4. Click "Load unpacked" and select the cloned directory

5. The extension is now installed and ready to use

## Usage

### Basic Usage

1. Create tab groups in Chrome and give them names
2. Use URLs to switch between groups:
   - Navigate to `https://extension.tabgroup-trigger/Work` to switch to the "Work" group
   - Navigate to `https://extension.tabgroup-trigger/Personal` to switch to the "Personal" group

### Creating Links

You can create bookmarks or links in your applications:

```html
<a href="https://extension.tabgroup-trigger/Work">Switch to Work</a>
<a href="https://extension.tabgroup-trigger/Personal">Switch to Personal</a>
```

### Integration with Keyboard Shortcut Utilities

This extension is designed to work with keyboard shortcut utilities to provide quick tab group switching via hotkeys.

**Recommended Tools:**
- **macOS**: BetterTouchTool, Keyboard Maestro, Alfred, Hammerspoon
- **Windows**: AutoHotkey, PowerToys
- **Linux**: xbindkeys, AutoKey

**Example Setup (BetterTouchTool on macOS):**
1. Create a new keyboard shortcut (e.g., `Cmd+Shift+1`)
2. Set the action to "Open URL"
3. Enter the URL: `https://extension.tabgroup-trigger/Work`
4. Now pressing `Cmd+Shift+1` will instantly switch to your "Work" tab group

**Example Setup (AutoHotkey on Windows):**
```ahk
^!1::Run, https://extension.tabgroup-trigger/Work
^!2::Run, https://extension.tabgroup-trigger/Personal
```

### URL-encoded Group Names

Group names with special characters are automatically decoded:

```
https://extension.tabgroup-trigger/%E4%BB%95%E4%BA%8B  → "仕事" group
```

### Tips

- The extension remembers which tab was last active in each group
- When you switch to a group, it will activate the tab you were last viewing
- If no tab history exists, it activates the first tab in the group

### Limitations

**Saved Tab Groups (all tabs closed):**
- Cannot switch to saved tab groups where all tabs have been closed
- Only works with tab groups that have at least one open tab
- Note: Collapsed tab groups (tabs hidden but not closed) work fine

**Tab Restoration with ⌘+Shift+T:**
- If you perform 25+ consecutive tab group switches, older tabs may not be restorable via ⌘+Shift+T
- This is due to Chrome's session history limit (`chrome.sessions.MAX_SESSION_RESULTS = 25`)
- For most use cases, this limit is sufficient

---

## For Developers

### Project Structure

```
TabGroup-Trigger/
├── manifest.json       # Extension manifest (Manifest V3)
├── background.js       # Service worker handling group switching
├── icons/             # Extension icons
└── README.md          # This file
```

### Development Setup

1. Fork and clone the repository
2. Make your changes
3. Load the extension in Chrome via `chrome://extensions/` in Developer mode
4. Test your changes

### Branch Naming Convention

```
{issue-number}/{brief-description}
```

Example: `123/fix-login-bug`

### Making Changes

1. Create an issue describing the feature or bug
2. Create a branch following the naming convention
3. Make your changes with frequent testing
4. Submit a Pull Request linked to the issue

### Technical Details

**Permissions Required:**
- `tabs`: Access to tab information
- `tabGroups`: Access to tab group information
- `webNavigation`: Intercept navigation to trigger URLs

**Host Permissions:**
- `https://extension.tabgroup-trigger/*`: Handle trigger URLs

**Key Functionality:**
- Uses `chrome.webNavigation.onBeforeNavigate` to intercept trigger URLs
- Maintains a `Map` to track last active tab per group
- Uses flags to prevent recording self-activated tabs

### Testing

Test the extension by:
1. Creating multiple tab groups with different names
2. Testing URL navigation: `https://extension.tabgroup-trigger/{group-name}`
3. Verifying tab memory by switching between groups multiple times
4. Testing URL-encoded group names
5. Testing edge cases (non-existent groups, empty groups, etc.)

### GitHub CLI Commands

Use `gh` command for GitHub operations:
```bash
# View issues
gh issue list

# Create PR
gh pr create --base main --head your-branch
```

---

## License

See [LICENSE](LICENSE) file for details.

---
---

# 日本語版

ChromeのタブグループをURL経由で切り替える拡張機能です。**キーボードショートカットユーティリティ**（BetterTouchTool、AutoHotkeyなど）と組み合わせることで、**お好みのホットキーでタブグループを瞬時に切り替え**できます。

## なぜこの拡張機能？

Chromeにはタブグループを切り替えるためのネイティブなキーボードショートカット機能がありません。この拡張機能は、URL経由でタブグループの切り替えをトリガーできるようにすることで、この問題を解決します。外部のキーボードショートカットユーティリティと組み合わせることで、例えば `Cmd+1` で「仕事」グループに、`Cmd+2` で「プライベート」グループに瞬時にジャンプできるようになります。

## 目次
- [機能](#機能)
- [インストール](#インストール)
- [使い方](#使い方)
- [開発者向け情報](#開発者向け情報)
- [ライセンス](#ライセンス-1)

---

## 機能

- **キーボードショートカット連携**: キーボードショートカットユーティリティとシームレスに連携し、ホットキーベースのタブグループ切り替えを実現
- **URLベースのトリガー**: `https://extension.tabgroup-trigger/{グループ名}` にアクセスすると、指定したタブグループに即座に切り替わります
- **アクティブタブの記憶**: 各グループで最後にアクティブだったタブを記憶し、グループに戻った際にそのタブを復元します
- **自動タブクリーンアップ**: グループ切り替え後、トリガーURLのタブは自動的に閉じられます
- **URLエンコード対応**: URLエンコードされたグループ名を正しく処理します

## インストール

### ソースコードから

1. このリポジトリをクローン:
   ```bash
   git clone https://github.com/archelon-inc/TabGroup-Trigger.git
   cd TabGroup-Trigger
   ```

2. Chromeで `chrome://extensions/` を開く

3. 右上の「デベロッパーモード」を有効化

4. 「パッケージ化されていない拡張機能を読み込む」をクリックし、クローンしたディレクトリを選択

5. 拡張機能がインストールされ、使用可能になります

## 使い方

### 基本的な使い方

1. Chromeでタブグループを作成し、名前を付ける
2. URLを使ってグループを切り替える:
   - `https://extension.tabgroup-trigger/仕事` で「仕事」グループに切り替え
   - `https://extension.tabgroup-trigger/プライベート` で「プライベート」グループに切り替え

### リンクの作成

ブックマークやアプリケーション内にリンクを作成できます:

```html
<a href="https://extension.tabgroup-trigger/仕事">仕事に切り替え</a>
<a href="https://extension.tabgroup-trigger/プライベート">プライベートに切り替え</a>
```

### キーボードショートカットユーティリティとの連携

この拡張機能は、キーボードショートカットユーティリティと組み合わせて使用することで、ホットキーによる素早いタブグループ切り替えを実現します。

**推奨ツール:**
- **macOS**: BetterTouchTool、Keyboard Maestro、Alfred、Hammerspoon
- **Windows**: AutoHotkey、PowerToys
- **Linux**: xbindkeys、AutoKey

**セットアップ例（macOS の BetterTouchTool）:**
1. 新しいキーボードショートカット（例: `Cmd+Shift+1`）を作成
2. アクションを「Open URL」に設定
3. URL を入力: `https://extension.tabgroup-trigger/仕事`
4. これで `Cmd+Shift+1` を押すと「仕事」タブグループに即座に切り替わります

**セットアップ例（Windows の AutoHotkey）:**
```ahk
^!1::Run, https://extension.tabgroup-trigger/仕事
^!2::Run, https://extension.tabgroup-trigger/プライベート
```

### URLエンコードされたグループ名

特殊文字を含むグループ名は自動的にデコードされます:

```
https://extension.tabgroup-trigger/%E4%BB%95%E4%BA%8B  → 「仕事」グループ
```

### ヒント

- 拡張機能は各グループで最後にアクティブだったタブを記憶します
- グループに切り替えると、最後に見ていたタブがアクティブになります
- タブ履歴がない場合は、グループの最初のタブがアクティブになります

### 制限事項

**保存されたタブグループ（全タブが閉じられている状態）:**
- 全てのタブが閉じられた保存済みタブグループには移動できません
- 少なくとも1つのタブが開いているタブグループのみが対象です
- 注：折りたたまれたタブグループ（タブは開いているが非表示）は正常に動作します

**⌘+Shift+T でのタブ復活:**
- 25回以上連続でタブグループ移動を行うと、それより前のタブが ⌘+Shift+T で復活できなくなる可能性があります
- これは Chrome のセッション履歴の制限（`chrome.sessions.MAX_SESSION_RESULTS = 25`）によるものです
- ほとんどのユースケースでは、この制限で十分です

---

## 開発者向け情報

### プロジェクト構造

```
TabGroup-Trigger/
├── manifest.json       # 拡張機能マニフェスト（Manifest V3）
├── background.js       # グループ切り替えを処理するサービスワーカー
├── icons/             # 拡張機能アイコン
└── README.md          # このファイル
```

### 開発環境のセットアップ

1. リポジトリをフォーク＆クローン
2. 変更を加える
3. デベロッパーモードで `chrome://extensions/` から拡張機能を読み込む
4. 変更をテスト

### ブランチ命名規則

```
{issue番号}/{簡単な内容説明}
```

例: `123/fix-login-bug`

### 変更を加える

1. 機能やバグを説明するissueを作成
2. 命名規則に従ってブランチを作成
3. 小さい単位でこまめに動作確認しながら変更を行う
4. issueにリンクされたPull Requestを作成

### 技術的な詳細

**必要な権限:**
- `tabs`: タブ情報へのアクセス
- `tabGroups`: タブグループ情報へのアクセス
- `webNavigation`: トリガーURLのナビゲーションを傍受

**ホスト権限:**
- `https://extension.tabgroup-trigger/*`: トリガーURLの処理

**主要機能:**
- `chrome.webNavigation.onBeforeNavigate` を使用してトリガーURLを傍受
- グループごとの最後のアクティブタブを追跡するための `Map` を保持
- 自己アクティブ化されたタブの記録を防ぐためのフラグを使用

### テスト

以下の方法で拡張機能をテスト:
1. 異なる名前で複数のタブグループを作成
2. URL経由でのナビゲーションをテスト: `https://extension.tabgroup-trigger/{グループ名}`
3. グループ間を複数回切り替えてタブメモリを検証
4. URLエンコードされたグループ名をテスト
5. エッジケースをテスト（存在しないグループ、空のグループなど）

### GitHub CLIコマンド

GitHub操作には `gh` コマンドを使用:
```bash
# issueを表示
gh issue list

# PRを作成
gh pr create --base main --head your-branch
```

---

## ライセンス

詳細は[LICENSE](LICENSE)ファイルを参照してください。

# Chrome Web Store 說明（繁體中文）

## 簡短說明（132字元以內）

```
透過URL呼叫切換Chrome分頁群組。結合鍵盤快速鍵工具，實現基於熱鍵的即時分頁群組切換。
```

字元數：46字元

## 詳細說明

```
一個Chrome擴充功能，透過URL呼叫實現基於鍵盤快速鍵的分頁群組切換。將此擴充功能與鍵盤快速鍵工具結合使用，可以使用您喜愛的熱鍵即時切換Chrome分頁群組。

【為什麼需要這個擴充功能？】
Chrome沒有提供用於切換分頁群組的原生鍵盤快速鍵。此擴充功能透過允許您經由URL觸發分頁群組切換來解決此問題，然後可以使用外部工具將其對應到鍵盤快速鍵。例如，按Cmd+1跳轉到「工作」群組，按Cmd+2跳轉到「個人」群組等。

【主要功能】
✓ 鍵盤快速鍵整合
  與鍵盤快速鍵工具無縫配合，提供基於熱鍵的分頁群組切換

✓ 基於URL的觸發
  導航至 https://extension.tabgroup-trigger/{群組名稱} 即可立即切換到指定的分頁群組

✓ URL清單彈出視窗
  點擊擴充功能圖示檢視所有分頁群組及其URL編碼的URL，一鍵輕鬆複製

【使用方法】
1. 在Chrome中建立分頁群組並為其命名
2. 點擊擴充功能圖示取得每個群組的URL：
   - 自動顯示URL編碼的URL
   - 點擊「複製URL」按鈕複製到剪貼簿
   - 點擊URL顯示區域選取文字進行手動複製
3. 在鍵盤快速鍵工具中設定開啟URL的動作
   範例：Cmd+Shift+1 → https://extension.tabgroup-trigger/Work
4. 按下設定的熱鍵即可立即切換分頁群組

【鍵盤快速鍵工具範例】
• macOS：BetterTouchTool、Keyboard Maestro
• Windows：AutoHotkey、PowerToys（0.79或更高版本）

【設定範例（BetterTouchTool）】
1. 建立新的鍵盤快速鍵（例如：Cmd+Shift+1）
2. 將動作設定為「Open URL」
3. 輸入URL：https://extension.tabgroup-trigger/Work
4. 現在按Cmd+Shift+1將立即切換到您的「Work」分頁群組

【提示】
• 擴充功能會記住每個群組中最後活動的分頁
• 當您切換到某個群組時，它將啟動您最後檢視的分頁
• 如果不存在分頁歷史記錄，它將啟動群組中的第一個分頁

【限制】
• 無法切換到已儲存的分頁群組（Chrome的「儲存群組」功能會移除所有分頁但保留群組標籤）
  注意：折疊的分頁群組（分頁被隱藏但未移除）可以正常運作
• 群組名稱中的特殊字元（?、/、#、%等）需要URL編碼
  範例："Question?Answer" → https://extension.tabgroup-trigger/Question%3FAnswer
  使用擴充功能的彈出視窗UI自動取得URL編碼的URL
• 如果連續執行25次以上的分頁群組切換，由於Chrome的工作階段歷史限制（chrome.sessions.MAX_SESSION_RESULTS = 25），較舊的分頁可能無法透過Cmd+Shift+T復原

【隱私權】
此擴充功能不收集任何資料。所有處理都在您的裝置上本機完成。

【支援】
如果您遇到任何問題或有功能需求，請在我們的GitHub Issues頁面上回報。
https://github.com/archelon-inc/TabGroup-Trigger/issues

---
注：本說明由Claude AI翻譯。
```

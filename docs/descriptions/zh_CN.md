# Chrome Web Store 说明（简体中文）

## 简短说明（132字符以内）

```
通过URL调用切换Chrome标签页组。结合键盘快捷键工具，实现基于热键的即时标签组切换。
```

字符数：46字符

## 详细说明

```
一个Chrome扩展程序，通过URL调用实现基于键盘快捷键的标签页组切换。将此扩展程序与键盘快捷键工具结合使用，可以使用您喜欢的热键即时切换Chrome标签页组。

【为什么需要这个扩展程序？】
Chrome没有提供用于切换标签页组的原生键盘快捷键。此扩展程序通过允许您通过URL触发标签页组切换来解决此问题，然后可以使用外部工具将其映射到键盘快捷键。例如，按Cmd+1跳转到"工作"组，按Cmd+2跳转到"个人"组等。

【主要功能】
✓ 键盘快捷键集成
  与键盘快捷键工具无缝配合，提供基于热键的标签页组切换

✓ 基于URL的触发
  导航至 https://extension.tabgroup-trigger/{组名} 即可立即切换到指定的标签页组

✓ URL列表弹窗
  点击扩展程序图标查看所有标签页组及其URL编码的URL，一键轻松复制

【使用方法】
1. 在Chrome中创建标签页组并为其命名
2. 点击扩展程序图标获取每个组的URL：
   - 自动显示URL编码的URL
   - 点击"复制URL"按钮复制到剪贴板
   - 点击URL显示区域选择文本进行手动复制
3. 在键盘快捷键工具中设置打开URL的操作
   示例：Cmd+Shift+1 → https://extension.tabgroup-trigger/Work
4. 按下配置的热键即可立即切换标签页组

【键盘快捷键工具示例】
• macOS：BetterTouchTool、Keyboard Maestro
• Windows：AutoHotkey、PowerToys（0.79或更高版本）

【设置示例（BetterTouchTool）】
1. 创建新的键盘快捷键（例如：Cmd+Shift+1）
2. 将操作设置为"Open URL"
3. 输入URL：https://extension.tabgroup-trigger/Work
4. 现在按Cmd+Shift+1将立即切换到您的"Work"标签页组

【提示】
• 扩展程序会记住每个组中最后活动的标签页
• 当您切换到某个组时，它将激活您最后查看的标签页
• 如果不存在标签页历史记录，它将激活组中的第一个标签页

【限制】
• 无法切换到已保存的标签页组（Chrome的"保存组"功能会删除所有标签页但保留组标签）
  注意：折叠的标签页组（标签页被隐藏但未删除）可以正常工作
• 组名中的特殊字符（?、/、#、%等）需要URL编码
  示例："Question?Answer" → https://extension.tabgroup-trigger/Question%3FAnswer
  使用扩展程序的弹窗UI自动获取URL编码的URL
• 如果连续执行25次以上的标签页组切换，由于Chrome的会话历史限制（chrome.sessions.MAX_SESSION_RESULTS = 25），较旧的标签页可能无法通过Cmd+Shift+T恢复

【隐私】
此扩展程序不收集任何数据。所有处理都在您的设备上本地完成。

【支持】
如果您遇到任何问题或有功能请求，请在我们的GitHub Issues页面上报告。
https://github.com/archelon-inc/TabGroup-Trigger/issues

---
注：本说明由Claude AI翻译。
```

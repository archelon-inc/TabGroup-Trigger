# Chrome Web Store Description (English)

## Short Description (132 characters max)

```
Switch Chrome tab groups via URL invocation. Combine with keyboard shortcut utilities for instant hotkey-based group switching.
```

Character count: 132 characters

## Detailed Description

```
A Chrome extension that enables keyboard shortcut-based tab group switching by using URL invocation. Combine this extension with keyboard shortcut utilities to instantly switch between Chrome tab groups using your favorite hotkeys.

【Why This Extension?】
Chrome doesn't provide native keyboard shortcuts for switching between tab groups. This extension solves that problem by allowing you to trigger tab group switches via URLs, which can then be mapped to keyboard shortcuts using external utilities. For example, press Cmd+1 to jump to your "Work" group, Cmd+2 for "Personal", and so on.

【Key Features】
✓ Keyboard Shortcut Integration
  Works seamlessly with keyboard shortcut utilities to provide hotkey-based tab group switching

✓ URL-based Triggering
  Navigate to https://extension.tabgroup-trigger/{group-name} to instantly switch to the specified tab group

【How to Use】
1. Create tab groups in Chrome and give them names
2. Set up URL-opening actions in your keyboard shortcut utility
   Example: Cmd+Shift+1 → https://extension.tabgroup-trigger/Work
3. Press your configured hotkey to instantly switch tab groups

【Recommended Tools】
• macOS: BetterTouchTool, Keyboard Maestro
• Windows: AutoHotkey, PowerToys (version 0.79 or later)

【Setup Example (BetterTouchTool)】
1. Create a new keyboard shortcut (e.g., Cmd+Shift+1)
2. Set the action to "Open URL"
3. Enter the URL: https://extension.tabgroup-trigger/Work
4. Now pressing Cmd+Shift+1 will instantly switch to your "Work" tab group

【Tips】
• The extension remembers which tab was last active in each group
• When you switch to a group, it will activate the tab you were last viewing
• If no tab history exists, it activates the first tab in the group

【Limitations】
• Cannot switch to saved tab groups (Chrome's "Save group" feature that removes all tabs but keeps the group label)
  Note: Collapsed tab groups (where tabs are hidden but not removed) work fine
• Special characters in group names (?, /, #, %, etc.) require URL encoding
  Example: "Question?Answer" → https://extension.tabgroup-trigger/Question%3FAnswer
• If you perform 25+ consecutive tab group switches, older tabs may not be restorable via Cmd+Shift+T due to Chrome's session history limit (chrome.sessions.MAX_SESSION_RESULTS = 25)

【Privacy】
This extension does not collect any data. All processing is done locally on your device.

【Support】
If you encounter any issues or have feature requests, please report them on our GitHub Issues page.
https://github.com/archelon-inc/TabGroup-Trigger/issues
```

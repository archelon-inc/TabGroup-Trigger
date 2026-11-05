# TabGroup Trigger Specification

TabGroup Trigger is a Manifest V3 Chrome extension that displays open tab groups via URL invocation.

## Trigger URL

`https://extension.tabgroup-trigger/{group_name}`

Decode the path as a URL-encoded group title. Match open groups by exact, case-sensitive title. Closed saved groups must first be opened in Chrome. Missing groups do not create windows.

## Window setting

The extension popup contains **Open groups in separate windows**, enabled by default. Save this preference in `chrome.storage.local` and read it for each trigger. The URL does not select the window mode.

- Enabled: if the target group already occupies a normal window by itself, reuse that window. Otherwise move the complete group to a new normal window, leaving unrelated tabs in place. Remove the new blank tab and expand the group.
- Disabled: keep the group in its current window and focus that window.

Both modes activate the group's last selected tab, or its first tab if the remembered tab no longer exists. Close the trigger tab after switching. The extension does not manage operating-system desktops or depend on any external application.

## Automation result

`https://extension.tabgroup-trigger/{group_name}?result=tab`

Keep the trigger tab and navigate it to the extension's `result.html`, with `#window=<windowId>` on success or `#error=<URL-encoded message>` on failure. The caller closes this result tab. The window setting still applies. No callback URL or external service is involved.

## Popup

Show the saved window setting and a list of open groups with URL-encoded trigger URLs and copy buttons. Changing the setting saves it immediately. Reopening the popup restores the saved value; a failed save restores the prior value and displays an error.

## Permissions

- `tabs`: read and activate tabs.
- `tabGroups`: identify, expand, and move groups.
- `webNavigation`: detect trigger URLs.
- `sessions`: restore recently closed tabs when a trigger tab is reopened with Cmd+Shift+T.
- `storage`: remember the last active tab per group and the window setting locally.
- Host permission: `https://extension.tabgroup-trigger/*`.

## Verification

- `node --test test/*.test.cjs`: exercise trigger URLs with browser API fixtures.
- `python3 test/chrome-live.py <extension-id>`: exercise default separation, standalone window reuse, the popup setting, and persistence in Chrome. Create and remove only test tabs, and restore the original preference.

Test files are excluded from distribution packages. Comments in `background.js` use Japanese JSDoc.

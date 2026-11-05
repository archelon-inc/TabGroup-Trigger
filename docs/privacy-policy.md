# Privacy Policy for TabGroup Trigger

**Last Updated:** November 5, 2026

## Overview

TabGroup Trigger ("the Extension") is committed to protecting your privacy. This privacy policy explains how the Extension handles information.

## Data Collection

**The Extension does not collect or transmit personal data. It stores the window preference and last selected tab IDs locally.**

All operations are performed locally on your device. No data is sent to external servers or third parties.

## Permissions and Their Usage

The Extension requires the following permissions to function properly:

### 1. `tabs` Permission
- **Purpose:** To read tab information (title, URL, active status)
- **Usage:** Required to identify and switch between tabs when navigating to tab groups
- **Data Storage:** Only the last selected tab ID per group is saved locally. Page contents, titles, and URLs are not saved.

### 2. `tabGroups` Permission
- **Purpose:** To read and manage Chrome tab groups
- **Usage:** Required to identify tab group names, retrieve group information, and switch to the specified group
- **Data Storage:** Group IDs are saved locally to associate each group with its last selected tab. Group names and URLs are not saved.

### 3. `webNavigation` Permission
- **Purpose:** To intercept navigation to trigger URLs (`https://extension.tabgroup-trigger/*`)
- **Usage:** Required to detect when you access a tab group trigger URL and initiate the group switching action
- **Data Storage:** No navigation data is stored.

### 4. `sessions` Permission
- **Purpose:** To restore recently closed tabs when a trigger tab is reopened with Cmd+Shift+T
- **Usage:** Skip trigger tabs and restore the previous tab or window from Chrome's session history
- **Data Storage:** Session history is managed by Chrome and is not copied by the Extension.

### 5. `host_permissions` for `https://extension.tabgroup-trigger/*`
- **Purpose:** To intercept navigation to the Extension's trigger URLs
- **Usage:** This is a virtual URL pattern that never connects to any real server. All processing occurs locally within the Extension.
- **Data Storage:** No data is transmitted or stored.

## Local Data Storage

The `storage` permission allows the Extension to use `chrome.storage.local` for:
- The separate-window preference.
- Group IDs and their last selected tab IDs.

This data stays in the local Chrome profile, is not synchronized or transmitted, and is removed when the Extension is uninstalled. Page contents, group names, titles, and URLs are not saved by the Extension.

## Third-Party Services

The Extension does not integrate with or send data to any third-party services, analytics platforms, or advertising networks.

## Data Sharing

The Extension does not share any data with third parties because it does not collect any data in the first place.

## Security

Local preferences and tab IDs are held in Chrome-managed extension storage. The Extension does not transmit them.

## Children's Privacy

The Extension does not knowingly collect or target children under the age of 13. Since no data is collected at all, the Extension is safe for users of all ages.

## Changes to This Privacy Policy

We may update this privacy policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date. Continued use of the Extension after changes constitutes acceptance of the updated policy.

## Contact Information

If you have any questions or concerns about this privacy policy or the Extension's practices, please contact us:

- **GitHub Issues:** https://github.com/archelon-inc/TabGroup-Trigger/issues
- **Repository:** https://github.com/archelon-inc/TabGroup-Trigger

## Compliance

This Extension complies with:
- Chrome Web Store Developer Program Policies
- Chrome Extension Single Purpose Policy (the Extension's sole purpose is tab group switching)
- User Data Privacy requirements (by not collecting any user data)

---

**Summary:** TabGroup Trigger respects your privacy by not collecting or transmitting personal data. All operations are performed locally on your device.

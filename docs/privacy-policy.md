# Privacy Policy for TabGroup Trigger

**Last Updated:** November 12, 2024

## Overview

TabGroup Trigger ("the Extension") is committed to protecting your privacy. This privacy policy explains how the Extension handles information.

## Data Collection

**The Extension does not collect, store, or transmit any personal data or usage information.**

All operations are performed locally on your device. No data is sent to external servers or third parties.

## Permissions and Their Usage

The Extension requires the following permissions to function properly:

### 1. `tabs` Permission
- **Purpose:** To read tab information (title, URL, active status)
- **Usage:** Required to identify and switch between tabs when navigating to tab groups
- **Data Storage:** No tab data is stored permanently. All operations are performed in memory only.

### 2. `tabGroups` Permission
- **Purpose:** To read and manage Chrome tab groups
- **Usage:** Required to identify tab group names, retrieve group information, and switch to the specified group
- **Data Storage:** No tab group data is stored permanently.

### 3. `webNavigation` Permission
- **Purpose:** To intercept navigation to trigger URLs (`https://extension.tabgroup-trigger/*`)
- **Usage:** Required to detect when you access a tab group trigger URL and initiate the group switching action
- **Data Storage:** No navigation data is stored.

### 4. `sessions` Permission
- **Purpose:** To remember the last active tab in each tab group
- **Usage:** When you switch to a tab group, the Extension activates the tab you were last viewing in that group
- **Data Storage:** Chrome's built-in session API stores this information locally. The Extension does not store or access this data externally.

### 5. `host_permissions` for `https://extension.tabgroup-trigger/*`
- **Purpose:** To intercept navigation to the Extension's trigger URLs
- **Usage:** This is a virtual URL pattern that never connects to any real server. All processing occurs locally within the Extension.
- **Data Storage:** No data is transmitted or stored.

## Local Data Storage

The Extension does not use any persistent storage mechanisms such as:
- `chrome.storage.local`
- `chrome.storage.sync`
- IndexedDB
- localStorage

All operations are performed in real-time without storing any data.

## Third-Party Services

The Extension does not integrate with or send data to any third-party services, analytics platforms, or advertising networks.

## Data Sharing

The Extension does not share any data with third parties because it does not collect any data in the first place.

## Security

Since the Extension does not collect, store, or transmit any data, there are no data security concerns related to personal information.

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

**Summary:** TabGroup Trigger respects your privacy by not collecting, storing, or transmitting any personal data. All operations are performed locally on your device.

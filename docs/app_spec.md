# TabGroup Trigger Specification

## Overview
TabGroup Trigger is a Chrome Extension (Manifest V3) that switches Chrome Tab Groups **via URL invocation**.

- No popup UI
- No keyboard shortcuts
- External tools (e.g., BetterTouchTool, Alfred, Raycast, shell scripts) can trigger switching
- The extension reacts to URL navigation

URL format:
https://extension.tabgroup-trigger/{group_name or group_position}

---

## URL Parameter Rules

1. If `{value}` exactly matches a **tab group title** (case-sensitive)  
   → treat as `group_name`

2. If `{value}` is numeric (example: 1, 2, 3 ...)  
   → treat as `group_position` (indexing left-to-right)

3. If both conditions are possible (example: a group titled "3")  
   → **group_name has priority**

Examples:
- https://extension.tabgroup-trigger/work  
  → Switch to group title "work"
- https://extension.tabgroup-trigger/3  
  → Switch to the **3rd tab group from the left**
- https://extension.tabgroup-trigger/2025  
  → If a group named "2025" exists, use name (not numeric)

---

## Group Resolution Logic

### `group_name` (highest priority)
- Compare `{value}` with `group.title`
- Exact match only
- Case-sensitive
- No partial match / no fuzzy match / no lowercase normalization

### `group_position` (fallback when no group_name match)
- Determine visual ordering of tab groups: left to right
- `group_position` uses **1-based index**

---

## Behavior when triggered

1. The browser attempts to navigate to the URL (domain does not need to exist)
2. The background service worker detects the navigation via `webNavigation` API
3. Extract the `{value}` in the URL path
4. Determine target tab group (name priority, otherwise positional)
5. Activate the first tab belonging to that group
6. Immediately close the tab created by the URL navigation

The user should **not see any new tab appear**.

---

## Implementation Requirements

- Manifest Version: 3
- Background script: `background.js` (Service Worker)
- Required permissions:
  - `tabs`
  - `tabGroups`
  - `webNavigation`
- Required host permissions:
  - `"https://extension.tabgroup-trigger/*"`
- No popup page
- No UI
- No `commands` (keyboard shortcuts)
- No options page

---

## Code Comment Requirements

- All comments inside `background.js` must use **jsDoc format**
- Comment text must be **Japanese**

Example format:

/**
 * グループ名または位置に基づきタブグループを切り替える
 */

---

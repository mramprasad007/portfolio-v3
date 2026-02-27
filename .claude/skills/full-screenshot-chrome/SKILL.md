---
name: full-screenshot-chrome
description: Navigate to a URL, scroll the full page, take a full screen screenshot.
argument-hint: <url>
allowed-tools: mcp__chrome-devtools__navigate_page, mcp__chrome-devtools__take_screenshot, mcp__chrome-devtools__take_snapshot, mcp__chrome-devtools__list_console_messages, mcp__chrome-devtools__list_pages, mcp__chrome-devtools__select_page, mcp__chrome-devtools__evaluate_script
---

Review the site: **$ARGUMENTS**

1. List pages, select the active one.
2. Navigate to `$ARGUMENTS`.
3. Scroll to trigger animations using `evaluate_script`:
   ```js
   async () => {
     const delay = ms => new Promise(r => setTimeout(r, ms));
     let last = 0;
     while (true) {
       window.scrollBy(0, 600);
       await delay(300);
       const h = document.body.scrollHeight;
       if (window.scrollY + window.innerHeight >= h && h === last) break;
       last = h;
     }
     window.scrollTo(0, 0);
     await delay(500);
   }
   ```
4. Take a full-page screenshot (`fullPage: true`).

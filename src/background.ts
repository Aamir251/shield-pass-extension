import {
  setAuthMessageListener,
  setAuthStatus,
  startPeriodicAuthCheck,
} from "./background-scripts/auth";

import browser from "webextension-polyfill";

// Initialize auth checking
browser.runtime.onInstalled.addListener(() => {
  startPeriodicAuthCheck(30); // Check every 30 minutes
});

// Check auth on tab update
browser.tabs.onUpdated.addListener((_tabId, changeInfo, _tab) => {
  if (changeInfo.status === "complete") {
    setAuthStatus();
  }
});

// Set up auth message listener
setAuthMessageListener();

/**
 *  Current Tab Listener
 */

browser.runtime.onMessage.addListener(async (message: { action: string }) => {
  if (message.action === "getCurrentTab") {
    const currentTab = await browser.tabs.query({
      active: true,
      windowType: "normal",
      currentWindow: true,
    });

    return currentTab;
  }

  if (message.action === "clearSessionStorage") {
    sessionStorage.removeItem("sp-shared-cred")
    return null
  }

  return null;

  
});

/**
 * Open Popup Listener
 */

browser.runtime.onMessage.addListener(async (message: { action: string }) => {
  if (message.action === "openPopup") {
    browser.action.openPopup();
  }
});


/**
 * URL Change Listener
*/

browser.tabs.onUpdated.addListener(function (tabId, changeInfo, _tab) {
  if (changeInfo.status === "complete") {
    browser.tabs.sendMessage(tabId, {
      message : "TabUpdated"
    })
  }
})


// Export setAuthStatus for use in other parts of the extension if needed
export { setAuthStatus } from "./background-scripts/auth";

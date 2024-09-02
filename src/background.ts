import {
  setAuthMessageListener,
  setAuthStatus,
  startPeriodicAuthCheck,
} from "./background-scripts/auth";

import browser from "webextension-polyfill";
import { init } from "./content";

// Initialize auth checking
browser.runtime.onInstalled.addListener(() => {
  startPeriodicAuthCheck(30); // Check every 30 minutes
});

// Check auth on tab update
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
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
});

/**
 * Open Popup Listener
 */

browser.runtime.onMessage.addListener(async (message: { action: string }) => {
  if (message.action === "openPopup") {
    browser.action.openPopup();
  }
});

// Export setAuthStatus for use in other parts of the extension if needed
export { setAuthStatus } from "./background-scripts/auth";

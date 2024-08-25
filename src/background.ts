import { setAuthMessageListener, setAuthStatus, startPeriodicAuthCheck } from "./background-scripts/auth";

import browser from "webextension-polyfill";

// Initialize auth checking
browser.runtime.onInstalled.addListener(() => {
  startPeriodicAuthCheck(30); // Check every 30 minutes
});

// Check auth on tab update
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
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
    const currentTab = await browser.tabs.query({ active: true, windowType: "normal", currentWindow: true })

    return currentTab

  }
})


// browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

//   browser.scripting.insertCSS({
//     target: { tabId: tabId }, css: '.sp-wrapper { position: fixed!important; top: 20px !important; right: 0!important; width: 300px !important; height: 200px !important; background- color: white!important; border: 1px solid red!important }'
//   }).then(() => {
//     console.log({ tabId });

//   })
// })

// Export setAuthStatus for use in other parts of the extension if needed
export { setAuthStatus } from "./background-scripts/auth";
import Browser from "webextension-polyfill"
import { SERVER_URL } from "./constants"

export const addLogoutListener = (logoutButton : HTMLButtonElement) => {

  logoutButton.addEventListener("click", async () => {
    // delete token from Cookie
    
    try {
      logoutButton.disabled = true

      const resp = await fetch(`${SERVER_URL}/api/extension-logout`, {
        method : "POST"
      })

      const data = await resp.json()

      
      if (data.success) {
        const [tab] = await Browser.tabs.query({
          active: true,
          currentWindow: true,
        });
        if (tab.id) {
          // Reload the current tab
          await Browser.tabs.reload(tab.id);
        }
        // Close the popup
        window.close();
      }
    } catch (error) {
      
    } finally {
      logoutButton.disabled = false

    }
  })
}
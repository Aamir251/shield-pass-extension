import browser from "webextension-polyfill";

// Function to send message to background script and get cookies
export const getCookiesFromBackground = async () => {
  try {
    const response = await browser.runtime.sendMessage({ action: "getCookies" });
    console.log("Cookies received:", response);
    return response;
  } catch (error) {
    console.error("Error getting cookies:", error);
  }
}
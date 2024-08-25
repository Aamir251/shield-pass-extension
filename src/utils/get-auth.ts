import browser from "webextension-polyfill";

export type AuthStatus = 'pending' | "unauthorized" | "authorized"

export const getAuthFromBackground = async (): Promise<AuthStatus> => {
  try {
    const response = await browser.runtime.sendMessage({ action: "getAuthStatus" });
    console.log({ authResponse: response });
    return response;
  } catch (error) {
    console.error("Error getting auth status:", error);
    return "pending";
  }
}
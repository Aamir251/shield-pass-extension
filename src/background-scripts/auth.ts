import browser from "webextension-polyfill";
import { AuthStatus } from "../utils/get-auth";
import { SERVER_URL } from "../utils/constants";

let isAuthenticated: AuthStatus = "pending";

export async function setAuthStatus() {

  try {
    const response = await fetch(`${SERVER_URL}/api/check-auth`, {
      method: "GET",
      credentials: "include"
    });
    if (response.ok) {
      isAuthenticated = "authorized";
    } else {
      isAuthenticated = "unauthorized";
    }
  } catch (error) {
    console.error("Error checking auth status:", error);
    isAuthenticated = "unauthorized";
  }
}
export function startPeriodicAuthCheck(intervalInMinutes: number) {
  setAuthStatus(); // Initial check
  setInterval(setAuthStatus, intervalInMinutes * 60 * 1000);
}

export function getAuthStatus(): AuthStatus {
  return isAuthenticated;
}

export function setAuthMessageListener() {
  browser.runtime.onMessage.addListener(async (message: { action: string }, sender) => {
    if (message.action === "getAuthStatus") {
      return getAuthStatus();
    }
  });
}


export const changeAuthStatus = (status: AuthStatus): boolean => {
  isAuthenticated = status;
  return true;
}
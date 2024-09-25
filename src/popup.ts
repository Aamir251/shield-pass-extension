import browser from "webextension-polyfill";
import { getAuthFromBackground } from "./utils/get-auth";
import { loginFormUI } from "./ui/login-form";
import { SERVER_URL } from "./utils/constants";
import { changeAuthStatus } from "./background-scripts/auth";
import { addLogoutListener } from "./utils/logout-listener";

document.addEventListener("DOMContentLoaded", async () => {
  const body = document.body;

  const isAuthenticated = await getAuthFromBackground();

  if (isAuthenticated === "authorized") {
    // render LoggedIn UI
  } else {
    // render email form

   
  }

  const formUI = loginFormUI();

  body.appendChild(formUI);

  addFormSubmitListener(formUI.querySelector("form") as HTMLFormElement);

  addLogoutListener(formUI.querySelector(".sp-logout-btn") as HTMLButtonElement)
});

function addFormSubmitListener(form: HTMLFormElement) {
  const btn = form.querySelector("button")!;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      btn.disabled = true;
      const formData = new FormData(form);

      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      if (!email || !password) throw Error("Please enter all Fields");

      const resp = await fetch(`${SERVER_URL}/api/extension-login`, {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await resp.json();

      if (!data.success) throw Error(data.error);

      const authChanged = changeAuthStatus("authorized");

      if (authChanged) {
        // Get the current active tab
        const [tab] = await browser.tabs.query({
          active: true,
          currentWindow: true,
        });
        if (tab.id) {
          // Reload the current tab
          await browser.tabs.reload(tab.id);
        }
        // Close the popup
        window.close();
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      btn.disabled = false;
    }
  });
}

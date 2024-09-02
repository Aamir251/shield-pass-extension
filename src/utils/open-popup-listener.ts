import browser from "webextension-polyfill"

export const addOpenPoupupListener = (wrappers: HTMLDivElement[]) => {

  wrappers.forEach(wrapper => {
    const loginButton = wrapper.querySelector("a")

    if (loginButton) {
      loginButton.addEventListener("click", async (e) => {
        e.preventDefault()

        await browser.runtime.sendMessage({ action: "openPopup" })

      })
    }
  })

}
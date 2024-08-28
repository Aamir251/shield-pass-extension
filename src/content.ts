import { addIconToInputs } from "./utils/add-input-icon";
import { renderCredentialUi } from "./utils/credential-ui";
import { addClickListenerToIcons } from "./utils/icon-click-listener";
import { addCredentialItemClickListener } from "./utils/credential-click";
import { disableInputToggle } from "./utils/disable-input-toggle";



const inputNodes = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]')

setTimeout(async () => {

  const icons = addIconToInputs(inputNodes)

  const credentialListWrappers = await renderCredentialUi(icons)


  addHoverEffectsToCredentialsDropdown(credentialListWrappers)
  addClickListenerToIcons(icons)

  addCredentialItemClickListener(credentialListWrappers, inputNodes)

  // addClickListenerToIcons(icons)



}, 1200)


function addHoverEffectsToCredentialsDropdown(credentialsWrapper: HTMLDivElement[]) {
  credentialsWrapper.forEach(wrapper => {
    const credentialOverviewDiv = wrapper.querySelector(".sp-cred-detail")

    const allInnerElements = credentialOverviewDiv?.querySelectorAll("*")
    allInnerElements?.forEach(el => {

      const element = el as HTMLElement;

      element.onmouseover = () => {
        element.style.opacity = "0.75"
      }
      element.onmouseout = () => {
        element.style.opacity = "1"
      }
    })

  })
}

// function handleAuthStatusChange(status: AuthStatus) {
//   console.log("Auth status changed:", status);
//   // Update UI or perform actions based on new status
// }

// browser.runtime.onMessage.addListener((message) => {
//   if (message.action === "authStatusChanged") {
//     handleAuthStatusChange(message.status);
//   }
// });
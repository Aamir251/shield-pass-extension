import browser from "webextension-polyfill";
import { addIconToInputs } from "./utils/add-input-icon";
import { renderCredentialUi } from "./utils/credential-ui";
import { addClickListenerToIcons } from "./utils/icon-click-listener";
import { addCredentialItemClickListener } from "./utils/credential-click";



const inputNodes = document.querySelectorAll("input[type='password']");

setTimeout(async () => {

  const icons = addIconToInputs(inputNodes)

  const credentialListWrapper = await renderCredentialUi(icons)


  addCredentialItemClickListener(credentialListWrapper, inputNodes)

  // addClickListenerToIcons(icons)




}, 1200)




// function handleAuthStatusChange(status: AuthStatus) {
//   console.log("Auth status changed:", status);
//   // Update UI or perform actions based on new status
// }

// browser.runtime.onMessage.addListener((message) => {
//   if (message.action === "authStatusChanged") {
//     handleAuthStatusChange(message.status);
//   }
// });
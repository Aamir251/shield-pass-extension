import { addIconToInputs } from "./utils/add-input-icon";
import { renderCredentialUi } from "./utils/credential-ui";
import { addClickListenerToIcons } from "./utils/icon-click-listener";
import { addCredentialItemClickListener } from "./utils/credential-click";
import { addOpenPoupupListener } from "./utils/open-popup-listener";
import browser from "webextension-polyfill";



setTimeout(async () => {
  // addClickListenerToIcons(icons)

  await init();
  
}, 1200);

export async function init() {
  /**
   * Remove existing extension wrappers
  */

  removeExistingWrappers()

  const inputNodes = document.querySelectorAll(
    'input[type="text"], input[type="email"], input[type="password"]'
  );
  const { icons, wrappers } = addIconToInputs(inputNodes);

  setIconWrappersPositions(wrappers, inputNodes);

  const credentialListWrappers = await renderCredentialUi(icons);

  addOpenPoupupListener(credentialListWrappers);

  addClickListenerToIcons(icons);

  addCredentialItemClickListener(credentialListWrappers, inputNodes);


  browser.runtime.onMessage.addListener(async function (request, _sender, _sendResponse) {
    if (request.message === 'TabUpdated') {
      await init();
    }
  })


}


function removeExistingWrappers() {
  const wrappers = document.querySelectorAll("div[sp-main-wrap]")

  wrappers.forEach(wrapper => {
    wrapper.remove()
  })
  
}



function setIconWrappersPositions(
  wrappers: HTMLDivElement[],
  inputs: NodeListOf<Element>
) {
  function setPosition() {

    wrappers.forEach((wrapper, index) => {
      console.log(wrapper.parentNode?.parentNode);
      const { top, left, height, width } =
        inputs[index].getBoundingClientRect();
      wrapper.style.top = `${top + height / 2 + 5}px`;
      wrapper.style.left = `${left + width}px`;
    });
  }

  window.addEventListener("resize", setPosition);

  setPosition();
}

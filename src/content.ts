import { addIconToInputs } from "./utils/add-input-icon";
import { renderCredentialUi } from "./utils/credential-ui";
import { addClickListenerToIcons } from "./utils/icon-click-listener";
import { addCredentialItemClickListener } from "./utils/credential-click";
import { addOpenPoupupListener } from "./utils/open-popup-listener";

const inputNodes = document.querySelectorAll(
  'input[type="text"], input[type="email"], input[type="password"]'
);

setTimeout(async () => {
  // addClickListenerToIcons(icons)

  await init();
}, 1200);

export async function init() {
  const { icons, wrappers } = addIconToInputs(inputNodes);

  setIconWrappersPositions(wrappers, inputNodes);

  const credentialListWrappers = await renderCredentialUi(icons);

  addOpenPoupupListener(credentialListWrappers);

  addHoverEffectsToCredentialsDropdown(credentialListWrappers);
  addClickListenerToIcons(icons);

  addCredentialItemClickListener(credentialListWrappers, inputNodes);
}

function addHoverEffectsToCredentialsDropdown(
  credentialsWrapper: HTMLDivElement[]
) {
  credentialsWrapper.forEach((wrapper) => {
    const credentialOverviewDiv = wrapper.querySelector(".sp-cred-detail");

    const allInnerElements = credentialOverviewDiv?.querySelectorAll("*");
    allInnerElements?.forEach((el) => {
      const element = el as HTMLElement;

      element.onmouseover = () => {
        element.style.opacity = "0.75";
      };
      element.onmouseout = () => {
        element.style.opacity = "1";
      };
    });
  });
}

function setIconWrappersPositions(
  wrappers: HTMLDivElement[],
  inputs: NodeListOf<Element>
) {
  function setPosition() {
    console.log("resized");

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

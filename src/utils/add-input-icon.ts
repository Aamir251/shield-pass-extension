import browser from "webextension-polyfill";
import { baseStyles } from "../styles/base";

import { credentialsStyles } from "../styles/credentials";

export const addIconToInputs = (
  inputNodes: NodeListOf<Element>
): {
  icons: HTMLDivElement[];
  wrappers: HTMLDivElement[];
} => {
  let icons: HTMLDivElement[] = [];
  let wrappers: HTMLDivElement[] = [];

  const basicStyles = new CSSStyleSheet();
  basicStyles.replaceSync(baseStyles);

  const credentialsCss = new CSSStyleSheet();
  credentialsCss.replaceSync(credentialsStyles);

  inputNodes.forEach((_input) => {
    const wrapper = document.createElement("div");
    wrapper.style.position = "absolute";
    wrapper.style.display = "inline-block";
    wrapper.setAttribute("sp-main-wrap", "");

    const shadowRoot = wrapper.attachShadow({ mode: "open" });
    
    shadowRoot.adoptedStyleSheets = [basicStyles, credentialsCss];

    const iconContainer = document.createElement("div");

    iconContainer.classList.add("shield-pass-icon");

    const icon = document.createElement("img");
    icon.src = browser.runtime.getURL("icon/16.png");

    iconContainer.appendChild(icon);
    shadowRoot.appendChild(iconContainer);

    document.body.append(wrapper);

    icons.push(iconContainer);
    wrappers.push(wrapper);
    // wrapper.appendChild(input);
  });

  return {
    icons,
    wrappers,
  };
};

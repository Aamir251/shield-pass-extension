import browser from "webextension-polyfill";

export const addIconToInputs = (
  inputNodes: NodeListOf<Element>
): {
  icons: HTMLDivElement[];
  wrappers: HTMLDivElement[];
} => {
  let icons: HTMLDivElement[] = [];
  let wrappers: HTMLDivElement[] = [];

  inputNodes.forEach((_input) => {
    const wrapper = document.createElement("div");
    wrapper.style.position = "absolute";
    wrapper.style.display = "inline-block";
    wrapper.setAttribute("sp-main-wrap", "");

    const shadowRoot = wrapper.attachShadow({ mode: "open" });

    const iconContainer = document.createElement("div");
    iconContainer.classList.add("shield-pass-icon");
    iconContainer.style.position = "absolute";
    iconContainer.style.right = "5px";
    iconContainer.style.top = "50%";
    iconContainer.style.transform = "translateY(-50%)";
    iconContainer.style.cursor = "pointer";

    const icon = document.createElement("img");
    icon.src = browser.runtime.getURL("icon/16.png");
    icon.style.width = "16px";
    icon.style.height = "16px";

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

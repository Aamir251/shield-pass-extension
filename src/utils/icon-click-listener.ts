export const addClickListenerToIcons = async (icons: HTMLDivElement[]) => {
  icons.forEach((icon) => {
    icon.addEventListener("click", async () => {
      // close other credentials-wrapper dropdown
      icons.forEach((icon) => {
        toggleCredentialWrapperDropdown(icon, "none");
      });

      toggleCredentialWrapperDropdown(icon, "flex");
    });
  });

  /**
   * Hide Document Click Listener to hide the dropdown
   */

  document.addEventListener("click", handleDocumentClick);

  function handleDocumentClick(e: MouseEvent) {
    const target = e.target as HTMLElement;

    if (!target!.hasAttribute("sp-main-wrap")) {
      icons.forEach((icon) => {
        toggleCredentialWrapperDropdown(icon, "none");
      });
    }
  }
};

function toggleCredentialWrapperDropdown(
  icon: HTMLDivElement,
  displayValue: "none" | "block" | "flex"
) {
  const credentialsListDiv = icon.parentNode!.querySelector(
    ".sp-credentials-wrapper"
  ) as HTMLDivElement;

  if (credentialsListDiv) {
    credentialsListDiv.style.display = displayValue;
  }
}

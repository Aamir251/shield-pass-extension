
export const addClickListenerToIcons = async (icons: HTMLDivElement[]) => {
  console.log({ icons })
  icons.forEach(icon => {
    icon.addEventListener("click", async () => {
      const credentialsListDiv = icon.querySelector(".credentials-list") as HTMLDivElement

      console.log("clicked ", credentialsListDiv);

      if (credentialsListDiv) {
        credentialsListDiv.style.display = "block"
      }

      // Call the function when needed

      /**
       * Handle authentication status here
      */



    })
  })
}
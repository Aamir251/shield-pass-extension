
export const disableInputToggle = (inputNode: HTMLInputElement) => {

  const config = { attributes: true };


  const callback = (mutationList: MutationRecord[], observer: MutationObserver) => {
    for (const mutation of mutationList) {
      if (mutation.type === "attributes" && mutation.attributeName === "type") {

        const targetInputNode = mutation.target as HTMLInputElement;

        targetInputNode.type = "password"
        observer.disconnect()

        setTimeout(() => {
          observeAgain(observer, targetInputNode)
        }, 0)
      }
    }
  };


  const observer = new MutationObserver(callback)
  observer.observe(inputNode, config)


  // disable observing if the user clears out the input field

  inputNode.addEventListener("input", () => {
    if (inputNode.value === "")
      observer.disconnect()
  })


  function observeAgain(observer: MutationObserver, targetNode: HTMLInputElement) {

    observer.observe(targetNode, config)
  }

}
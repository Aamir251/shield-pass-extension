import { disableInputToggle } from "./disable-input-toggle";

export const addCredentialItemClickListener = (
  credentialListWrappers: HTMLDivElement[],
  inputNodes: NodeListOf<Element>
) => {
  credentialListWrappers.forEach((credentialListWrapper, index) => {
    const credentialListItems = credentialListWrapper.querySelectorAll("li");

    console.log({ credentialListItems });

    credentialListItems.forEach((item) => {
      // heading click listener
      const heading = item.querySelector(".overview") as HTMLDivElement;
      heading.addEventListener("click", async function () {
        const downArrow = item.querySelector(".sp-down-arrow") as SVGElement;

        const credentialOverviewWrapper = item.querySelector(
          ".sp-cred-detail"
        ) as HTMLDivElement;

        const isPointingDown = getComputedStyle(downArrow).transform === "none";

        /**
         * If isPointingDown is true, it means we need to show the credentialOvervewWrapper,
         * else, we hide it and rotate it back to point upwards
         */

        if (isPointingDown) {
          credentialOverviewWrapper.style.display = "block";
          downArrow.style.transform = "rotateZ(180deg)";
        } else {
          credentialOverviewWrapper.style.display = "none";
          downArrow.style.transform = "none";
        }
      });

      // credential properties click listener;

      const credentialUsernameNode = item.querySelector(
        ".sp-cred-username"
      ) as HTMLParagraphElement | null;
      const credentialEmailNode = item.querySelector(
        ".sp-cred-email"
      ) as HTMLParagraphElement | null;
      const passwordFillButton = item.querySelector(
        ".fill-password-btn"
      ) as HTMLButtonElement;

      if (credentialUsernameNode) {
        console.log("Clicked ", credentialUsernameNode);
        credentialUsernameNode.addEventListener(
          "click",
          handleClick.bind(
            null,
            credentialUsernameNode.innerText,
            inputNodes[index]
          )
        );
      }
      if (credentialEmailNode) {
        console.log("Clicked ", credentialEmailNode);
        credentialEmailNode.addEventListener(
          "click",
          handleClick.bind(
            null,
            credentialEmailNode.innerText,
            inputNodes[index]
          )
        );
      }

      /**
       * if fill password button is clicked for a particular input, we decrypt the password and set the value
       * and start observing it to disable its password toggle feature
       */

      passwordFillButton.addEventListener("click", async () => {
        const pass = await decryptPassword(
          item.getAttribute("sp-pass") as string
        );
        const targetInputNode = inputNodes[index] as HTMLInputElement;
        targetInputNode.type = "password";
        targetInputNode.value = pass;

        disableInputToggle(targetInputNode);
      });
    });
  });
};

function handleClick(value: string, inputNode: Element) {
  inputNode.setAttribute("value", value);
}

// try {
//   const pass = await decryptPassword(item.getAttribute("sp-pass") as string)
//   targetInputNode.value = pass
// } catch (error) {
//   console.log({ error });

// }

// Decrypt the password using Web Crypto API
async function decryptPassword(encryptedPasswordWithKey: string) {
  const [ivHex, encryptedHex, keyHex] = encryptedPasswordWithKey.split(":");

  if (!ivHex || !encryptedHex || !keyHex) {
    throw new Error("Invalid encrypted password format");
  }

  const iv = hexToArrayBuffer(ivHex);
  const encryptedData = hexToArrayBuffer(encryptedHex);
  const keyBuffer = hexToArrayBuffer(keyHex);

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBuffer,
    { name: "AES-CBC" },
    false,
    ["decrypt"]
  );

  try {
    const decryptedBuffer = await crypto.subtle.decrypt(
      { name: "AES-CBC", iv: iv },
      cryptoKey,
      encryptedData
    );
    return new TextDecoder().decode(decryptedBuffer);
  } catch (error) {
    console.error("Decryption failed:", error);
    throw new Error(
      "Decryption failed. Please ensure the key and IV are correct."
    );
  }
}

function hexToArrayBuffer(hex: any) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes.buffer;
}

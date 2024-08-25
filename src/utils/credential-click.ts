export const addCredentialItemClickListener = (credentialWrapper: HTMLDivElement, inputNodes: NodeListOf<Element>) => {

  const credentialListItems = credentialWrapper.querySelectorAll("li")
  credentialListItems.forEach((item, index) => {
    item.addEventListener("click", async function () {
      console.log("clickeddd ", item);

      const targetInputNode = inputNodes[index] as HTMLInputElement

      try {
        const pass = await decryptPassword(item.getAttribute("sp-pass") as string)

        console.log({ pass });
      } catch (error) {
        console.log({ error });

      }

    })
  })

}


// Decrypt the password using Web Crypto API
async function decryptPassword(encryptedPasswordWithKey: string) {
  const [ivHex, encryptedHex, keyHex] = encryptedPasswordWithKey.split(':');

  if (!ivHex || !encryptedHex || !keyHex) {
    throw new Error('Invalid encrypted password format');
  }

  const iv = hexToArrayBuffer(ivHex);
  const encryptedData = hexToArrayBuffer(encryptedHex);
  const keyBuffer = hexToArrayBuffer(keyHex);

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyBuffer,
    { name: 'AES-CBC' },
    false,
    ['decrypt']
  );

  try {
    const decryptedBuffer = await crypto.subtle.decrypt(
      { name: 'AES-CBC', iv: iv },
      cryptoKey,
      encryptedData
    );
    return new TextDecoder().decode(decryptedBuffer);
  } catch (error) {
    console.error('Decryption failed:', error);
    throw new Error('Decryption failed. Please ensure the key and IV are correct.');
  }
}



function hexToArrayBuffer(hex: any) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes.buffer;
}

import { spWrapper } from "../styles/base"
import { Credential, credentialsListUI } from "../ui/credential-list"
import { loginUI } from "../ui/login"
import { getAuthFromBackground } from "./get-auth"
import { getCredentialsSharedWithMe } from "./shared-credentials"

export const renderCredentialUi = async (icons: HTMLDivElement[]) => {
  const isAuthenticated = await getAuthFromBackground()


  let credentials: Credential[] = []

  const credentialListWrapper = document.createElement("div")
  credentialListWrapper.classList.add("sp-credentials-wrapper")


  credentialListWrapper.setAttribute('style', spWrapper);

  if (isAuthenticated === "authorized") {
    credentials = await getCredentialsSharedWithMe()

  }
  if (isAuthenticated === "authorized") {
    credentialListWrapper.innerHTML = credentialsListUI(credentials)

  } else {

    credentialListWrapper.innerHTML = `${loginUI}`
  }


  icons.forEach((icon) => {
    console.log({ icon: icon.parentNode })
    icon.parentNode?.appendChild(credentialListWrapper)
  })


  // document.body.append(credentialListWrapper)
  return credentialListWrapper

}

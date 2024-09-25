import { Credential, credentialsListUI } from "../ui/credential-list";
import { loginUI } from "../ui/login";
import { getAuthFromBackground } from "./get-auth";
import { getCredentialsSharedWithMe } from "./shared-credentials";

export const renderCredentialUi = async (
  icons: HTMLDivElement[]
): Promise<HTMLDivElement[]> => {
  const isAuthenticated = await getAuthFromBackground();

  let credentials: Credential[] = [];

  const credentialListWrapper = document.createElement("div");
  credentialListWrapper.classList.add("sp-credentials-wrapper");

  if (isAuthenticated === "authorized") {
    credentials = await getCredentialsSharedWithMe();
    console.log({ sharedCreds : credentials});
    
    credentialListWrapper.innerHTML = credentialsListUI(credentials);
  } else {
    credentialListWrapper.innerHTML = `${loginUI}`;
  }

  let credentialsListWrapper: HTMLDivElement[] = [];
  icons.forEach((icon) => {
    const wrapperClone = credentialListWrapper.cloneNode(
      true
    ) as HTMLDivElement;

    icon.parentNode?.appendChild(wrapperClone);

    credentialsListWrapper.push(wrapperClone);
  });

  return credentialsListWrapper;
};

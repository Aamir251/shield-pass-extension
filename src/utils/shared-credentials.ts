import { Credential } from "../ui/credential-list"
import { SERVER_URL } from "./constants"

export const getCredentialsSharedWithMe = async () => {

  const existingCredentials = sessionStorage.getItem("sp-shared-cred")

  if (existingCredentials && JSON.parse(existingCredentials).length > 0) {
    return JSON.parse(existingCredentials) as Credential[]
  }

  try {
    const resp = await fetch(`${SERVER_URL}/api/shared-credentials`, {
      credentials: "include"
    })


    // console.log({ resp })
    const data = await resp.json()

    sessionStorage.setItem("sp-shared-cred", JSON.stringify(data.credentials))


    return data.credentials as Credential[]
  } catch (error) {
    console.log({ error });
    return []
  }

}
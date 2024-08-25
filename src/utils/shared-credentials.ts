import { Credential } from "../ui/credential-list"
import { SERVER_URL } from "./constants"

export const getCredentialsSharedWithMe = async () => {
  try {
    const resp = await fetch(`${SERVER_URL}/api/shared-credentials`, {
      credentials: "include"
    })


    // console.log({ resp })
    const data = await resp.json()
    return data.credentials as Credential[]
  } catch (error) {
    console.log({ error });
    return []
  }

}
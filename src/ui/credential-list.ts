import { credentialItemCss } from "../styles/credentials"

export type Credential = {
  id: string
  username?: string
  email?: string
  password?: string
  websiteUrl: string

}


export const credentialsListUI = (credentials: Credential[]): string => {
  const div = document.createElement("div")
  credentials.forEach(cred => {

    const tempDiv = document.createElement("div")
    const li = document.createElement("li")
    li.setAttribute("style", credentialItemCss)
    li.setAttribute("sp-pass", cred.password!)
    li.innerHTML += `
      ${cred.username ? `<h5>${cred.username} </h5>` : ""}
      <p style='margin : 0; padding : 0' >${cred.email}</p>
    `


    tempDiv.append(li)

    div.innerHTML += tempDiv.innerHTML
  })

  return div.innerHTML
}
import { credentialItemCss, fillButtonCss } from "../styles/credentials"
import { DownArrow } from "./arrow"

export type Credential = {
  name: string
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
      <div style="display : flex; justify-content : space-between; align-items : center;">
        <h5 style='margin : 0' >${cred.name ? `${cred.name}` : `${cred.username}` ? `${cred.username}` : `${cred.email}`}</h5>
        <span class='sp-down-arrow' style='display : flex' >${DownArrow}</span>
      </div>

      <div class="sp-cred-detail" style="display : none;" >
        ${cred.username ? `<p style='cursor : pointer; :hover' class='sp-cred-username'>${cred.username}</p>` : ""}
        <p style='cursor : pointer; :hover' class='sp-cred-email'>${cred.email}</p>
        <button style="${fillButtonCss}" class='sp-cred-password'>Fill Password</button>
      </div>
    `


    tempDiv.append(li)

    div.innerHTML += tempDiv.innerHTML

  })

  return div.innerHTML
}
import { DownArrow } from "./arrow";

export type Credential = {
  name: string;
  id: string;
  username?: string;
  email?: string;
  password?: string;
  websiteUrl: string;
};

export const credentialsListUI = (credentials: Credential[]): string => {
  const div = document.createElement("div");
  credentials.forEach((cred) => {
    const tempDiv = document.createElement("div");
    const li = document.createElement("li");
    li.setAttribute("sp-pass", cred.password!);
    li.classList.add("credential-item");
    li.innerHTML += `
      <div class='overview'>
        <h5>${
          cred.name
            ? `${cred.name}`
            : `${cred.username}`
            ? `${cred.username}`
            : `${cred.email}`
        }</h5>
        <span class='sp-down-arrow'>${DownArrow}</span>
      </div>

      <div class="sp-cred-detail">
        ${
          cred.username
            ? `<p  class='sp-cred-username'>${cred.username}</p>`
            : ""
        }
        <p class='sp-cred-email'>${cred.email}</p>
        <button class='fill-password-btn'>Fill Password</button>
      </div>
    `;

    tempDiv.append(li);

    div.innerHTML += tempDiv.innerHTML;
  });

  return div.innerHTML;
};

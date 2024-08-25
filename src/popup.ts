import browser from "webextension-polyfill";

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  const img = document.createElement("img");
  img.src = browser.runtime.getURL("icon/128.png");
  body.appendChild(img);

  const title = document.createElement("h1");
  title.textContent = "My Password Manager";
  body.appendChild(title);

  const description = document.createElement("p");
  description.textContent = "Manage your passwords securely";
  body.appendChild(description);
});

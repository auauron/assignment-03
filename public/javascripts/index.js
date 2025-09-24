import { $ } from "./common.js";
import loginFn from "./login/login.js";
$("#LoginPageBtn").addEventListener("click", () => {
  fetch("./templates/login.html")
    .then((response) => response.text())
    .then((fragments) => ($("#contentContainer").innerHTML = fragments))
    .then(loginFn);
});

$("#SignupPageBtn").addEventListener("click", () => {
  fetch("./templates/signup.html")
    .then((response) => response.text())
    .then((fragments) => ($("#contentContainer").innerHTML = fragments))
    .then(() => import("./login/signup.js").then(m => m.default()));
});

$("#LoginPageBtnHero")?.addEventListener("click", (e) => {
  e.preventDefault();
  $("#LoginPageBtn").click();
});
$("#SignupPageBtnHero")?.addEventListener("click", (e) => {
  e.preventDefault();
  $("#SignupPageBtn").click();
});

// Connections

const registerConfirm = document.querySelector("#registerConfirm");
const nameInp = document.querySelector("#name");
const emailInp = document.querySelector("#email");
const ageInp = document.querySelector("#age");
const passwordInp = document.querySelector("#password");
const passwordConfirmInp = document.querySelector("#passwordConfirm");
const USERS_API = "http://localhost:8000/users";
const loginConfirm = document.querySelector("#loginConfirm");
const logUserInp = document.querySelector("#loginName");
const logPasswordInp = document.querySelector("#loginPassword");

const loginBtn = document.querySelector("#loginBtn");
const registerBtn = document.querySelector("#registerBtn");
const logoutBtn = document.querySelector("#logoutBtn");
const logoutConfirm = document.querySelector("#logoutConfirm");
const welcomeUser = document.querySelector("#welcomeUser");
const welcomeMessage = document.querySelector("#welcomeMessage");
const messageBox = document.querySelector(".messageBox");
// Flags

let isLogged = false;

// Toggle login

function toggleLogin() {
  if (isLogged) {
    isLogged = false;
    registerBtn.classList.remove("hidden");
    loginBtn.classList.remove("hidden");
    logoutBtn.classList.add("hidden");
    welcomeMessage.classList.add("hidden");
  } else {
    isLogged = true;
    registerBtn.classList.add("hidden");
    loginBtn.classList.add("hidden");
    logoutBtn.classList.remove("hidden");
    welcomeMessage.classList.remove("hidden");
  }
}

// Registration
async function registerUser(e) {
  e.preventDefault();
  if (
    !nameInp.value.trim() ||
    !emailInp.value.trim() ||
    !ageInp.value.trim() ||
    !passwordInp.value.trim() ||
    !passwordConfirmInp.value.trim()
  ) {
    showMessage("Some inputs are empty");
    return;
  }

  if (passwordInp.value !== passwordConfirmInp.value) {
    showMessage("Passwords are not correct");
    return;
  }
  if (/\d/.test(nameInp.value)) {
    showMessage("Username should not contain numbers");
    return;
  }

  if (await checkUniqueUserName(nameInp.value)) {
    showMessage("Username already exists!");
    return;
  }

  const userObj = {
    username: nameInp.value,
    email: emailInp.value,
    age: ageInp.value,
    isAdmin: false,
    password: passwordInp.value,
  };
  fetch(USERS_API, {
    method: "POST",
    body: JSON.stringify(userObj),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  nameInp.value = "";
  emailInp.value = "";
  ageInp.value = "";
  passwordInp.value = "";
  passwordConfirmInp.value = "";

  showMessage("Registration successful!");
}

async function checkUniqueUserName(username) {
  let res = await fetch(USERS_API);
  let users = await res.json();
  return users.some((item) => item.username === username);
}

registerConfirm.addEventListener("click", registerUser);

// Login

async function checkUserPassword(username, password) {
  let res = await fetch(USERS_API);
  let users = await res.json();
  const userObj = users.find((item) => item.username === username);
  return userObj.password === password ? true : false;
}

function initStorage() {
  if (!localStorage.getItem("user")) {
    localStorage.setItem("user", "{}");
  }
}

function setUserToStorage(username, isAdmin = false) {
  localStorage.setItem(
    "user",
    JSON.stringify({ user: username, isAdmin: isAdmin })
  );
}

async function loginUser(e) {
  e.preventDefault();

  if (!logUserInp.value.trim() || !logPasswordInp.value.trim()) {
    showMessage("Some inputs are empty");
    return;
  }
  let account = await checkUniqueUserName(logUserInp.value);

  if (!account) {
    showMessage("No account");
    return;
  }
  let logPass = await checkUserPassword(logUserInp.value, logPasswordInp.value);
  if (!logPass) {
    showMessage("Wrong password");
    return;
  }

  let res = await fetch(USERS_API);
  let users = await res.json();
  const userObj = users.find((item) => item.username === logUserInp.value);

  initStorage();
  setUserToStorage(userObj.username, userObj.isAdmin);
  toggleLogin();

  logUserInp.value = "";
  logPasswordInp.value = "";

  showMessage("Success");
}

loginConfirm.addEventListener("click", loginUser);

// Logout

logoutConfirm.addEventListener("click", () => {
  toggleLogin();
  localStorage.removeItem("user");
});

// Welcome User

const userNameData = localStorage.getItem("user");
const user = JSON.parse(userNameData);
const userName = user ? user.user : "";
welcomeUser.textContent = userName ? `Welcome, ${userName}` : "Welcome";

//Messages
function showMessage(message) {
  messageBox.textContent = message;
  messageBox.classList.add("show");
  setTimeout(hideMessage, 2000);
}

function hideMessage() {
  messageBox.classList.remove("show");
}

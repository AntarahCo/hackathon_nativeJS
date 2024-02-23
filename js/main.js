// Connections

//tcfsgahjdbajb !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

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

const PRODUCTS_API = "http://localhost:8000/products";
//!products
const closeBtn = document.querySelector("#close");
const saveBtn = document.querySelector("#save");

saveBtn.addEventListener("click", createProduct);

const titleInp = document.querySelector("#title");
const descInp = document.querySelector("#desc");
const categoryInp = document.querySelector("#category");
const priceInp = document.querySelector("#price");
const imageInp = document.querySelector("#image");

//!
const editBtn = document.querySelector("#edit");
const triggerAdd = document.querySelector("#add");
const modalTitle = document.querySelector(".modal-title");
const searchInp = document.querySelector("#search-inp");

//!modalka
triggerAdd.addEventListener("click", () => {
  titleInp.value = "";
  descInp.value = "";
  categoryInp.value = "";
  priceInp.value = "";
  imageInp.value = "";
  editBtn.style.display = "none";
  saveBtn.style.display = "block";
  modalTitle.innerText = "Add product";
});
//!

//! create
async function createProduct() {
  if (
    !titleInp.value.trim() ||
    !descInp.value.trim() ||
    !categoryInp.value.trim() ||
    !priceInp.value.trim() ||
    !imageInp.value.trim()
  ) {
    alert("some inputs are empty!");
    return;
  }

  const productObj = {
    title: titleInp.value,
    desc: descInp.value,
    category: categoryInp.value,
    price: priceInp.value,
    image: imageInp.value,
  };

  await fetch(PRODUCTS_API, {
    method: "POST",
    body: JSON.stringify(productObj),

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

  titleInp.value = "";
  descInp.value = "";
  categoryInp.value = "";
  priceInp.value = "";
  imageInp.value = "";

  render();

  closeBtn.click();
}

let search = "";
//! read
async function render() {
  let requestAPI = `${PRODUCTS_API}?title_like=${search}`;
  // if (!category) {
  //   requestAPI = `${PRODUCTS_API}?title_like=${search}&_page=${currentPage}&_limit=3`;
  // }
  const res = await fetch(requestAPI);
  const data = await res.json();

  const container = document.querySelector(".container");
  container.innerHTML = "";
  data.forEach((item) => {
    container.innerHTML += `
        <div class="card" style="width: 18rem;">
  <img src=${item.image} class="card-img-top h-50 object-fit-contain" alt="...">
  <div class="card-body">
    <h5 class="card-title">${item.title}</h5>
    <p class="card-text"><b>Description:</b> ${item.desc}</p>
    <p class="card-text"><b>Category:</b> ${item.category}</p>
    <p class="card-text"><b>Price:</b> ${item.price}$</p>
    <a id="${item.id}"class="btn btn-danger delete-btn">Delete</a>
    <a id=${item.id} class="btn btn-success edit-btn" data-bs-toggle="modal"
          data-bs-target="#exampleModal">Edit</a>
  </div>
</div>
    `;
  });
}
render();

// ! delete

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete-btn")) {
    await fetch(`${PRODUCTS_API}/${e.target.id}`, {
      method: "DELETE",
    });
    render();
  }
});

//! edit

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("edit-btn")) {
    const productId = e.target.id;
    const res = await fetch(`${PRODUCTS_API}/${productId}`);
    const product = await res.json();

    titleInp.value = product.title;
    descInp.value = product.desc;
    categoryInp.value = product.category;
    priceInp.value = product.price;
    imageInp.value = product.image;

    editBtn.style.display = "block";
    saveBtn.style.display = "none";
    modalTitle.innerText = "Edit product";
    editBtn.addEventListener("click", async () => {
      const updatedProduct = {
        title: titleInp.value,
        desc: descInp.value,
        category: categoryInp.value,
        price: priceInp.value,
        image: imageInp.value,
      };

      await fetch(`${PRODUCTS_API}/${productId}`, {
        method: "PUT",
        body: JSON.stringify(updatedProduct),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });
      closeBtn.click();
      render();
    });
  }
});
//! search

searchInp.addEventListener("input", () => {
  search = searchInp.value;
  render();
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


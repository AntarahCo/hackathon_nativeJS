// connections
//
const registerBtn = document.querySelector("#registerBtn");
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

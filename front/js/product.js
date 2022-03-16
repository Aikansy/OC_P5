// VARIABLES ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// ID RETRIEVAL CONSTANT
const productId = window.location.search.replace("?id=", "");

// STORAGE VARIABLE
let productData = [];

// SELECTION CONSTANTS
const productImg = document.querySelector(".item__img");
const productTitle = document.getElementById("title");
const productPrice = document.getElementById("price");
const productDescription = document.getElementById("description");
const colorSelector = document.getElementById("colors");
const quantitySelector = document.getElementById("quantity");
const addToCartButton = document.getElementById("addToCart");

quantitySelector.value = "";

// FETCH FUNCTION +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

async function fetchApiProductData() {
  await fetch(`http://localhost:3000/api/products/${productId}`)
    .then((res) => res.json())
    .then((data) => {
      productData = data;
      console.log("+++++ PRODUCT ID:");
      console.log(productId);
      console.log("+++++ PRODUCT DATA ARRAY:");
      console.table(productData);
    });
}

// DISPLAY FUNCTION +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

(async function productDisplay() {
  await fetchApiProductData();

  elementDisplay();
  productColorDisplay();
  addToLocalStorage(productData);
})();

// DISPLAY FUNCTION / ELEMENT DISPLAY FUNCTION ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function elementDisplay() {
  document.title = productData.name;
  productImg.innerHTML = `<img src="${productData.imageUrl}" alt="${productData.altTxt}"></img>`;
  productTitle.innerHTML = productData.name;
  productPrice.innerHTML = productData.price;
  productDescription.innerHTML = productData.description;
}

// DISPLAY FUNCTION / PRODUCT COLOR DISPLAY FUNCTION ++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function productColorDisplay() {
  productData.colors.forEach((productColors) => {
    document.createElement("option");
    let colorOption = document.createElement("option");

    colorOption.value = `${productColors}`;
    colorOption.innerHTML = `${productColors}`;

    colorSelector.appendChild(colorOption);
  });
}

// DISPLAY FUNCTION / ADD TO LOCALSTORAGE FUNCTION +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function addToLocalStorage() {
  addToCartButton.addEventListener("click", () => {
    let storage = JSON.parse(
      localStorage.getItem(`${productData.name} ${colorSelector.value}`)
    );

    const userCart = Object.assign({}, storage, {
      color: `${colorSelector.value}`,
      quantity: `${quantitySelector.value}`,
      imageUrl: productData.imageUrl,
      altTxt: productData.altTxt,
      name: productData.name,
      price: productData.price,
      id: productId,
    });

    addToLocalStorageCondition(
      colorSelector,
      quantitySelector,
      storage,
      userCart
    );
  });
  return (storage = JSON.parse(
    localStorage.getItem(`${productData.name} ${colorSelector.value}`)
  ));
}

// ADD TO LOCALSTORAGE FUNCTION / ADD TO LOCALSTORAGE CONDITION FUNCTION +++++++++++++++++++++++++++++++++++++

function addToLocalStorageCondition(
  colorSelector,
  quantitySelector,
  storage,
  userCart
) {
  if (colorSelector.value == "" || quantitySelector.value == "") {
    alertMessage();
  } else {
    if (storage == null) {
      createLocalStorage(storage, userCart);
    } else {
      modifyLocalStorage(storage, userCart);
    }
  }
}

// ADD TO LOCALSTORAGE FUNCTION / ALERT MESSAGE FUNCTION +++++++++++++++++++++++++++++++++++++++++++++++++++++

function alertMessage() {
  alert(
    "CHAMPS OBLIGATOIRES : \nVeuillez sélectionner une couleur et une quantité."
  );
}

// ADD TO LOCALSTORAGE FUNCTION / CREATE LOCALSTORAGE FUNCTION +++++++++++++++++++++++++++++++++++++++++++++++

function createLocalStorage(storage, userCart) {
  storage = [];
  storage.push(userCart);
  localStorage.setItem(
    `${productData.name} ${colorSelector.value}`,
    JSON.stringify(storage)
  );
  console.log("+++++ LOCAL STORAGE ARRAY: NEW QUANTITY");
  console.table(storage);
}

// ADD TO LOCALSTORAGE FUNCTION / MODIFY LOCALSTORAGE FUNCTION +++++++++++++++++++++++++++++++++++++++++++++++

function modifyLocalStorage(storage, userCart) {
  let getProduct = storage.find(
    (element) => element.id == userCart.id && element.color == userCart.color
  );
  getProduct.quantity = userCart.quantity;
  localStorage.setItem(
    `${productData.name} ${colorSelector.value}`,
    JSON.stringify(storage)
  );
  console.log("+++++ LOCAL STORAGE ARRAY: NEW QUANTITY");
  console.table(storage);
}

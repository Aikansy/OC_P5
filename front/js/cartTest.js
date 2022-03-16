// VARIABLES ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// RETRIEVE PRODUCTS FROM LOCALSTORAGE
let addedProduct = JSON.parse(localStorage.getItem("product"));

// SELECTION VARIABLES
let cart = document.querySelector(".cart");
let cartArticle = document.querySelector("#cart__items");
let cartPrice = document.querySelector(".cart__price");
let cartOrder = document.querySelector(".cart__order");

// CHECK CART FUNCTION ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

(async function checkCart() {
  if (addedProduct) {
    await addedProduct;
    console.log("+++++ LOCAL STORAGE ARRAY:");
    console.table(addedProduct);
    displayCart();
  } else {
    const alertMessage = createAlertMessage();
    appendAlertMessage(alertMessage);
    removeElementFromSection(cart, cartPrice, cartOrder);
  }
})();

// DISPLAY CART FUNCTION ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function displayCart() {
  addedProduct.forEach((product) => {
    console.log(`+++++ PRODUCT DATA:`);
    console.table(product);

    productsDisplay(product);
  });
}

// DISPLAY CART FUNCTION / CARD DISPLAY FUNCTION ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function productsDisplay(product) {
  const cartItem = createCartItem(product);
  const imgDiv = createImgDiv();
  const img = createImage(product);
  const contentDiv = createContentDiv();
  const descriptionDiv = createDescriptionDiv();
  const title = createTitle(product);
  const color = createColor(product);
  const price = createPrice(product);
  const settingsDiv = createSettingsDivs();
  const quantityDiv = createQuantityDiv();
  const quantity = createQuantity();
  const quantityInput = createQuantityInput(product);
  const deleteDiv = createDeleteDiv();
  const deleteQuantity = createDeleteButton();

  contentToSection(
    cartItem,
    imgDiv,
    img,
    contentDiv,
    descriptionDiv,
    title,
    color,
    price,
    settingsDiv,
    quantityDiv,
    quantity,
    quantityInput,
    deleteDiv,
    deleteQuantity
  );
}

// DISPLAY CART FUNCTION / ELEMENT CREATION FUNCTIONS +++++++++++++++++++++++++++++++++++++++++++++++++++++++

function createCartItem(product) {
  let cartItem = document.createElement("article");
  cartItem.classList.add("cart__item");
  cartItem.setAttribute("data-id", product.id);
  cartItem.setAttribute("data-color", product.color);
  return cartItem;
}

function createImgDiv() {
  let imgDiv = document.createElement("div");
  imgDiv.classList.add("cart__item__img");
  return imgDiv;
}

function createImage(product) {
  let image = document.createElement("img");
  image.src = product.imageUrl;
  image.alt = product.altTxt;
  image.style.height = "100%";
  image.style.width = "130%";
  return image;
}

function createContentDiv() {
  let contentDiv = document.createElement("div");
  contentDiv.classList.add("cart__item__content");
  return contentDiv;
}

function createDescriptionDiv() {
  let descriptionDiv = document.createElement("div");
  descriptionDiv.classList.add("cart__item__content__description");
  return descriptionDiv;
}

function createTitle(product) {
  let title = document.createElement("h2");
  title.textContent = product.name;
  return title;
}

function createColor(product) {
  let color = document.createElement("p");
  color.textContent = product.color;
  return color;
}

function createPrice(product) {
  let price = document.createElement("p");
  price.textContent = product.price;
  return price;
}

function createSettingsDivs() {
  let settingsDiv = document.createElement("div");
  settingsDiv.classList.add("cart__item__content__settings");
  return settingsDiv;
}

function createQuantityDiv() {
  let quantityDiv = document.createElement("div");
  quantityDiv.classList.add("cart__item__content__settings__quantity");
  return quantityDiv;
}

function createQuantity() {
  let quantity = document.createElement("p");
  quantity.textContent = "Qté : ";
  return quantity;
}

function createQuantityInput(product) {
  let input = document.createElement("input");
  input.setAttribute("type", "number");
  input.classList.add("itemQuantity");
  input.setAttribute("name", "itemQuantity");
  input.setAttribute("min", "1");
  input.setAttribute("max", "100");
  input.setAttribute("value", product.quantity);
  return input;
}

function createDeleteDiv() {
  let deleteDiv = document.createElement("div");
  deleteDiv.classList.add("cart__item__content__settings__delete");
  return deleteDiv;
}

function createDeleteButton() {
  let deleteBtn = document.createElement("p");
  deleteBtn.classList.add("deleteItem");
  deleteBtn.textContent = "Supprimer";
  return deleteBtn;
}

// CARD DISPLAY FUNCTION / APPENDCHILD FUNCTION +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function contentToSection(
  cartItem,
  imgDiv,
  img,
  contentDiv,
  descriptionDiv,
  title,
  color,
  price,
  settingsDiv,
  quantityDiv,
  quantity,
  quantityInput,
  deleteDiv,
  deleteQuantity
) {
  cartArticle.appendChild(cartItem);
  cartItem.appendChild(imgDiv);
  imgDiv.appendChild(img);
  cartItem.appendChild(contentDiv);
  contentDiv.appendChild(descriptionDiv);
  descriptionDiv.appendChild(title);
  descriptionDiv.appendChild(color);
  descriptionDiv.appendChild(price);
  contentDiv.appendChild(settingsDiv);
  settingsDiv.appendChild(quantityDiv);
  quantityDiv.appendChild(quantity);
  quantityDiv.appendChild(quantityInput);
  settingsDiv.appendChild(deleteDiv);
  deleteDiv.appendChild(deleteQuantity);
}

// CHECK CART FUNCTION / CREATE ALERT MESSAGE FUNCTION ++++++++++++++++++++++++++++++++++++++++++++++++++++++

function createAlertMessage() {
  let alertMessage = document.createElement("h3");
  alertMessage.style.textAlign = "center";
  alertMessage.style.marginBottom = "100px";
  alertMessage.textContent = "Aucun article n'a été ajouté au panier";
  return alertMessage;
}

// CHECK CART FUNCTION / APPENDCHILD ALERT MESSAGE FUNCTION +++++++++++++++++++++++++++++++++++++++++++++++++

function appendAlertMessage(alertMessage) {
  cartArticle.appendChild(alertMessage);
}

// CHECK CART FUNCTION / REMOVE ELEMENT FROM SECTION ++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function removeElementFromSection(cart, cartPrice, cartOrder) {
  cart.removeChild(cartPrice);
  cart.removeChild(cartOrder);
}

// VARIABLES ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// SELECTION CONSTANTS
let cart = document.querySelector(".cart");
let sectionCart = document.getElementById("cart__items");
let cartPrice = document.querySelector(".cart__price");
let cartOrder = document.querySelector(".cart__order");
let deleteButton = document.getElementsByClassName("deleteItem");
let orderButton = document.getElementById("order");

// EMPTY CART FUNCTION ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

(function alertEmptyCart() {
  if (localStorage.length === 0) {
    let emptyCartMessage = createEmptyCartMessage();

    appendEmptyCartElementToSection(emptyCartMessage);
    cart.removeChild(cartPrice);
    cart.removeChild(cartOrder);
  } else {
    console.table(localStorage);
  }
})();

function createEmptyCartMessage() {
  let emptyCartMessage = document.createElement("h3");
  emptyCartMessage.style.textAlign = "center";
  emptyCartMessage.style.marginBottom = "100px";
  emptyCartMessage.textContent = "Aucun article n'a été ajouté au panier";
  return emptyCartMessage;
}

function appendEmptyCartElementToSection(emptyCartMessage) {
  sectionCart.appendChild(emptyCartMessage);
}

// ADD-TO-CART FETCH LOOP +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

(async function automaticFilling() {
  for (let i = 0; i <= localStorage.length; i++) {
    if (localStorage.key(i)) {
      let cartProduct = JSON.parse(localStorage.getItem(localStorage.key(i)));
      let productId = cartProduct[0].id;
      let productColor = cartProduct[0].color;
      let productQuantity = cartProduct[0].quantity;
      let productImage = cartProduct[0].imageUrl;
      let productAltTxt = cartProduct[0].altTxt;
      let productName = cartProduct[0].name;
      let productPrice = cartProduct[0].price;

      console.table(cartProduct);

      cartDisplay(
        productId,
        productColor,
        productQuantity,
        productImage,
        productAltTxt,
        productName,
        productPrice
      );
    }
  }
})();

// CARD DISPLAY FUNCTION ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// CARD DISPLAY FUNCTION
function cartDisplay(
  productId,
  productColor,
  productQuantity,
  productImage,
  productAltTxt,
  productName,
  productPrice
) {
  const cartItem = createCartItem(productId, productColor);
  const imgDiv = createImgDiv();
  const img = createImage(productImage, productAltTxt);
  const contentDiv = createContentDiv();
  const descriptionDiv = createDescriptionDiv();
  const title = createTitle(productName);
  const color = createColor(productColor);
  const price = createPrice(productPrice);
  const settingsDiv = createSettingsDivs();
  const quantityDiv = createQuantityDiv();
  const quantity = createQuantity();
  const quantityInput = createQuantityInput(productQuantity);
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

// ELEMENT CREATION FUNCTIONS FOR CARD DISPLAY FUNCTION +++++++++++++++++++++++++++++++++++++++++++++++++++++

function createCartItem(productId, productColor) {
  let cartItem = document.createElement("article");
  cartItem.classList.add("cart__item");
  cartItem.setAttribute("data-id", productId);
  cartItem.setAttribute("data-color", productColor);
  return cartItem;
}

function createImgDiv() {
  let imgDiv = document.createElement("div");
  imgDiv.classList.add("cart__item__img");
  return imgDiv;
}

function createImage(productImage, productAltTxt) {
  let image = document.createElement("img");
  image.src = productImage;
  image.alt = productAltTxt;
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

function createTitle(productName) {
  let title = document.createElement("h2");
  title.textContent = productName;
  return title;
}

function createColor(productColor) {
  let color = document.createElement("p");
  color.textContent = productColor;
  return color;
}

function createPrice(productPrice) {
  let price = document.createElement("p");
  price.textContent = productPrice;
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

function createQuantityInput(productQuantity) {
  let input = document.createElement("input");
  input.setAttribute("type", "number");
  input.classList.add("itemQuantity");
  input.setAttribute("name", "itemQuantity");
  input.setAttribute("min", "1");
  input.setAttribute("max", "100");
  input.setAttribute("value", productQuantity);
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

// APPENDCHILD FUNCTION FOR CARD DISPLAY FUNCTION +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

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
  let cartArticle = document.querySelector("#cart__items");

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

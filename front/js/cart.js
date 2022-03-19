// VARIABLES +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// RETRIEVE PRODUCTS FROM LOCALSTORAGE
let storage = JSON.parse(localStorage.getItem("kanap"));

// SELECTION CONSTANTS
let cart = document.querySelector(".cart");
let cartItems = document.querySelector("#cart__items");
let cartItem = document.querySelectorAll(".cart__item");
let cartPrice = document.querySelector(".cart__price");
let cartOrder = document.querySelector(".cart__order");

// CALCULATION VARIABLES
let quantity = 0;
let totalCartPrice = [];
let totalCartQuantity = [];

// DISPLAY FUNCTIONS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

(async function checkCart() {
  if (storage == null) {
    undisplayCart();
  } else {
    displayCart();
  }
})();

function undisplayCart() {
  const emptyCartMessage = createEmptyCartMessage();
  appendEmptyCartMessage(emptyCartMessage);
  removeElement(cart, cartPrice, cartOrder);
}

function displayCart() {
  console.table(storage);

  storage.forEach((product) => {
    createCartItem(product);
    createImgDiv();
    createImage(product);
    createContentDiv();
    createDescriptionDiv();
    createName(product);
    createColor(product);
    createPrice(product);
    createSettingsDivs();
    createQuantityDiv();
    createQuantityTag();
    createQuantityInput(product);
    createDeleteDiv();
    createDeleteButton();

    appendElement(product);
  });
  cartFunctionality();
  calculation();
}

// ALL CREATE & REMOVE ELEMENT FUNCTIONS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function createEmptyCartMessage() {
  const message = document.createElement("h3");
  message.style.textAlign = "center";
  message.style.marginBottom = "100px";
  message.textContent = "Aucun article n'a été ajouté au panier";
  return message;
}

function createCartItem(product) {
  const cartItem = document.createElement("article");
  cartItem.classList.add("cart__item");
  cartItem.setAttribute("data-id", product._id);
  cartItem.setAttribute("data-color", product.color);
  return cartItem;
}

function createImgDiv() {
  const imgDiv = document.createElement("div");
  imgDiv.classList.add("cart__item__img");
  return imgDiv;
}

function createImage(product) {
  const image = document.createElement("img");
  image.src = product.imageUrl;
  image.alt = product.altTxt;
  image.style.height = "100%";
  image.style.width = "130%";
  return image;
}

function createContentDiv() {
  const contentDiv = document.createElement("div");
  contentDiv.classList.add("cart__item__content");
  return contentDiv;
}

function createDescriptionDiv() {
  const descriptionDiv = document.createElement("div");
  descriptionDiv.classList.add("cart__item__content__description");
  return descriptionDiv;
}

function createName(product) {
  const name = document.createElement("h2");
  name.textContent = product.name;
  return name;
}

function createColor(product) {
  const color = document.createElement("p");
  color.textContent = product.color;
  return color;
}

function createPrice(product) {
  const price = document.createElement("p");
  price.textContent = `${product.price} €`;
  return price;
}

function createSettingsDivs() {
  const settingsDiv = document.createElement("div");
  settingsDiv.classList.add("cart__item__content__settings");
  return settingsDiv;
}

function createQuantityDiv() {
  const quantityDiv = document.createElement("div");
  quantityDiv.classList.add("cart__item__content__settings__quantity");
  return quantityDiv;
}

function createQuantityTag() {
  const quantityTag = document.createElement("p");
  quantityTag.textContent = "Qté : ";
  return quantityTag;
}

function createQuantityInput(product) {
  const quantityInput = document.createElement("input");
  quantityInput.setAttribute("type", "number");
  quantityInput.classList.add("itemQuantity");
  quantityInput.setAttribute("name", "itemQuantity");
  quantityInput.setAttribute("min", "1");
  quantityInput.setAttribute("max", "100");
  quantityInput.setAttribute("value", product.quantity);
  return quantityInput;
}

function createDeleteDiv() {
  const deleteDiv = document.createElement("div");
  deleteDiv.classList.add("cart__item__content__settings__delete");
  return deleteDiv;
}

function createDeleteButton() {
  const deleteButton = document.createElement("p");
  deleteButton.classList.add("deleteItem");
  deleteButton.textContent = "Supprimer";
  return deleteButton;
}

function removeElement(cart, cartPrice, cartOrder) {
  cart.removeChild(cartPrice);
  cart.removeChild(cartOrder);
}

// ALL APPEND FUNCTIONS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function appendEmptyCartMessage(emptyCartMessage) {
  cartItems.appendChild(emptyCartMessage);
}

function appendElement(product) {
  const elementCartItem = createCartItem(product);
  const elementImgDiv = createImgDiv();
  const elementImg = createImage(product);
  const elementContentDiv = createContentDiv();
  const elementDescriptionDiv = createDescriptionDiv();
  const elementName = createName(product);
  const elementColor = createColor(product);
  const elementPrice = createPrice(product);
  const elementSettingsDiv = createSettingsDivs();
  const elementQuantityDiv = createQuantityDiv();
  const elementQuantity = createQuantityTag();
  const elementQuantityInput = createQuantityInput(product);
  const elementDeleteDiv = createDeleteDiv();
  const elementDeleteQuantity = createDeleteButton();

  cartItems.appendChild(elementCartItem);
  elementCartItem.appendChild(elementImgDiv);
  elementImgDiv.appendChild(elementImg);
  elementCartItem.appendChild(elementContentDiv);
  elementContentDiv.appendChild(elementDescriptionDiv);
  elementDescriptionDiv.appendChild(elementName);
  elementDescriptionDiv.appendChild(elementColor);
  elementDescriptionDiv.appendChild(elementPrice);
  elementContentDiv.appendChild(elementSettingsDiv);
  elementSettingsDiv.appendChild(elementQuantityDiv);
  elementQuantityDiv.appendChild(elementQuantity);
  elementQuantityDiv.appendChild(elementQuantityInput);
  elementSettingsDiv.appendChild(elementDeleteDiv);
  elementDeleteDiv.appendChild(elementDeleteQuantity);
}

// DELETE FUNCTIONALITY ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function cartFunctionality() {
  let cardContainer = document.querySelector("#cart__items");
  let productCard = document.querySelectorAll(".cart__item");
  let allDeleteButton = document.querySelectorAll(".deleteItem");
  let AllQuantityInput = document.querySelectorAll(".itemQuantity");

  quantityModifier(productCard, AllQuantityInput);
  deleteProduct(cardContainer, productCard, allDeleteButton);
}

function deleteProduct(cardContainer, productCard, allDeleteButton) {
  for (let i = 0; i < productCard.length; i++) {
    let deleteButton = allDeleteButton[i];

    deleteButton.addEventListener("click", () => {
      if (storage.length == 1) {
        return (
          cardContainer.removeChild(productCard[i]),
          localStorage.removeItem("kanap"),
          undisplayCart()
        );
      } else {
        remainingProduct = storage.filter((element) => {
          if (
            productCard[i].dataset.id != element._id ||
            productCard[i].dataset.color != element.color
          ) {
            return true;
          }
        });
        console.table(remainingProduct);
        storage = remainingProduct;
        cardContainer.removeChild(productCard[i]);
        localStorage.setItem("kanap", JSON.stringify(storage));
        storage = JSON.parse(localStorage.getItem("kanap"));
        calculation();
      }
    });
  }
  return;
}

function quantityModifier(productCard, AllQuantityInput) {
  for (let i = 0; i < storage.length; i++) {
    let quantityInput = AllQuantityInput[i];

    quantityInput.addEventListener("change", () => {
      if (
        storage[i]._id == productCard[i].dataset.id &&
        storage[i].color == productCard[i].dataset.color
      ) {
        return (
          (storage[i].quantity = quantityInput.value),
          localStorage.setItem("kanap", JSON.stringify(storage)),
          ((storage = JSON.parse(localStorage.getItem("kanap"))),
          console.table(storage[i]),
          calculation())
        );
      }
    });
  }
  return;
}

function calculation() {
  let totaltPriceArray = [];
  let totalQuantityArray = [];
  let totalQuantity = document.querySelector("#totalQuantity");
  let totalPrice = document.querySelector("#totalPrice");

  for (let i = 0; i < storage.length; i++) {
    let totalPerProduct = storage[i].price * storage[i].quantity;
    let totalQuantityPerProduct = storage[i].quantity;
    let stringToNumber = parseInt(totalQuantityPerProduct);
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    totaltPriceArray.push(totalPerProduct);
    totalQuantityArray.push(stringToNumber);

    totalCartPrice = totaltPriceArray.reduce(reducer);
    totalCartQuantity = totalQuantityArray.reduce(reducer);

    console.log(totalCartPrice);
    console.log(totalCartQuantity);

    totalQuantity.textContent = totalCartQuantity;
    totalPrice.textContent = totalCartPrice;
  }
}

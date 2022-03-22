// ********************************************************************************************* VARIABLE(S)

// Fetch products from local storage
const storage = JSON.parse(localStorage.getItem("products"));

// HTML tag selection constant(s)
const cart = document.getElementsByClassName("cart");
const cartItems = document.getElementById("cart__items");
const cartPrice = document.getElementsByClassName(".cart__price");
const cartOrder = document.getElementsByClassName("cart__order");
const orderButton = document.getElementById("order");

// ******************************************************************************************* CORE FUNCTION

// Automatically applies major function(s)
(async function coreFunction() {
  if (storage == null) {
    emptyCartDisplay();
    alertEmptyOrderFeature();
  } else {
    for (let product of storage) {
      const res = await fetch(
        `http://localhost:3000/api/products/${product._id}`
      );
      let response = await res.json();

      const cartItem = createCartItem(product);
      const imageDiv = createImgDiv();
      const image = createImage(response);
      const contentDiv = createContentDiv();
      const descriptionDiv = createDescriptionDiv();
      const name = createName(response);
      const color = createColor(product);
      const price = createPrice(response);
      const settingsDiv = createSettingsDivs();
      const quantityDiv = createQuantityDiv();
      const quantity = createQuantityTag();
      const quantityInput = createQuantityInput(product);
      const deleteDiv = createDeleteDiv();
      const deleteButton = createDeleteButton();

      appendElement(
        cartItem,
        imageDiv,
        image,
        contentDiv,
        descriptionDiv,
        name,
        color,
        price,
        settingsDiv,
        quantityDiv,
        quantity,
        quantityInput,
        deleteDiv,
        deleteButton
      );

      deleteFeature(response, deleteButton, cartItem, product);
      quantityFeature(quantityInput, product);
      await totalFeature();
    }
    orderFeature();
  }
})();

// ************************************************************************* DISPLAY / UNDISPLAY FUNCTION(S)

// Displays message in HTML in case of empty cart
function emptyCartDisplay() {
  const emptyCartMessage = createEmptyCartMessage();
  appendEmptyCartMessage(emptyCartMessage);
}

// ********************************************************************  CREATE / REMOVE ELEMENT FUNCTION(S)

// Creates message tag, attribute(s) and content in case of empty cart
function createEmptyCartMessage() {
  const message = document.createElement("h3");
  message.style.textAlign = "center";
  message.style.marginBottom = "100px";
  message.textContent = "Aucun article n'a été ajouté au panier";
  return message;
}

// Creates product article tag and attribute(s)
function createCartItem(product) {
  const item = document.createElement("article");
  item.classList.add("cart__item");
  item.setAttribute("data-id", product._id);
  item.setAttribute("data-color", product.color);
  return item;
}

// Creates product image div tag and attribute(s)
function createImgDiv() {
  const imgDiv = document.createElement("div");
  imgDiv.classList.add("cart__item__img");
  return imgDiv;
}

// Creates product image tag, attribute(s) and style
function createImage(response) {
  const image = document.createElement("img");
  image.src = response.imageUrl;
  image.alt = response.altTxt;
  image.style.height = "100%";
  image.style.width = "130%";
  return image;
}

// Creates product content div tag and attribute(s)
function createContentDiv() {
  const contentDiv = document.createElement("div");
  contentDiv.classList.add("cart__item__content");
  return contentDiv;
}

// Creates product description div tag and attribute(s)
function createDescriptionDiv() {
  const descriptionDiv = document.createElement("div");
  descriptionDiv.classList.add("cart__item__content__description");
  return descriptionDiv;
}

// creates product title tag and content
function createName(response) {
  const name = document.createElement("h2");
  name.textContent = response.name;
  return name;
}

// Creates product color tag and content
function createColor(product) {
  const color = document.createElement("p");
  color.textContent = product.color;
  return color;
}

// Creates product price tag and content
function createPrice(response) {
  const price = document.createElement("p");
  price.textContent = `${response.price} €`;
  return price;
}

// Creates product settings div tag and attribute(s)
function createSettingsDivs() {
  const settingsDiv = document.createElement("div");
  settingsDiv.classList.add("cart__item__content__settings");
  return settingsDiv;
}

// Creates product quantity div tag and attribute(s)
function createQuantityDiv() {
  const quantityDiv = document.createElement("div");
  quantityDiv.classList.add("cart__item__content__settings__quantity");
  return quantityDiv;
}

// Creates product quantity content tag and content
function createQuantityTag() {
  const quantityTag = document.createElement("p");
  quantityTag.textContent = "Qté : ";
  return quantityTag;
}

// Creates product quantity input tag and attribute(s)
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

// Creates delete div tag and attribute(s)
function createDeleteDiv() {
  const deleteDiv = document.createElement("div");
  deleteDiv.classList.add("cart__item__content__settings__delete");
  return deleteDiv;
}

// Creates delete button tag, attribute(s) and content
function createDeleteButton() {
  const deleteButton = document.createElement("p");
  deleteButton.classList.add("deleteItem");
  deleteButton.textContent = "Supprimer";
  return deleteButton;
}

// ************************************************************************************** APPEND FUNCTION(S)

// Places empty cart message tag in HTML
function appendEmptyCartMessage(emptyCartMessage) {
  cartItems.appendChild(emptyCartMessage);
}

// Places product element tags in HTML
function appendElement(
  cartItem,
  imageDiv,
  image,
  contentDiv,
  descriptionDiv,
  name,
  color,
  price,
  settingsDiv,
  quantityDiv,
  quantity,
  quantityInput,
  deleteDiv,
  deleteButton
) {
  cartItems.appendChild(cartItem);
  cartItem.appendChild(imageDiv);
  imageDiv.appendChild(image);
  cartItem.appendChild(contentDiv);
  contentDiv.appendChild(descriptionDiv);
  descriptionDiv.appendChild(name);
  descriptionDiv.appendChild(color);
  descriptionDiv.appendChild(price);
  contentDiv.appendChild(settingsDiv);
  settingsDiv.appendChild(quantityDiv);
  quantityDiv.appendChild(quantity);
  quantityDiv.appendChild(quantityInput);
  settingsDiv.appendChild(deleteDiv);
  deleteDiv.appendChild(deleteButton);
}

// ****************************************************************************************** FETCH FUNCTION

// Fetches data by id
async function fetchData(id) {
  let url = `http://localhost:3000/api/products/${id}`;
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

// ************************************************************************************* FEATURES FUNCTION(S)

// Displays an alert message in the event of an attempted order without a product in the basket
async function alertEmptyOrderFeature() {
  orderButton.addEventListener("click", (e) => {
    e.preventDefault();

    if (storage == null) {
      alert(
        "\n\nCommande impossible.\n\nAucun produit n'a été ajouté au panier"
      );
    }
  });
}

// Updates the quantity of a specific product in the cart
function quantityFeature(quantityInput, product) {
  quantityInput.addEventListener("change", async () => {
    const storage = JSON.parse(localStorage.getItem("products"));
    const modifyProduct = storage.find(
      (element) => element._id == product._id && element.color == product.color
    );
    modifyProduct.quantity = Number(quantityInput.value);
    localStorage.setItem("products", JSON.stringify(storage));
    await totalFeature();
  });
}

// Removes a specific product from the cart on the page and in the localstorage
function deleteFeature(response, deleteButton, cartItem, product) {
  deleteButton.addEventListener("click", async () => {
    const storage = JSON.parse(localStorage.getItem("products"));

    if (confirm(`Supprimer ${response.name} de votre panier ?`)) {
      if (storage.length == 1) {
        return (
          cartItems.removeChild(cartItem),
          localStorage.removeItem("products"),
          undisplayCart()
        );
      } else {
        remainingProducts = storage.filter((element) => {
          if (element._id != product._id || element.color != product.color) {
            return true;
          }
        });
        localStorage.setItem("products", JSON.stringify(remainingProducts));
        cartItems.removeChild(cartItem);
        await totalFeature();
      }
    }
  });
}

// Updates the total amount and quantity of the cart
async function totalFeature() {
  const storage = JSON.parse(localStorage.getItem("products"));

  let quantity = 0;
  let total = 0;

  for (let product of storage) {
    let data = await fetchData(product._id);
    quantity += Number(product.quantity);
    total += Number(product.quantity) * Number(data.price);
  }

  document.getElementById("totalPrice").textContent = total;
  document.getElementById("totalQuantity").textContent = quantity;
}

// Sends the data of the cart products as well as the order form data in the localstorage
async function orderFeature() {
  orderButton.addEventListener("click", (e) => {
    e.preventDefault();

    if (regexValidity() === true && storage != null) {
      const storage = JSON.parse(localStorage.getItem("products"));
      let productIds = [];

      for (let product of storage) productIds.push(product._id);
      const request = {
        contact: {
          firstName: document.getElementById("firstName").value,
          lastName: document.getElementById("lastName").value,
          address: document.getElementById("address").value,
          city: document.getElementById("city").value,
          email: document.getElementById("email").value,
        },
        products: productIds,
      };

      const options = {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      fetchOrderIdFeature(options);
    }
  });
}

// Looks for and retrieves the order id
function fetchOrderIdFeature(options) {
  fetch("http://localhost:3000/api/products/order", options)
    .then((response) => response.json())
    .then((data) => {
      if (data.orderId == null || data.orderId == undefined) {
        alert(
          "\n\nUne erreur est survenue lors de la commande. Veuillez contacter le service support à l'adresse support@name.com"
        );
      } else {
        document.location.href = "confirmation.html?" + data.orderId;
      }
    })
    .catch((err) => console.log(err));
}

// **************************************************************************************** REGEX FUNCTION(S)

// Checks the validity of the informations entered in the order form
function regexValidity() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const email = document.getElementById("email").value;

  const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
  const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
  const addressErrorMsg = document.getElementById("addressErrorMsg");
  const cityErrorMsg = document.getElementById("cityErrorMsg");
  const emailErrorMsg = document.getElementById("emailErrorMsg");

  let validRegex = false;

  if (/^[A-Za-z'-]{2,30}$/.test(firstName)) {
    firstNameErrorMsg.textContent = "";
    validRegex = true;
  } else {
    firstNameErrorMsg.textContent = `Champ invalide. Caractères acceptés : lettres et - ' (Nombre de caractères acceptés : min: 2, max: 30)`;
    validRegex = false;
    errorMsgStyle(firstNameErrorMsg);
  }

  if (/^[A-Za-z'-]{2,30}$/.test(lastName)) {
    validRegex = true;
    lastNameErrorMsg.textContent = "";
  } else {
    lastNameErrorMsg.textContent = `Champ invalide. Caractères acceptés : lettres et - ' (Nombre de caractères acceptés : min: 2, max: 30)`;
    validRegex = false;
    errorMsgStyle(lastNameErrorMsg);
  }

  if (/^[A-Za-z0-9,/#'-)(]{2,100}/.test(address)) {
    addressErrorMsg.textContent = "";
    validRegex = true;
  } else {
    addressErrorMsg.textContent = `Champ invalide. Caractères acceptés : lettres, chiffres, espace et - , ' / # ( ) (Nombre de caractères acceptés : min: 2, max: 100)`;
    validRegex = false;
    errorMsgStyle(addressErrorMsg);
  }

  if (/^[A-Za-z0-9,/#'-)(]{2,50}/.test(city)) {
    cityErrorMsg.textContent = "";
    validRegex = true;
  } else {
    cityErrorMsg.textContent = `Champ invalide. Caractères acceptés : lettres, chiffres, espace et - , ' / # ( ) (Nombre de caractères acceptés : min: 2, max: 50)`;
    validRegex = false;
    errorMsgStyle(cityErrorMsg);
  }

  if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    emailErrorMsg.textContent = "";
    validRegex = true;
  } else {
    emailErrorMsg.textContent = `Champ invalide. Addresse de type john@doe.com`;
    validRegex = false;
    errorMsgStyle(emailErrorMsg);
  }
  return validRegex;
}

// Factors a specific style for HTML tags
function errorMsgStyle(value) {
  value.style.color = "white";
  value.style.fontWeight = "bold";
}

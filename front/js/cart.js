// ********************************************************************************************* VARIABLE(S)

// Fetch products from local storage
const storage = JSON.parse(localStorage.getItem("products"));

// HTML tag selection/naigation constant(s)
const cart = document.querySelector(".cart");
const cartItems = document.getElementById("cart__items");
const cartPrice = document.querySelector(".cart__price");
const cartOrder = document.querySelector(".cart__order");
const orderButton = document.getElementById("order");

// ******************************************************************************************* CORE FUNCTION

// Automatically applies major function(s)
(async function coreFunction() {
  if (storage == null) {
    // If storage is empty
    emptyCartMessageDisplay(); // Calls the display function of the message "Cart empty"
    priceAndOrderUndisplay(); // Undisplays price and order tag
  } else {
    for (let product of storage) {
      // For each element in storage
      const res = await fetch(
        // Fetch request (ID), awaiting response
        `http://localhost:3000/api/products/${product._id}`
      );
      let response = await res.json(); // Delcares let as response retrieval .json

      // Declares each const as modification provided by their respective fonctions
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

      // Injects the created elements (constants) in the HTML
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

      deleteFeature(response, deleteButton, cartItem, product); // Calls the delete function
      quantityFeature(quantityInput, product); // Calls the quantity modification function
      await totalFeature(); // Waiis for the update totals function
    }
    order(); // Calls order function
  }
})();

// ************************************************************************* DISPLAY / UNDISPLAY FUNCTION(S)

// Displays message in HTML in case of empty cart
function emptyCartMessageDisplay() {
  const emptyCartMessage = createEmptyCartMessage(); // Declares const as modification provided by fonction
  appendEmptyCartMessage(emptyCartMessage); // Injetcs the created element (constant) in the HTML
}

// ***********************************************************  CREATE / REMOVE / MODIFY ELEMENT FUNCTION(S)

// Creates message tag, attribute(s) and content in case of empty cart
function createEmptyCartMessage() {
  const message = document.createElement("h3"); // Declares const as a creation of an HTML element "h3"
  message.style.textAlign = "center"; // Defines style
  message.style.marginBottom = "100px"; // Defines style
  message.textContent = "Aucun article n'a été ajouté au panier"; // Defines content
  return message; // Ends the func and returns the value
}

// Removes price tag and order tag
function priceAndOrderUndisplay() {
  cart.removeChild(cartPrice); // Removes cart__price node from cart
  cart.removeChild(cartOrder); // Removes cart__order node from cart
}

// Creates product article tag and attribute(s)
function createCartItem(product) {
  const item = document.createElement("article"); // Declares const as a creation of an HTML element "article"
  item.classList.add("cart__item"); // Adds class attribute and class name
  item.setAttribute("data-id", product._id); // Defines alt attribute and content
  item.setAttribute("data-color", product.color); // Defines alt attribute and content
  return item; // Ends the func and returns the value
}

// Creates product image div tag and attribute(s)
function createImgDiv() {
  const imgDiv = document.createElement("div"); // Declares const as a creation of an HTML element "div"
  imgDiv.classList.add("cart__item__img"); // Adds class attribute and class name
  return imgDiv; // Ends the func and returns the value
}

// Creates product image tag, attribute(s) and style
function createImage(response) {
  const image = document.createElement("img"); // Declares const as a creation of an HTML element "img"
  image.src = response.imageUrl; // Defines src attribute and content
  image.alt = response.altTxt; // Defines alt attribute and content
  image.style.height = "100%"; // Defines style
  image.style.width = "130%"; // Defines style
  return image; // Ends the func and returns the value
}

// Creates product content div tag and attribute(s)
function createContentDiv() {
  const contentDiv = document.createElement("div"); // Declares const as a creation of an HTML element "div"
  contentDiv.classList.add("cart__item__content"); // Adds class attribute and class name
  return contentDiv; // Ends the func and returns the value
}

// Creates product description div tag and attribute(s)
function createDescriptionDiv() {
  const descriptionDiv = document.createElement("div"); // Declares const as a creation of an HTML element "div"
  descriptionDiv.classList.add("cart__item__content__description"); // Adds class attribute and class name
  return descriptionDiv; // Ends the func and returns the value
}

// creates product title tag and content
function createName(response) {
  const name = document.createElement("h2"); // Declares const as a creation of an HTML element "h2"
  name.textContent = response.name; // Defines content
  return name; // Ends the func and returns the value
}

// Creates product color tag and content
function createColor(product) {
  const color = document.createElement("p"); // Declares const as a creation of an HTML element "p"
  color.textContent = product.color; // Defines content
  return color; // Ends the func and returns the value
}

// Creates product price tag and content
function createPrice(response) {
  const price = document.createElement("p"); // Declares const as a creation of an HTML element "p"
  price.textContent = `${response.price} €`; // Defines content
  return price; // Ends the func and returns the value
}

// Creates product settings div tag and attribute(s)
function createSettingsDivs() {
  const settingsDiv = document.createElement("div"); // Declares const as a creation of an HTML element "div"
  settingsDiv.classList.add("cart__item__content__settings"); // Adds class attribute and class name
  return settingsDiv; // Ends the func and returns the value
}

// Creates product quantity div tag and attribute(s)
function createQuantityDiv() {
  const quantityDiv = document.createElement("div"); // Declares const as a creation of an HTML element "div"
  quantityDiv.classList.add("cart__item__content__settings__quantity"); // Adds class attribute and class name
  return quantityDiv; // Ends the func and returns the value
}

// Creates product quantity content tag and content
function createQuantityTag() {
  const quantityTag = document.createElement("p"); // Declares const as a creation of an HTML element "p"
  quantityTag.textContent = "Qté : "; // Defines content
  return quantityTag; // Ends the func and returns the value
}

// Creates product quantity input tag and attribute(s)
function createQuantityInput(product) {
  const quantityInput = document.createElement("input"); // Declares const as a creation of an HTML element "input"
  quantityInput.classList.add("itemQuantity"); // Adds class attribute and class name
  quantityInput.setAttribute("type", "number"); // Defines type attribute and content
  quantityInput.setAttribute("name", "itemQuantity"); // Defines name attribute and content
  quantityInput.setAttribute("min", "1"); // Defines min attribute and content
  quantityInput.setAttribute("max", "100"); // Defines max attribute and content
  quantityInput.setAttribute("value", product.quantity); // Defines value attribute and content
  return quantityInput; // Ends the func and returns the value
}

// Creates delete div tag and attribute(s)
function createDeleteDiv() {
  const deleteDiv = document.createElement("div"); // Declares const as a creation of an HTML element "div"
  deleteDiv.classList.add("cart__item__content__settings__delete"); // Adds class attribute and class name
  return deleteDiv; // Ends the func and returns the value
}

// Creates delete button tag, attribute(s) and content
function createDeleteButton() {
  const deleteButton = document.createElement("p"); // Declares const as a creation of an HTML element "p"
  deleteButton.classList.add("deleteItem"); // Adds class attribute and class name
  deleteButton.textContent = "Supprimer"; // Defines content
  return deleteButton; // Ends the func and returns the value
}

// ************************************************************************************** APPEND FUNCTION(S)

// Places empty cart message tag in HTML
function appendEmptyCartMessage(emptyCartMessage) {
  cartItems.appendChild(emptyCartMessage); // Adds emptyCartMessage node to section
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
  let url = `http://localhost:3000/api/products/${id}`; // Declares const as an url
  try {
    let res = await fetch(url); // Declares let as fetch request (ID), awaiting response
    return await res.json(); // Waits for response .json, then return the value
  } catch (error) {
    // If the initial promise is rejected => console.log(error)
    console.log(error);
  }
}

// ************************************************************************************* FEATURES FUNCTION(S)

// Updates the quantity of a specific product in the cart
function quantityFeature(quantityInput, product) {
  quantityInput.addEventListener("change", async () => {
    // Event listener on quantity input
    const storage = JSON.parse(localStorage.getItem("products")); // Declares const as get item from localStorage
    const modifyProduct = storage.find(
      // Declares const as a find function in localStorage
      (element) => element._id == product._id && element.color == product.color // Conditions
    );
    modifyProduct.quantity = Number(quantityInput.value); // Updates quantity value of this product
    localStorage.setItem("products", JSON.stringify(storage)); // Updates the entry
    await totalFeature(); // Waiis for the update totals function
  });
}

// Removes a specific product from the cart on the page and in the localstorage
function deleteFeature(response, deleteButton, cartItem, product) {
  deleteButton.addEventListener("click", async () => {
    // Event listener on delete button
    const storage = JSON.parse(localStorage.getItem("products")); // Declares const as get item from localStorage

    if (confirm(`Supprimer ${response.name} de votre panier ?`)) {
      // If confirmation from the user
      if (storage.length == 1) {
        // If only one product is left in storage
        cartItems.removeChild(cartItem); // Removes this article from section
        localStorage.removeItem("products"); // Removes product from localStorage
        emptyCartMessageDisplay(); // Calls the display function of the message "Cart empty"
      } else {
        remainingProducts = storage.filter((element) => {
          // Declares const as a filter function in localStorage
          if (element._id != product._id || element.color != product.color) {
            // Conditions
            return true;
          }
        });
        localStorage.setItem("products", JSON.stringify(remainingProducts)); // Updates LocalStorage
        cartItems.removeChild(cartItem); // Removes this article from section
      }
    }
    await totalFeature(); // Waiis for the update totals function
  });
}

// Updates the total amount and quantity of the cart
async function totalFeature() {
  const storage = JSON.parse(localStorage.getItem("products")); // Declares const as get item from localStorage

  let totalQuantityValue = 0; // Declares let as a number type, value = 0
  let totalPriceValue = 0; // Declares let as a number type, value = 0

  if (storage == null) {
    // If empty storage
    totalQuantityValue = 0; // Redefined value
    totalPriceValue = 0; // Redefined value
    priceAndOrderUndisplay(); // Undisplays price and order tag
  } else {
    for (let product of storage) {
      // For each element of storage
      let data = await fetchData(product._id); // Declares let as an aaiting function
      totalQuantityValue += Number(product.quantity); // Updates value
      totalPriceValue += Number(product.quantity) * Number(data.price); // Updates value
    }
    document.getElementById("totalQuantity").textContent = totalQuantityValue; // Updates value in HTML
    document.getElementById("totalPrice").textContent = totalPriceValue; // Updates value in HTML
  }
}

// ******************************************************************************** FORM VALIDITY FUNCTION(S)

function formValidity() {
  // HTML tag selection/naigation constant(s)
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

  formError = false; // Declares variable as a boolean type

  if (!firstName.match(/^[A-Za-zÜ-ü'\s-]{2,50}$/)) {
    // RegExp match
    firstNameErrorMsg.textContent = `(Nombre de caractères acceptés : min: 2, max: 50) Caractères acceptés : lettres majuscules et minuscules, accents, apostrophe, espace et tiret`;
    errorMsgStyle(firstNameErrorMsg); // Calls errorMsgStyle()
    formError = true; // Redefines boolean
  } else {
    errorMsgStyle(firstNameErrorMsg); // Calls errorMsgStyle()
    firstNameErrorMsg.textContent = "Champs valide";
  }

  if (!lastName.match(/^[A-Za-zÜ-ü'\s-]{2,50}$/)) {
    // RegExp match
    lastNameErrorMsg.textContent = `(Nombre de caractères acceptés : min: 2, max: 50) Caractères acceptés : lettres majuscules et minuscules, accents, apostrophe, espace et tiret`;
    errorMsgStyle(lastNameErrorMsg); // Calls errorMsgStyle()
    formError = true; // Redefines boolean
  } else {
    errorMsgStyle(lastNameErrorMsg); // Calls errorMsgStyle()
    lastNameErrorMsg.textContent = "Champs valide";
  }

  if (!address.match(/^[\dA-Za-zÜ-ü'\/#\.\s-]{2,300}$/)) {
    // RegExp match
    addressErrorMsg.textContent = `(Nombre de caractères acceptés : min: 2, max: 300) Caractères acceptés : chiffres, lettres majuscules et minuscules, accents, apostrophe, slash, dièze, point, espace et tiret`;
    errorMsgStyle(addressErrorMsg); // Calls errorMsgStyle()
    formError = true; // Redefines boolean
  } else {
    errorMsgStyle(addressErrorMsg); // Calls errorMsgStyle()
    addressErrorMsg.textContent = "Champs valide";
  }

  if (!city.match(/^[\dA-Za-zÜ-ü'\/#\.\s-]{2,163}$/)) {
    // RegExp match
    cityErrorMsg.textContent = `(Nombre de caractères acceptés : min: 2, max: 163) Caractères acceptés : chiffres, lettres majuscules et minuscules, accents, apostrophe, slash, dièze, point, espace et tiret`;
    errorMsgStyle(cityErrorMsg); // Calls errorMsgStyle()
    formError = true; // Redefines boolean
  } else {
    errorMsgStyle(cityErrorMsg); // Calls errorMsgStyle()
    cityErrorMsg.textContent = "Champs valide";
  }

  if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    // RegExp match
    emailErrorMsg.textContent = `Format email invalide`;
    errorMsgStyle(emailErrorMsg); // Calls errorMsgStyle()
    formError = true; // Redefines boolean
  } else {
    errorMsgStyle(emailErrorMsg); // Calls errorMsgStyle()
    emailErrorMsg.textContent = "Champs valide";
  }
  return formError; // Returns value
}

// Factors a specific style for HTML tags
function errorMsgStyle(value) {
  value.style.color = "white"; // Refefines style
  value.style.fontWeight = "bold"; // Refefines style
}

// **************************************************************************************** ORDER FUNCTION(S)

// Sends the data of the cart products as well as the order form data in the localstorage
async function order() {
  orderButton.addEventListener("click", (e) => {
    // EventListener on order button
    e.preventDefault(); // Prevent default behavior

    if (formValidity() === false) {
      // If formValidity() is true
      const storage = JSON.parse(localStorage.getItem("products")); // Declares const as get item from localStorage
      let productIds = []; // Declares let as an array

      for (let product of storage) productIds.push(product._id); // For each element in storage, pushes id into array

      const request = {
        // Declares const as an object
        contact: {
          // Creates an object in "request" object
          firstName: document.getElementById("firstName").value, // Key, value
          lastName: document.getElementById("lastName").value, // Key, value
          address: document.getElementById("address").value, // Key, value
          city: document.getElementById("city").value, // Key, value
          email: document.getElementById("email").value, // Key, value
        },
        products: productIds, // Creates an object in "request" object
      };

      const options = {
        // Declares const as a POST parameter creation
        method: "POST",
        body: JSON.stringify(request), // Post request data in json format
        headers: {
          "Content-Type": "application/json", // Declares to the client the type of content actually returned
        },
      };

      if (confirm(`Confirmer la commande ?`)) {
        // If confirmation from the user
        fetchOrderId(options); // Calls fetchOrderId()
      }
    }
  });
}

// Looks for and retrieves the order id before redirection to confirmation.html
function fetchOrderId(options) {
  fetch("http://localhost:3000/api/products/order", options) // Fetch request with option request, awaiting response
    .then((response) => response.json()) // Executes .then function (provided by promise) to retrieve response in .json
    .then((data) => {
      // Retrieves order ID
      if (data.orderId == null || data.orderId == undefined) {
        // Check order ID type
        alert(
          "\n\nUne erreur est survenue lors de la commande. Veuillez contacter le service support à l'adresse support@name.com"
        );
      } else {
        document.location.href = "confirmation.html?" + data.orderId; // Redirection to confirmation.html
      }
    })
    .catch((err) => console.log(err)); // If the initial promise is rejected => console.log(error)
}

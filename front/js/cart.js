// ********************************************************************************************* VARIABLE(S)

// RETRIEVE PRODUCTS FROM LOCALSTORAGE
const storage = JSON.parse(localStorage.getItem("products"));

// SELECTION CONSTANTS
const cart = document.getElementsByClassName("cart");
const cartItems = document.getElementById("cart__items");
const cartPrice = document.getElementsByClassName(".cart__price");
const cartOrder = document.getElementsByClassName("cart__order");
const orderButton = document.getElementById("order");

// ******************************************************************************************* CORE FUNCTION

(async function coreFunction() {
  if (storage == null) {
    emptyCartDisplay();
    emptyOrderFeature();
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

function emptyCartDisplay() {
  const emptyCartMessage = createEmptyCartMessage();
  appendEmptyCartMessage(emptyCartMessage);
}

// ********************************************************************  CREATE / REMOVE ELEMENT FUNCTION(S)

function createEmptyCartMessage() {
  const message = document.createElement("h3");
  message.style.textAlign = "center";
  message.style.marginBottom = "100px";
  message.textContent = "Aucun article n'a été ajouté au panier";
  return message;
}

function createCartItem(product) {
  const item = document.createElement("article");
  item.classList.add("cart__item");
  item.setAttribute("data-id", product._id);
  item.setAttribute("data-color", product.color);
  return item;
}

function createImgDiv() {
  const imgDiv = document.createElement("div");
  imgDiv.classList.add("cart__item__img");
  return imgDiv;
}

function createImage(response) {
  const image = document.createElement("img");
  image.src = response.imageUrl;
  image.alt = response.altTxt;
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

function createName(response) {
  const name = document.createElement("h2");
  name.textContent = response.name;
  return name;
}

function createColor(product) {
  const color = document.createElement("p");
  color.textContent = product.color;
  return color;
}

function createPrice(response) {
  const price = document.createElement("p");
  price.textContent = `${response.price} €`;
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

// ************************************************************************************** APPEND FUNCTION(S)

function appendEmptyCartMessage(emptyCartMessage) {
  cartItems.appendChild(emptyCartMessage);
}

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

// ************************************************************************************* FEATURES FUNCTION(S)

async function fetchData(id) {
  let url = `http://localhost:3000/api/products/${id}`;
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function emptyOrderFeature() {
  orderButton.addEventListener("click", (e) => {
    e.preventDefault();

    if (storage == null) {
      alert(
        "\n\nCommande invalide.\n\nVeuillez vérifier que vous ayez sélectionner au moins un produit avant de passer commande."
      );
    }
  });
}

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

      fetch("http://localhost:3000/api/products/order", options)
        .then((response) => response.json())
        .then((data) => {
          document.location.href = "confirmation.html?" + data.orderId;
        })
        .catch((err) => console.log(err));
    }
  });
}

// **************************************************************************************** REGEX FUNCTION(S)

function regexValidity() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const email = document.getElementById("email").value;

  let validRegex = false;

  if (/^[A-Za-z-']{2,20}$/.test(firstName)) {
    firstNameErrorMsg.textContent = "";
    validRegex = true;
  } else {
    const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
    firstNameErrorMsg.textContent = `Champ invalide.`;
    firstNameErrorMsg.style.color = "red";
    validRegex = false;
  }

  if (/^[A-Za-z-']{2,20}$/.test(lastName)) {
    validRegex = true;
    lastNameErrorMsg.textContent = "";
  } else {
    const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
    lastNameErrorMsg.textContent = `Champ invalide.`;
    lastNameErrorMsg.style.color = "red";
    validRegex = false;
  }

  if (/^[A-Za-z0-9-,'/#)(]{5,100}/.test(address)) {
    addressErrorMsg.textContent = "";
    validRegex = true;
  } else {
    const addressErrorMsg = document.getElementById("addressErrorMsg");
    addressErrorMsg.textContent = `Champ invalide.`;
    addressErrorMsg.style.color = "red";
    validRegex = false;
  }

  if (/^[A-Za-z-'/]{2,20}$/.test(city)) {
    cityErrorMsg.textContent = "";
    validRegex = true;
  } else {
    const cityErrorMsg = document.getElementById("cityErrorMsg");
    cityErrorMsg.textContent = `Champ invalide.`;
    cityErrorMsg.style.color = "red";
    validRegex = false;
  }

  if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    emailErrorMsg.textContent = "";
    validRegex = true;
  } else {
    const emailErrorMsg = document.getElementById("emailErrorMsg");
    emailErrorMsg.textContent = `Champ invalide.`;
    emailErrorMsg.style.color = "red";
    validRegex = false;
  }
  return validRegex;
}

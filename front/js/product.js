// ********************************************************************************************* VARIABLE(S)

// STORAGE VARIABLE
let apiProductData = [];

// ID RETRIEVAL CONSTANT
const selectedId = window.location.search.replace("?id=", "");

// SELECTION CONSTANTS
const productImg = document.querySelector(".item__img");
const productTitle = document.getElementById("title");
const productPrice = document.getElementById("price");
const productDescription = document.getElementById("description");
const productColor = document.getElementById("colors");
const selectedQuantity = document.getElementById("quantity");
const addToCartButton = document.getElementById("addToCart");

// ****************************************************************************************** FETCH FUNCTION

async function fetchApiProductData() {
  await fetch(`http://localhost:3000/api/products/${selectedId}`)
    .then((res) => res.json())
    .then((data) => {
      apiProductData = data;
      console.log("+++++++++++++++ PAGE PRODUCT ID +++++++++++++++");
      console.log(`+ Product id: ${selectedId}`);
      console.log("+++++++++++++++ API PRODUCT DATA ARRAY +++++++++++++++");
      console.table(apiProductData);
    })
    .catch((err) => console.log(err));
}

// ******************************************************************************************* CORE FUNCTION

(async function coreFunction() {
  await fetchApiProductData();

  displayCart();
  addCartFeature();
})();

// ************************************************************************* DISPLAY / UNDISPLAY FUNCTION(S)

function displayCart() {
  document.title = apiProductData.name;
  productTitle.textContent = apiProductData.name;
  productPrice.textContent = apiProductData.price;
  productDescription.textContent = apiProductData.description;

  const image = createImage(apiProductData);
  appendImage(image);

  apiProductData.colors.forEach((color) => {
    const colorOption = createOption(color);
    appendColorOption(colorOption);
  });
}

// ********************************************************************  CREATE / REMOVE ELEMENT FUNCTION(S)

function createImage(apiProductData) {
  const image = document.createElement("img");
  image.src = apiProductData.imageUrl;
  image.alt = apiProductData.altTxt;
  return image;
}

function createOption(color) {
  const option = document.createElement("option");
  option.value = `${color}`;
  option.innerHTML = `${color}`;
  return option;
}

// ************************************************************************************** APPEND FUNCTION(S)

function appendImage(image) {
  productImg.appendChild(image);
}

function appendColorOption(colorOption) {
  productColor.appendChild(colorOption);
}

// ************************************************************************************* FEATURES FUNCTION(S)

function addCartFeature() {
  addToCartButton.addEventListener("click", () => {
    const storage = JSON.parse(localStorage.getItem("products"));
    validColor = false;
    validQuantity = false;

    const selectedProduct = {
      _id: apiProductData._id,
      color: productColor.value,
      quantity: selectedQuantity.value,
    };

    colorValidity(selectedProduct);
    quantityValidity(selectedProduct);

    if (validColor && validQuantity) {
      if (storage == null) {
        return createEntry(storage, selectedProduct);
      } else if (storage) {
        for (i = 0; i < storage.length; i++) {
          if (
            storage[i]._id == apiProductData._id &&
            storage[i].color == selectedProduct.color
          ) {
            return modifyEntry(storage, i, selectedProduct);
          }
        }
        for (i = 0; i < storage.length; i++) {
          if (
            (storage[i]._id == apiProductData._id &&
              storage[i].color != selectedProduct.color) ||
            storage[i]._id != apiProductData._id
          ) {
            return createAnotherEntry(storage, selectedProduct);
          }
        }
      }
    }
  });
}

// ************************************************************************************* VALIDITY FUNCTION(S)

function colorValidity(selectedProduct) {
  if (selectedProduct.color == "") {
    validColor = false;
    alertMissColor();
  } else {
    validColor = true;
  }
}

function quantityValidity(selectedProduct) {
  if (selectedProduct.quantity == 0 || selectedProduct.quantity == "") {
    validQuantity = false;
    alertMissQuantity();
  } else {
    validQuantity = true;
  }
}

// ************************************************************************************** STORAGE FUNCTION(S)

function createEntry(storage, selectedProduct) {
  storage = [];
  storage.push(selectedProduct);
  localStorage.setItem("products", JSON.stringify(storage));
  alertPopUp(selectedProduct);
}

function modifyEntry(storage, i, selectedProduct) {
  storage[i].quantity = selectedQuantity.value;
  localStorage.setItem("products", JSON.stringify(storage));
  alertPopUp(selectedProduct);
}

function createAnotherEntry(storage, selectedProduct) {
  storage.push(selectedProduct);
  localStorage.setItem("products", JSON.stringify(storage));
  alertPopUp(selectedProduct);
}

// *********************************************************************** ALERT / ERROR MESSAGES FUNCTION(S)

function alertMissColor() {
  alert("\n\nVeuillez sélectionner une couleur.");
}

function alertMissQuantity() {
  alert("\n\nVeuillez sélectionner une quantité.");
}

function alertPopUp(selectedProduct) {
  alert(`Le produit suivant a bien été ajouté au panier.
  \n${selectedProduct.name}\nCouleur: ${selectedProduct.color}\nquantité: ${selectedProduct.quantity}
  `);
}

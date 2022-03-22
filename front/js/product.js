// ********************************************************************************************* VARIABLE(S)

// Storage variable(s)
let apiProductData = [];

// ID retrieval constant
const selectedId = window.location.search.replace("?id=", "");

// HTML tag selection constant(s)
const productImg = document.querySelector(".item__img");
const productTitle = document.getElementById("title");
const productPrice = document.getElementById("price");
const productDescription = document.getElementById("description");
const productColor = document.getElementById("colors");
const selectedQuantity = document.getElementById("quantity");
const addToCartButton = document.getElementById("addToCart");

// ****************************************************************************************** FETCH FUNCTION

// Retrieves an array of id-specific product data from the API
async function fetchApiProductData() {
  await fetch(`http://localhost:3000/api/products/${selectedId}`)
    .then((res) => res.json())
    .then((data) => {
      apiProductData = data;
    })
    .catch((err) => console.log(err));
}

// ******************************************************************************************* CORE FUNCTION

// Automatically applies major function(s)
(async function coreFunction() {
  await fetchApiProductData();

  displayCart();
  addCartFeature();
})();

// ************************************************************************* DISPLAY / UNDISPLAY FUNCTION(S)

// Displays HTML element of id-specific product
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

// ***********************************************************  CREATE / REMOVE / MODIFY ELEMENT FUNCTION(S)

// Creates product image tag and attribute(s)
function createImage(apiProductData) {
  const image = document.createElement("img");
  image.src = apiProductData.imageUrl;
  image.alt = apiProductData.altTxt;
  return image;
}

// Creates product color tag, value and content
function createOption(color) {
  const option = document.createElement("option");
  option.value = `${color}`;
  option.innerHTML = `${color}`;
  return option;
}

// ************************************************************************************** APPEND FUNCTION(S)

// Places product image tag in HTML
function appendImage(image) {
  productImg.appendChild(image);
}

// Places product color options in HTML
function appendColorOption(colorOption) {
  productColor.appendChild(colorOption);
}

// ************************************************************************************* FEATURES FUNCTION(S)

// Adds product in cart
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

// Check color validity before add to cart a product
function colorValidity(selectedProduct) {
  if (selectedProduct.color == "") {
    validColor = false;
    alertMissColor();
  } else {
    validColor = true;
  }
}

// Check quantity validity before add to cart a product
function quantityValidity(selectedProduct) {
  if (selectedProduct.quantity == 0 || selectedProduct.quantity == "") {
    validQuantity = false;
    alertMissQuantity();
  } else {
    validQuantity = true;
  }
}

// ************************************************************************************** STORAGE FUNCTION(S)

// Creates a product entry in a storage array before pushing the information into the localStorage
function createEntry(storage, selectedProduct) {
  storage = [];
  storage.push(selectedProduct);
  localStorage.setItem("products", JSON.stringify(storage));
  alertPopUp(selectedProduct);
}

// Modifies the values of a product entry before pushing it to localstorage
function modifyEntry(storage, i, selectedProduct) {
  storage[i].quantity = selectedQuantity.value;
  localStorage.setItem("products", JSON.stringify(storage));
  alertPopUp(selectedProduct);
}

// Creates a new product entry in the storage array before pushing it to localstorage
function createAnotherEntry(storage, selectedProduct) {
  storage.push(selectedProduct);
  localStorage.setItem("products", JSON.stringify(storage));
  alertPopUp(selectedProduct);
}

// *********************************************************************** ALERT / ERROR MESSAGES FUNCTION(S)

// Alert message in case of color option not selected
function alertMissColor() {
  alert("\n\nVeuillez sélectionner une couleur.");
}

// Alert message in case of quantity option not selected
function alertMissQuantity() {
  alert("\n\nVeuillez sélectionner une quantité.");
}

// Pop-up message asking for confirmation of adding a product to the basket
function alertPopUp(selectedProduct) {
  confirm(`Voulez-vous ajouter ce produit au panier ?
  \n${apiProductData.name}\nCouleur: ${selectedProduct.color}\nquantité: ${selectedProduct.quantity}
  `);
}

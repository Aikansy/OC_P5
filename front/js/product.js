// ********************************************************************************************* VARIABLE(S)

// Storage variable(s)
let apiProductData = [];

// ID retrieval constant
const selectedId = window.location.search.replace("?id=", "");

// HTML tag selection/navigation constant(s)
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
  await fetch(`http://localhost:3000/api/products/${selectedId}`) // Fetch request, awaiting response then returns a promise
    .then((res) => res.json()) // Executes .then function (provided by promise) to retrieve response in .json
    .then((data) => {
      // Executes .then to transfer data into apiProductData array
      apiProductData = data;
    })
    .catch((err) => console.log(err)); // If the initial promise is rejected => console.log(error)
}

// ******************************************************************************************* CORE FUNCTION

// Automatically applies major function(s)
(async function coreFunction() {
  await fetchApiProductData(); // Waits for the execution of fetchApiProductData
  displayCart(); // Then calls displayCart
  addCartFeature(); // Then calls addCartFeature
})();

// ************************************************************************* DISPLAY / UNDISPLAY FUNCTION(S)

// Displays HTML element of id-specific product
function displayCart() {
  document.title = apiProductData.name; // Injects the product name into the tab title
  productTitle.textContent = apiProductData.name; // Injects the product name
  productPrice.textContent = apiProductData.price; // Injects the product price
  productDescription.textContent = apiProductData.description; // Injects the product description

  const image = createImage(apiProductData); // Declares const as modification provided by fonction
  appendImage(image); // Injetcs the created element (constant) in the HTML

  apiProductData.colors.forEach((color) => {
    // Loop for each color in color list in apiProductData array
    const colorOption = createOption(color); // Declares const as modification provided by fonction
    appendColorOption(colorOption); // Injects the created element (constant) in the HTML
  });
}

// ***********************************************************  CREATE / REMOVE / MODIFY ELEMENT FUNCTION(S)

// Creates product image tag and attribute(s)
function createImage(apiProductData) {
  const image = document.createElement("img"); // Declares const as a creation of an HTML element "img"
  image.src = apiProductData.imageUrl; // Defines src attribute and content
  image.alt = apiProductData.altTxt; // Defines alt attribute and content
  return image; // Ends the func and returns the value
}

// Creates product color tag, value and content
function createOption(color) {
  const option = document.createElement("option"); // Declares const as a creation of an HTML element "option"
  option.innerHTML = `${color}`; // Defines content
  return option; // Ends the func and returns the value
}

// ************************************************************************************** APPEND FUNCTION(S)

// Places product image tag in HTML
function appendImage(image) {
  productImg.appendChild(image); // Adds img node to div
}

// Places product color options in HTML
function appendColorOption(colorOption) {
  productColor.appendChild(colorOption); // Adds color option node to select
}

// ************************************************************************************* FEATURES FUNCTION(S)

// Adds product in cart
function addCartFeature() {
  addToCartButton.addEventListener("click", () => {
    // Callback func
    const storage = JSON.parse(localStorage.getItem("products")); // Declares const as localStorage array .json
    validColor = false; // Declares variable as a boolean type
    validQuantity = false; // Declares variable as a boolean type

    const selectedProduct = {
      // Declares const as an obejct creation
      _id: apiProductData._id, // key: value
      color: productColor.value, // key: value
      quantity: selectedQuantity.value, // key: value
    };

    colorValidity(selectedProduct); // Calls colorValidity()
    quantityValidity(selectedProduct); // Calls quantityValidity()

    if (validColor && validQuantity) {
      // Condition validColor true && validQuantity true)
      if (storage == null) {
        // And if storage const is empty
        return createEntry(storage, selectedProduct); // Creates an entry, then return the value
      } else if (storage) {
        // Or else if storage is filled
        for (i = 0; i < storage.length; i++) {
          // for each element in storage
          if (
            storage[i]._id == apiProductData._id && // If a match is found (id && color)
            storage[i].color == selectedProduct.color
          ) {
            return modifyEntry(storage, i, selectedProduct); // Modifies entry then return the value
          }
        }
        for (i = 0; i < storage.length; i++) {
          // for each element in storage
          if (
            (storage[i]._id == apiProductData._id && // If a match is not found (id && color)
              storage[i].color != selectedProduct.color) ||
            storage[i]._id != apiProductData._id
          ) {
            return createAnotherEntry(storage, selectedProduct); // Creates a new entry then return the value
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
    // If user does not select a color
    validColor = false; // Validity is false
    alertMissColor(); // Calls alertMissColor()
  } else {
    validColor = true; // Else, validity is true
  }
}

// Check quantity validity before add to cart a product
function quantityValidity(selectedProduct) {
  if (selectedProduct.quantity == 0 || selectedProduct.quantity == "") {
    // If user does not select a quantity
    validQuantity = false; // Validity is false
    alertMissQuantity(); // Calls alertMissColor()
  } else {
    validQuantity = true; // Else, validity is true
  }
}

// ************************************************************************************** STORAGE FUNCTION(S)

// Creates a product entry in a storage array before pushing the information into the localStorage
function createEntry(storage, selectedProduct) {
  storage = []; // Declares storage as an array
  storage.push(selectedProduct); // Pushes data from selectedProduct object into storage
  localStorage.setItem("products", JSON.stringify(storage)); // Creates an entry in localStorage
  alertConfirm(selectedProduct); // Call confirm Alert pop-up
}

// Modifies the values of a product entry before pushing it to localstorage
function modifyEntry(storage, i, selectedProduct) {
  storage[i].quantity = selectedQuantity.value; // Updates the product[i] quantity
  localStorage.setItem("products", JSON.stringify(storage)); // Updates the entry
  alertConfirm(selectedProduct); // Call confirm Alert pop-up
}

// Creates a new product entry in the storage array before pushing it to localstorage
function createAnotherEntry(storage, selectedProduct) {
  storage.push(selectedProduct); // Pushes data from selectedProduct object into storage
  localStorage.setItem("products", JSON.stringify(storage)); // Creates an entry in localStorage
  alertConfirm(selectedProduct); // Call confirm Alert pop-up
}

// *********************************************************************** ALERT / ERROR MESSAGES FUNCTION(S)

// Alert message in case of color option not selected
function alertMissColor() {
  // Displays alert message
  alert("\n\nVeuillez sélectionner une couleur.");
}

// Alert message in case of quantity option not selected
function alertMissQuantity() {
  // Displays alert message
  alert("\n\nVeuillez sélectionner une quantité.");
}

// Pop-up message asking for confirmation of adding a product to the basket
function alertConfirm(selectedProduct) {
  // Displays confirm message
  confirm(`Voulez-vous ajouter ce produit au panier ?
  \n${apiProductData.name}\nCouleur: ${selectedProduct.color}\nquantité: ${selectedProduct.quantity}
  `);
}

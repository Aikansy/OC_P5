// VARIABLES +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// STORAGE VARIABLE
let apiProductData = [];

// ID RETRIEVAL CONSTANT
const selectedId = window.location.search.replace("?id=", "");

// SELECTION CONSTANTS
const productImg = document.querySelector(".item__img");
const productTitle = document.getElementById("title");
const productPrice = document.getElementById("price");
const productDescription = document.getElementById("description");
const selectedColor = document.getElementById("colors");
const selectedQuantity = document.getElementById("quantity");
const addToCartButton = document.getElementById("addToCart");

// FETCH FUNCTION ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

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

// DISPLAY FUNCTIONS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

(async function apiProductDisplay() {
  await fetchApiProductData();

  displayCart();
  displayColorOption();
  addToCart(apiProductData);
})();

function displayCart() {
  const img = document.createElement("img");
  img.src = apiProductData.imageUrl;
  img.alt = apiProductData.altTxt;
  productImg.appendChild(img);

  document.title = apiProductData.name;
  productTitle.textContent = apiProductData.name;
  productPrice.textContent = apiProductData.price;
  productDescription.textContent = apiProductData.description;
}

function displayColorOption() {
  apiProductData.colors.forEach((productColors) => {
    let colorOption = document.createElement("option");
    colorOption.value = `${productColors}`;
    colorOption.innerHTML = `${productColors}`;
    selectedColor.appendChild(colorOption);
  });
}

// CART FUNCTIONS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function addToCart(apiProductData) {
  addToCartButton.addEventListener("click", () => {
    let myCart = JSON.parse(localStorage.getItem("kanap"));

    let selectedProduct = {
      name: apiProductData.name,
      color: selectedColor.value,
      quantity: selectedQuantity.value,
      _id: apiProductData._id,
      imageUrl: apiProductData.imageUrl,
      altTxt: apiProductData.altTxt,
      price: apiProductData.price,
    };

    addToCartCondition(myCart, selectedProduct);
  });
  return (myCart = JSON.parse(localStorage.getItem("kanap")));
}

// CONDITION FUNCTION ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function addToCartCondition(myCart, selectedProduct) {
  const noColor = selectedColor.value == "";
  const noQuantity =
    selectedQuantity.value == 0 || selectedQuantity.value == "";
  const noColorAndQuantity =
    selectedColor.value == "" &&
    (selectedQuantity.value == 0 || selectedQuantity.value == "");

  if (noColorAndQuantity) {
    alertMissColorAndQuantity();
  } else if (noColor) {
    alertMissColor();
  } else if (noQuantity) {
    alertMissQuantity();
  } else {
    sendSelectedProductToMyCart(myCart, selectedProduct);
  }
}

function sendSelectedProductToMyCart(myCart, selectedProduct) {
  if (myCart == null) {
    return createEntry(myCart, selectedProduct);
  } else if (myCart) {
    for (i = 0; i < myCart.length; i++) {
      if (
        myCart[i]._id == apiProductData._id &&
        myCart[i].color == selectedColor.value
      ) {
        return modifyEntry(myCart, i, selectedProduct);
      }
    }
    for (i = 0; i < myCart.length; i++) {
      if (
        (myCart[i]._id == apiProductData._id &&
          myCart[i].color != selectedColor.value) ||
        myCart[i]._id != apiProductData._id
      ) {
        return createAnotherEntry(myCart, selectedProduct);
      }
    }
  }
}

// LOCALSTORAGE ENTRY ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function setItemToMyCart(myCart) {
  localStorage.setItem("kanap", JSON.stringify(myCart));
  myCart = JSON.parse(localStorage.getItem("kanap"));
}

function createEntry(myCart, selectedProduct) {
  myCart = [];
  myCart.push(selectedProduct);
  setItemToMyCart(myCart);
  console.log("+++++++++++++++ CREATE ENTRY +++++++++++++++");
  console.table(myCart);
  alertPopUp(selectedProduct);
}

function modifyEntry(myCart, i, selectedProduct) {
  myCart[i].quantity = selectedQuantity.value;
  setItemToMyCart(myCart);
  console.log("+++++++++++++++ MODIFY ENTRY +++++++++++++++");
  console.table(myCart);
  alertPopUp(selectedProduct);
}

function createAnotherEntry(myCart, selectedProduct) {
  myCart.push(selectedProduct);
  setItemToMyCart(myCart);
  console.log("+++++++++++++++ CREATE AN OTHER ENTRY +++++++++++++++");
  console.table(myCart);
  alertPopUp(selectedProduct);
}

// ALERT MESSAGES FUNCTION +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function alertMissColorAndQuantity() {
  alert("\n\nVeuillez sélectionner une couleur et une quantité.");
}

function alertMissColor() {
  alert("\n\nVeuillez sélectionner une couleur.");
}

function alertMissQuantity() {
  alert("\n\nVeuillez sélectionner une quantité.");
}

function alertPopUp(selectedProduct) {
  alert(`${selectedProduct.name} a bien été ajouté au panier.
  \nCouleur: ${selectedProduct.color}\nquantité: ${selectedProduct.quantity}
  `);
}

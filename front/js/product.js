// VARIABLES ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// ID RETRIEVAL CONSTANT
const productId = window.location.search.replace("?id=", "");

// STORAGE VARIABLE
let productData = [];

// SELECTION CONSTANTS
const productImg = document.querySelector(".item__img");
const productTitle = document.getElementById("title");
const productPrice = document.getElementById("price");
const productDescription = document.getElementById("description");
const colorSelector = document.getElementById("colors");
const quantitySelector = document.getElementById("quantity");
const addToCartButton = document.getElementById("addToCart");

quantitySelector.value = "";

// FUNCTIONS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// FETCH FUNCTION
async function fetchApiProductData() {
  await fetch(`http://localhost:3000/api/products/${productId}`)
    .then((res) => res.json())
    .then((data) => {
      productData = data;
      console.log("+++++ PRODUCT ID:");
      console.log(productId);
      console.log("+++++ PRODUCT DATA ARRAY:");
      console.table(productData);
    });
}

// DISPLAY FUNCTION
const productDisplay = (async () => {
  await fetchApiProductData();

  // DISPLAY: TAB TITLE, TITLE, IMG, PRICE, DESCRIPTION
  document.title = productData.name;
  productImg.innerHTML = `<img src="${productData.imageUrl}" alt="${productData.altTxt}"></img>`;
  productTitle.innerHTML = productData.name;
  productPrice.innerHTML = productData.price;
  productDescription.innerHTML = productData.description;

  // DISPLAY: COLOR
  productData.colors.forEach((productColors) => {
    document.createElement("option");
    let colorOption = document.createElement("option");

    colorOption.value = `${productColors}`;
    colorOption.innerHTML = `${productColors}`;

    colorSelector.appendChild(colorOption);
  });

  addToCart(productData);
})();

// ADD PRODUCT(S) TO CART FUNCTION
const addToCart = () => {
  addToCartButton.addEventListener("click", () => {
    // LOCAL STORAGE
    let storage = JSON.parse(
      localStorage.getItem(`${productData.name} ${colorSelector.value}`)
    );

    // USER CART
    const userCart = Object.assign({}, storage, {
      id: productId,
      color: `${colorSelector.value}`,
      quantity: `${quantitySelector.value}`,
    });

    // IF A COLOR AND A QUANTITY HAVE NOT BEEN DEFINED
    if (colorSelector.value == "" || quantitySelector.value == "") {
      alert(
        "CHAMPS OBLIGATOIRE : \nVeuillez sélectionner une couleur et une quantité."
      );
    }
    // ELSE
    else {
      // IF THE LOCAL STORAGE IS EMPTY: CREATION OF AN ARRAY AND SENDS DATA TO THE LOCAL STORAGE
      if (storage == null) {
        storage = [];
        storage.push(userCart);
        localStorage.setItem(
          `${productData.name} ${colorSelector.value}`,
          JSON.stringify(storage)
        );
        console.log("+++++ LOCAL STORAGE ARRAY: NEW QUANTITY");
        console.table(storage);
      }
      // ELSE: MODIFICATION OF THE QUANTITY OF THE SELECTED PRODUCT
      else {
        let getProduct = storage.find(
          (element) =>
            element.id == userCart.id && element.color == userCart.color
        );
        getProduct.quantity = userCart.quantity;
        localStorage.setItem(
          `${productData.name} ${colorSelector.value}`,
          JSON.stringify(storage)
        );
        console.log("+++++ LOCAL STORAGE ARRAY: NEW QUANTITY");
        console.table(storage);
      }
    }
  });
};

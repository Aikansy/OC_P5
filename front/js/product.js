// VARIABLES ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// ID RETRIEVAL
let productId = window.location.search.replace("?id=", "");

// STORAGE VARIABLES
let product = [];
let userCart = {
  id: "",
  name: "",
  srcImg: "",
  altTxt: "",
  color: "",
  price: "",
  quantity: "0",
};

// SELECTION VARIABLES
const productImg = document.querySelector(".item__img");
const productTitle = document.getElementById("title");
const productPrice = document.getElementById("price");
const productDescription = document.getElementById("description");
const colorSelector = document.getElementById("colors");
const quantitySelector = document.getElementById("quantity");
const validationButton = document.getElementById("addToCart");

// FUNCTIONS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// FETCH FUNCTION
const fetchApiProductData = async () => {
  await fetch(`http://localhost:3000/api/products/${productId}`)
    .then((res) => res.json())
    .then((data) => {
      product = data;
      console.log(productId);
      console.table(product);
    });
};

// DISPLAY FUNCTION
const productDisplay = (async () => {
  await fetchApiProductData();

  // DISPLAY: TAB TITLE, TITLE, IMG, PRICE, DESCRIPTION
  document.title = product.name;
  productImg.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}"></img>`;
  productTitle.innerHTML = product.name;
  productPrice.innerHTML = product.price;
  productDescription.innerHTML = product.description;

  // DISPLAY: COLOR
  product.colors.forEach((pattern) => {
    document.createElement("option");
    let colorOption = document.createElement("option");

    colorOption.value = `${pattern}`;
    colorOption.innerHTML = `${pattern}`;

    colorSelector.appendChild(colorOption);
    console.log(colorOption);
  });

  // STORAGE OF SELECTED PRODUCT FEATURES
  userCart.id = product._id;
  userCart.name = product.name;
  userCart.srcImg = product.imageUrl;
  userCart.altTxt = product.altTxt;
})();

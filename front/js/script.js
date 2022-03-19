// VARIABLES +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// STORAGE VARIABLE
let apiProductData = [];

// SELECTION CONSTANTS
const items = document.querySelector("#items");

// FETCH FUNCTION ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

async function fetchApiProductData() {
  await fetch(`http://localhost:3000/api/products`)
    .then((res) => res.json())
    .then((data) => {
      apiProductData = data;
      console.log("+++++++++++++++ API PRODUCT DATA ARRAY +++++++++++++++");
      console.table(apiProductData);
    })
    .catch((err) => console.log(err));
}

// PRODUCT DISPLAY FUNCTION ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

(async function apiProductsDisplay() {
  await fetchApiProductData();

  apiProductData.forEach((product) => {
    const { _id, name, imageUrl, description, altTxt } = product;

    const article = document.createElement("article");
    const link = createLink(_id);
    const title = createTitle(name);
    const img = createImage(imageUrl, altTxt);
    const desc = createDescription(description);

    appendChildElement(link, article, img, title, desc);
  });
})();

// ALL CREATE & REMOVE ELEMENT FUNCTIONS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function createLink(_id) {
  const productLink = document.createElement("a");
  productLink.href = "./product.html?id=" + _id;
  return productLink;
}

function createImage(imageUrl, altTxt) {
  const productImage = document.createElement("img");
  productImage.src = imageUrl;
  productImage.alt = altTxt;
  return productImage;
}

function createTitle(name) {
  const productTitle = document.createElement("h3");
  productTitle.textContent = name;
  productTitle.classList.add("productName");
  return productTitle;
}

function createDescription(description) {
  const productDesc = document.createElement("p");
  productDesc.textContent = description;
  productDesc.classList.add("productDescription");
  return productDesc;
}

// ALL APPEND FUNCTIONS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function appendChildElement(link, article, img, title, desc) {
  items.appendChild(link);
  link.appendChild(article);
  article.appendChild(img);
  article.appendChild(title);
  article.appendChild(desc);
}

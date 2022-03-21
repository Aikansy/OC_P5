// ********************************************************************************************* VARIABLE(S)

// STORAGE VARIABLE
let apiProductData = [];

// SELECTION CONSTANTS
const items = document.getElementById("items");

// ****************************************************************************************** FETCH FUNCTION

async function fetchApiProductData() {
  await fetch(`http://localhost:3000/api/products`)
    .then((res) => res.json())
    .then((data) => {
      apiProductData = data;
      console.log("+++++++++++++++ API PRODUCT DATA ARRAY +++++++++++++++");
      console.table(apiProductData);
    })
    .catch((error) => console.log(error));
}

// ******************************************************************************************* CORE FUNCTION

(async function coreFunction() {
  await fetchApiProductData();

  displayCart();
})();

// ************************************************************************* DISPLAY / UNDISPLAY FUNCTION(S)

function displayCart() {
  for (const product of apiProductData) {
    const link = createLink(product);
    const article = createArticle();
    const image = createImage(product);
    const title = createTitle(product);
    const description = createDescription(product);

    appendElement(link, article, image, title, description);
  }
}

// ********************************************************************  CREATE & REMOVE ELEMENT FUNCTION(S)

function createLink(product) {
  const link = document.createElement("a");
  link.href = "./product.html?id=" + product._id;
  return link;
}

function createArticle() {
  const article = document.createElement("article");
  return article;
}

function createImage(product) {
  const image = document.createElement("img");
  image.src = product.imageUrl;
  image.alt = product.altTxt;
  return image;
}

function createTitle(product) {
  const title = document.createElement("h3");
  title.textContent = product.name;
  title.classList.add("productName");
  return title;
}

function createDescription(product) {
  const description = document.createElement("p");
  description.textContent = product.description;
  description.classList.add("productDescription");
  return description;
}

// ************************************************************************************** APPEND FUNCTION(S)

function appendElement(link, article, image, title, description) {
  items.appendChild(link);
  link.appendChild(article);
  article.appendChild(image);
  article.appendChild(title);
  article.appendChild(description);
}

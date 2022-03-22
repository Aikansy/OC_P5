// ********************************************************************************************* VARIABLE(S)

// Storage variable(s)
let apiProductData = [];

// HTML tag selection constant(s)
const items = document.getElementById("items");

// ****************************************************************************************** FETCH FUNCTION

// Fetches array of product data from API
async function fetchApiProductData() {
  await fetch(`http://localhost:3000/api/products`)
    .then((res) => res.json())
    .then((data) => {
      apiProductData = data;
    })
    .catch((error) => console.log(error));
}

// ******************************************************************************************* CORE FUNCTION

// Automatically applies major function(s)
(async function coreFunction() {
  await fetchApiProductData();

  displayCart();
})();

// ************************************************************************* DISPLAY / UNDISPLAY FUNCTION(S)

// Displays HTML element for each product find in ApiProductData array
function displayCart() {
  for (const product of apiProductData) {
    // Creates product elements
    const link = createLink(product);
    const article = createArticle();
    const image = createImage(product);
    const title = createTitle(product);
    const description = createDescription(product);

    // Places product elements in HTML
    appendElement(link, article, image, title, description);
  }
}

// ***********************************************************  CREATE / REMOVE / MODIFY ELEMENT FUNCTION(S)

// Creates product link tag and attribute(s)
function createLink(product) {
  const link = document.createElement("a");
  link.href = "./product.html?id=" + product._id;
  return link;
}

// Creates product article tag
function createArticle() {
  const article = document.createElement("article");
  return article;
}

// Creates product image tag and attribute(s)
function createImage(product) {
  const image = document.createElement("img");
  image.src = product.imageUrl;
  image.alt = product.altTxt;
  return image;
}

// Create product title tag, attribute(s) and content
function createTitle(product) {
  const title = document.createElement("h3");
  title.textContent = product.name;
  title.classList.add("productName");
  return title;
}

// Creates product description tag, attribute(s) and content
function createDescription(product) {
  const description = document.createElement("p");
  description.textContent = product.description;
  description.classList.add("productDescription");
  return description;
}

// ************************************************************************************** APPEND FUNCTION(S)

// Places product elements in HTML
function appendElement(link, article, image, title, description) {
  items.appendChild(link);
  link.appendChild(article);
  article.appendChild(image);
  article.appendChild(title);
  article.appendChild(description);
}

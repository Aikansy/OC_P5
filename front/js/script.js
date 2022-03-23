// ********************************************************************************************* VARIABLE(S)

// Storage variable(s)
let apiProductData = [];

// HTML tag selection/navigation constant(s)
const items = document.getElementById("items");

// ****************************************************************************************** FETCH FUNCTION

// Fetches array of product data from API
async function fetchApiProductData() {
  await fetch(`http://localhost:3000/api/products`) // Fetch request, awaiting response then returns a promise
    .then((res) => res.json()) // Executes .then function (provided by promise) to retrieve response in .json
    .then((data) => {
      // Executes .then to transfer data into apiProductData array
      apiProductData = data;
    })
    .catch((error) => console.log(error)); // If the initial promise is rejected => console.log(error)
}

// ******************************************************************************************* CORE FUNCTION

// Automatically applies major function(s)
(async function coreFunction() {
  await fetchApiProductData(); // Waits for the execution of fetchApiProductData
  displayCart(); // Then calls displayCart
})();

// ************************************************************************* DISPLAY / UNDISPLAY FUNCTION(S)

// Displays HTML element for each product find in ApiProductData array
function displayCart() {
  for (const product of apiProductData) {
    // Loop of elements of ApiProductData

    // Declares each const as modification provided by their respective fonctions
    const link = createLink(product);
    const article = createArticle();
    const image = createImage(product);
    const title = createTitle(product);
    const description = createDescription(product);

    // Injects the created elements (constants) in the HTML
    appendElement(link, article, image, title, description);
  }
}

// ***********************************************************  CREATE / REMOVE / MODIFY ELEMENT FUNCTION(S)

// Creates product link tag and attribute(s)
function createLink(product) {
  const link = document.createElement("a"); // Declares const as a creation of an HTML element "a"
  link.href = "./product.html?id=" + product._id; // Defines href attribute and content
  return link; // Ends the func and returns the value
}

// Creates product article tag
function createArticle() {
  const article = document.createElement("article"); // Declares const as a creation of an HTML element "article"
  return article; // Ends the func and returns the value
}

// Creates product image tag and attribute(s)
function createImage(product) {
  const image = document.createElement("img"); // Declares const as a creation of an HTML element "img"
  image.src = product.imageUrl; // Defines src attribute and content
  image.alt = product.altTxt; // Defines alt attribute and content
  return image; // Ends the func and returns the value
}

// Create product title tag, attribute(s) and content
function createTitle(product) {
  const title = document.createElement("h3"); // Declares const as a creation of an HTML element "h3"
  title.textContent = product.name; // Defines content
  title.classList.add("productName"); // Adds class attribute and class name
  return title; // Ends the func and returns the value
}

// Creates product description tag, attribute(s) and content
function createDescription(product) {
  const description = document.createElement("p"); // Declares const as a creation of an HTML element "p"
  description.textContent = product.description; // Defines content
  description.classList.add("productDescription"); // Adds class attribute and class name
  return description; // Ends the func and returns the value
}

// ************************************************************************************** APPEND FUNCTION(S)

// Places product elements in HTML
function appendElement(link, article, image, title, description) {
  items.appendChild(link); // Adds link node to section
  link.appendChild(article); // Adds article node to link
  article.appendChild(image); // Adds img node to article
  article.appendChild(title); // Adds h3 node to article
  article.appendChild(description); // Adds p node to article
}

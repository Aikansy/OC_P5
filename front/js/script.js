// VARIABLES ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// SELECTION CONSTANTS
const items = document.querySelector("#items");

// FETCH FUNCTION +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const fetchProductData = (async () => {
  await fetch(`http://localhost:3000/api/products`)
    .then((response) => response.json())
    .then((data) => productsDisplay(data));
})();

// PRODUCT DISPLAY FUNCTION +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function productsDisplay(data) {
  console.table(data);

  data.forEach((product) => {
    const { _id, name, imageUrl, description, altTxt } = product;

    const article = document.createElement("article");
    const link = createLink(_id);
    const title = createTitle(name);
    const img = createImage(imageUrl, altTxt);
    const desc = createDescription(description);

    appendChildElement(link, article, img, title, desc);
  });
}

// PRODUCT DISPLAY FUNCTION / CREATE ELEMENT FUNCTION

function createLink(id) {
  const productLink = document.createElement("a");
  productLink.href = "./product.html?id=" + id;
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

// PRODUCT DISPLAY FUNCTION / APPENDCHILD ELEMENT FUNCTION +++++++++++++++++++++++++++++++++++++++++++++++++

function appendChildElement(link, article, img, title, desc) {
  items.appendChild(link);
  link.appendChild(article);
  article.appendChild(img);
  article.appendChild(title);
  article.appendChild(desc);
}

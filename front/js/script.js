// VARIABLES ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// // STORAGE
// let products = [];

// // SELECTION VARIABLES
// const items = document.getElementById("items");

// // FUNCTIONS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// // FETCH FUNCTION
// async function fetchApiData() {
//   await fetch("https://api-kanap-eu.herokuapp.com/api/products")
//     .then((res) => res.json())
//     .then((data) => {
//       products = data;
//       console.table(products);
//     });
// }

// // DISPLAY FUNCTION
// const productsDisplay = (async () => {
//   await fetchApiData();

//   products.forEach((product) => {
//     const { _id, name, imageUrl, description, altTxt } = product; // descruturing: write js faster

//     const link = document.createElement("a");
//     const article = document.createElement("article");
//     const articleImg = document.createElement("img");
//     const articleTitle = document.createElement("h3");
//     const articleDescription = document.createElement("p");

//     items.appendChild(link);
//     link.appendChild(article);
//     article.append(articleImg, articleTitle, articleDescription);

//     link.href = `./product.html?id=${_id}`;

//     articleImg.src = `${imageUrl}`;
//     articleImg.alt = `${altTxt}`;

//     articleTitle.classList.add("productName");
//     articleTitle.textContent = `${name}`;

//     articleDescription.classList.add("productDescription");
//     articleDescription.textContent = `${description}`;
//   });
// })();

/****************************************************************************************************** */

/** LONG VERSION
 * w forEach
 * pros: clarity
 */

const fetchProductData = (async () => {
  await fetch(`http://localhost:3000/api/products`)
    .then((response) => response.json())
    .then((data) => productsDisplay(data));
})();

function productsDisplay(data) {
  console.table(data);

  data.forEach((product) => {
    const { _id, name, imageUrl, description, altTxt } = product;

    const article = document.createElement("article");
    const link = createLink(_id);
    const title = createTitle(name);
    const img = createImage(imageUrl, altTxt);
    const desc = createDesc(description);

    appendArticleTolink(link, article);
    appendElementsToArticle(article, img, title, desc);
  });
}

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

function createDesc(description) {
  const productDesc = document.createElement("p");
  productDesc.textContent = description;
  productDesc.classList.add("productDescription");
  return productDesc;
}

function appendArticleTolink(link, article) {
  const items = document.querySelector("#items");
  items.appendChild(link);
  link.appendChild(article);
}

function appendElementsToArticle(article, img, title, desc) {
  article.appendChild(img);
  article.appendChild(title);
  article.appendChild(desc);
}

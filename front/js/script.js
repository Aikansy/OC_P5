fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((data) => apiData(data));

/** apiData Function description
 * With the data fetch from the api, the function creates article for each element of the array.
 */
function apiData(data) {
  console.table(data);

  /** forEach description
   * Execute the function on each keys defined in product
   */
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

// Function: link element creationS
function createLink(id) {
  const productLink = document.createElement("a");
  productLink.href = "./product.html?id=" + id;
  return productLink;
}

// Function: img element creation
function createImage(imageUrl, altTxt) {
  const productImage = document.createElement("img");
  productImage.src = imageUrl;
  productImage.alt = altTxt;
  return productImage;
}

// Function: title element creation
function createTitle(name) {
  const productTitle = document.createElement("h3");
  productTitle.textContent = name;
  productTitle.classList.add("productName");
  return productTitle;
}

// Function: description element creation
function createDesc(description) {
  const productDesc = document.createElement("p");
  productDesc.textContent = description;
  productDesc.classList.add("productDescription");
  return productDesc;
}

// Function: Appendchild article to link
function appendArticleTolink(link, article) {
  const items = document.querySelector("#items");
  items.appendChild(link);
  link.appendChild(article);
}

// Function: Appendchild elements (img, title and description) to article
function appendElementsToArticle(article, img, title, desc) {
  article.appendChild(img);
  article.appendChild(title);
  article.appendChild(desc);
}

/****************************************************************************************************** */

/** SHORT VERSION w innerHTML
 * Fetch asynchronous automatic function
 * Console log: Sucess or Error
 * Console log: localhost default port 3000
 * Console log: API data
 */

/*
(async function fetchApiData() {
  const res = await fetch("http://localhost:3000/api/products");
  const apiData = await res.json();

  document.querySelector("#items").innerHTML = apiData
    .map(
      (item) =>
        `<a href="./product.html?${item._id}>
      <article>
        <img src="${item.imageUrl}" alt="${item.altTxt} width=160px height=160px">
        <h3 class="productName">${item.name}</h3>
        <p class="productDescription">${item.description}</p>
      </article>
    </a>`
    )
    .join("");
})();
*/

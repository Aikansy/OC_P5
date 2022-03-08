// VARIABLES ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// STORAGE
let products = [];

// SELECTION VARIABLES
const items = document.getElementById("items");

// FUNCTIONS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// FETCH FUNCTION
async function fetchApiData() {
  await fetch("https://api-kanap-eu.herokuapp.com/api/products")
    .then((res) => res.json())
    .then((data) => {
      products = data;
      console.table(products);
    });
}

// DISPLAY FUNCTION
const productsDisplay = (async () => {
  await fetchApiData();

  products.forEach((product) => {
    const { _id, name, imageUrl, description, altTxt } = product; // descruturing method: write js faster

    const link = document.createElement("a");
    const article = document.createElement("article");
    const articleImg = document.createElement("img");
    const articleTitle = document.createElement("h3");
    const articleDescription = document.createElement("p");

    items.appendChild(link);
    link.appendChild(article);
    article.append(articleImg, articleTitle, articleDescription);

    link.href = `./product.html?id=${_id}`;

    articleImg.src = `${imageUrl}`;
    articleImg.alt = `${altTxt}`;

    articleTitle.classList.add("productName");
    articleTitle.textContent = `${name}`;

    articleDescription.classList.add("productDescription");
    articleDescription.textContent = `${description}`;
  });
})();

/****************************************************************************************************** */

/** VERY SHORT VERSION
 * w innerHTML
 * pros: size
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

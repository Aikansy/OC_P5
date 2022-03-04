/** Fetch asynchronous automatic function
 * Console log: Sucess or Error
 * Console log: localhost default port 3000
 * Console log: API data
 */

(async function fetchApiData() {
  const res = await fetch("http://localhost:3000/api/products");

  // Stores API data
  const apiData = await res.json();

  if (res.ok) {
    // Console log Success
    console.log(
      "([ ----- SUCCESS ----- ]): API data was successfully retrieved "
    );

    // Console log localhost default port
    console.log(res);

    // Console log Api datas
    console.log("([ ----- API DATA ARRAY ----- ]):");
    console.table(apiData);
  } else {
    // Console log Error
    console.log("([ ----- ERROR ----- ]): unable to fetch data from API");
  }

  /** Map and data loading loop
   * Load for each items from API:
   * - _id
   * - imgUrl
   * - alt
   * - name
   * - description
   */
  document.querySelector("#items").innerHTML = apiData
    .map(
      (item) =>
        `<a href="./product.html?id=42" id=${item._id}>
      <article>
        <img src="${item.imageUrl}" alt="${item.altTxt} width=160px height=160px">
        <h3 class="productName">${item.name}</h3>
        <p class="productDescription">${item.description}</p>
      </article>
    </a>`
    )
    // Delete "," between cards
    .join("");
})();

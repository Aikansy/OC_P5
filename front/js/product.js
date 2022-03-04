const productId = window.location.search.replace("?id=", "");

const fetchProductData = async () => {
  await fetch(`http://localhost:3000/api/products/${productId}`)
    .then((res) => res.json())
    .then((data) => console.table(data));
};

fetchProductData();

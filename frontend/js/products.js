const API_URL = "http://localhost:5000/api/products";
const productList = document.getElementById("productList");

const loadProducts = async () => {
  try {
    const res = await fetch(API_URL);
    const products = await res.json();

    if (products.length === 0) {
      productList.innerHTML = "<p>No products available</p>";
      return;
    }

    productList.innerHTML = products
      .map(
        (p) => `
      <div class="product-card">
        <img src="${p.image || 'https://via.placeholder.com/150'}" alt="${p.name}" />
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <a href="product.html?id=${p._id}" class="btn">View Details</a>
      </div>
    `
      )
      .join("");
  } catch (err) {
    console.error(err);
    productList.innerHTML = "<p>Error loading products.</p>";
  }
};

loadProducts();

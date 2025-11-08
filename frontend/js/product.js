const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const API_URL = `http://localhost:5000/api/products/${id}`;
const productDetail = document.getElementById("productDetail");

const loadProduct = async () => {
  try {
    const res = await fetch(API_URL);
    const product = await res.json();

    if (res.ok) {
      productDetail.innerHTML = `
        <div class="product-card">
          <img src="${product.image || 'https://via.placeholder.com/200'}" alt="${product.name}" />
          <h2>${product.name}</h2>
          <p>${product.description}</p>
          <p><strong>Price:</strong> ₹${product.price}</p>
          <button class="btn">Add to Cart</button>
        </div>
      `;
    } else {
      productDetail.innerHTML = `<p>${product.message || 'Product not found.'}</p>`;
    }
  } catch (err) {
    console.error(err);
    productDetail.innerHTML = "<p>Error loading product details.</p>";
  }
};

loadProduct();

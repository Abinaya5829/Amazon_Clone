// script.js

// Fetch and display products
async function loadProducts() {
  try {
    const response = await fetch('http://localhost:5000/api/products');
    const products = await response.json();

    const productList = document.getElementById('product-list');
    if (!productList) return; // If no product list div, stop

    if (products.length === 0) {
      productList.innerHTML = '<p>No products available</p>';
      return;
    }

    productList.innerHTML = products
      .map(
        (p) => `
        <div class="product-card">
          <img src="${p.image}" alt="${p.name}">
          <h3>${p.name}</h3>
          <p>₹${p.price}</p>
          <button>Add to Cart</button>
        </div>
      `
      )
      .join('');
  } catch (error) {
    console.error('Error loading products:', error);
  }
}

// Automatically load products when page has product list
document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
});

// Add to cart functionality
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
}

// Modify your product display (inside loadProducts):
productList.innerHTML = products
  .map(
    (p) => `
    <div class="product-card">
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick='addToCart(${JSON.stringify(p)})'>Add to Cart</button>
    </div>
  `
  )
  .join('');

// Show cart items
function showCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  if (!cartItemsContainer) return;

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  let total = 0;
  cartItemsContainer.innerHTML = cart
    .map((item, index) => {
      total += item.price;
      return `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" width="80">
          <h3>${item.name}</h3>
          <p>₹${item.price}</p>
          <button onclick="removeFromCart(${index})">Remove</button>
        </div>
      `;
    })
    .join('');

  document.getElementById('cart-total').innerText = `Total: ₹${total}`;
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  showCart();
}

// Auto load cart when cart.html is opened
document.addEventListener('DOMContentLoaded', showCart);

// new
document.getElementById("searchBtn").addEventListener("click", function() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const products = document.querySelectorAll(".product-card");

  products.forEach(product => {
    const name = product.querySelector("h3").textContent.toLowerCase();
    product.style.display = name.includes(searchTerm) ? "block" : "none";
  });
});

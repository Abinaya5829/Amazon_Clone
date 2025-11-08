const productList = document.getElementById("product-list");

async function loadProducts() {
  try {
    const res = await fetch("http://localhost:5000/api/products");
    const products = await res.json();

    productList.innerHTML = products
      .map(
        (p) => `
        <div class="product-card">
          <img src="${p.image}" alt="${p.name}" width="150" />
          <h3>${p.name}</h3>
          <p>₹${p.price}</p>
          <button onclick="addToCart('${p._id}')">Add to Cart</button>
        </div>`
      )
      .join("");
  } catch (err) {
    productList.innerHTML = "<p>Failed to load products.</p>";
    console.error(err);
  }
}

function addToCart(id) {
  console.log("Added product:", id);
}

loadProducts();


// main.js

// Check login status
const token = localStorage.getItem("token");
const navbar = document.querySelector(".navbar nav");

if (navbar) {
  if (token) {
    navbar.innerHTML = `
      <a href="profile.html">Profile</a>
      <a href="#" id="logoutLink">Logout</a>
    `;
    document.getElementById("logoutLink").addEventListener("click", () => {
      localStorage.removeItem("token");
      alert("Logged out successfully!");
      window.location.href = "login.html";
    });
  } else {
    navbar.innerHTML = `
      <a href="login.html">Login</a>
      <a href="register.html">Register</a>
    `;
  }
}


const productContainer = document.getElementById("product-container");

async function fetchProducts() {
  try {
    const response = await fetch("http://localhost:5000/api/products");
    const products = await response.json();

    if (products.length === 0) {
      productContainer.innerHTML = "<p>No products available</p>";
      return;
    }

    productContainer.innerHTML = products
      .map(
        (product) => `
        <div class="product-card">
          <img src="${product.image}" alt="${product.name}" />
          <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">$${product.price}</p>
          </div>
        </div>
      `
      )
      .join("");
  } catch (error) {
    console.error("Error fetching products:", error);
    productContainer.innerHTML = "<p>Failed to load products</p>";
  }
}

fetchProducts();


// 23/10/25

// SEARCH - robust implementation
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');

  // find the container(s) that hold product cards
  const productContainers = [
    document.getElementById('product-list'),
    document.querySelector('.product-container'),
    document.getElementById('productList'),
    document.getElementById('productList') // keep common ids
  ].filter(Boolean);

  // if there is no search input on the page, do nothing (prevents errors)
  if (!searchInput || productContainers.length === 0) {
    // console.log('Search input or products container not found — skipping search setup.');
    return;
  }

  // helper: get product cards in all known containers
  function getProductCards() {
    const cards = [];
    productContainers.forEach(container => {
      const c = Array.from(container.querySelectorAll('.product-card, .product-card-wrapper, .product'));
      cards.push(...c);
    });
    return cards;
  }

  // helper: extract title text from a card (tries several selectors)
  function getCardTitle(card) {
    const titleSelectors = ['h3', 'h2', '.product-name', '.product-title'];
    for (const sel of titleSelectors) {
      const el = card.querySelector(sel);
      if (el && el.textContent.trim()) return el.textContent.trim();
    }
    // fallback: use alt text of image or whole card text
    const img = card.querySelector('img');
    if (img && img.alt) return img.alt.trim();
    return card.textContent.trim().slice(0, 100);
  }

  // actual filter function
  function filterProducts(term) {
    const q = term.trim().toLowerCase();
    const cards = getProductCards();

    if (!q) {
      // show all
      cards.forEach(card => (card.style.display = 'block'));
      return;
    }

    let visibleCount = 0;
    cards.forEach(card => {
      const title = getCardTitle(card).toLowerCase();
      const matches = title.includes(q);
      card.style.display = matches ? 'block' : 'none';
      if (matches) visibleCount++;
    });

    // optional: if you want to show a "no results" message
    let noResultEl = document.getElementById('no-results-msg');
    if (!noResultEl) {
      noResultEl = document.createElement('p');
      noResultEl.id = 'no-results-msg';
      noResultEl.style.textAlign = 'center';
      noResultEl.style.marginTop = '1rem';
      const anyContainer = productContainers[0];
      anyContainer.parentNode.insertBefore(noResultEl, anyContainer.nextSibling);
    }
    noResultEl.textContent = visibleCount === 0 ? 'No products match your search.' : '';
  }

  // wire up button
  if (searchBtn) {
    searchBtn.addEventListener('click', () => filterProducts(searchInput.value));
  }

  // wire up Enter key in input
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      filterProducts(searchInput.value);
    }
  });

  // optional: live search with debounce (as user types)
  let debounceTimer = null;
  searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => filterProducts(searchInput.value), 250);
  });
});

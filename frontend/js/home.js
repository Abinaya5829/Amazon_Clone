document.addEventListener("DOMContentLoaded", async () => {
  const productList = document.getElementById("product-list");
  const navbarContainer = document.getElementById("navbar");
  
  // Create Amazon-style navbar dynamically
  navbarContainer.innerHTML = `
    <header class="navbar">
      <div class="logo">Amazon Clone</div>
      <div class="search">
        <input id="searchInput" type="text" placeholder="Search for products..." />
        <button id="searchBtn">🔍</button>
      </div>
      <nav>
        <a href="index.html">Home</a>
        <a href="products.html">Products</a>
        <a href="cart.html">Cart</a>
        <a href="profile.html">Profile</a>
      </nav>
    </header>
  `;

  // Fetch products from backend
  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    return data;
  };

  // Render product cards
  const displayProducts = (products) => {
    productList.innerHTML = "";
    if (products.length === 0) {
      productList.innerHTML = `<p style="text-align:center;">No products found.</p>`;
      return;
    }

    products.forEach((p) => {
      const card = document.createElement("div");
      card.classList.add("product-card");
      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}" />
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <p><strong>₹${p.price}</strong></p>
        <button class="add-to-cart">Add to Cart</button>
      `;
      productList.appendChild(card);
    });
  };

  // Fetch & show all products initially
  let allProducts = await fetchProducts();
  displayProducts(allProducts);

  // 🔍 Search Functionality
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");

  const searchProducts = () => {
    const query = searchInput.value.toLowerCase();
    const filtered = allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );
    displayProducts(filtered);
  };

  searchBtn.addEventListener("click", searchProducts);
  searchInput.addEventListener("input", searchProducts);
});

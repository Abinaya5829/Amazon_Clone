document.addEventListener('DOMContentLoaded', () => {
  const cartItemsContainer = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  function renderCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
      cart.forEach(item => {
        total += item.price;

        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <h4>${item.name}</h4>
          <p>₹${item.price}</p>
          <button class="remove-btn" data-name="${item.name}">Remove</button>
        `;
        cartItemsContainer.appendChild(div);
      });
    }

    cartTotal.textContent = `Total: ₹${total}`;
  }

  cartItemsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
      const name = e.target.dataset.name;
      cart = cart.filter(item => item.name !== name);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    }
  });

  renderCart();
});

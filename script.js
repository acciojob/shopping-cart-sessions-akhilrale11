// Product Data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM Selectors
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Initialize cart from sessionStorage or create an empty array
let cart = JSON.parse(sessionStorage.getItem("shoppingCart")) || [];

// Render the products list
function renderProducts() {
  productList.innerHTML = "";
  products.forEach((product) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      ${product.name} - $${product.price} 
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(listItem);
  });
}

// Render the shopping cart
function renderCart() {
  cartList.innerHTML = "";
  if (cart.length === 0) {
    cartList.innerHTML = "<li>Your cart is empty.</li>";
    return;
  }
  cart.forEach((item) => {
    const cartItem = document.createElement("li");
    cartItem.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(cartItem);
  });
}

// Add a product to the cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    cart.push(product);
    sessionStorage.setItem("shoppingCart", JSON.stringify(cart));
    renderCart();
  }
}

// Clear the cart
function clearCart() {
  cart = [];
  sessionStorage.setItem("shoppingCart", JSON.stringify(cart));
  renderCart();
}

// Event Listener for clearing the cart
clearCartBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();

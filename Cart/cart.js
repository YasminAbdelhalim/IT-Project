function product_qty_inc(button) {
  const productDiv = button.closest(".products");
  const qtySpan = productDiv.querySelector(".qty");
  const name = productDiv.querySelector("h5").textContent.trim();
  let currentQty = parseInt(qtySpan.textContent.replace(/\D/g, "")) || 0;
  currentQty += 1;
  qtySpan.textContent = "Quantity: " + currentQty;
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const index = cart.findIndex(p => p.name === name);
  if (index !== -1) {
    cart[index].quantity = currentQty;
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  updateTotal();
  updateCartCount();
}

function product_qty_dec(button) {
  const productDiv = button.closest(".products");
  const qtySpan = productDiv.querySelector(".qty");
  const name = productDiv.querySelector("h5").textContent.trim();
  let currentQty = parseInt(qtySpan.textContent.replace(/\D/g, "")) || 0;
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const index = cart.findIndex(p => p.name === name);
  if (index !== -1) {
    currentQty -= 1;
    if (currentQty < 1) {
      cart.splice(index, 1);
      productDiv.remove();
      if_empty();
    } else {
      cart[index].quantity = currentQty;
      qtySpan.textContent = "Quantity: " + currentQty;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateTotal();
    updateCartCount();
  }
}


function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const index = cart.findIndex(p => p.name === product.name);
  if (index !== -1) {
    cart[index].quantity = (cart[index].quantity || 1) + 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Product Added To Cart!");
}

function if_empty() {
  const d = document.getElementById("d");
  const d1 = document.getElementById("d1");
  const d2 = document.getElementById("d2");
  const form = document.getElementsByClassName("payment")[0];
  const products = document.querySelectorAll(".products");
  const message = document.getElementById("empty");
  const buy = document.getElementsByClassName("buy")[0];
  
  if (products.length === 0) {
    message.style.display = "block";
    form.style.display = "none";
    d1.style.display = "none";
    d2.style.display = "none";
    d.style.display = "none";
    buy.style.display = "none";
    localStorage.clear();
  }
}

function updateTotal() {
  const products = document.querySelectorAll(".products");
  let total = 0;
  
  products.forEach(product => {
    const priceText = product.querySelector("h6").textContent;
    const price = parseFloat(priceText.replace(/[^\d.]/g, ""));
    const qtyText = product.querySelector(".qty").textContent;
    const qty = parseInt(qtyText.replace(/\D/g, "")) || 0;
    
    total += price * qty;
  });
  
  document.getElementById("total_price").textContent = total.toFixed(2);
}

function checkout(button) {
  const buy = document.getElementsByClassName("buy")[0];
  const form = document.getElementById("card");
  const d2 = document.getElementById("d2");
  
  buy.style.display = "none";
  d2.style.display = "block";
  form.style.display = "grid";
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".products_container");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  if (cart.length === 0) {
    if_empty();
    return;
  }
  
  let total = 0;
  
  cart.forEach(product => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("products");
    productDiv.innerHTML = `
      <img class="product_img" src="${product.image}" alt="product img">
      <div class="product_details">
        <h5>${product.name}</h5>
        <h6>${product.price.toFixed(2)} EGP</h6>
        <div class="qty_ctrl">
          <button class="qty_ctrl_dec" onclick="product_qty_dec(this)">-</button>
          <span class="qty">Quantity: ${product.quantity || 1}</span>
          <button class="qty_ctrl_inc" onclick="product_qty_inc(this)">+</button>
        </div>
      </div>
    `;
    container.appendChild(productDiv);
    total += product.price * (product.quantity || 1);
  });
  
  document.getElementById("total_price").textContent = total.toFixed(2);
});
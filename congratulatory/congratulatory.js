    function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    const existingProduct = cart.find(item => item.name === product.name);
    
    if (existingProduct) {
        existingProduct.quantity = (existingProduct.quantity || 1) + 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
       
    }  
    

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    
    const addToCartButtons = document.querySelectorAll(".button");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const product = {
                name: button.dataset.name,
                price: parseFloat(button.dataset.price),
                image: button.dataset.image
            };
            
            addToCart(product);
            updateCartCount();
        
             
            const tooltip = button.querySelector(".massage");
    if (tooltip) {
      tooltip.style.opacity = 1;
      setTimeout(() => {
        tooltip.style.opacity = 0;
      }, 2000);
    }
        });
    });
       
      
    
    
    
    const buyNowButtons = document.querySelectorAll(".new");
    buyNowButtons.forEach(button => {
        button.addEventListener("click", () => {
            const product = {
                name: button.dataset.name,
                price: parseFloat(button.dataset.price),
                image: button.dataset.image
            };
            
            addToCart(product);
            updateCartCount();
            window.location.href = "../cart/cart.html";
        });
    });
});

const updateCartCount = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.querySelector('.cart-count').textContent = cart.reduce((total, item) => total + (item.quantity || 1), 0);
};
    
const searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    const flowerItems = document.querySelectorAll('.flower-item');
    flowerItems.forEach(item => {
      const flowerName = item.querySelector('.name').textContent.toLowerCase();
      const priceText = item.querySelector('.price').textContent.toLowerCase();
      if (flowerName.includes(searchTerm) || priceText.includes(searchTerm)) {
        item.style.display = 'inline-block';
      } else {
        item.style.display = 'none';
      }
    });
  });
}
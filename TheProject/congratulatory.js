document.addEventListener('DOMContentLoaded', function () {
    const cartCount = document.querySelector('.cart-count');
    const addToCartButtons = document.querySelectorAll('.button');
    const buyNowButtons = document.querySelectorAll('.new');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();
    renderCartControls();
    
    function updateCartCount() {  
        const count = cart.reduce((total, item) => total + item.quantity, 0);  
        cartCount.textContent = count;  
        cartCount.style.display = count > 0 ? 'inline-block' : 'none';  
    }  
    
    function addToCart(productId, productName, productPrice) {  
        const existingItem = cart.find(item => item.id === productId);  
        if (existingItem) {  
            existingItem.quantity += 1;  
        } else {  
            cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });  
        }  
        localStorage.setItem('cart', JSON.stringify(cart));  
        updateCartCount();  
        showNotification(`${productName} added to cart`);  
        renderCartControls();  
    }  
    
    function removeFromCart(productId) {  
        cart = cart.filter(item => item.id !== productId);  
        localStorage.setItem('cart', JSON.stringify(cart));  
        updateCartCount();  
        renderCartControls();  
    }  
    
    function changeQuantity(productId, delta) {  
        const item = cart.find(item => item.id === productId);  
        if (item) {  
            item.quantity += delta;  
            if (item.quantity <= 0) {  
                removeFromCart(productId);  
            } else {  
                localStorage.setItem('cart', JSON.stringify(cart));  
                updateCartCount();  
                renderCartControls();  
            }  
        }  
    }  
    
    function renderCartControls() {  
        const cartContainer = document.querySelector('#cart-controls');  
        if (!cartContainer) return;  
        cartContainer.innerHTML = '';  
        console.log('Rendering cart controls...', cart);  
        cart.forEach(item => {  
            const div = document.createElement('div');  
            div.className = 'cart-item';  
            div.innerHTML = `  
                <span>${item.name} (${item.quantity})</span>  
                <button class="change-qty" data-id="${item.id}" data-delta="1">+</button>  
                <button class="change-qty" data-id="${item.id}" data-delta="-1">-</button>  
                <button class="remove-item" data-id="${item.id}">X</button>  
            `;  
            cartContainer.appendChild(div);  
        });  
    
        document.querySelectorAll('.change-qty').forEach(btn => {  
            btn.addEventListener('click', function () {  
                const id = this.dataset.id;  
                const delta = parseInt(this.dataset.delta);  
                changeQuantity(id, delta);  
            });  
        });  
    
        document.querySelectorAll('.remove-item').forEach(btn => {  
            btn.addEventListener('click', function () {  
                const id = this.dataset.id;  
                removeFromCart(id);  
            });  
        });  
    }  
    
    function showNotification(message) {  
        const notification = document.createElement('div');  
        notification.className = 'notification';  
        notification.textContent = message;  
        document.body.appendChild(notification);  
        setTimeout(() => {  
            notification.classList.add('fade-out');  
            setTimeout(() => notification.remove(), 300);  
        }, 2000);  
    }  
    
    addToCartButtons.forEach(button => {  
        button.addEventListener('click', function () {  
            const productItem = this.closest('.flower-item');  
            const productId = productItem.dataset.id;  
            const productName = productItem.querySelector('.name').textContent;  
            const productPrice = parseFloat(productItem.querySelector('.price').textContent.replace(/[^0-9.]/g, ''));  
            addToCart(productId, productName, productPrice);  
        });  
    });  
    
    buyNowButtons.forEach(button => {  
        button.addEventListener('click', function () {  
            const productItem = this.closest('.flower-item');  
            const productId = productItem.dataset.id;  
            const productName = productItem.querySelector('.name').textContent;  
            const productPrice = parseFloat(productItem.querySelector('.price').textContent.replace(/[^0-9.]/g, ''));  
            addToCart(productId, productName, productPrice);  
            setTimeout(() => {  
                window.location.href = 'cart.html';  
            }, 500);  
        });  
    });  
    
     
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
    
    });
    
    
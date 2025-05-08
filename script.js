const buyButtons = document.querySelectorAll('.buy-now');

buyButtons.forEach(button => {
    button.addEventListener('click', () => {
        alert("Product added to your cart!"); 
    });
});

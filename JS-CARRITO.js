document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const modal = document.getElementById('cart-modal');
    const closeModal = document.querySelector('.close');

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const productCard = event.target.closest('.product-card');
            const productName = productCard.dataset.name;
            const productPrice = parseFloat(productCard.dataset.price);

            const product = { name: productName, price: productPrice };
            cart.push(product);
            updateCart();
            modal.style.display = 'block';
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    function updateCart() {
        cartItems.innerHTML = '';
        let totalPrice = 0;

        cart.forEach((product, index) => {
            const li = document.createElement('li');
            li.textContent = `${product.name} - $${product.price.toFixed(2)}`;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Oprime encima para eliminar';
            removeButton.addEventListener('click', () => {
                cart.splice(index, 1);
                updateCart();
            });
            li.appendChild(removeButton);
            cartItems.appendChild(li);
            totalPrice += product.price;
        });

        totalPriceElement.textContent = totalPrice.toFixed(2);
    }
});

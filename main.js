function loadCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    return carrito;
}

function saveCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function updateCarritoView() {
    const carritoItems = document.getElementById('carrito-items');
    const totalPrice = document.getElementById('total-price');
    carritoItems.innerHTML = '';
    const carrito = loadCarrito();
    let total = 0;

    carrito.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        carritoItems.appendChild(li);
        total += item.price;
    });

    totalPrice.textContent = `Total: $${total}`;
}

// Función para agregar un producto al carrito
function addToCarrito(producto) {
    const carrito = loadCarrito();
    carrito.push(producto);
    saveCarrito(carrito);
    updateCarritoView();
}

// Función para vaciar el carrito
function clearCarrito() {
    localStorage.removeItem('carrito');
    updateCarritoView();
}

// Evento para agregar productos al carrito
document.addEventListener('DOMContentLoaded', () => {
    const addToCarritoButtons = document.querySelectorAll('.add-to-carrito');

    addToCarritoButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productoElement = event.target.closest('.producto');
            const productoName = productoElement.getAttribute('data-name');
            const productoPrice = parseFloat(productoElement.getAttribute('data-price'));

            const producto = {
                name: productoName,
                price: productoPrice
            };

            addToCarrito(producto);
        });
    });

    // Evento para vaciar el carrito
    const clearCarritoButton = document.getElementById('clear-carrito');
    clearCarritoButton.addEventListener('click', clearCarrito);

    updateCarritoView();
});
// Функция для добавления товара в корзину
function addToCart(setId) {
    // Получаем текущую корзину из localStorage
    let cart = JSON.parse(localStorage.getItem('buffalo_cart')) || [];
    
    // Найти товар в массиве сетов
    const setToAdd = sets.find(set => set.id === setId);
    
    if (setToAdd) {
        // Проверяем, есть ли уже такой товар в корзине
        const existingItemIndex = cart.findIndex(item => item.id === setId);
        
        if (existingItemIndex > -1) {
            // Если товар уже есть, увеличиваем количество
            cart[existingItemIndex].quantity += 1;
        } else {
            // Если товара нет, добавляем его с количеством 1
            cart.push({
                id: setToAdd.id,
                title: setToAdd.title,
                price: setToAdd.price,
                image: setToAdd.image,
                quantity: 1
            });
        }
        
        // Сохраняем обновленную корзину в localStorage
        localStorage.setItem('buffalo_cart', JSON.stringify(cart));
    }
}

// Функция для обновления счетчика товаров в корзине
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('buffalo_cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

// Функция для отображения содержимого корзины на странице корзины
function displayCart() {
    const cartItemsContainer = document.querySelector('.cart-items');
    if (!cartItemsContainer) return; // Если мы не на странице корзины
    
    const cart = JSON.parse(localStorage.getItem('buffalo_cart')) || [];
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Ваша корзина пуста</p>';
        document.querySelector('.cart-total').textContent = '0 ₽';
        document.querySelector('.checkout-button').disabled = true;
        return;
    }
    
    let cartHTML = '';
    let totalPrice = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        
        cartHTML += `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="cart-item-details">
                    <h3 class="cart-item-title">${item.title}</h3>
                    <p class="cart-item-price">${item.price} ₽</p>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                </div>
                <div class="cart-item-total">
                    <p>${itemTotal} ₽</p>
                </div>
                <div class="cart-item-remove">
                    <button class="remove-btn" data-id="${item.id}">×</button>
                </div>
            </div>
        `;
    });
    
    cartItemsContainer.innerHTML = cartHTML;
    document.querySelector('.cart-total').textContent = `${totalPrice} ₽`;
    
    // Добавляем обработчики для кнопок изменения количества и удаления
    document.querySelectorAll('.quantity-btn.minus').forEach(button => {
        button.addEventListener('click', decreaseQuantity);
    });
    
    document.querySelectorAll('.quantity-btn.plus').forEach(button => {
        button.addEventListener('click', increaseQuantity);
    });
    
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}

// Функция для уменьшения количества товара
function decreaseQuantity(event) {
    const setId = parseInt(event.target.getAttribute('data-id'));
    let cart = JSON.parse(localStorage.getItem('buffalo_cart')) || [];
    
    const itemIndex = cart.findIndex(item => item.id === setId);
    
    if (itemIndex > -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
        } else {
            cart.splice(itemIndex, 1);
        }
        
        localStorage.setItem('buffalo_cart', JSON.stringify(cart));
        displayCart();
        updateCartCount();
    }
}

// Функция для увеличения количества товара
function increaseQuantity(event) {
    const setId = parseInt(event.target.getAttribute('data-id'));
    let cart = JSON.parse(localStorage.getItem('buffalo_cart')) || [];
    
    const itemIndex = cart.findIndex(item => item.id === setId);
    
    if (itemIndex > -1) {
        cart[itemIndex].quantity += 1;
        localStorage.setItem('buffalo_cart', JSON.stringify(cart));
        displayCart();
        updateCartCount();
    }
}

// Функция для удаления товара из корзины
function removeFromCart(event) {
    const setId = parseInt(event.target.getAttribute('data-id'));
    let cart = JSON.parse(localStorage.getItem('buffalo_cart')) || [];
    
    const updatedCart = cart.filter(item => item.id !== setId);
    localStorage.setItem('buffalo_cart', JSON.stringify(updatedCart));
    
    displayCart();
    updateCartCount();
}

// Инициализация корзины при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
    displayCart();
    
    // Обработчик отправки формы заказа
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', placeOrder);
    }
});

// Функция оформления заказа
function placeOrder(event) {
    event.preventDefault();
    
    const cart = JSON.parse(localStorage.getItem('buffalo_cart')) || [];
    if (cart.length === 0) return;
    
    const name = document.getElementById('customer-name').value;
    const phone = document.getElementById('customer-phone').value;
    const address = document.getElementById('customer-address').value;
    const payment = document.querySelector('input[name="payment"]:checked').value;
    const comment = document.getElementById('order-comment').value;
    
    // Формируем текст заказа
    let orderItems = '';
    let totalPrice = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        orderItems += `${item.title} x ${item.quantity} = ${itemTotal} ₽\n`;
    });
    
    const orderDetails = `
Новый заказ от ${name}!

Товары:
${orderItems}

Общая сумма: ${totalPrice} ₽

Информация о клиенте:
Имя: ${name}
Телефон: ${phone}
Адрес доставки: ${address}
Способ оплаты: ${payment}
Комментарий: ${comment}
    `;
    
    // Здесь в реальном проекте был бы код отправки заказа на сервер
    // Поскольку мы используем GitHub Pages (статический хостинг),
    // мы будем использовать сервис FormSubmit для отправки данных заказа на email
    
    alert('Спасибо за заказ! Мы свяжемся с вами в ближайшее время.');
    
    // Очищаем корзину после успешного заказа
    localStorage.removeItem('buffalo_cart');
    updateCartCount();
    
    // Перенаправляем на главную страницу
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

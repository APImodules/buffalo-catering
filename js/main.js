const sets = [
    {
        id: 1,
        title: "Большой сет",
        description: "Клаб сэндвич с беконом, Клаб сэндвич с лососем, Клаб сэндвич с курицей и грибами, Клаб сэндвич с яйцом и майонезом, Греч. чебурек с говядиной, Пирожок с яблоком, Самса с курицей, Слойка с сыром",
        price: 2800,
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        title: "Маленький сет",
        description: "Чебурек говяжий, тесто фило, Чебурек телячий, тесто фило, Чебурек бараний, тесто фило, Чебурек с сыром и зеленью, тесто фило",
        price: 1400,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        title: "Сет для пикника",
        description: "Мини-эклеры с черной смородиной 6 шт., Мини-эклеры с карамелью 6 шт., Сырники с джемом 3 шт., Фруктовая корзина.",
        price: 1850,
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        title: "Сет для вечеринки",
        description: "Мини-бургер с говяжьей котлетой 3 шт., Мини-бургер с куриной котлетой 3 шт., Картофель фри, Наггетсы, Соус сырный, Соус барбекю",
        price: 2100,
        image: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        title: "Сет завтраков",
        description: "Сырники со сметаной и джемом, Круассан с шоколадом, Фруктовый салат, Омлет с овощами, Тосты с авокадо",
        price: 1650,
        image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        title: "Овощной сет",
        description: "Овощные палочки с хумусом, Греческий салат, Овощной рулет, Фалафель с соусом тахини, Запеченные овощи",
        price: 1500,
        image: "https://images.unsplash.com/photo-1561043433-aaf687c4cf04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80"
    }
];

// Функция для отображения сетов на странице
function displaySets() {
    const setsContainer = document.querySelector('.sets-container');
    
    sets.forEach(set => {
        const setCard = document.createElement('div');
        setCard.classList.add('set-card');
        
        setCard.innerHTML = `
            <div class="set-image">
                <img src="${set.image}" alt="${set.title}">
            </div>
            <div class="set-details">
                <h3 class="set-title">${set.title}</h3>
                <p class="set-description">${set.description}</p>
                <p class="set-price">${set.price} ₽</p>
                <button class="btn-add-to-cart" data-id="${set.id}">Добавить в корзину</button>
            </div>
        `;
        
        setsContainer.appendChild(setCard);
    });
    
    // Добавляем обработчики для кнопок "Добавить в корзину"
    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
        button.addEventListener('click', addToCartHandler);
    });
}

// Обработчик для кнопок "Добавить в корзину"
function addToCartHandler(event) {
    const setId = parseInt(event.target.getAttribute('data-id'));
    addToCart(setId);
    updateCartCount();
    
    // Анимация добавления в корзину
    const button = event.target;
    button.textContent = 'Добавлено!';
    button.style.backgroundColor = '#28a745';
    
    setTimeout(() => {
        button.textContent = 'Добавить в корзину';
        button.style.backgroundColor = '';
    }, 1000);
}

// Инициализация при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
    displaySets();
    updateCartCount();
});
```

4. Нажмите "Commit new file" внизу страницы

### 3.2 Создание cart.js

1. В вашем репозитории нажмите "Add file" и выберите "Create new file"
2. Назовите файл `js/cart.js`
3. Скопируйте и вставьте следующий код:

```javascript
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
    
    

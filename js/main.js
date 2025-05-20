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

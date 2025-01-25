import { cartMove } from './js/cart.js';
import { smoothScroll } from './js/shelves.js'


// Анимация для корзины
cartMove('50%', 500);

// Анимация для стеложей
setTimeout(() => {
  smoothScroll(0, 1500);
}, 500);

const productMilk = document.getElementById("product-milk");
const productCart = document.getElementById("product-cart");
const cartMilk = document.getElementById("cart-milk");

let isDragging = false;

// Начало перетаскивания
productMilk.addEventListener("dragstart", (e) => {
    isDragging = true;
    setTimeout(() => {
        productMilk.style.visibility = "hidden"; // Сделаем картинку невидимой в процессе перетаскивания
    }, 0);
});

// Перетаскивание
productCart.addEventListener("dragover", (e) => {
    e.preventDefault(); // Разрешаем перетаскивание
});

// Завершение перетаскивания
productCart.addEventListener("drop", (e) => {
    e.preventDefault();

    if (isDragging) {
        isDragging = false;
        productMilk.style.visibility = "visible"; // Восстановим видимость картинки
        cartMilk.appendChild(productMilk); // Добавляем картинку в корзину
        productMilk.style.position = "absolute"; // Убираем ее от потока документа
        productMilk.style.left = "0px";
        productMilk.style.top = "0px";
    }
});

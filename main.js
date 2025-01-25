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
let offsetX, offsetY;

// Начало перетаскивания (для десктопа и мобильных устройств)
const startDrag = (e) => {
    isDragging = true;
    e.preventDefault();
    offsetX = e.clientX || e.touches[0].clientX;
    offsetY = e.clientY || e.touches[0].clientY;
};

// Перемещение элемента (для десктопа и мобильных устройств)
const dragMove = (e) => {
    if (isDragging) {
        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;
        const moveX = clientX - offsetX;
        const moveY = clientY - offsetY;
        productMilk.style.position = "absolute";
        productMilk.style.left = `${moveX}px`;
        productMilk.style.top = `${moveY}px`;
    }
};

// Завершение перетаскивания (для десктопа и мобильных устройств)
const endDrag = (e) => {
    if (isDragging) {
        isDragging = false;
        productMilk.style.visibility = "visible"; // Восстановим видимость картинки

        // Проверяем, попала ли картинка в корзину
        const cartRect = productCart.getBoundingClientRect();
        const milkRect = productMilk.getBoundingClientRect();

        if (
            milkRect.left >= cartRect.left &&
            milkRect.top >= cartRect.top &&
            milkRect.right <= cartRect.right &&
            milkRect.bottom <= cartRect.bottom
        ) {
            cartMilk.appendChild(productMilk); // Добавляем картинку в корзину
            productMilk.style.left = "0px";
            productMilk.style.top = "0px";
        } else {
            // Если не попала в зону, возвращаем на исходное место
            productMilk.style.left = "0px";
            productMilk.style.top = "0px";
        }
    }
};

// Слушатели для десктопа
productMilk.addEventListener("mousedown", startDrag);
document.addEventListener("mousemove", dragMove);
document.addEventListener("mouseup", endDrag);

// Слушатели для мобильных устройств
productMilk.addEventListener("touchstart", startDrag);
document.addEventListener("touchmove", dragMove);
document.addEventListener("touchend", endDrag);

// Перетаскивание на область корзины
productCart.addEventListener("dragover", (e) => {
    e.preventDefault(); // Разрешаем перетаскивание
});

productCart.addEventListener("drop", (e) => {
    e.preventDefault();
});

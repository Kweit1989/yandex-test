import { initDesktopHandlers } from "./descktop_device/desktopHandlers.js";
import { initTouchHandlers } from "./touch_device/touchHandlers.js";
import { products } from "./products.js";

export function initializeApp() {
    const productCart = document.getElementById("product-cart");
    const paymentButton = document.getElementById("payment-button");
    let countCart = 0;

    // Массив с настройками продуктов

    
    // Функция для обновления стиля кнопки
    const updatePaymentButton = () => {
        if (countCart >= 3) {
            paymentButton.style.display = "block";
        } else {
            paymentButton.style.display = "none";
        }
    };

    // Обновляем стиль кнопки изначально
    updatePaymentButton();

    // Функция для обновления счетчика корзины
    const updateCount = (change) => {
        countCart += change; // Увеличиваем или уменьшаем счетчик
        updatePaymentButton(); // Обновляем стиль кнопки
    };


    products.forEach((product) => {
        // Инициализация для десктопов
        initDesktopHandlers(product, productCart, updateCount);

        // Инициализация для мобильных устройств
        initTouchHandlers(product, productCart, updateCount);
    });
}

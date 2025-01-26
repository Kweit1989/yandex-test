import { initDesktopHandlers } from "./descktop_device/desktopHandlers.js";
import { initTouchHandlers } from "./touch_device/touchHandlers.js";

export function initializeApp() {
    const productCart = document.getElementById("product-cart");

    // Массив с настройками продуктов
    const products = [
        {
            id: "milk",
            element: "product-milk",
            cart: "cart-milk",
            shelf: "container-milk",
            state: {
                isDragging: false,
                startX: 0,
                startY: 0,
                offsetX: 0,
                offsetY: 0,
            },
        },
        {
            id: "banana",
            element: "product-banana",
            cart: "cart-banana",
            shelf: "container-banana",
            state: {
                isDragging: false,
                startX: 0,
                startY: 0,
                offsetX: 0,
                offsetY: 0,
            },
        },
    ];
    

    products.forEach((product) => {
        // Инициализация для десктопов
        initDesktopHandlers(product, productCart);

        // Инициализация для мобильных устройств
        initTouchHandlers(product, productCart);
    });

    // Поддержка dragover и drop для корзины
    productCart.addEventListener("dragover", (e) => e.preventDefault());
    productCart.addEventListener("drop", (e) => e.preventDefault());
}

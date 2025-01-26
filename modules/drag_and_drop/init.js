import { initDesktopHandlers } from "./descktop_device/desktopHandlers.js";
import { initTouchHandlers } from "./touch_device/touchHandlers.js";

export function initializeApp() {
    const productMilk = document.getElementById("product-milk");
    const productCart = document.getElementById("product-cart");
    const cartMilk = document.getElementById("cart-milk");
    const shelfMilk = document.getElementById("container-milk");

    // Инициализация для десктопов
    initDesktopHandlers(productMilk, productCart, cartMilk, shelfMilk);

    // Инициализация для мобильных устройств
    initTouchHandlers(productMilk, productCart, cartMilk, shelfMilk);

    // Поддержка dragover и drop для корзины
    productCart.addEventListener("dragover", (e) => e.preventDefault());
    productCart.addEventListener("drop", (e) => e.preventDefault());
}

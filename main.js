// Подключение модулей
import { cartMove } from './modules/cart.js';
import { smoothScroll } from './modules/shelves.js'
import { initializeApp } from './modules/drag_and_drop/init.js'


// Анимация для корзины
cartMove('50%', 500);

// Анимация для стеложей
setTimeout(() => {
  smoothScroll(0, 1500);
}, 500);

// Перетаскивание продуктов
initializeApp();


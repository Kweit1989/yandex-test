import { cartMove } from './js/cart.js';
import { smoothScroll } from './js/shelves.js'


// Анимация для корзины
cartMove('50%', 500);

// Анимация для стеложей
setTimeout(() => {
  smoothScroll(0, 1500);
}, 500);

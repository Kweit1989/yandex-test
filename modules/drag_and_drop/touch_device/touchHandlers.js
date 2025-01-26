import { startDrag, dragMove, endDrag } from "../dragAndDrop.js";

export const initTouchHandlers = (product, productCart) => {
    const productElement = document.getElementById(product.element);
    productElement.addEventListener("touchstart", (e) => startDrag(e, product));
    document.addEventListener("touchmove", (e) => dragMove(e, product));
    document.addEventListener("touchend", (e) => endDrag(e, product, productCart));
};

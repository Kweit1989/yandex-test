import { startDrag, dragMove, endDrag } from "../dragAndDrop.js";

export const initDesktopHandlers = (product, productCart, updateCount) => {
    const productElement = document.getElementById(product.element);
    productElement.addEventListener("mousedown", (e) => startDrag(e, product));
    document.addEventListener("mousemove", (e) => dragMove(e, product));
    document.addEventListener("mouseup", (e) => endDrag(e, product, productCart, updateCount));;
};

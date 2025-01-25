import { startDrag, dragMove, endDrag } from "../dragAndDrop.js";

export const initTouchHandlers = (productMilk, productCart, cartMilk) => {
    productMilk.addEventListener("touchstart", (e) => startDrag(e, productMilk));
    document.addEventListener("touchmove", (e) => dragMove(e, productMilk));
    document.addEventListener("touchend", (e) => endDrag(e, productMilk, productCart, cartMilk));
};

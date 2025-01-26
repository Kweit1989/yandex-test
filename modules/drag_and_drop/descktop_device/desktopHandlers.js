import { startDrag, dragMove, endDrag } from "../dragAndDrop.js";

export const initDesktopHandlers = (productMilk, productCart, cartMilk, shelfMilk) => {
    productMilk.addEventListener("mousedown", (e) => startDrag(e, productMilk));
    document.addEventListener("mousemove", (e) => dragMove(e, productMilk));
    document.addEventListener("mouseup", (e) => endDrag(e, productMilk, productCart, cartMilk, shelfMilk));
};

export let isDragging = false;
export let offsetX, offsetY;

export const startDrag = (e, productMilk) => {
    isDragging = true;
    e.preventDefault();
    offsetX = e.clientX || e.touches[0].clientX;
    offsetY = e.clientY || e.touches[0].clientY;
};

export const dragMove = (e, productMilk) => {
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

export const endDrag = (e, productMilk, productCart, cartMilk) => {
    if (isDragging) {
        isDragging = false;
        
        const cartRect = productCart.getBoundingClientRect();
        const milkRect = productMilk.getBoundingClientRect();

        if (
            milkRect.left >= cartRect.left &&
            milkRect.top >= cartRect.top &&
            milkRect.right <= cartRect.right &&
            milkRect.bottom <= cartRect.bottom
        ) {
            cartMilk.appendChild(productMilk);
            productMilk.style.left = "0px";
            productMilk.style.top = "0px";
        } else {
            productMilk.style.left = "0px";
            productMilk.style.top = "0px";
        }
    }
};

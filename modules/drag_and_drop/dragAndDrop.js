export let isDragging = false;
export let offsetX, offsetY;
let startX, startY; // Начальные координаты касания

export const startDrag = (e, productMilk) => {
    isDragging = true;
    e.preventDefault();

    // Сохраняем начальные координаты
    startX = e.clientX || e.touches[0].clientX;
    startY = e.clientY || e.touches[0].clientY;

    offsetX = startX;
    offsetY = startY;
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

export const endDrag = (e, productMilk, productCart, cartMilk, shelfMilk) => {
    if (isDragging) {
        isDragging = false;

        const endX = e.clientX || (e.changedTouches ? e.changedTouches[0].clientX : 0);
        const endY = e.clientY || (e.changedTouches ? e.changedTouches[0].clientY : 0);

        const deltaX = Math.abs(endX - startX);
        const deltaY = Math.abs(endY - startY);

        // Если движение минимальное, считаем это кликом
        if (deltaX < 10 && deltaY < 10) {
            // Вернуть продукт на полку
            if (productMilk.parentElement === cartMilk) {
                shelfMilk.appendChild(productMilk);
                productMilk.style.position = "";
                productMilk.style.left = "";
                productMilk.style.top = "";
            }
        } else {
            // Обработка drop
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
    }
};
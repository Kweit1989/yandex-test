export const startDrag = (e, product) => {
    const state = product.state;
    const productElement = document.getElementById(product.element);

    if (e.cancelable) {
        e.preventDefault();
    }
    state.isDragging = true;

    state.startX = e.clientX || e.touches[0].clientX;
    state.startY = e.clientY || e.touches[0].clientY;

    state.offsetX = state.startX;
    state.offsetY = state.startY;

    productElement.addEventListener("touchend", (event) => handleClickOrDrag(event, product));
    productElement.addEventListener("mouseup", (event) => handleClickOrDrag(event, product));
};

export const dragMove = (e, product) => {
    const state = product.state;
    const productElement = document.getElementById(product.element);

    if (state.isDragging) {
        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;

        const moveX = clientX - state.offsetX;
        const moveY = clientY - state.offsetY;

        productElement.style.position = "absolute";
        productElement.style.left = `${moveX}px`;
        productElement.style.top = `${moveY}px`;
    }
};

export const endDrag = (e, product, productCart) => {
    const state = product.state;
    const productElement = document.getElementById(product.element);
    const cartElement = document.getElementById(product.cart);
    const shelfElement = document.getElementById(product.shelf);

    if (state.isDragging) {
        state.isDragging = false;

        const endX = e.clientX || (e.changedTouches ? e.changedTouches[0].clientX : 0);
        const endY = e.clientY || (e.changedTouches ? e.changedTouches[0].clientY : 0);

        const deltaX = Math.abs(endX - state.startX);
        const deltaY = Math.abs(endY - state.startY);

        // Удаляем временное событие
        productElement.removeEventListener("touchend", (event) => handleClickOrDrag(event, product));
        productElement.removeEventListener("mouseup", (event) => handleClickOrDrag(event, product));

        // Если движение минимальное, это считается кликом
        if (deltaX < 10 && deltaY < 10) {
            handleAddOrRemove(product, cartElement, shelfElement); // Обрабатываем клик
        } else {
            // Проверяем, было ли перетаскивание в корзину
            const cartRect = productCart.getBoundingClientRect();
            const productRect = productElement.getBoundingClientRect();

            if (
                productRect.left >= cartRect.left &&
                productRect.top >= cartRect.top &&
                productRect.right <= cartRect.right &&
                productRect.bottom <= cartRect.bottom
            ) {
                handleAddToCart(product, cartElement); // Добавляем в корзину при дропе
            } else {
                productElement.style.left = "0px";
                productElement.style.top = "0px";
            }
        }
    }
};

const handleClickOrDrag = (e, product) => {
    const productElement = document.getElementById(product.element);
    const cartElement = document.getElementById(product.cart);
    const shelfElement = document.getElementById(product.shelf);

    if (!product.state.isDragging) {
        handleAddOrRemove(product, cartElement, shelfElement);
    }
};

const handleAddToCart = (product, cartElement) => {
    const productElement = document.getElementById(product.element);
    cartElement.appendChild(productElement);
    productElement.style.position = "absolute";
    productElement.style.left = "0px";
    productElement.style.top = "0px";
};

const handleReturnToShelf = (product, shelfElement) => {
    const productElement = document.getElementById(product.element);
    shelfElement.appendChild(productElement);
    productElement.style.position = "";
    productElement.style.left = "";
    productElement.style.top = "";
};

const handleAddOrRemove = (product, cartElement, shelfElement) => {
    const productElement = document.getElementById(product.element);

    if (productElement.parentElement === cartElement) {
        handleReturnToShelf(product, shelfElement); // Возвращаем на полку
    } else {
        handleAddToCart(product, cartElement); // Добавляем в корзину
    }
};

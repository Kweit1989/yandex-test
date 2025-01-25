export function cartMove(leftValue = '50%', delay = 500){
    const cart = document.getElementById('cart');

    if (cart){
        setTimeout(() => {
            cart.style.left = leftValue;
        }, delay);
        return true;
    } else {
        console.error('Элемент с ID "cart" не найден. Проверьте структуру HTML.');
        return false;
    }
} 
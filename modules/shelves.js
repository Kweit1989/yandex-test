const container = document.querySelector('.product-row');

// Перематываем к последнему элементу
container.scrollLeft = container.scrollWidth - container.clientWidth;

// Функция для плавной прокрутки
export function smoothScroll(targetPosition, duration) {
  const startPosition = container.scrollLeft;
  const distance = targetPosition - startPosition;
  const startTime = performance.now();

  function animation(currentTime) {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1); // Ограничиваем прогресс до 1
    const ease = progress < 0.5
      ? 2 * progress * progress
      : -1 + (4 - 2 * progress) * progress; // Ease-in-out

    container.scrollLeft = startPosition + distance * ease;

    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

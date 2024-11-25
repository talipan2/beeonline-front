export const smoothScroll = (targetOffset, duration = 1000) => {
  const start = window.scrollY;
  const distance = targetOffset - start;
  let startTime = null;

  const step = (currentTime) => {
    if (!startTime) startTime = currentTime;
    const progress = currentTime - startTime;

    // Эффект замедления
    const easing = (time) => time < 0.5 ? 2 * time * time : 1 - Math.pow(-2 * time + 2, 2) / 2;

    const percentage = Math.min(progress / duration, 1); // Доля завершения
    const easedProgress = easing(percentage); // Применяем easing
    const scrollPosition = start + distance * easedProgress;

    window.scrollTo(0, scrollPosition);

    if (progress < duration) {
      requestAnimationFrame(step); // Продолжение анимации
    }
  };

  requestAnimationFrame(step);
};
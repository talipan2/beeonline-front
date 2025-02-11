export const smoothScroll = (() => {
  let lastTargetOffset = null; // Локальная область видимости
  return (targetOffset, animation = true, duration = 1000) => {
    if (!animation) {
      window.scrollTo(0, targetOffset);
      return;
    }

    if (lastTargetOffset !== null && lastTargetOffset === targetOffset) return // Если новое значение такое же как предыдущее, то отменяем скролл

    lastTargetOffset = targetOffset;

    const start = window.scrollY;
    const distance = targetOffset - start;
    let startTime = null;

    const step = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = currentTime - startTime;

      // Эффект замедления
      const easing = (time) =>
        time < 0.5 ? 2 * time * time : 1 - Math.pow(-2 * time + 2, 2) / 2;

      const percentage = Math.min(progress / duration, 1);
      const easedProgress = easing(percentage);
      const scrollPosition = start + distance * easedProgress;

      window.scrollTo(0, scrollPosition);

      if (progress < duration) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };
})();
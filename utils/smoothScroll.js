/**
 * Утилита для плавного скролла страницы с анимацией
 * Использует замыкание для сохранения состояния последней позиции скролла
 * Применяется эффект замедления (easing) для более естественной анимации
 */
export const smoothScroll = (() => {
	let lastTargetOffset = null;

	/**
	 * Выполняет плавный скролл к указанной позиции
	 * @param {number} targetOffset - целевая позиция скролла (в пикселях от верха страницы)
	 * @param {boolean} animation - включить/выключить анимацию (по умолчанию true)
	 * @param {number} duration - продолжительность анимации в миллисекундах (по умолчанию 1000мс)
	 * @param {boolean} checkLastTargetOffset - проверять ли последнюю позицию для предотвращения дублирования
	 * @returns {void}
	 */
	return (
		targetOffset,
		animation = true,
		duration = 1000,
		checkLastTargetOffset = false
	) => {
		if (!animation) {
			window.scrollTo(0, targetOffset);
			return;
		}

		if (
			lastTargetOffset !== null &&
			lastTargetOffset === targetOffset &&
			checkLastTargetOffset
		)
			return;

		lastTargetOffset = targetOffset;

		const start = window.scrollY;
		const distance = targetOffset - start;
		let startTime = null;

		/**
		 * Функция одного шага анимации
		 * Вызывается рекурсивно через requestAnimationFrame для плавной анимации
		 * @param {number} currentTime - текущее время из requestAnimationFrame
		 */
		const step = (currentTime) => {
			if (!startTime) startTime = currentTime;
			const progress = currentTime - startTime;

			/**
			 * Функция замедления (easing) для более естественной анимации
			 * Использует ease-in-out кривую: быстрое ускорение в начале и замедление в конце
			 * @param {number} time - нормализованное время (0-1)
			 * @returns {number} - преобразованное значение времени с эффектом замедления
			 */
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

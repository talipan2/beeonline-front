/**
 * Создает дебаунсированную версию переданной функции
 * @template T - Тип оригинальной функции
 * @param fn - Оригинальная функция для дебаунса
 * @param delay - Задержка в миллисекундах
 * @returns Дебаунсированная функция, которая откладывает вызов до окончания серии вызовов
 */
export const useDebounce = <T extends (...args: any[]) => any>(
	fn: T,
	delay: number
) => {
	// Хранит ID таймера для возможности его отмены
	let timeoutId: NodeJS.Timeout | undefined;

	// Возвращаем новую функцию с тем же набором параметров
	return (...args: Parameters<T>) => {
		// Если есть активный таймер, отменяем его
		if (timeoutId) {
			clearTimeout(timeoutId);
		}

		// Создаем новый таймер
		timeoutId = setTimeout(() => {
			fn(...args); // Вызываем оригинальную функцию с переданными аргументами
		}, delay);
	};
};
/**
 * Конвертирует секунды в читаемый текст с годами, месяцами, днями, часами и минутами
 * @param {number} seconds - количество секунд для конвертации
 * @returns {string} отформатированная строка времени
 */
export const convertSecondsToTime = (seconds) => {
	if (typeof seconds !== 'number' || seconds < 0) {
		return '0 минут';
	}

	// Константы для конвертации
	const SECONDS_IN_MINUTE = 60;
	const SECONDS_IN_HOUR = 3600; // 60 * 60
	const SECONDS_IN_DAY = 86400; // 24 * 60 * 60
	const SECONDS_IN_MONTH = 2629746; // 30.44 дня в среднем месяце
	const SECONDS_IN_YEAR = 31557600; // 365.25 дней в году

	let remainingSeconds = Math.floor(seconds);

	// Вычисляем года
	const years = Math.floor(remainingSeconds / SECONDS_IN_YEAR);
	remainingSeconds %= SECONDS_IN_YEAR;

	// Вычисляем месяцы
	const months = Math.floor(remainingSeconds / SECONDS_IN_MONTH);
	remainingSeconds %= SECONDS_IN_MONTH;

	// Вычисляем дни
	const days = Math.floor(remainingSeconds / SECONDS_IN_DAY);
	remainingSeconds %= SECONDS_IN_DAY;

	// Вычисляем часы
	const hours = Math.floor(remainingSeconds / SECONDS_IN_HOUR);
	remainingSeconds %= SECONDS_IN_HOUR;

	// Вычисляем минуты
	const minutes = Math.floor(remainingSeconds / SECONDS_IN_MINUTE);

	// Функция для правильного склонения
	const getPluralForm = (num, forms) => {
		const lastDigit = num % 10;
		const lastTwoDigits = num % 100;

		if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
			return forms[2];
		}
		if (lastDigit === 1) {
			return forms[0];
		}
		if (lastDigit >= 2 && lastDigit <= 4) {
			return forms[1];
		}
		return forms[2];
	};

	const parts = [];

	// Преобразуем года и месяцы в дни для упрощения
	const totalDays = days + months * 30 + years * 365;

	// Если есть дни - показываем дни и часы
	if (totalDays > 0) {
		parts.push(
			`${totalDays} ${getPluralForm(totalDays, ['день', 'дня', 'дней'])}`
		);
		if (hours > 0) {
			parts.push(`${hours} ${getPluralForm(hours, ['час', 'часа', 'часов'])}`);
		}
	}
	// Если дней нет - показываем часы и минуты
	else {
		if (hours > 0) {
			parts.push(`${hours} ${getPluralForm(hours, ['час', 'часа', 'часов'])}`);
		}
		if (minutes > 0) {
			parts.push(
				`${minutes} ${getPluralForm(minutes, ['минута', 'минуты', 'минут'])}`
			);
		}
	}

	return parts.length > 0 ? parts.join(' ') : '0 минут';
};

export default convertSecondsToTime;

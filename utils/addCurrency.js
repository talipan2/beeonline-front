/**
 * @param {number} value - значение для добавления валюты
 * @param {string} currency - валюта
 * @param {boolean} symbol - добавлять ли символ валюты
 * @returns {string} - значение с валютой
 */

export function addCurrency(value, currency = 'RUB', symbol = true) {
	// Функция для получения символа валюты
	const getSymbol = (curr) => {
		switch (curr) {
			case 'USD':
				return '$';
			case 'EUR':
				return '€';
			case 'RUB':
				return '₽';
			default:
				return '₽';
		}
	};

	// Проверяем, что value является валидным числом
	if (value === null || value === undefined || isNaN(value)) {
		return symbol ? `0 ${getSymbol(currency)}` : '0';
	}

	// Конвертируем в число если это строка
	const numValue = Number(value);

	switch (currency) {
		case 'USD':
			return `${numValue
				.toLocaleString('en-US', {
					minimumFractionDigits: 0,
					maximumFractionDigits: 0,
				})
				.replace(/,/g, ' ')
				.replace(/\./g, ', ')} ${symbol ? '$' : ''}`;
		case 'EUR':
			return `${numValue
				.toLocaleString('de-DE', {
					minimumFractionDigits: 0,
					maximumFractionDigits: 0,
				})
				.replace(/\./g, ' ')
				.replace(/,/g, ',')} ${symbol ? '€' : ''}`;
		case 'RUB':
			return `${numValue
				.toLocaleString('ru-RU', {
					minimumFractionDigits: 0,
					maximumFractionDigits: 0,
				})
				.replace(/,/g, ', ')} ${symbol ? '₽' : ''}`;
		default:
			return `${numValue
				.toLocaleString('ru-RU', {
					minimumFractionDigits: 0,
					maximumFractionDigits: 0,
				})
				.replace(/,/g, ', ')} ${symbol ? '₽' : ''}`;
	}
}

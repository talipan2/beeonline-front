export function formatMoney(value, currency = 'RUB', part = 2, symbol = true) {
  switch (currency) {
    case 'USD':
      value /= 100;
      return `${value.toLocaleString('en-US', { 
        minimumFractionDigits: part, 
        maximumFractionDigits: part 
      }).replace(/,/g, ' ')
      .replace(/\./g, ', ')} ${symbol ? '$' : ''}`;
    case 'RUB':
      value /= 100;
      return `${value.toLocaleString('ru-RU', { 
        minimumFractionDigits: part, 
        maximumFractionDigits: part 
      }).replace(/,/g, ', ')} ${symbol ? '₽' : ''}`;
    case 'bonuses':
      part = 0;
      return `${value.toLocaleString('ru-RU', { 
        maximumFractionDigits: 0
      }).replace(/,/g, ' ')}`;
  }
}
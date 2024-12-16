export function formatMoney(value, currency = 'RUB', part = 2) {
  switch (currency) {
    case 'USD':
      return `${value.toLocaleString('en-US', { 
        minimumFractionDigits: part, 
        maximumFractionDigits: part 
      }).replace(/,/g, ' ')
      .replace(/\./g, ', ')} $`;
    case 'RUB':
      return `${value.toLocaleString('ru-RU', { 
        minimumFractionDigits: part, 
        maximumFractionDigits: part 
      }).replace(/,/g, ', ')} ₽`;
    case 'bonuses':
      return `${value.toLocaleString('ru-RU', { 
        maximumFractionDigits: 0
      }).replace(/,/g, ' ')}`;
  }
}
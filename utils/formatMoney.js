export function formatMoney(value, currency = 'RUB', part = 2, symbol = true) {
  switch (currency) {
    case 'USD':
      value /= 100;
      return `${value.toLocaleString('en-US', {
        minimumFractionDigits: part,
        maximumFractionDigits: part
      }).replace(/,/g, ' ')
      .replace(/\./g, ', ')} ${symbol ? currency : ''}`;
    case 'EUR':
      value /= 100;
      return `${value.toLocaleString('de-DE', {
        minimumFractionDigits: part,
        maximumFractionDigits: part
      }).replace(/\./g, ' ')
      .replace(/,/g, ',')} ${symbol ? currency : ''}`;
    case 'RUB':
      value /= 100;
      return `${value.toLocaleString('ru-RU', {
        minimumFractionDigits: part,
        maximumFractionDigits: part
      }).replace(/,/g, ', ')} ${symbol ? currency : ''}`;
    case 'bonuses':
      part = 0;
      return `${value.toLocaleString('ru-RU', {
        maximumFractionDigits: 0
      }).replace(/,/g, ' ')}`;
    case 'bonus':
      part = 0;
      return `${value.toLocaleString('ru-RU', {
        maximumFractionDigits: 0
      }).replace(/,/g, ' ')}`;
    default:
      value /= 100;
      return `${value.toLocaleString('ru-RU', {
        minimumFractionDigits: part,
        maximumFractionDigits: part
      }).replace(/,/g, ', ')} ${symbol ? currency : ''}`;
  }
}

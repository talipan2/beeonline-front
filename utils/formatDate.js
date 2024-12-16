export function formatDate(date, format = 'DD/MM/YYYY') {
  // Преобразуем дату в объект Date, если это строка
  const dateObj = typeof date === 'string' ? new Date(date.trim()) : date;
  // Получаем день, месяц и год
  if(!dateObj) return
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Месяцы с 0, поэтому +1
  const year = dateObj.getFullYear();

  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  const seconds = String(dateObj.getSeconds()).padStart(2, '0');

  // Выбираем формат
  switch (format) {
    case 'DD/MM/YYYY':
      return `${day}/${month}/${year}`;
    case 'YYYY-MM-DD':
      return `${year}-${month}-${day}`;
    case 'MM-DD-YYYY':
      return `${month}-${day}-${year}`;
    case 'DD.MM.YYYY mm:HH':
      return `${day}.${month}.${year} ${hours}:${minutes}`;
    case 'DD.MM.YYYY':
        return `${day}.${month}.${year}`;
    case 'mm:HH':
      return `${hours}:${minutes}`;
    default:
      // Если передан неизвестный формат, вернем стандартный 'DD/MM/YYYY'
      return `${day}/${month}/${year}`;
  }
}
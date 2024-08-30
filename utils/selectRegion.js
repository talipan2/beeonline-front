export default function(id) {
  switch (parseInt(id)) {
    case 1:
      return 'Россия';
    case 2:
      return 'Казахстан';
    case 3:
      return 'Беларусь';
    case 4:
      return 'Армения';
    case 5:
      return 'Узбекистан';
    case 6:
      return 'Киргизия';
    default:
      return '';
  }
}
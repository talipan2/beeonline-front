export default function(id) {
  switch (parseInt(id)) {
    case (1):
      return 'flag_russia';
    case 2:
      return 'flag_kazakhstan';
    case 3:
      return 'flag_belarus';
    case 4:
      return 'flag_armenia';
    case 5:
      return 'flag_uzbekistan';
    case 6:
      return 'flag_kyrgyzstan';
    default:
      return '';
  }
}

export function selectFileIconClass(type) {
  switch (type) {
    case 'jpg':
      return 'file__icon_jpg';
    case 'jpeg':
      return 'file__icon_jpeg';
    case 'bmp':
      return 'file__icon_bmp';
    case 'svg':
      return 'file__icon_svg';
    case 'png':
      return 'file__icon_png';
    case 'doc':
      return 'file__icon_doc';
    case 'docx':
      return 'file__icon_docx';
    case 'xml':
      return 'file__icon_xml';
    case 'pdf':
      return 'file__icon_pdf';
    default:
      return 'file__icon_image';
  }
}
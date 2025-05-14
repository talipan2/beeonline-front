export function ensureHttps(url) {
  // Регулярное выражение для проверки начала с http:// или https://
  const regex = /^(https?:\/\/)/i;
  
  // Если нет протокола в начале - добавляем https://
  if (!regex.test(url)) {
    return 'https://' + url;
  }
  
  // Если уже есть протокол - возвращаем как есть
  return url;
}
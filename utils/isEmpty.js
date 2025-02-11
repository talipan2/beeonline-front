export const isEmpty = (value) => {
  // Проверка на null или undefined
  if (value == null) return true;

  // Проверка на пустую строку
  if (typeof value === 'string' && value.trim() === '') return true;

  // Проверка на пустой массив
  if (Array.isArray(value) && value.length === 0) return true;

  // Проверка на пустой объект
  if (typeof value === 'object' && Object.keys(value).length === 0) return true;

  // Если это число, проверяем, не NaN и не 0 (если 0 считается "не пустым")
  if (typeof value === 'number' && isNaN(value)) return true;

  // Во всех остальных случаях значение не пустое
  return false;
};
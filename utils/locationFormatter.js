export default function locationFormatter(data) {
  console.log(data)
  // Если data не существует, возвращаем пустой результат
  if (!data) return { locations: [], alias: null };

  // Проверяем, является ли data одиночным объектом локации
  const isSingleLocation = data && typeof data === "object" && !Array.isArray(data) && (data.name || data.id);

  // Собираем все локации с фильтрацией null/undefined
  const allLocations = (isSingleLocation
    ? [data]
    : [
        ...(Array.isArray(data.cities) ? data.cities : []),
        ...(Array.isArray(data.regions) ? data.regions : []),
        ...(Array.isArray(data.countries) ? data.countries : [])
      ]).filter(Boolean);

  // Обрабатываем каждую локацию
  const locationStrings = allLocations.map((location) => {
    if (!location || typeof location !== 'object') return '';
    
    const parts = [];
    if (location.name) parts.push(location.name);
    
    if (location.region?.name && location.region.name !== location.name) {
      parts.push(location.region.name);
    }

    const country = location.country || location.region?.country;
    if (country?.name && !parts.includes(country.name)) {
      parts.push(country.name);
    }

    return parts.join(", ");
  }).filter(Boolean);

  // Получаем alias из:
  // 1. Прямого указания в стране (для countries массива)
  // 2. Через country в location
  // 3. Через region.country
  const firstCountryAlias = allLocations[0]?.alias || 
                          allLocations[0]?.country?.alias || 
                          allLocations[0]?.region?.country?.alias || 
                          null;

  return isSingleLocation
    ? locationStrings[0] || ""
    : {
        locations: locationStrings,
        alias: firstCountryAlias
      };
}
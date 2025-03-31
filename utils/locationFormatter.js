export default function locationFormatter(data) {
  if (!data) return { locations: [], alias: null };

  const isSingleLocation = data && typeof data === "object" && !Array.isArray(data) && (data.name || data.id);
  const locations = isSingleLocation ? [data] : [
    ...(data.cities || []),
    ...(data.regions || []),
    ...(data.countries || [])
  ].filter(Boolean);

  const locationStrings = locations.map(location => {
    if (!location || typeof location !== 'object') return '';
    
    const parts = [location.name].filter(Boolean);
    
    const region = location.region;
    if (region?.name && region.name !== location.name) {
      parts.push(region.name);
    }

    const country = location.country || region?.country;
    if (country?.name && !parts.includes(country.name)) {
      parts.push(country.name);
    }

    return parts.join(", ");
  }).filter(Boolean);

  const firstLocation = locations[0];
  const alias = firstLocation?.alias 
    || firstLocation?.country?.alias 
    || firstLocation?.region?.country?.alias 
    || null;

  return isSingleLocation
    ? locationStrings[0] || ""
    : { locations: locationStrings, alias };
}

export const getLocationNameById = (id, location) => {
  console.log(id, location)
    for (const country of location.country) {
      for (const region of country.regions) {
        const city = region.cities.find(city => city.id === id);
        if (city) {
          return `${city.name}, ${region.name}, ${country.name}`;
        }
        if (region.id === id) {
          return `${region.name}, ${country.name}`;
        }
      }
    }
    return 'Местоположение не найдено';
}
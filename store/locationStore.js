import { defineStore } from "pinia";

export const useLocationStore = defineStore("location", {
  state: () => ({
    selectedCountry: null,
    selectedRegion: null,
    locations: {
      country: [
        {
          id: '1',
          name: 'Россия',
          regions: [
            {
              id: '11',
              name: 'Московская область',
              cities: [
                { id: '111', name: 'Москва' },
                { id: '112', name: 'Подольск' },
                { id: '113', name: 'Москва' },
                { id: '114', name: 'Подольск' },
                { id: '115', name: 'Москва' },
                { id: '116', name: 'Подольск' },
                { id: '117', name: 'Москва' },
                { id: '118', name: 'Подольск' },
                { id: '119', name: 'Москва' },
                { id: '120', name: 'Подольск' },
              ],
            },
            {
              id: '12',
              name: 'Ленинградская область',
              cities: [
                { id: '121', name: 'Санкт-Петербург' },
                { id: '122', name: 'Выборг' },
              ],
            },
          ],
        },
        {
          id: '2',
          name: 'Италия',
          regions: [
            {
              id: '21',
              name: 'Лацио',
              cities: [
                { id: '211', name: 'Рим' },
                { id: '212', name: 'Витербо' },
              ],
            },
            {
              id: '22',
              name: 'Тоскана',
              cities: [
                { id: '221', name: 'Флоренция' },
                { id: '222', name: 'Пиза' },
              ],
            },
          ],
        },
        {
          id: '3',
          name: 'Германия',
          regions: [
            {
              id: '31',
              name: 'Бавария',
              cities: [
                { id: '311', name: 'Мюнхен' },
                { id: '312', name: 'Нюрнберг' },
              ],
            },
            {
              id: '32',
              name: 'Берлин',
              cities: [
                { id: '321', name: 'Берлин' },
                { id: '322', name: 'Гамбург' },
              ],
            },
          ],
        },
      ],
    },
  }),
  getters: {
    getLocationById: (state) => (id) => {
      for (const country of state.locations.country) {
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
    },
  }
})

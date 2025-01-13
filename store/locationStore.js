import { defineStore } from "pinia";
import Api from "~/api/commonApi";

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
    getLocationsByIds: (state) => (countryIds = [], regionIds = [], cityIds = []) => {
      const result = [];
      if(state.locations && state.locations.country.length > 0) {
        state.locations.country.forEach(country => {
          // Если id страны есть то возвращаем название этой страны
          if(countryIds.includes(country.id)) {
            result.push({id: country.id, countryId: country.id, name: country.name, type: 'country'});
          }
          
          country.regions.forEach(region => {

            // Если id региона есть то возвращаем название этого региона и страны
            if(regionIds.includes(region.id)) {
              result.push({id: region.id, countryId: country.id, name: `${region.name}, ${country.name}`, type: 'region'});
            }

            region.cities.forEach(city => {
              // Если id города есть то возвращаем название этого города и региона и страны
              if(cityIds.includes(city.id)) {
                result.push({id: city.id, countryId: country.id, name: `${city.name}, ${region.name}, ${country.name}`, type: 'city'});
              }
            })
          })
        })
      }

      return result;
    },

    getCountryById: (state) => (id) => {
      if(state.locations.country.length == 0) return '';
      const country = state.locations.country.find(country => country.id == id);
      if(country && country.name) return country.name;
    },
  },
  actions: {
    async getLocations() {
      try {
        const response = await Api.getLocations();
        if (response.data) {
          this.locations = {country: [...response.data.locations]};
        }
      } catch (error) {
        throw error;
      }
    }
  },
})

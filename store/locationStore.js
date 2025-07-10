import { defineStore } from "pinia";
import Api from "~/api/commonApi";

export const useLocationStore = defineStore("location", {
  state: () => ({
    selectedCountry: null,
    selectedRegion: null,
    locations: {country: []},
    countries: [
      { id: 1, name: 'Россия' },
      { id: 2, name: 'Белоруссия' },
      { id: 3, name: 'Казахстан' },
      { id: 4, name: 'Армения' },
      { id: 5, name: 'Узбекистан' },
      { id: 6, name: 'Киргизия' },
      { id: 7, name: 'Испания' },
      { id: 8, name: 'Тунис' },
      { id: 9, name: 'Грузия' },
      { id: 10, name: 'Австрия' },
      { id: 11, name: 'Литва' },
      { id: 12, name: 'Албания' },
    ]
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
      const country = state.countries.find(country => country.id == id);
      console.log(country)
      if(country && country.name) return country.name;
    },
  },
  actions: {
    async getLocations(params = {}) {
      try {
        const response = await Api.getLocations(params);
        if (response.data) {
          return {country: [...response.data.locations]};
        }
      } catch (error) {
        throw error;
      }
    },
    
    async getRegisterCountries() {
        return await Api.getRegisterCountries();
    },

    async getCountries() {
      try {
        const response = await Api.getCountries();
        if (response.data) {
          return response.data;
        }
      } catch (error) {
        throw error;
      }
    }
  },
})

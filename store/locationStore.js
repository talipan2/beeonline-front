import { defineStore } from "pinia";
import Api from "~/api/commonApi";

export const useLocationStore = defineStore("location", {
  state: () => ({
    selectedCountry: null,
    selectedRegion: null,
    locations: {country: []},
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

import { defineStore } from 'pinia';
import Api from '@/api/organizationApi';

export const useOrganizationStore = defineStore('organization', {
  state: () => ({
    organization: {},
    registerOrg: {
      location: 1,
      inn: null,
      KPP: null,
      organizationForm: 'other',
      ogrn: null,
      legalAddress: null,
      companyName: null,
      companyLogo: null,
      countryId: [],
      companyDescription: null,
      productionCountry: null,
      selfEmployed: false,
      registerAddress: null,
      selectedProductionCountries: [],
    }
  }),
  actions: {
    async setOrganization(data) {
      try {
        const response = await Api.setOrganization(data);
        if(response.data) {
          
        }
      } catch (error) {
        throw error;
      }
    }
  }
});

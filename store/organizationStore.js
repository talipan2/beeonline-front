import { defineStore } from 'pinia';
import Api from '@/api/organizationApi';

export const useOrganizationStore = defineStore('organization', {
  state: () => ({
    organization: {},
    pubCards: [],
    pubCardGallery: null,
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
      siteUrl: null,
    }
  }),
  actions: {
    async setOrganization(data) {
      try {
        const response = await Api.setOrganization(data);
        if(response.data) {
          this.organization = response.data;
          return response.data;
        }
      } catch (error) {
        throw error;
      }
    },
    
    async setPubCard(data) {
      try {
        const response = await Api.setPubCards(data);
        if(response.data) {
          this.pubCards = response.data;
          return response.data;
        }
      } catch (error) {
        throw error;
      }
    },

    async getSelfOrganization() {
      try {
        const response = await Api.getSelfOrganization();
        if(response.data) {
          this.organization = response.data.data;
        }
      } catch (error) {
        throw error;
      }
    },

    async getSelfPubCard() {
      try {
        const response = await Api.getSelfPubCard();
        if(response.data) {
          this.pubCards = response.data.data;
        }
      } catch (error) {
        throw error;
      }
    },

    async editPubCards(data) {
      try {
        const response = await Api.editPubCard(data);
        if(response.data) {
          this.pubCards = response.data;
          return response.data;
        }
      } catch (error) {
        throw error;
      }
    },

    async setGallery(formData) {
      try {
        const response = await Api.setGallery(formData);
        if(response.data) {
          console.log(response.data)
          this.pubCardGallery = response.data;
          return response.data;
        }
      } catch (error) {
        throw error;
      }
    }
  }
})

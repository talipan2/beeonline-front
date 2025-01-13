import { defineStore } from 'pinia';
import Api from '@/api/organizationApi';

export const useOrganizationStore = defineStore('organization', {
  state: () => ({
    organization: {},
    pubCards: {},
    pubCardsList: [],
    pubCardGallery: null,
    registerOrg: {
      countryId: 1,
      inn: null,
      KPP: null,
      organizationForm: 3,
      ogrn: null,
      legalAddress: null,
      organizationName: null,
      companyName: null,
      companyLogo: null,
      description: null,
      locations: {
        regions: [],
        cities: [],
      },
      companyDescription: null,
      productionCountry: null,
      selfEmployed: false,
      registerAddress: null,
      selectedProductionCountries: {
        fullNameLocation: [],
        locationId: [],
      },
      siteUrl: null,
      verificationFiles: [],
    },
    formOrganization: [
      {
        id: 1,
        name: 'ООО',
        value: 'ooo',
      },
      {
        id: 2,
        name: 'ИП',
        value: 'ip',
      },
      {
        id: 3,
        name: 'Другое',
        value: 'other',
      }
    ]
  }),
  getters: {
    getOrganizationFormById: (state) => (id) => {
      return state.formOrganization.find(item => item.id == id)?.name
    },

    getOrganizationFormByValue: (state) => (value) => {
      return state.formOrganization.find(item => item.name == value)?.id || this.formOrganization[2].id
    },
  },
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

    async getSelfOrganization(id) {
      try {
        const response = await Api.getOrganization(id);
        if(response.data) {
          this.organization = response.data.data;
        }
      } catch (error) {
        throw error;
      }
    },

    async getSelfPubCard(id) {
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

    async getPubCardsList() {
      try {
        const response = await Api.getPubCards();
        if(response.data) {
          this.pubCardsList = response.data.data;
          return response.data.data;
        }
      } catch (error) {
        throw error;
      }
    },

    async getPubCard(id) {
      try {
        const response = await Api.getPubCard(id);
        if(response.data) {
          return response.data.data;
        }        
      } catch (error) {
        throw error;
      }
    },

    async setGallery(formData) {
      try {
        const response = await Api.setGallery(formData);
        if(response.data) {
          this.pubCardGallery = response.data;
          return response.data;
        }
      } catch (error) {
        throw error;
      }
    },

    // поиск организации по инн
    async searchOrgByInn(inn) {
      try {
        const response = await Api.searchInn(inn);
        if(response.data && response.data.data) {
          this.registerOrg.kpp = response.data.data.kpp;
          this.registerOrg.ogrn = response.data.data.ogrn;
          this.registerOrg.legalAddress = response.data.data.address;
          this.registerOrg.organizationName = response.data.data.name;
          this.registerOrg.companyName = response.data.data.name;
          this.registerOrg.organizationForm = this.getOrganizationFormByValue(response.data.data.org_form);
          return response.data;
        }
      } catch (error) {
        throw error;
      }
    },

    async setVerificationDocuments(id,data) {
      try {
        const response = await Api.setVerificationDocuments(id,data);
        if(response.data) {
          return response.data;
        }
      } catch (error) {
        throw error;
      }
    },

    async getVerificationDocuments(id) {
      try {
        const response = await Api.getVerificationDocuments(id);
        if(response.data) {
          return response.data;
        }
      } catch (error) {
        throw error;
      }
    },
    
    async deleteVerificationDocument(id) {
      try {
        const response = await Api.deleteVerificationDocument(id);
        if(response.data) {
          return response.data;
        }
      } catch (error) {
        throw error;
      }
    },

    async setPubCardLogo(id, data) {
      try {
        const response = await Api.setPubCardLogo(id, data);
        if(response.data) {
          return response.data;
        }
      } catch (error) {
        throw error;
      }
    },
  }
})

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
      companyLogo: {
        id: null,
        url: null,
      },
      description: null,
      locations: {
        regions: [],
        cities: [],
      },
      companyDescription: null,
      productionCountry: null,
      selfEmployed: false,
      registerAddress: null,
      closingDocumentsEmail: '',
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
    async setOrganization(data, form) {
      try {
        const response = await Api.setOrganization(data, form);
        if(response) {
          this.organization = response;
          return response;
        }
      } catch (error) {
        throw error;
      }
    },

    async editOrganization(data, form) {
      try {
        const response = await Api.editOrganization(data, form);
        if(response) {
          this.organization = response;
          return response;
        }
      } catch (error) {
        throw error;
      }
    },

    async setPubCard(data, form) {
      try {
        const response = await Api.setPubCards(data, form);
        if(response) {
          this.pubCards = response;
          return response;
        }
      } catch (error) {
        throw error;
      }
    },

    async editPubCards(data, form) {
      try {
        const response = await Api.editPubCard(data, form);
        if(response) {
          this.pubCards = response;
          return response;
        }
      } catch (error) {
        throw error;
      }
    },

    async updateCreateStepPubCard(id, step) {
      try {
        const response = await Api.updateCreateStepPubCard(id, step);
        if(response) {
          return response;
        }
      } catch (error) {
        throw error;
      }
    },

    async pubCardPublish(id) {
      try {
        const response = await Api.pubCardPublish(id);
        if(response) {
          return response;
        }
      } catch (error) {
        throw error;
      }
    },

    async getPubCardsList(params) {
      try {
        const response = await Api.getPubCards(params);
        if(response.data) {
          this.pubCardsList = response.data.data;
          return response.data;
        }
      } catch (error) {
        throw error;
      }
    },

    async getPubCard(id) {
      if(!id) return;
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
      if(!id) return;
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

    async setPubCardLogo(id, imageId) {
      try {
        const response = await Api.setPubCardLogo(id, imageId);
        if(response.data) {
          return response.data;
        }
      } catch (error) {
        throw error;
      }
    },

    async setPubCardGallery(id, data) {
      try {
        const response = await Api.setPubCardGallery(id, data);
        if(response.data) {
          return response.data;
        }
      } catch (error) {
        throw error;
      }
    },

    async getPubCardStats(id) {
      try {
        const response = await Api.getPubCardStats(id);
        if(response.data) {
          return response.data;
        }
      } catch (error) {
        throw error;
      }
    },

    resetRegisterData() {
      this.registerOrg = {
        countryId: 1,
        inn: null,
        KPP: null,
        organizationForm: 3,
        ogrn: null,
        legalAddress: null,
        organizationName: null,
        companyName: null,
        companyLogo: {
          id: null,
          url: null,
        },
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
      }
    },

    async counterpartyCheckPrepare(id) {
        return await Api.counterpartyCheckPrepare(id);
    },

    async counterpartyCheck(id) {
        return await Api.counterpartyCheck(id);
    },

    // получение сотрудников
    async getOrganizationEmployees(id) {
      try {
        const response = await Api.getOrganizationEmployees(id);
        if(response.data) {
          return response.data;
        }
      } catch (error) {
        throw error;
      }
    },

    // создание сотрудника
    async createOrganizationEmployee(id, data) {
      try {
        const response = await Api.setOrganizationEmployee(id, data);
        if(response.data) {
          return response.data;
        }
      } catch (error) {
        throw error;
      }
    },

    async getEmployeePermissions() {
      try {
        const response = await Api.getEmployeePermissions();
        if(response.data) {
          return response.data;
        }
      } catch (error) {
        throw error;
      }
    },
  }
})

import { defineStore } from "pinia";
import uploadFilesApi from "~/api/uploadFilesApi";
import commonApi from "~/api/commonApi";
import { useToast } from "vue-toastification";

export const useSettingStore = defineStore("setting", {
  state: () => ({
    authModalStatus: false,
    chooseLocationModal: false,
    headerHeight: null,
    trademarksModal: false,
    exhibitionModal: false,
    isCreateOrder: false,
    alertModal: {
      isOpen: false,
      status: null,
      text: null,
    },
    reviewModalStatus: false,
    errorModal: false,
    errorModalMessage: '',
    addFileModal: false,
    addReviewModal: false,
    uploadLoading: false,
    bonusLevelModal: false,
    bonusInfoModal: false,
    resetPasswordModal: false,
    catalogTutorialStatus: false,
    payModalStatus: false,
    replenishmentModalStatus: false,
    balanceDocumentsModalStatus: false,
    infoModal: false,
    changeDataModal: false,
    changeUserDataModal: false,
    createEntityFinalModal: false,
    currencyList: [
      {id: 2, name: 'Российский рубль', value: 'RUB'},
      {id: 3, name: 'Доллар США', value: 'USD'},
      {id: 4, name: 'Евро', value: 'EUR'},
    ],
    isLoadingResponse: false,
    isTelegram: false,
    confirmModal: false,
    sendMessageModal: false,
    returnRegisterModal: false,
    registerRedirectPath: '',
    registerRedirectConfirm: false,
  }),
  getters: {
    getCurrencyNameById: (state) => (id) => {
      const currency = state.currencyList.find(item => item.id == id);
      return currency ? currency.name : '';
    }
  },
  actions: {
    setResponseLoading(loading) {
      this.isLoadingResponse = loading
    },

    setAlert(status, text) {
      this.alertModal.isOpen = true;
      this.alertModal.status = status;
      this.alertModal.text = text;
    },

    async uploadFiles(id, file) {
      try {
        const response = await uploadFilesApi.uploadFiles(id, file);
        if (response.data) {
          return response.data
        }
      } catch (error) {
        console.error(error);
        useToast().error('Ошибка при загрузке файла');
      }
    },
    
    async getHelps() {
      try {
        const response = await commonApi.getFaqs();
        if (response.data) {
          return response.data
        }
      } catch (error) {
        console.error(error);
      }
    },

    async getNewsList(params) {
      try {
        const response = await commonApi.getNewsList(params);
        if (response.data) {
          return response.data
        }
      } catch (error) {
        console.error(error);
      }
    },

    async getNews(id) {
      try {
        const response = await commonApi.getNews(id);
        if (response.data) {
          return response.data
        }
      } catch (error) {
        console.error(error);
      }
    },

    async getBanners(params) {
      try {
        const response = await commonApi.getBanners(params);
        if (response.data) {
          return response.data
        }
      } catch (error) {
        console.error(error);
      }
    },

    async emailConfirm(id, hash) {
      try {
        const response = await commonApi.emailConfirm(id, hash);
        if (response.data) {
          return response.data
        }
      } catch (error) {
        throw error.response?.data || error;
      }
    },

    async telegramNotify(id) {
      try {
        const response = await commonApi.telegramNotify(id);
        if (response.data) {
          return response.data
        }
      } catch (error) {
        throw error.response?.data || error;
      }
    }

  },


})
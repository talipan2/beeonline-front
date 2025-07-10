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
    errorModalMessage: "",
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
    currencyList: [],
    isLoadingResponse: false,
    isTelegram: false,
    confirmModal: false,
    sendMessageModal: false,
    returnRegisterModal: false,
    registerRedirectPath: "",
    registerRedirectConfirm: false,
    foreignerModal: false,
  }),
  getters: {
    getCurrencyNameById: (state) => (id) => {
      const currency = state.currencyList.find((item) => item.id == id);
      return currency ? currency.name : "";
    },
    getCurrencyCodeById: (state) => (id) => {
      const currency = state.currencyList.find((item) => item.id == id);
      return currency ? currency.code : "";
    },
  },
  actions: {
    setResponseLoading(loading) {
      this.isLoadingResponse = loading;
    },

    setAlert(status, text) {
      this.alertModal.isOpen = true;
      this.alertModal.status = status;
      this.alertModal.text = text;
    },

    async uploadFiles(id, file, config) {
      try {
        const response = await uploadFilesApi.uploadFiles(id, file, config);
        if (response.data) {
          return response.data;
        }
      } catch (error) {
        console.error(error);
        useToast().error("Ошибка при загрузке файла");
      }
    },

    async changeFiles(id, formData) {
      try {
        const response = await uploadFilesApi.changeFiles(id, formData);
        if (response.data) {
          return response.data;
        }
      } catch (error) {
        console.error(error);
      }
    },

    async getHelps() {
      try {
        const response = await commonApi.getFaqs();
        if (response.data) {
          return response.data;
        }
      } catch (error) {
        console.error(error);
      }
    },

    async getNewsList(params) {
      try {
        const response = await commonApi.getNewsList(params);
        if (response.data) {
          return response.data;
        }
      } catch (error) {
        console.error(error);
      }
    },

    async getNews(id) {
      try {
        const response = await commonApi.getNews(id);
        if (response.data) {
          return response.data;
        }
      } catch (error) {
        console.error(error);
      }
    },

    async getBanners(params) {
      try {
        const response = await commonApi.getBanners(params);
        if (response.data) {
          return response.data;
        }
      } catch (error) {
        console.error(error);
      }
    },

    async emailConfirm(id, hash) {
      try {
        const response = await commonApi.emailConfirm(id, hash);
        if (response.data) {
          return response.data;
        }
      } catch (error) {
        throw error.response?.data || error;
      }
    },

    async telegramNotify(id) {
      try {
        const response = await commonApi.telegramNotify(id);
        if (response.data) {
          return response.data;
        }
      } catch (error) {
        throw error.response?.data || error;
      }
    },
    async resetTelegramNotify(id) {
      return await useApi().post(`/users/${id}/reset-tg-chat`);
    },
    async getCurrencyList() {
      try {
        const response = await commonApi.getCurrencyList();
        if (response.data && response.data.data) {
          this.currencyList = response.data.data.sort((a, b) => a.id - b.id);
          return response.data.data;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});

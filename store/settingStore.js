import { defineStore } from "pinia";
import uploadFilesApi from "~/api/uploadFilesApi";

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
  }),
  actions: {
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
      }
    }
  }

})
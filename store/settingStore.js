import { defineStore } from "pinia";

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
  }),
  actions: {
    setAlert(status, text) {
      this.alertModal.isOpen = true;
      this.alertModal.status = status;
      this.alertModal.text = text;
    }
  }
})
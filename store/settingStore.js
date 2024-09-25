import { defineStore } from "pinia";

export const useSettingStore = defineStore("setting", {
  state: () => ({
    authModalStatus: false,
    chooseLocationModal: false,
    headerHeight: null,
    trademarksModal: false,
    exhibitionModal: false,
    alertModal: {
      isOpen: false,
      status: null,
      text: null,
    }
  }),
  actions: {

  }
})
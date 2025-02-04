import { defineStore } from "pinia";
import Api from "~/api/tariffsApi";

export const useTariffsStore = defineStore("tariffs", {
  state: () => ({
    userInvoicing: null,

    balanceLoaded: false,
    role: '',
    userBalance: 0,
    userBonuses: 0,
    userCurrency: 'RUB',
    isForeigner: false,
    availableUserFeatures: null,
    tariffName: "Бесплатный",
    tariffExpiredAt: null,
  
    tariffs: null,
    services: null,
    
  }),

  actions: {
    async getBalance(userId) {
    try {
      const response = await Api.getBalance(userId);

      if(response && response.data) {
        this.userBalance = response.data.balance;
        this.userBonuses = response.data.bonuses;
        this.userCurrency = response.data.currency;
        this.isForeigner = response.data.is_foreigner;
        this.tariffName = response.data.tariff_name;
        this.tariffExpiredAt = response.data.tariff_expired_at;
        this.availableUserFeatures = response.data.services;
        this.balanceLoaded = true;
      }
    } catch (error) {
      throw error;
    }
    },

    async getTariffs(userId) {
      try {
        const response = await Api.getTariffs(userId);

        if(response && response.data) {
          this.tariffs = response.data.tariffs;
          this.services = response.data.services;
        }
      } catch (error) {
        throw error;
      }
    },

    async payTariff(userId, tariffId, priceId, data) {
      try {
        const response = await Api.payTariff(userId, tariffId, priceId, data);
        if(response) {
          return response;
        }
      } catch (error) {
        throw error;
      }
    },


    async payServices(userId, data) {
      try {
        const response = await Api.payServices(userId, data);
        if(response) {
          return response;
        }
      } catch (error) {
        throw error;
      }
    },


    async getTransactions(userId, page=1) {
      try {
        const response = await Api.getTransactions(userId, page);
        if(response && response.data) {
          return response.data;
        }
      } catch (error) {
        throw error;
      }
    },

    async getInvoicing(userId, page = 1) {
      try {
        const response = await Api.getInvoicing(userId, page);
        if(response) {
          return response;
        }
      } catch (error) {
        throw error;
      }
    },
  },
});

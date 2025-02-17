import { defineStore } from "pinia";
import Api from "~/api/tariffsApi";

export const useTariffsStore = defineStore("tariffs", {
    state: () => ({
        userInvoicing: null,

        balanceLoaded: false,
        role: "",
        userBalance: 0,
        userBonuses: 0,
        userCurrency: "RUB",
        isForeigner: false,
        availableUserFeatures: null,
        tariffName: "Бесплатный",
        tariffExpiredAt: null,

        tariffs: null,
        services: null,
    }),

    actions: {
        async getBalance(userId) {
            Api.getBalance(userId).then((data) => {
                this.userBalance = data.balance;
                this.userBonuses = data.bonuses;
                this.userCurrency = data.currency;
                this.isForeigner = data.is_foreigner;
                this.tariffName = data.tariff_name;
                this.tariffExpiredAt = data.tariff_expired_at;
                this.availableUserFeatures = data.services;
                this.balanceLoaded = true;
            });
        },

        async getTariffs(userId) {
            Api.getTariffs(userId).then((data) => {
                this.tariffs = data.tariffs;
                this.services = data.services;
            });
        },

        async payTariff(userId, tariffId, priceId, data) {
            return Api.payTariff(
                userId,
                tariffId,
                priceId,
                data
            );
        },

        async payServices(userId, data) {
            return Api.payServices(userId, data);
        },

        async getTransactions(userId, page = 1) {
            return Api.getTransactions(userId, page);
        },

        async getInvoicing(userId, page = 1) {
            return Api.getInvoicing(userId, page);
        },

        async balanceAdd(data) {
            return Api.balanceAdd(data)
            .then((response) => {
                return response;
            });
        },

        async closingDocsRequest(data, form) {
            return Api.closingDocsRequest(data, form)
            .then((response) => {
                return response;
            });
        },
    },
});

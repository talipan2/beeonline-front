import { defineStore } from "pinia";
import Api from "@/api/dealApi";

export const useDealStore = defineStore("dealStore", {
    state: () => ({
        prodStatuses: null,
    }),
    actions: {
        async getDeals(values) {
            return await Api.getDeals(values);
        },

        async getDeal(id, values = {}) {
            return await Api.getDeal(id, values);
        },

        async getDealData(id, values = {}) {
            return await Api.getDealData(id, values);
        },

        async handleAction(id, action, values = {}, form) {
            return await Api.handleAction(id, action, values, form);
        },

        async getDealProdStatuses() {
            if (this.prodStatuses === null) {
                let res = await Api.getDealProdStatuses();
                this.prodStatuses = res.data;
            }
            return this.prodStatuses;
        },
    },
});

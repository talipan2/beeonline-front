import { defineStore } from "pinia";
import Api from "@/api/dealApi";

export const useDealStore = defineStore("dealStore", {
    state: () => ({
    }),
    actions: {
        async getDeals(values) {
            return await Api.getDeals(values);
        },

        async getDeal(id, values = {}) {
            return await Api.getDeal(id, values);
        },
    },
});

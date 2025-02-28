import { defineStore } from "pinia";
import Api from "@/api/adjacentApi";

export const useAdjacentStore = defineStore("adjacentStore", {
    state: () => ({
    }),
    actions: {
        async getPubcard(id) {
            return await Api.getPubcard(id);
        },

        async getServices(id, values = {}) {
            return await Api.getServices(id, values);
        },
    },
});

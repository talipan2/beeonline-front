import { defineStore } from "pinia";
import Api from "@/api/adjacentApi";

export const useAdjacentStore = defineStore("adjacentStore", {
    state: () => ({
        statusList: null,
    }),
    actions: {
        async getPubcard(id) {
            return await Api.getPubcard(id);
        },

        async getStatistics(values) {
            return await Api.getStatistics(values);
        },

        async getServices(id, values = {}) {
            return await Api.getServices(id, values);
        },

        async getService(id) {
            return await Api.getService(id);
        },

        async getStatusList() {
            if (this.statusList === null) {
                let res = await Api.getStatusList();
                this.statusList = res;
            }
            return this.statusList;
        },

        async toArchive(pubcard_id, id) {
            return await Api.toArchive(pubcard_id, id);
        },

        async updateService(id, values) {
            return await Api.updateService(id, values);
        },
    },
});

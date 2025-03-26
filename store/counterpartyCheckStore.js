import { defineStore } from "pinia";
import Api from "~/api/counterpartyCheckApi";

export const useCounterpartyCheckStore = defineStore("counterpartyCheck", {
    state: () => ({
    }),

    actions: {
        async prepare(org_id) {
            return await Api.prepare(org_id);
        },
        async check(org_id) {
            return await Api.check(org_id);
        },
        async show(id) {
            return await Api.show(id);
        },
    },
});

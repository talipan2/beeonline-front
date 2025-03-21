import { useApi } from "~/composables/useApi";

export default {
    async prepare(org_id) {
        return useApi().get(`counterparty-check/check/${org_id}`, null, null, true);
    },
    async check(org_id) {
        return useApi().post(`counterparty-check/check/${org_id}`, null, null, true);
    },
    async show(id) {
        return useApi().get(`counterparty-check/${id}`, null, null, true);
    },
};

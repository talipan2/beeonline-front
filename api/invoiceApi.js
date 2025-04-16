import { useApi } from "~/composables/useApi";

export default {
    async makeInvoice(data) {
        return useApi().post(`invoice`, data);
    },
    async show(id) {
        return useApi().get(`invoice/${id}`);
    },
};

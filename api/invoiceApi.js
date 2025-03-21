import { useApi } from "~/composables/useApi";

export default {
    async makeInvoice(data) {
        return useApi().post(`invoice`, data);
    },
};

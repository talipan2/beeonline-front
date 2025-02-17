import { useApi } from "~/composables/useApi";

export default {
    async getBalance(userId) {
        return useApi().get(`tariffs/${userId}/balance`);
    },

    async getTariffs(userId) {
        return useApi().get(`tariffs/${userId}`);
    },

    async payTariff(userId, tariff_id, price_id, data) {
        return useApi().post(
            `tariffs/${userId}/pay/${tariff_id}/${price_id}`,
            data
        );
    },

    async payServices(userId, data) {
        return useApi().post(`tariffs/${userId}/pay-services`, data);
    },

    async getTransactions(userId, page) {
        return useApi().get(`tariffs/${userId}/transactions`, {
            params: { page: page },
        });
    },

    async getInvoices(userId, page = 1) {
        return useApi().get(`tariffs/invoices`, { page: page });
    },

    async balanceAdd(data) {
        return useApi().put("/balance/add", data).then((response) => {
            return response;
        });
    },

    async closingDocsRequest(data, form) {
        return useApi().put("/balance/closing-docs", data, form).then((response) => {
            return response;
        });
    },
};

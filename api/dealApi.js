export default {
    async getDeals(values) {
        return useApi().get("deals", values);
    },
    async getDeal(id, values) {
        return useApi().get(`deals/${id}`, values);
    },
    async getDealData(id, values) {
        return useApi().get(`deals/${id}/data`, values);
    },
    async handleAction(id, action, values, form) {
        return useApi().post(`deals/${id}/${action}`, values, form);
    },
    async getDealProdStatuses() {
        return useApi().get(`deals/prod-statuses`);
    },
};

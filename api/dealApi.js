export default {
    async getDeals(values) {
        return useApi().get("deals", values);
    },
    async getDeal(id, values) {
        return useApi().get(`deals/${id}`, values);
    },
};

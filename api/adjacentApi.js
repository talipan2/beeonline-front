export default {
    async getStatistics(values) {
        return useApi().get(`adjacents/statistics`, values);
    },
    async getServices(id, values) {
        return useApi().get(`adjacents/${id}/services`, values);
    },
    async getService(id) {
        return useApi().get(`adjacents/services/${id}`);
    },
    async getStatusList() {
        return useApi().get(`adjacents/status-list`);
    },
    async toArchive(pubcard_id, id) {
        return useApi().post(`adjacents/${pubcard_id}/${id}/to-archive`);
    },
    async updateService(id, values) {
        return useApi().post(`adjacents/services/${id}/update`, values);
    },
};

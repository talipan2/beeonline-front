export default {
    async getServices(id, values) {
        return useApi().get(`adjacents/${id}/services`, values);
    },
    async getService(pubcard_id, id) {
        return useApi().get(`adjacents/${pubcard_id}/${id}`);
    },
};

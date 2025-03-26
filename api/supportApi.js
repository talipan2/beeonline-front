export default {
    async getSupportTicket(id, data) {
        return await useApi().get(`/support/${id}`, data);
    },
    async getSupportTickets(values) {
        return useApi().get("/support", values);
    },
    async getSupportTicketStatuses() {
        return useApi().get("/support/statuses");
    },
    async getSupportTicketTypes() {
        return useApi().get("/support/types");
    },
    async createSupportTicket(data) {
        return useApi().put("/support", data);
    },
    async closeSupportTicket(id) {
        return useApi().post(`/support/${id}/close`);
    },
};

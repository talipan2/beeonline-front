import { defineStore } from "pinia";
import supportApi from "~/api/supportApi";

export const useSupportStore = defineStore("supportStore", {
    state: () => ({
        supportTicketTypes: [],
        supportTicketStatuses: [],
    }),
    getters: {
        getSupportTicketStatuses(state) {
            return state.supportTicketStatuses;
        },
        getSupportTicketTypes(state) {
            return state.supportTicketTypes;
        },
    },
    actions: {
        async getSupportTickets(values) {
            return await supportApi.getSupportTickets(values);
        },

        async fetchSupportTicketStatuses() {
            const { data } = await supportApi.getSupportTicketStatuses();
            this.supportTicketStatuses = data;
        },

        async fetchSupportTicketTypes() {
            const { data } = await supportApi.getSupportTicketTypes();
            this.supportTicketTypes = data;
        },

        async createSupportTicket(data) {
            return await supportApi.createSupportTicket(data);
        },

        async getSupportTicket(id, data) {
            return await supportApi.getSupportTicket(id, data);
        },

        async closeSupportTicket(id) {
            return await supportApi.closeSupportTicket(id);
        },
    },
});

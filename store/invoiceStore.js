import { defineStore } from "pinia";
import Api from "~/api/invoiceApi";

export const useInvoiceStore = defineStore("invoice", {
    state: () => ({
    }),

    actions: {
        async makeInvoice(data) {
            return await Api.makeInvoice(data);
        },
    },
});

import axios from "axios";

export default {
  async getBalance(userId) {
    return axios.get(`tariffs/${userId}/balance`)
  },

  async getTariffs(userId) {
    return axios.get(`tariffs/${userId}`)
  },

  async payTariff(userId, tariff_id, price_id, data) {
    return axios.post(`tariffs/${userId}/pay/${tariff_id}/${price_id}`, data)
  },

  async payServices(userId, data) {
    return axios.post(`tariffs/${userId}/pay-services`, data)
  },

  async getTransactions(userId, page) {
    return axios.get(`tariffs/${userId}/transactions`, {params: {page: page}})
  },

  async getInvoices(userId, page = 1) {
    return axios.get(`tariffs/invoices`, {page: page})
  }
}
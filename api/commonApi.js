import axios from "axios";

export default {
  async getLocations() {
    return axios.get(`locations`);
  },

  async getAdjacentCategories() {
    return axios.get(`adjacent-categories`);
  },

  async getCategories() {
    return axios.get(`product-categories`);
  },

  async getBatchSizes() {
    return axios.get(`batches`);
  },

  async getBonuses(organizationId, { type }) {
    const params = {
      ...(type ? { type } : {}),
    };
    return axios.get(`bonuses/${organizationId}`, { params });
  },

  async getBonusesData(organizationId) {
    return axios.get(`bonuses/${organizationId}/data`);
  },

  async getBonusesTransactions(organizationId, { page }) {
    const params = {
      ...(page !== undefined && page !== null ? { page } : {}),
    };
    return axios.get(`bonuses/${organizationId}/transactions`, { params });
  },

  async getAchievements(organizationId, { page, limit, type, bonus }) {
    const params = {
      ...(page !== undefined && page !== null ? { page } : {}),
      ...(limit !== undefined && limit !== null ? { limit } : {}),
      ...(type ? { type } : {}),
      ...(bonus !== undefined && bonus !== null ? { bonus } : {}),
    };

    return useApi().get(`achievements/${organizationId}`, params);
  },

  async search(params = {}) {
    return axios.get(`search`, { params });
  },

  async getFaqs() {
    return axios.get(`faqs`);
  },

  async getNewsList(params = {}) {
    return axios.get(`news`, { params });
  },

  async getNews(id) {
    return axios.get(`news/${id}`);
  },

  async getBanners(params = {}) {
    return axios.get(`banners`, { params });
  },

  async getRegisterCountries() {
    return useApi().get(`register-countries`);
  },

  async getCountries() {
    return axios.get(`countries`);
  },

  async emailConfirm(id, hash) {
    return axios.post(`email-confirm`, { id, hash });
  },

  async telegramNotify(id) {
    return axios.get(`/users/${id}/tg-chat-code`);
  },

  async getCurrencyList() {
    return axios.get(`currencies`);
  },
};

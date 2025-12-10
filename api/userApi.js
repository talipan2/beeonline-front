import axios from "axios";

export default {

  // авторизация пользователя
  async authUser(values, form) {
    // return axios.post('login', { email, password })
    return useApi().post('login', values, form, false);
  },

  // регистрация пользователя
  async registerUser(values,form) {
    return useApi().post('register', values, form);
  },

  // проверка авторизации
  async checkAuth() {
      return axios.get('auth-check');
  },

  // выход пользователя
   async logOut() {
    return useApi().post('logout');
  },

  async getUser(id) {
    return axios.get(`users/${id}`)
  },

  async otpSend(values, form) {
    return useApi().post('otp-send', values, form)
  },

  async forgotPassword(values, form) {
    return useApi().post('forgot-password', values, form)
  },

  async resetPassword(values, form) {
    return useApi().post('reset-password', values, form)
  },

  async changePassword(values, form) {
    return useApi().post('change-password', values, form)
  },

  async setUserData(values, id, form) {
    return useApi().patch(`users/${id}`, values, form)
  },

  async getFavorites(id, filter={}) {
    let params = {
      category_id: filter.category && filter.category !== 'all' ? filter.category : undefined,
      batch_size_name: filter.minLot && filter.minLot !== 'all' ? filter.minLot : undefined,
      deadline_at: filter.date && filter.date !== 'all' ? filter.date : undefined,
      page: filter.page ? filter.page : undefined,
    }
    params = Object.fromEntries(Object.entries(params).filter(([key, value]) => value !== undefined));
    return axios.get(`users/${id}/favorites`, {params})
  },

  async addFavorite(id, entityId, type) {
    return axios.post(`users/${id}/favorites`, {favoritable_id: entityId, favoritable_type: type.charAt(0).toUpperCase() + type.slice(1)})
  },

  async removeFavorite(id, entityId, type) {
    console.log(id, entityId, type)
    return axios.delete(`users/${id}/favorites`, {
      data: {
        favoritable_id: entityId,
        favoritable_type: type.charAt(0).toUpperCase() + type.slice(1)
      }
    })
  },

  // получение настроек уведомлений
  async getNotifications(id) {
    return axios.get(`users/${id}/notifications`)
  },

  // изменение настроек уведомлений
  async changeNotification(id, data) {
    return axios.put(`users/${id}/notifications`, data)
  },

  // установка настроек уведомлений
  async setNotification(id, data) {
    return axios.post(`users/${id}/notifications`, data)
  },

  // сброс настроек уведомлений
  async resetNotifications(id) {
    return axios.delete(`users/${id}/notifications`)
  },

  async getNotificationsList(id, params={}) {
    return axios.get(`users/${id}/notifications/all`, {params})
  },

  async createNewUser(data, form) {
    return useApi().post(`users`, data, form);
    // return axios.post(`users`, data);
  },

  async getUser(id) {
    return axios.get(`users/${id}`)
  },

  async changeUserData(id, data, form) {
    return useApi().patch(`users/${id}`, data, form)
  },

  // получение статуса подписки на рассылку
  async getNewsletterSubscription(id) {
    return axios.get(`users/${id}/newsletter-subscription`)
  },

  // изменение статуса подписки на рассылку
  async updateNewsletterSubscription(id, subscribed) {
    return axios.put(`users/${id}/newsletter-subscription`, { newsletter_subscribed: subscribed })
  }

}

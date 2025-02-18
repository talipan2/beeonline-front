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
    return axios.post('logout', {})
  },

  async getUser(id) {
    return axios.get(`users/${id}`)
  },

  async resetPassword(values, form) {
    return useApi().post('change-password', values, form)
  },

  async setUserData(values, id, form) {
    return useApi().patch(`users/${id}`, values, form)
  }

}

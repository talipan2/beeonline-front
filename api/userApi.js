import axios from "axios";

export default {

  // авторизация пользователя
  async authUser(email, password) {
    return axios.post('login', { email, password })
  },

  // регистрация пользователя
  async registerUser(name, email, post, phone, role) {
    return axios.post('register', { name, email, phone, post, role })  
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

  async resetPassword(data) {
    return axios.post('change-password', {old_password: data.oldPassword, new_password: data.newPassword})
  }

}
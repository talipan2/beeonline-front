import axios from "axios";

export default {

  // авторизация пользователя
  async authUser(email, password) {
    return axios.post('login', { email, password })
  },

  // регистрация пользователя
  async registerUser(name, email, job, phone) {
    return axios.post('register', { name, email, phone })  
  },

  // проверка авторизации
  async checkAuth() {
      return axios.get('auth-check');
  },

  // выход пользователя
   async logOut() {
    return axios.post('logout', {})
  },

}
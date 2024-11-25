import { defineStore } from 'pinia';
import Api from '@/api/userApi';

export const useUserStore = defineStore('user', {
  state: () => ({
    userData: {},
    userToken: null,
    isAuth: false,
    location: null,
    role: '',
    settingUser: {
      location: 1,
      inn: null,
      KPP: null,
      organizationForm: null,
      ogrn: null,
      legalAddress: null,
      companyName: null,
      companyLogo: null,
      companyDescription: null,
      productionCountry: null,
      selfEmployed: false,
      registerAddress: null,
    },
    token: null,
  }),
  actions: {

    // setToken(token) {
    //   this.token = token;
      
    //   // Используем куки для сохранения токена
    //   const tokenCookie = useCookie('token');
    //   tokenCookie.value = token; // Устанавливаем куки
    // },

    // // Метод для удаления токена
    // clearToken() {
    //   this.token = null;

    //   // Очищаем куки
    //   const tokenCookie = useCookie('token');
    //   tokenCookie.value = null;
    // },

    // // Метод для загрузки токена из куки
    // loadTokenFromCookie() {
    //   const tokenCookie = useCookie('token');
    //   this.token = tokenCookie.value; // Получаем токен из куки

    //   if (this.token) {
    //     return this.checkAuth(); // Проверка авторизации, если токен найден
    //   }
    // },

    loadFromLocalStorage() {
      if(localStorage.getItem('role')) {
        this.role = localStorage.getItem('role');
      }
    },
    async authUser(email, password, isRemember = false) {
      try {
        const response = await Api.authUser(email, password);
        if(response.data) {
          this.isAuth = true;
          this.userToken = response.data.access_token;
          this.userData = response.data.user;
          if(isRemember) {
            localStorage.setItem('token', this.userToken);
          } else {
            sessionStorage.setItem('token', this.userToken);
          }
        }
      } catch (error) {
        throw error;
      }
    },

    async registerUser(name, email, job='', phone) {
      try {
        const response = await Api.registerUser(name, email, job, phone);
        console.log(response)
        if(response.data) {
          this.isAuth = true;
          this.userToken = response.data.access_token;
          localStorage.setItem('token', this.userToken);
          this.userData = response.data.user;
        }
      } catch (error) {
        throw error;
      }
    },

    async checkAuth() {
      try {
        const response = await Api.checkAuth();
        if(response.data) {
          this.isAuth = true;
          this.userData = response.data.user;
          // useCookie('role').value = 'customer';
        }
        return response.data;
      } catch (error) {
        this.userToken = null;
        this.isAuth = false;
        throw error;
      }
    },

    async logOut() {
      try {
        const response = await Api.logOut();
        if(response && response.data) {
          this.userToken = null;
          localStorage.removeItem('token');
          this.isAuth = false;
          this.userData = {};
        }
      } catch (error) {
        throw error;
      }
    },

    async setUserData(data) {
      try {
        const response = await Api.setUserData(data);
        if(response.data.user) {
          this.userData = response.data.user;
        }
      } catch (error) {
        throw error;
      }
    },
  }
});
import { defineStore } from 'pinia';
import Api from '@/api/userApi';

export const useUserStore = defineStore('user', {
  state: () => ({
    userData: {},
    userToken: null,
    isAuth: false,
    location: null,
    role: null,
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
  }),
  actions: {
    loadFromLocalStorage() {
      if(localStorage.getItem('role')) {
        this.role = localStorage.getItem('role');
      }
    },
    async authUser(email, password) {
      try {
        const response = await Api.authUser(email, password);
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

    async registerUser(name, email, job='', phone) {
      try {
        const response = await Api.registerUser(name, email, job, phone);
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

        }
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
import axios from "axios";

axios.defaults.baseURL = `https://e08e-193-42-112-133.ngrok-free.app/api/`;
axios.defaults.headers.common['Content-Type'] = 'application/json; charset=UTF-8'

export default {
  // async authUser(email, password) {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if(email, password) {
  //         resolve({
  //           data: {
  //             message: 'Вы успешно авторизовались!',
  //             user: { id: Math.random().toString(36).substr(2, 9), 
  //               email: email, 
  //               name: 'Имя', 
  //               job: 'Должность', 
  //               phone: 'Телефон', 
  //               token: Math.random().toString(36).substr(2, 9),
  //               location: 'Москва',
  //               inn: null,
  //               legalCompanyName: null,
  //               KPP: null,
  //               organizationForm: null,
  //               ogrn: null,
  //               legalAddress: null,
  //               companyName: null,
  //               companyLogo: "https://i.pinimg.com/736x/49/96/a2/4996a28ab191c620a3feb73c4e609fc0.jpg",
  //               companyDescription: null,
  //               productionCountry: null,
  //             }
  //           }
  //         })
  //       } else {
  //         reject({
  //           response: {
  //             data: {
  //               message: 'Произошла ошибка при авторизации!'
  //             }
  //           }
  //         })
  //       }
  //     }, 1000);
  //   })
  // },

  async authUser(email, password) {
    return axios.post('login', { email, password })
  },

  // async registerUser(name, email, job, phone) {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (name, email, phone) {
  //         resolve({
  //           data: {
  //             message: 'Вы успешно зарегистрировались!',
  //             user: { id: Math.random().toString(36).substr(2, 9), 
  //               email: email, name: name, 
  //               job: job, phone: phone, 
  //               token: Math.random().toString(36).substr(2, 9),
  //               location: null,
  //               inn: null,
  //               legalCompanyName: null,
  //               KPP: null,
  //               organizationForm: null,
  //               ogrn: null,
  //               legalAddress: null,
  //               companyName: null,
  //               companyLogo: null,
  //               companyDescription: null,
  //               productionCountry: null,
  //             }
  //           }
  //         })
  //       } else {
  //         reject({
  //           response: {
  //             data: {
  //               message: 'Произошла ошибка при регистрации!'
  //             }
  //           }
  //         })
  //       }
  //     }, 1000)
  //   })
  // },

  async registerUser(name, email, job, phone) {
    console.log(email)
    return axios.post('register', { name, email, phone })  
  },

  // async checkAuth() {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (localStorage.getItem('token')) {
  //         resolve({
  //           data: {
  //             message: 'Вы успешно авторизовались!',
  //             user: { 
  //               id: Math.random().toString(36).substr(2, 9), 
  //               email: 'qq@qqqqq.ru',
  //               name: 'Владислав', 
  //               job: 'Контролер', 
  //               phone: '898989898989',
  //               location: 'Москва',
  //               inn: null,
  //               legalCompanyName: null,
  //               KPP: null,
  //               organizationForm: null,
  //               ogrn: null,
  //               legalAddress: null,
  //               companyName: null,
  //               companyLogo: "https://i.pinimg.com/736x/49/96/a2/4996a28ab191c620a3feb73c4e609fc0.jpg",
  //               companyDescription: null,
  //               productionCountry: null,
  //             }
  //           }
  //         })
  //       } else {
  //         reject({
  //           response: {
  //             data: {
  //               message: 'Произошла ошибка при авторизации!'
  //             }
  //           }
  //         })
  //       }
  //     }, 1000)
  //   })
  // },

  async checkAuth() {
      return axios.get('auth-check', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'ngrok-skip-browser-warning': 'true'
        }
      });
  },

  // async logOut() {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (localStorage.getItem('token')) {
  //         localStorage.removeItem('token');
  //         resolve({
  //           data: {
  //             message: 'Вы успешно вышли из аккаунта!'
  //           }
  //         })
  //       } else {
  //         reject({
  //           response: {
  //             data: {
  //               message: 'Произошла ошибка при выходе из аккаунта!'
  //             }
  //           }
  //         })
  //       }
  //     }, 1000)
  //   })
  // },

  async logOut() {
    return axios.post('logout', {}, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
  },

  async setUserData(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (localStorage.getItem('token')) {
          resolve({
            data: {
              message: 'Данные успешно обновлены!',
              user: { 
                id: data.id, 
                name: data.name, 
                job: data.job, 
                phone: data.phone,
                location: data.location,
                inn: data.inn,
                legalCompanyName: data.legalCompanyName,
                kpp: data.kpp,
                organizationForm: data.organizationForm,
                ogrn: data.ogrn,
                legalAddress: data.legalAddress,
                companyName: data.companyName,
                companyLogo: data.companyLogo,
                companyDescription: data.companyDescription,
                productionCountry: data.productionCountry,
              }
            }
          })
        } else {
          reject({
            response: {
              data: {
                message: 'Произошла ошибка при обновлении данных'
              }
            }
          })
        }
      }, 1000)
    })
  }
}
import { defineStore } from "pinia";
import Api from "@/api/userApi";
import { useSettingStore } from "./settingStore";
import { useChannelsStore } from "./channelsStore";

export const useUserStore = defineStore("user", {
  state: () => ({
    userData: {},
    userOrganization: {},
    userPubCard: {
      id: null,
      name: null,
      description: null,
      logo: null,
      gallery: null,
      urlSite: null,
      urlTg: null,
      urlVk: null,
      urlYt: null,
      cities: null,
      regions: null,
      videos: null,
      view_count: 0,
      type: null,
    },
    userToken: null,
    userOrganizationId: null,
    isAuth: false,
    location: null,
    role: "",
    userRoles: [],
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
    userBalance: 1000.2,
    userBonuses: 100000,
    userInvoicing: null,
    userNotifications: null,
    unreadChatsCount: 0,
  }),
  getters: {
    getRole: (state) => state.role,
    getRoleNameForBreadcrumbs: (state) => {
      switch (state.role) {
        case "customer":
          return "заказчика";
        case "performer":
          return "исполнителя";
        case "adjacent":
          return "партнера";
      }
    },
  },
  actions: {
    setDataForUser(data) {
      if (!data) return;

      this.userData = data;

      if (data.organization) {
        this.userOrganization = data.organization;
      }

      if (data.public_cards) {
        const cardType = data.role;
        this.role = cardType;

        const foundCard = data.public_cards.find(
          (card) => card.type === cardType
        );
        if (foundCard) {
          this.userPubCard = foundCard;
        }
      }
    },

    loadFromLocalStorage() {
      if (localStorage.getItem("role")) {
        this.role = localStorage.getItem("role");
      }
    },
    async authUser(values, form) {
      const data = await Api.authUser(values, form);
      this.isAuth = true;
      this.userToken = data.access_token;
      this.userData = data.user;
      this.userRoles = data.user.roles;
      this.role = data.user.role;
      this.userNotifications = data.user?.unread_log_events_count;
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      if (values.is_remember) {
        localStorage.setItem("token", this.userToken);
      } else {
        sessionStorage.setItem("token", this.userToken);
      }
    },

    async registerUser(values, form) {
      try {
        const response = await Api.registerUser(values, form);
        if (response) {
          this.isAuth = true;
          this.userToken = response.access_token;
          localStorage.setItem("token", this.userToken);
          this.userData = response.user;
          this.userRoles = response.user.roles;
          this.role = response.user.role;
          this.userOrganizationId = response.user.organization_id;
          this.userNotifications = response.user?.unread_log_events_count;
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          useSettingStore().setAlert("error", error.response.data.message);
        }
        throw error;
      }
    },

    async checkAuth(beesync = false) {
        // const response = await Api.checkAuth();
        return useApi().get('auth-check', {
            beesync: beesync,
        }, null, true)
        .then((response) => {
            if (response) {
                this.isAuth = true;
                this.userData = response.user;
                this.userNotifications = response.user?.unread_log_events_count;
                // useCookie('role').value = 'customer';
                this.userRoles = response.user.roles;
                this.role = response.user.role;
                this.userOrganizationId = response.user.organization_id;
                if (response.user && response.user.organization) {
                  this.userOrganization = response.user.organization;
                }
                if (response.user?.access_token) {
                    this.userToken = response.user.access_token;
                    localStorage.setItem("token", this.userToken);
                }
                if (
                  response.user &&
                  response.user.public_cards &&
                  response.user.public_cards.length > 0
                ) {
                  if (this.role === "customer") {
                    const customerCard = response.user.public_cards.find(
                      (card) => card.type === "customer"
                    );
                    console.log(customerCard);
                    this.userPubCard = customerCard;
                  } else if (this.role === "performer") {
                    const performerCard = response.user.public_cards.find(
                      (card) => card.type === "performer"
                    );
                    console.log(performerCard);
                    this.userPubCard = performerCard;
                  } else if (this.role === "adjacent") {
                    const adjacentCard = response.user.public_cards.find(
                      (card) => card.type === "adjacent"
                    );
                    console.log(adjacentCard);
                    this.userPubCard = adjacentCard;
                  }
                }

                useChannelsStore()
                  .orgChannel.stopListening("OrganizationUpdate")
                  .listen("OrganizationUpdate", (event) => {
                    if (this.userOrganization.id === event.id) {
                      this.userOrganization = {
                        ...this.userOrganization,
                        ...event,
                      };
                    }
                  });

                useChannelsStore()
                  .orgChannel.stopListening("UnreadNotificationCountUpdated")
                  .listen("UnreadNotificationCountUpdated", (event) => {
                    console.log(event);
                    this.userNotifications = event.count_unread_noty;
                  });

                useChannelsStore()
                    .orgChannel
                    .stopListening("CounterpartyCheckUpdate")
                    .listen("CounterpartyCheckUpdate", (event) => {
                        eventBus.emit('CounterpartyCheckUpdate', event);
                    });

                useChannelsStore()
                    .orgChannel.stopListening("InvoiceUpdate")
                    .listen("InvoiceUpdate", (event) => {
                        eventBus.emit('InvoiceUpdate', event);
                    });

                useChannelsStore()
                    .orgChannel.stopListening("NewChatMessageEvent")
                    .listen("NewChatMessageEvent", (event) => {
                        eventBus.emit('NewChatMessageEvent', event);
                    });
                useChannelsStore()
                    .orgChannel.stopListening("ChatMessageReadedEvent")
                    .listen("ChatMessageReadedEvent", (event) => {
                        eventBus.emit('ChatMessageReadedEvent', event);
                    });
                useChannelsStore()
                    .orgChannel.stopListening("UnreadChatsCountEvent")
                    .listen("UnreadChatsCountEvent", (event) => {
                        eventBus.emit('UnreadChatsCountEvent', event);
                    });
              }
              return response;
        })
        .catch((error) => {
            this.isAuth = false;
            throw error;
        });
    },

    async logOut() {
      try {
        await Api.logOut();

        this.userToken = null;
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        this.isAuth = false;
        this.userData = {};
        this.userRoles = [];
        this.userOrganization = {};
        this.userPubCard = {};
        this.userOrganizationId = null;

        return Promise.resolve();
      } catch (error) {
        this.userToken = null;
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        this.isAuth = false;
        this.userData = {};
        this.userRoles = [];
        this.userOrganization = {};
        this.userPubCard = {};
        this.userOrganizationId = null;

        return Promise.reject(error);
      }
    },

    // Изменение пароля
    async resetPassword(data, form) {
      try {
        const response = await Api.resetPassword(data, form);
        if (response.data) {
          return response.data;
        }
      } catch (error) {
        throw error;
      }
    },

    // отправка запроса для восстановления пароля
    async forgotPassword(data, form) {
      try {
        const response = await Api.forgotPassword(data, form);
        if (response.data) {
          return response.data;
        }
      } catch (error) {
        throw error;
      }
    },

    async resetForgotPassword(data, form) {
      try {
        const response = await Api.resetForgotPassword(data, form);
        if (response.data) {
          return response.data;
        }
      } catch (error) {
        throw error;
      }
    },

    async setUserData(data, id, form) {
      try {
        const response = await Api.setUserData(data, id, form);
        if (response) {
          this.setDataForUser(response.data);
          return response;
        }
      } catch (error) {
        throw error;
      }
    },

    async getUserData(id) {
      try {
        const response = await Api.getUser(id);
        if (response.data && response.data.data) {
          if (response.data.data.organization) {
            this.userOrganization = response.data.data.organization;
          }
          if (response.data.data.public_cards) {
            if (this.role === "customer") {
              const customerCard = response.data.data.public_cards.find(
                (card) => card.type === "customer"
              );
              this.userPubCard = customerCard;
            } else if (this.role === "performer") {
              const performerCard = response.data.data.public_cards.find(
                (card) => card.type === "performer"
              );
              this.userPubCard = performerCard;
            } else if (this.role === "adjacent") {
              const adjacentCard = response.data.data.public_cards.find(
                (card) => card.type === "adjacent"
              );
              this.userPubCard = adjacentCard;
            }
          }
          return response.data;
        }
      } catch (error) {
        throw error;
      }
    },

    async getFavorites(id, params) {
      try {
        const response = await Api.getFavorites(id, params);
        if (response.data) {
          return response.data;
        }
      } catch (error) {
        throw error;
      }
    },

    async addFavorite(id, entityId, type) {
      try {
        const response = await Api.addFavorite(id, entityId, type);
        if (response.data) {
          return response.data;
        }
      } catch (error) {
        throw error;
      }
    },

    async removeFavorite(id, entityId, type) {
      try {
        const response = await Api.removeFavorite(id, entityId, type);
        if (response.data) {
          return response.data;
        }
      } catch (error) {
        throw error;
      }
    },

    // получение уведомления
    async getNotifications(id) {
      try {
        const response = await Api.getNotifications(id);
        if (response.data) {
          return response.data;
        }
      } catch (error) {
        throw error;
      }
    },

    // изменение уведомления
    async changeNotification(id, data) {
      try {
        const response = await Api.changeNotification(id, data);
        if (response.data) {
          return response.data;
        }
      } catch (error) {
        throw error;
      }
    },

    async resetNotification(id) {
      try {
        const response = await Api.resetNotifications(id);
        if (response.data) {
          return response.data;
        }
      } catch (error) {
        throw error;
      }
    },

    async setNotification(id, data) {
      try {
        const response = await Api.setNotification(id, data);
        if (response.data) {
          return response.data;
        }
      } catch (error) {
        throw error;
      }
    },

    async getNotificationsList(id, params) {
      try {
        const response = await Api.getNotificationsList(id, params);
        if (response.data) {
          return response.data;
        }
      } catch (error) {
        throw error;
      }
    },

    async createNewUser(data) {
      try {
        const response = await Api.createNewUser(data);
        if (response.data) {
          return response.data;
        }
      } catch (error) {
        throw error;
      }
    },

    async getUser(id) {
      try {
        const response = await Api.getUser(id);
        if (response.data) {
          return response.data;
        }
      } catch (error) {
        throw error;
      }
    },

    async changeUserData(id, data, form) {
      try {
        const response = await Api.changeUserData(id, data, form);
        if (response.data) {
          return response.data;
        }
      } catch (error) {
        throw error;
      }
    },

    async getCityByIp() {
        return await useApi().get('get-city-by-ip', null, null, true);
    },
    async setCity(cityId) {
        return await useApi().post('set-city', {
            city_id: cityId,
        });
    },
    async sendUnreadChatsCount() {
        return await useApi().post('send-unread-chats-count', null, null, true);
    },
  },
});

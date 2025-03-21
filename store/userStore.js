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
                const response = await Api.registerUser(values, form)
                if (response) {
                    this.isAuth = true;
                    this.userToken = response.access_token;
                    localStorage.setItem("token", this.userToken);
                    this.userData = response.user;
                    this.userRoles = response.user.roles;
                    this.role = response.user.role;
                    this.userOrganizationId = response.user.organization_id;
                }
            } catch (error) {
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.message
                ) {
                    useSettingStore().setAlert(
                        "error",
                        error.response.data.message
                    );
                }
                throw error;
            }
        },

        async checkAuth() {
            try {
                const response = await Api.checkAuth();
                console.log(response.data.user)
                if (response.data) {
                    this.isAuth = true;
                    this.userData = response.data.user;
                    // useCookie('role').value = 'customer';
                    this.userRoles = response.data.user.roles;
                    this.role = response.data.user.role;
                    this.userOrganizationId =
                        response.data.user.organization_id;
                    if (response.data.user && response.data.user.organization) {
                        this.userOrganization = response.data.user.organization;
                    }
                    if (
                        response.data.user &&
                        response.data.user.public_cards &&
                        response.data.user.public_cards.length > 0
                    ) {
                        if (this.role === "customer") {
                            const customerCard =
                                response.data.user.public_cards.find(
                                    (card) => card.type === "customer"
                                );
                            console.log(customerCard);
                            this.userPubCard = customerCard;
                        } else if (this.role === "performer") {
                            const performerCard =
                                response.data.user.public_cards.find(
                                    (card) => card.type === "performer"
                                );
                            console.log(performerCard);
                            this.userPubCard = performerCard;
                        } else if (this.role === "adjacent") {
                            const adjacentCard =
                                response.data.user.public_cards.find(
                                    (card) => card.type === "adjacent"
                                );
                            console.log(adjacentCard);
                            this.userPubCard = adjacentCard;
                        }
                    }

                    useChannelsStore().orgChannel
                    .stopListening("OrganizationUpdate")
                    .listen("OrganizationUpdate", (event) => {
                        if (this.userOrganization.id === event.id) {
                            this.userOrganization = {
                                ...this.userOrganization,
                                ...event,
                            };
                        }
                    })
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
                if (response && response.data) {
                    this.userToken = null;
                    localStorage.removeItem("token");
                    sessionStorage.removeItem("token");
                    this.isAuth = false;
                    this.userData = {};
                    this.userRoles = [];
                    this.userOrganization = {};
                    this.userPubCard = {};
                    this.userOrganizationId = null;
                }
            } catch (error) {
                throw error;
            }
        },
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

        async setUserData(data, id, form) {
            try {
                const response = await Api.setUserData(data, id, form);
                if (response) {
                    console.log(response)
                    this.userData = response.data;
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
                            const customerCard =
                                response.data.data.public_cards.find(
                                    (card) => card.type === "customer"
                                );
                            this.userPubCard = customerCard;
                        } else if (this.role === "performer") {
                            const performerCard =
                                response.data.data.public_cards.find(
                                    (card) => card.type === "performer"
                                );
                            this.userPubCard = performerCard;
                        } else if (this.role === "adjacent") {
                            const adjacentCard =
                                response.data.data.public_cards.find(
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
    },
});

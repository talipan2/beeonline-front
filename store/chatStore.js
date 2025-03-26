import { defineStore } from "pinia";
import axios from "axios";
import { useApi } from "~/composables/useApi";
import { useUserStore } from "./userStore";

export const useChatStore = defineStore("chatStore", {
    state: () => ({
        is_manager: null,
		orders: null,
		adjacentServices: null,
    }),
    getters: {},
    actions: {
		async loadNewResponsesCount(order_id) {
			return await useApi().post(`/chat/load_new_responses_count`, {
				order_id: order_id
			});
		},
		async loadNewResponses(order_id) {
			return await useApi().post(`/chat/load_new_responses`, {
				order_id: order_id
			});
		},
		async selectPerformer(chat_id, performer_id) {
			return await useApi().post(`/chat/${chat_id}/select_performer`, {
				performer_id: performer_id
			});
		},
		async unselectPerformer(chat_id, performer_id) {
			return await useApi().post(`/chat/${chat_id}/unselect_performer`, {
				performer_id: performer_id
			});
		},
        setIsManager(is_manager) {
            this.is_manager = is_manager;
        },
        setUserId(user_id) {
            this.user_id = user_id;
        },
        setRole(role) {
            this.role = role;
        },
        async getChat(chat_id, data) {
            return await useApi().post(`/chat/${chat_id}`, {
                ...data,
                is_manager: this.is_manager,
            });
        },
        async getChats(data) {
            return await useApi().post("/chat/chats", data);
        },
        async searchMessages(data) {
            return await useApi().post("/chat/search_messages", data);
        },
        async getInitChat(data) {
            return await useApi().post("/chat/init", {
                ...data,
                is_manager: this.is_manager,
            });
        },
        async setAsReaded(chat_id, data) {
            return await useApi().post(`/chat/${chat_id}/read`, data);
        },
        async sendMessage(chat_id, data) {
            return await useApi().post(`/chat/${chat_id}/send`, {
                ...data,
                is_manager: this.is_manager,
            });
        },
        async sendFirstMessage(data) {
            return await useApi().post(`/chat/create`, data);
        },
        async getMessages(chat_id, message_id = null, direction = "up") {
            return await useApi().post(`/chat/${chat_id}/messages`, {
                message_id: message_id,
                direction: direction,
                is_manager: this.is_manager,
            });
        },
		async getOrders() {
            const role = useUserStore().role;
            console.log(role);
			// if (role != "customer") return null;
			if (!this.orders) {
				this.orders = await useApi().post("/chat/orders");
			}
			return this.orders;
		},
		async getAdjacentServices() {
            const role = useUserStore().role;
			// if (role != "adjacent") return null;
			if (!this.adjacentServices) {
				this.adjacentServices = await useApi().post("/chat/adjacentServices");
			}
			return this.adjacentServices;
		},

        pluralize(number, forms) {
            const cases = [2, 0, 1, 1, 1, 2];
            number = Math.round(number);
            return forms[
                number % 100 > 4 && number % 100 < 20
                    ? 2
                    : cases[number % 10 < 5 ? number % 10 : 5]
            ];
        },
        getProductType(product) {
            switch (product.type) {
                case "service":
                    return "Услуга";
                case "order":
                    return "Заказ";
                default:
                    return "";
            }
        },
        getOrgType(org) {
            switch (org.pivot?.role) {
                case "customer":
                    return "Заказчик";
                case "performer":
                    return "Исполнитель";
                default:
                    return null;
            }
        },
        async sendReview(chat_id, data) {
            return await useApi().post(`/chat/${chat_id}/review`, data);
        },
        async setPinned(chat_id, pinned = true) {
            return await useApi().post(`/chat/${chat_id}/set_pinned`, {
				pinned: pinned,
			});
        },

        async makeRequest(
            url,
            data = null,
            method = "post",
            abortController = null
        ) {
            let params = {
                method: method,
                url: url,
                data: data,
            };

            if (abortController) {
                params.signal = abortController.signal;
            }

            return axios(params)
                .then((response) => {
                    return response.data;
                })
                .catch(function (error) {
					let data = {};

                    if (error.response) {
						if (error.response.data) {
							data = {
								message: error.response.data.message,
								file: error.response.data.file,
								line: error.response.data.line,
							}
						}
                    }

					data.error = error;

					// axios.post("/ajax_req/js_error", {
                    //     channel: "chat",
                    //     error: data,
                    // });

                    showMessage(
                        "Ошибка",
                        error.response?.data?.message || error.message
                    );
                });
        },


        async getChatList() {
            return await useApi().get("/chat/list");
        },
    },
});

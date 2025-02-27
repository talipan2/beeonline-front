import { defineStore } from "pinia";
import Echo from "laravel-echo";
import { useChatStore } from "~/store/chatStore";
import { useUserStore } from "~/store/userStore";

export const useChannelsStore = defineStore("channelsStore", {
    state: () => ({
        laravelEcho: null,
        _userChannel: null,
        _orgChannel: null,
        socketId: null,
    }),
    getters: {
        userChannel(state) {
            if (!state._userChannel) {
                state._userChannel = this.private(
                    `user.${useUserStore().userData?.id}`
                );
            }
            return state._userChannel;
        },
        orgChannel(state) {
            if (!state._orgChannel) {
                state._orgChannel = this.private(
                    `organization.${useUserStore().userOrganizationId}`
                );
            }
            return state._orgChannel;
        },
    },
    actions: {
        initEcho() {
            if (this.laravelEcho) {
                return;
            }

            const { public: config } = useRuntimeConfig();
            const token =
                localStorage.getItem("token") ||
                sessionStorage.getItem("token") ||
                null;

            this.laravelEcho = new Echo({
                broadcaster: "pusher",
                key: config.pusher.key,
                wsHost: config.pusher.host,
                wsPort: config.pusher.port,
                wssPort: config.pusher.port,
                forceTLS: false,
                encrypted: true,
                disableStats: true,
                enabledTransports: ["ws", "wss"],
                cluster: "mt1",
                authEndpoint: `http://${config.pusher.host}/broadcasting/auth`,
                auth: {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                },
            });
            this.laravelEcho.connector.pusher.connection.bind(
                "connected",
                () => {
                    console.log("connected");
                    this.socketId = this.laravelEcho.socketId();
                }
            );
        },

        private(channel) {
            if (!this.laravelEcho) {
                this.initEcho();
            }
            return this.laravelEcho
                .private(channel)
                .subscribed(() => {
                    console.log(`subscribed on channel ${channel}`);
                })
                .error((error) => {
                    console.error(error);
                });
        },

        leave(channel) {
            if (!this.laravelEcho) {
                return;
            }
            this.laravelEcho.leave(channel);
        },
    },
});

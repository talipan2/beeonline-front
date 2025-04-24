<template>
	<div class="dialogs"
		:class="{
			'dialogs_loading': loading
		}"
	>
		<div class="dialogs__head">
			<!-- <div class="dialogs__head-title">Чаты</div> -->
			<!-- <a href="javascript:;" class="dialogs__head-link"
				><i class="icon-plus"></i> Новый чат</a
			>
			<a href="javascript:;" class="dialogs__head-link"
				><i class="icon-filter"></i> Фильтр</a
			> -->
            <div class="dialogs__order">
				<div class="dialogs__order-title">Фильтр чата</div>
                <div class="dialogs__search">
                    <div class="dialogs__search-type">
                        <label :class="{
                            active: chatType === 'order'
                        }">
                            <span>Заказы</span>
                            <input type="radio" value="order" v-model="chatType" />
                        </label>
                        <label :class="{
                            active: chatType === 'adjacent'
                        }">
                            <span>ССО</span>
                            <input type="radio" value="adjacent" v-model="chatType" />
                        </label>
                    </div>
                </div>
                <template v-if="chatType === 'adjacent' && adjacentOptions?.length">
                    <Multiselect
                        v-model="adjacentService"
                        :options="adjacentOptions"
                    >
                    </Multiselect>
                </template>
                <template v-if="chatType === 'order' && ordersOptions?.length">
                    <Multiselect
                        v-model="order"
                        :options="ordersOptions"
                    >
                        <!-- <template v-slot:singlelabel="{ value }">
                            <div class="multiselect-single-label">
                            <img class="character-label-icon" :src="value.icon"> {{ value.name }}
                            </div>
                        </template>

                        <template v-slot:option="{ option }">
                            <img class="character-option-icon" :src="option.icon"> {{ option.name }}
                        </template> -->
                    </Multiselect>
                </template>
			</div>
			<div class="dialogs__search">
				<div class="dialogs__search-wrap">
					<input
						type="text"
						class="dialogs__search-input"
						placeholder="Искать контакт или чат"
						v-model="search"
						@input="onSearch"
					/>
					<div
						v-if="!search.length"
						class="dialogs__search-icon"
					></div>
					<div
						v-if="search.length"
						class="dialogs__search-reset"
						@click="resetSearch"
					></div>
				</div>
				<div class="dialogs__search-type" v-if="search.length">
					<label :class="{
						active: searchType === 'dialogs'
					}">
						<span>Диалоги</span>
						<input type="radio" value="dialogs" v-model="searchType" />
					</label>
					<label :class="{
						active: searchType === 'messages'
					}">
						<span>Сообщения</span>
						<input type="radio" value="messages" v-model="searchType" />
					</label>
				</div>
			</div>
		</div>

		<div class="dialogs__list" @scroll="onScroll" ref="dialogs">
			<template v-if="dialogs.length">
				<template v-for="dialog in dialogs" :key="dialog">
					<chat-dialogs-item
						:dialog="dialog"
						:chat_id="chat_id"
						@change:chat="$emit('change:chat', $event)"
						@change:chat-by-message="$emit('change:chat-by-message', $event)"
						@change:pinned="dialog.is_pinned = $event"
						v-if="dialog.is_pinned"
					/>
				</template>
				<template v-for="dialog in dialogs" :key="dialog">
					<chat-dialogs-item
						:dialog="dialog"
						:chat_id="chat_id"
						@change:chat="$emit('change:chat', $event)"
						@change:chat-by-message="$emit('change:chat-by-message', $event)"
						@change:pinned="dialog.is_pinned = $event"
						v-if="dialog.is_priority && !dialog.is_pinned"
					/>
				</template>
				<template v-for="dialog in dialogs" :key="dialog">
					<chat-dialogs-item
						:dialog="dialog"
						:chat_id="chat_id"
						@change:chat="$emit('change:chat', $event)"
						@change:chat-by-message="$emit('change:chat-by-message', $event)"
						@change:pinned="dialog.is_pinned = $event"
						v-if="!dialog.is_pinned && !dialog.is_priority"
					/>
				</template>
			</template>
			<template v-else-if="!loading">
				<div class="dialogs__text" v-if="search.length">
					<span v-if="searchType === 'dialogs'">Диалоги не найдены</span>
					<span v-else-if="searchType === 'messages'">Сообщения не найдены</span>
				</div>
			</template>
		</div>
		<a href="javascript:;" class="btn btn-primary dialogs__lifecycle" @click="loadNewResponses" v-if="order?.lifecycle_status === 'yellow'">
			Получить новые отклики
		</a>
	</div>
</template>

<style src="@vueform/multiselect/themes/default.css"></style>

<script>
import { useChatStore } from "~/store/chatStore";
import { useChannelsStore } from "~/store/channelsStore";
import { useUserStore } from "~/store/userStore";
import ChatDialogsItem from "./item.vue";
import Multiselect from "@vueform/multiselect";

export default {
	components: {
		ChatDialogsItem,
		Multiselect,
	},
	emits: ["change:chat", "change:chat-by-message"],
    props: {
        chat_id: {
            type: Number,
            default: null,
        },
    },
    data: () => ({
		search: '',
		searchType: 'dialogs',
		searching: false,
		searchTimeout: null,
		searchMinLength: 3,

        dialogs: [],
        loading_dialogs: [],

        loading: false,
        noMoreChats: false,

		order: null,
		adjacentService: null,
		lifecycle_status: 'green',
		orders: [],
		newResponses: 0,

        chatType: 'order',
    }),

    mounted() {
        this.loadChats(true);
		useChatStore().getOrders();
		useChatStore().getAdjacentServices();

        eventBus.on('NewChatMessageEvent', this.NewChatMessageEvent);

        eventBus.on('ChatMessageReadedEvent', this.ChatMessageReadedEvent);
    },

    beforeUnmount() {
        eventBus.off('NewChatMessageEvent', this.NewChatMessageEvent);
        eventBus.off('ChatMessageReadedEvent', this.ChatMessageReadedEvent);
    },

    methods: {
        NewChatMessageEvent(event) {
            this.newMessage(event.message);
        },
        ChatMessageReadedEvent(event) {
                let index = this.dialogs.findIndex(
                (dialog) => dialog.id == event.chat_id
            );
            if (index === -1) return;
            let dialog = this.dialogs[index];

            if (event.organization_id == useUserStore().userData.organization_id) {
                if (dialog.read_message_id < event.message_id) {
                    dialog.read_message_id = event.message_id;
                }
            }
        },

		changePinned(chat_id, is_pinned) {
			let index = this.dialogs.findIndex(
				(dialog) => dialog.id == chat_id
			);
			if (index === -1) return;
			let dialog = this.dialogs[index];
			dialog.is_pinned = is_pinned;
		},
		loadNewResponsesCount() {
			if (!this.order) return;
			this.newResponses = 0;
			useChatStore().loadNewResponsesCount(this.order.id).then((data) => {
				this.newResponses = data || 0;
			});
		},
		loadNewResponses() {
			this.loading = true;
			useChatStore().loadNewResponses(this.order.id).then(() => {
				this.newResponses = 0;
				this.order.lifecycle_status = 'green';
				this.loading = false;
				this.runSearch();
			}).finally(() => {
				this.loading = false;
			});
		},
        addDialog(dialog, to_end = true) {
            dialog.last_message = dialog.messages ? dialog.messages[0] : null;
            if (dialog.last_message) {
                dialog.last_message.date = new Date(
                    dialog.last_message.created_at
                );
            }
            delete dialog.messages;
            if (to_end) {
                this.dialogs.push(dialog);
            } else {
                this.dialogs.unshift(dialog);
            }
        },
        newMessage(message) {
            let index = this.dialogs.findIndex(
                (dialog) => dialog.id == message.chat_id
            );

            if (index == -1) {
                if (this.loading_dialogs.includes(message.chat_id)) {
                    return;
                }
                this.loading_dialogs.push(message.chat_id);

                useChatStore()
                    .getChat(message.chat_id, {
                        is_short: true,
                    })
                    .then((response) => {
                        const indexToRemove = this.loading_dialogs.indexOf(
                            message.chat_id
                        );
                        if (indexToRemove !== -1) {
                            this.loading_dialogs.splice(indexToRemove, 1);
                        }
                        this.addDialog(response, false);
                    });

                return;
            }

            message.date = new Date(message.created_at);
            this.dialogs[index].last_message = message;
            let dialog = this.dialogs.splice(index, 1)[0];
            this.dialogs.unshift(dialog);

			if (message.organization_id == useUserStore().userData.organization_id) {
				if (dialog.read_message_id < message.id) {
					dialog.read_message_id = message.id;
				}
			}

            if (dialog.last_message_id < message.id) {
                dialog.last_message_id = message.id;
            }
        },

        loadChats(clear = false) {
            if (this.loading || this.noMoreChats) return;

			if (!this.search.length) {
				this.searchType = 'dialogs';
			}

            this.loading = true;
            const lastMessageAt = this.dialogs.length
                ? this.dialogs[this.dialogs.length - 1].last_message_at
                : null;

			if (this.searchType === 'dialogs') {
				const response = useChatStore()
				.getChats({
					last_message_at: lastMessageAt,
					search: this.search?.length >= this.searchMinLength ? this.search : '',
					order_id: this.order?.id,
					adjacent_service_id: this.adjacentService?.id,
					lifecycle_status: this.lifecycle_status,
                    chat_type: this.chatType,
				})
				.then((data) => {
					if (clear) {
						this.dialogs = [];
					}
					if (!data.length) {
						this.noMoreChats = true;
					}
					if (data.length > 0) {
						data.forEach((dialog) => {
							this.addDialog(dialog);
						});
						this.$nextTick(this.checkIfScrollable);
					}
				})
				.finally(() => {
					this.loading = false;
				});
			} else {
				const response = useChatStore()
				.searchMessages({
					last_created_at: lastMessageAt,
					search: this.search?.length >= this.searchMinLength ? this.search : '',
					order_id: this.order?.id,
					lifecycle_status: this.lifecycle_status,
				})
				.then((data) => {
					if (!data.length) {
						this.noMoreChats = true;
					}
					if (data.length > 0) {
						data.forEach((message) => {
							let chat = JSON.parse(JSON.stringify(message.chat));
							delete message.chat;
							chat.messages = [message];
							chat.last_message_at = message.created_at;
							chat.is_message_search = true;
							this.addDialog(chat);
						});
						this.$nextTick(this.checkIfScrollable);
					}
				})
				.finally(() => {
					this.loading = false;
				});
			}

        },
        onScroll() {
            const container = this.$refs.dialogs;
            if (
                container.scrollTop + container.clientHeight + 10 >=
                container.scrollHeight
            ) {
                this.loadChats();
            }
        },
        checkIfScrollable() {
            const container = this.$refs.dialogs;
            if (
                container.scrollHeight <= container.clientHeight &&
                !this.noMoreChats
            ) {
                this.loadChats();
            }
        },
		runSearch() {
			this.noMoreChats = false;
			this.dialogs = [];
			this.loadChats(true);
		},
		onSearch() {
			clearTimeout(this.searchTimeout);
			this.searchTimeout = setTimeout(() => {
				if (!this.isSearching && this.search.length) return;
				this.runSearch();
			}, 500);
		},
		resetSearch() {
			this.search = '';
			this.runSearch();
		}
    },

	computed: {
		isSearching() {
			return this.search?.length >= this.searchMinLength;
		},
		isSearchingMessages() {
			return this.search?.length >= this.searchMinLength && this.searchType === 'messages';
		},
		ordersOptions() {
            if (!useChatStore().orders) return [];
			let orders = useChatStore().orders.map((order) => {
				return {
					label: order.name,
					value: order,
				};
			});
			if (!orders?.length) return [];
			this.order = orders[0].value;
			orders.unshift({
				label: 'Не выбран заказ',
				value: null,
			});
			return orders;
		},
		adjacentOptions() {
            if (!useChatStore().adjacentServices) return [];
			let adjacentServices = useChatStore().adjacentServices.map((adjacentService) => {
				return {
					label: adjacentService.name,
					value: adjacentService,
				};
			});
			if (!adjacentServices?.length) return [];
            let empty = {
				label: 'Не выбрана услуга',
				value: null,
			};
			this.adjacentService = adjacentServices[0].value;
			adjacentServices.unshift({
				label: 'Не выбрана услуга',
				value: null,
			});
			return adjacentServices;
		},
	},

	watch: {
		searchType() {
			this.runSearch();
		},
		order() {
			this.lifecycle_status = 'green';
			this.loading = false;
			this.noMoreChats = false;
			this.dialogs = [];
			this.runSearch();
			this.loadNewResponsesCount();
		},
		adjacentService() {
			this.loading = false;
			this.noMoreChats = false;
			this.dialogs = [];
			this.runSearch();
			this.loadNewResponsesCount();
		},
        chatType() {
            this.loading = false;
            this.noMoreChats = false;
            this.dialogs = [];
            this.runSearch();
        }
	}
};
</script>

<style lang="scss">
.dialogs {
	--ms-option-bg-selected: #6937a5;
	--ms-option-bg-selected-pointed: #6937a5;
	--ms-ring-color: #6937a530;
	--ms-font-size: 1.4rem;
	--ms-option-font-size: 1.4rem;
	--ms-max-height: 30rem;

    --color-white: #fff;
    --color-black: #000000;
    --color-border-gray: #c4c4c4;
    --color-purple: #6937a5;
    --color-blue-100: #60a5fa;
    --color-blue-200: #3897f0;
    --color-gray-100: #f1f5f9;
    --color-gray-200: #f0f4fb;
    --color-gray-300: #e2e8f0;
    --color-gray-400: #cbd5e1;
    --color-gray-500: #94a3b8;
    --color-gray-600: #64748b;
    --color-gray-700: #475569;

    font-size: 10px;
    background-color: var(--color-white);

	flex-grow: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;

	&_loading {
		opacity: 0.5;
	}

	&__text {
		padding: 0 2.4em;

		span {
			font-size: 1.4em;
		}
	}

    &__head {
        padding: 2.4em;
        // display: flex;
        // align-items: center;

        &-title {
            font-size: 2em;
            line-height: 1.4em;
            font-weight: 600;
            color: var(--color-gray-700);
            flex-grow: 1;
        }

        &-link {
            font-size: 1.2em;
            line-height: 1.5em;
            font-weight: 600;
            color: var(--color-gray-600);
            margin-left: 1.5em;
        }
    }

	&__order {
        margin-bottom: 2em;

		&-title {
			font-size: 1.4em;
			line-height: 1.5em;
			font-weight: 600;
			color: var(--color-gray-700);
			margin-bottom: 0.5em;
		}
	}

    &__search {
        // padding: 0 2.4em 1.2em;

        &-wrap {
            margin-top: 1em;
            position: relative;
            height: 4em;
        }

        &-input {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            font-size: 1.4em;
            line-height: 1.5em;
            background-color: var(--color-gray-300);
            border-radius: 2px;
            border: 0;
            padding-left: 1em;
            padding-right: 3em;
            outline: none;
            color: var(--color-gray-600);

            &::placeholder {
                color: var(--color-gray-500);
            }
        }

		&-icon {
			pointer-events: none;
			position: absolute;
			top: 0;
			right: 1em;
			bottom: 0;
			width: 2em;
			height: 2em;
			margin: auto 0;
			background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='%2394a3b8'%3E%3Cpath d='M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z'/%3E%3C/svg%3E");
		}

		&-reset {
			position: absolute;
			top: 0;
			right: 1em;
			bottom: 0;
			width: 2em;
			height: 2em;
			margin: auto 0;
			background-color: var(--color-gray-400);
			cursor: pointer;
			opacity: 0.7;

			&:hover {
				opacity: 1;
			}

			&::after,
			&::before {
				content: "";
				position: absolute;
				inset: 0;
				width: 50%;
				height: 2px;
				margin: auto;
				background-color: var(--color-gray-600);
			}

			&::after {
				transform: rotate(45deg);
			}

			&::before {
				transform: rotate(-45deg);
			}
		}
    }

	&__search-type {
		display: flex;
		align-items: center;
		padding: .5em;
		background-color: var(--color-gray-200);
		border-radius: 5px;
		gap: .5em;
		margin-top: .5em;

		label {
			flex: 1 1 auto;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 0;
			background-color: var(--color-gray-300);
			position: relative;
			z-index: 0;
			border-radius: 5px;
			padding: .5em;
			cursor: pointer;

			&:hover,
			&.active {
				background-color: var(--color-gray-400);
			}

			input {
				position: absolute;
				pointer-events: none;
				z-index: -1;
				opacity: 0;
			}

			span {
				font-size: 1.3em;
			}
		}
	}

    &__list {
        overflow-y: auto;
    }

	&__lifecycle {
		padding: 2.4em;
		display: flex;
		border-radius: 0;
		margin-top: auto;
	}
}
</style>

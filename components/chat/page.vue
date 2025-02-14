<template>
	<div class="chat-page-wrap">
		<!-- <chat-deal-stages :deal-stage="dealStage" :open="open"/> -->
		<div class="chat-page">
			<div class="chat-page__chat">
				<div
					class="chat-page__left"
					:class="{
						open: open,
					}"
				>
					<chat-dialogs
						:chat_id="chatId"
						@change:chat="
							chatId = $event;
							open = true;
						"
						@change:chat-by-message="changeChatByMessage"
						ref="chatDialogs"
					/>
				</div>
				<div
					class="chat-page__right"
					:class="{
						open: open,
					}"
				>
					<chat
						ref="chat"
						:init_chat_id="chatId"
						:init_order_id="initOrderId"
						@change:chat="
							chatId = $event;
							open = true;
						"
						@close="open = false"
						@change:deal-stage="dealStage = $event"
						@change:pinned="changePinned"
					/>
				</div>
			</div>
		</div>
    </div>
</template>

<script>
import Chat from '~/components/chat/index.vue';
import ChatDialogs from '~/components/chat/dialogs/index.vue';
import { useChatStore } from "~/store/chatStore";
// import ChatDealStages from '~/components/chat/dealStages.vue';

export default {
	components: {
		Chat,
		ChatDialogs,
		// ChatDealStages,
	},
	props: {
		initChatId: {
			type: Number,
			default: null,
		},
		initOrderId: {
			type: Number,
			default: null,
		},
		isManager: {
			type: Boolean,
			default: false,
		}
	},
	data: () => ({
		loading: true,
		open: false,
		chatId: null,
		dealStage: null,
	}),

	created() {
		useChatStore().setIsManager(this.isManager);
	},

	mounted() {
		this.chatId = this.initChatId;
		this.loading = false;
	},

	methods: {
		changeChatByMessage(message) {
			this.$refs.chat.changeInitChatId(message.chat_id, message.id);
		},

		changePinned(chat) {
			this.$refs.chatDialogs.changePinned(chat.id, chat.is_pinned);
		},
	}
}
</script>

<style lang="scss">
.chat-page-wrap {
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	height: calc(100vh - 11rem);
	padding-bottom: 3rem;

	@media (max-width: 575px) {
		padding-bottom: 15px;
	}
}

.chat-page {
	--color-white: #FFF;
	--color-black: #000000;
	--color-border-gray: #C4C4C4;
	--color-red: #6937a5;
	--color-blue-100: #60A5FA;
	--color-blue-200: #3897F0;
	--color-gray-100: #F1F5F9;
	--color-gray-200: #F0F4FB;
	--color-gray-300: #E2E8F0;
	--color-gray-400: #CBD5E1;
	--color-gray-500: #94A3B8;
	--color-gray-600: #64748B;
	--color-gray-700: #475569;

	background-color: var(--color-white);
	font-size: 10px;
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	position: relative;
	// height: 100vh;
	// width: 100vw;

	&__header {
		display: flex;
		align-items: center;
		border-bottom: 1px solid var(--color-border-gray);
	}

	&__logo {
		padding: 2.3em;
		max-height: 2.6em;
		max-width: 13.1em;
		flex: 0 0 13.1em;
		border-right: 1px solid var(--color-border-gray);
	}

	&__chat {
		display: flex;
		flex-grow: 1;
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	&__left {
		min-width: 350px;
		background-color: var(--color-white);
		flex: 1 1 auto;
		width: 350px;
		border-right: 1px solid var(--color-gray-200);
		display: flex;
		flex-direction: column;

		@media (max-width: 991px) {
			min-width: 250px;
			width: 250px;
		}

		@media (max-width: 767px) {
			min-width: 100%;
			width: 100%;

			&.open {
				display: none;
			}
		}
	}

	&__right {
		position: relative;
		background-color: var(--color-white);
		flex: 1 1 100%;
		display: flex;
		flex-direction: column;

		@media (max-width: 767px) {
			display: none;

			&.open {
				display: flex;
			}
		}
	}
}
</style>

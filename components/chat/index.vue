<template>
	<div class="chat">
		<ChatDealStages />
		<div class="chat__content">
			<div class="chat__left-side">
				<ChatDialogs 
					@change:chat="
						chatId = $event;
						open = true;
					"
					@change:chat-by-message="changeChatByMessage" />
			</div>
			<div class="chat__right-side">
				<ChatMessageWindow :init_chat_id="chatId"/>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useChatStore } from '~/store/chatStore';

const isLoading = ref(false);
const open = ref(false);
const chatId = ref(null);
const dealStage = ref(null);

const changeChatByMessage = (event) => {
	return event
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

.chat {
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

	font-size: 10px;
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	position: relative;
	height: calc(100vh - 11rem);

	// &__header {
	// 	display: flex;
	// 	align-items: center;
	// 	border-bottom: 1px solid var(--color-border-gray);
	// }

	// &__logo {
	// 	padding: 2.3em;
	// 	max-height: 2.6em;
	// 	max-width: 13.1em;
	// 	flex: 0 0 13.1em;
	// 	border-right: 1px solid var(--color-border-gray);
	// }

	&__chat {
		display: flex;
		flex-grow: 1;
		width: 100%;
		height: 100%;
	}

	&__content {
		display: flex;
		flex-grow: 1;
		background-color: var(--color-white);
		overflow: hidden;
	}

	&__left-side {
		min-width: 350px;
		background-color: var(--color-white);
		flex: 0 1 auto;
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

	&__right-side {
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
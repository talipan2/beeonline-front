<template>
	<div v-if="props.loading">
		<BoardCatalogSkeletonCard />
	</div>
	<div
		v-else
		class="board-card"
	>
		<div class="board-card__container">
			<div class="board-card__image">
				<UiImage
					:src="announcement.announcement_image"
					:alt="announcement.title"
					external
				/>
			</div>
			<div class="board-card__content">
				<h3 class="board-card__title">
					{{ announcement.title }}
				</h3>
				<p class="board-card__description">
					{{ announcement.content }}
				</p>
				<p class="board-card__price">
					{{ formatMoney(announcement.price, announcement.currency, 0) }}
				</p>
				<div
					class="board-card__info"
					:class="{
						'board-card__info_user-announcements': isUserAnnouncements,
					}"
				>
					<p>Дата публикации:</p>
					<p>{{ formatDate(announcement.created_at, 'DD.MM.YYYY') }}</p>
				</div>
				<div
					class="board-card__info"
					v-if="isUserAnnouncements"
				>
					<p>Активна:</p>
					<p>{{ formatDate(announcement.created_at, 'DD.MM.YYYY') }}</p>
				</div>
			</div>
			<div class="board-card__buttons">
				<template v-if="isUserAnnouncements">
					<UiButton
						type="button"
						@click="handleOpenEditAnnouncementModal"
						class="board-card__button"
						variant="tertiary"
						size="large"
					>
						Изменить
					</UiButton>
					<UiButton
						type="button"
						class="board-card__button"
						variant="tertiary"
						size="large"
						@click="handleOpenRemoveFromPublicationModal"
					>
						Снять с публикации
					</UiButton>
					<UiButton
						type="button"
						@click="handleOpenAnnouncementPayModal"
						class="board-card__button"
						variant="tertiary"
						size="large"
					>
						Продлить на месяц
					</UiButton>
				</template>
				<template v-else>
					<UiButton
						v-if="link"
						:to="`${link}/${announcement.id}`"
						class="board-card__button"
						variant="quinary"
						size="large"
					>
						Подробнее
					</UiButton>
				</template>
			</div>
		</div>
		<NuxtLink
			v-if="link"
			:to="`${link}/${announcement.id}`"
			class="board-card__link"
		></NuxtLink>
	</div>
</template>

<script setup>
	const props = defineProps({
		announcement: {
			type: Object,
			default: () => ({}),
		},
		loading: {
			type: Boolean,
			default: false,
		},
		isUserAnnouncements: {
			type: Boolean,
			default: false,
		},
		link: {
			type: String,
			default: '',
		},
	});

	const emit = defineEmits([
		'openEditModal',
		'removeFromPublication',
		'openAnnouncementPayModal',
	]);

	const editAnnouncementModal = ref(false);
	const editAnnouncementData = computed({
		get() {
			return props.announcement;
		},
		set(value) {
			emit('update:announcement', value);
		},
	});

	const handleOpenEditAnnouncementModal = () => {
		emit('openEditModal', { ...props.announcement });
	};

	const handleOpenRemoveFromPublicationModal = () => {
		emit('removeFromPublication', props.announcement.id);
	};

	const handleOpenAnnouncementPayModal = () => {
		emit('openAnnouncementPayModal', props.announcement.id);
	};
</script>

<style lang="scss">
	.board-card {
		font-size: 1rem;
		border-radius: 24px;
		padding: 2.2em;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		position: relative;
		transition: all 0.3s ease;
		cursor: pointer;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

		@include hover {
			transform: translateY(-8px);
			box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
		}

		&__link {
			position: absolute;
			inset: 0;
			z-index: 1;
		}

		&__container {
			display: flex;
			flex-direction: column;
			gap: 2.4em 2em;
			flex: 1;
		}

		&__content {
			display: flex;
			flex-direction: column;
			gap: 1.2em;
			flex: 1;
		}

		&__image {
			width: 100%;
			max-height: 24.3em;
			aspect-ratio: 1/0.8 auto;
			display: flex;
			justify-content: center;
			align-items: center;
			overflow: hidden;

			img {
				width: 100%;
				height: 100%;
				object-fit: contain;
			}
		}

		&__title {
			font-family: 'lato', sans-serif;
			font-size: 2em;
			font-weight: 700;
			line-height: 1.4em;
			color: #000;
		}

		&__description {
			font-size: 1.6em;
			font-weight: 400;
			line-height: 1.5em;
			color: #76768f;
			opacity: 0.8;
			// margin-bottom: auto;
		}

		&__title,
		&__description {
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;
			text-overflow: ellipsis;
			overflow-wrap: anywhere;
		}

		&__price {
			font-size: 2.4em;
			font-weight: 800;
			line-height: 1em;
			color: #000;
			opacity: 0.8;
		}

		&__info {
			font-size: 1.6em;
			font-weight: 400;
			line-height: 1.5em;
			color: #797b89;
			opacity: 0.8;
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: 1em;

			&_user-announcements {
				order: -1;
			}
		}

		&__buttons {
			display: flex;
			flex-direction: column;
			gap: 1em;
			z-index: 2;
		}

		&__button {
			font-size: 1.2em;
			text-transform: uppercase;
			font-weight: 400;
		}
	}
</style>

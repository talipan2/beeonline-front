<template>
	<div class="board-catalog-details">
		<BoardCatalogSkeletonDetails v-if="isLoading" />
		<template v-else>
			<CommonNotify
				v-if="type === 'user' && data?.status_code === 'DECLINED'"
				type="danger"
				title="Объявление отклонено."
				:text="`Причина: ${data?.status_comment || 'не указана'}`"
			/>
			<CommonLayoutInfoCard class="board-catalog-details__header">
				<div class="board-catalog-details__header-image">
					<UiImage
						:src="data.announcement_image || defaultImage"
						:alt="data.title"
						external
					/>
				</div>
				<div class="board-catalog-details__header-content">
					<div class="board-catalog-details__header-content-row">
						<div
							class="board-catalog-details__header-content-date"
							v-if="data.published_at"
						>
							{{
								'Дата публикации: ' +
								formatDate(data.published_at, 'DD.MM.YYYY')
							}}
						</div>
						<div class="board-catalog-details__header-content-views">
							<SvgoViewsSecondary class="svg-m" />
							<span class="board-catalog-details__header-content-views-text">
								{{
									data.view_count +
									' ' +
									plural(data.view_count, {
										one: 'просмотр',
										few: 'просмотра',
										many: 'просмотров',
									})
								}}
							</span>
						</div>
					</div>
					<CommonBadgeSecond
						v-if="data.categories && data.categories.length"
						class="board-catalog-details__header-badges"
						:badges="data.categories.map((category) => category.name)"
					/>
					<h1 class="board-catalog-details__header-title">
						{{ data.title }}
					</h1>
					<p class="board-catalog-details__header-price">
						{{ addCurrency(data.price) }}
					</p>
					<h2 class="board-catalog-details__header-title-company">
						{{ data.company }}
					</h2>
					<div
						class="board-catalog-details__header-content-row"
						v-if="type === 'user'"
					>
						<div
							class="board-catalog-details__header-content-date"
							v-if="data.status_code === 'ACTIVE'"
						>
							{{ 'Активна: до ' + formatDate(data.expires_at, 'DD.MM.YYYY') }}
						</div>
						<div
							class="board-catalog-details__header-content-date"
							v-else
						>
							{{ data.status_name }}
						</div>
					</div>
					<div
						class="board-catalog-details__header-content-row"
						v-if="
							data.status_code !== 'ACTIVE' &&
							data.status_code !== 'DRAFT' &&
							data.remaining_publish_time &&
							type === 'user'
						"
					>
						<p>До конца публикации:</p>
						<p>
							{{ convertSecondsToTime(data.remaining_publish_time) }}
						</p>
					</div>
					<div class="board-catalog-details__header-buttons">
						<template v-if="type === 'public'">
							<UiButton
								type="button"
								variant="quinary"
								size="large"
								class="board-catalog-details__header-button"
								@click="handleShowContacts"
							>
								{{ showContacts ? 'Скрыть контакты' : 'Показать контакты' }}
							</UiButton>
						</template>
						<template v-else-if="type === 'user'">
							<UiButton
								type="button"
								@click="handleOpenEditAnnouncementModal"
								class="board-catalog-details__header-button"
								variant="tertiary"
								size="large"
							>
								Изменить
							</UiButton>
							<UiButton
								v-if="data.status_code === 'ACTIVE'"
								type="button"
								class="board-catalog-details__header-button"
								variant="tertiary"
								size="large"
								@click="handleOpenRemoveFromPublicationModal"
							>
								Снять с публикации
							</UiButton>
							<UiButton
								v-if="
									data.remaining_publish_time &&
									data.remaining_publish_time > 0 &&
									data.status_code === 'INACTIVE'
								"
								type="button"
								@click="handleOpenPublicationModal"
								class="board-catalog-details__header-button"
								variant="tertiary"
								size="large"
							>
								Опубликовать
							</UiButton>
							<UiButton
								v-if="
									data.status_code === 'ACTIVE' ||
									data.status_code === 'UNDER_MODERATION' ||
									data.status_code === 'DECLINED' ||
									data.status_code === 'INACTIVE'
								"
								type="button"
								@click="handleOpenAnnouncementPayModal"
								class="board-catalog-details__header-button"
								variant="tertiary"
								size="large"
							>
								Продлить на месяц
							</UiButton>
							<UiButton
								v-if="data.status_code === 'DRAFT'"
								type="button"
								@click="handleOpenAnnouncementPayModal"
								class="board-catalog-details__header-button"
								variant="tertiary"
								size="large"
							>
								Оплатить
							</UiButton>
						</template>
					</div>
				</div>
			</CommonLayoutInfoCard>
			<transition name="fade-slide">
				<div
					class="board-catalog-details__specs-contacts"
					v-if="showContacts || type === 'user'"
				>
					<CatalogNewServiceDetailsBadge
						:specs="{
							name: 'Контактное лицо',
							value: data.name || 'Не указано',
						}"
						:line-limit="false"
					/>
					<CatalogNewServiceDetailsBadge
						:specs="{
							name: 'Сайт',
							value: data.site || 'Не указан',
						}"
						:line-limit="false"
					/>
					<CatalogNewServiceDetailsBadge
						:specs="{
							name: 'Телефон',
							value: data.phone || 'Не указан',
						}"
						:line-limit="false"
					/>
					<CatalogNewServiceDetailsBadge
						:specs="{
							name: 'Почта',
							value: data.email || 'Не указан',
						}"
						:line-limit="false"
					/>
				</div>
			</transition>
			<CommonLayoutInfoCard
				title="Описание"
				class="board-catalog-details__description"
			>
				<p class="board-catalog-details__description-text">
					{{ data.content || 'не указано' }}
				</p>
			</CommonLayoutInfoCard>
			<CommonLayoutInfoCard
				title="Примеры работ"
				class="board-catalog-details__gallery"
				v-if="data.gallery && data.gallery.length"
			>
				<CatalogNewServiceImagesList
					:data="data.gallery"
					:show-more="true"
					:show-fancybox="true"
					mobile-slider
					@updateSlide="handleUpdatePhotoIndex"
					type="gallery"
					:overlay="true"
				/>
				<template #action>
					<p class="board-catalog-details__gallery-count">
						{{ `${currentGalleryIndex + 1}/${data.gallery.length}` }}
					</p>
				</template>
			</CommonLayoutInfoCard>
		</template>
	</div>
</template>

<script setup>
	import defaultImage from '~/assets/images/photo-plug.svg';
	import { useAnnouncementStore } from '~/store/announcementStore';

	const props = defineProps({
		data: {
			type: Object,
			default: () => ({}),
		},
		isLoading: {
			type: Boolean,
			default: false,
		},
		type: {
			type: String,
			default: 'public',
			validator: (value) => ['public', 'user'].includes(value),
		},
	});

	const announcementStore = useAnnouncementStore();

	const emit = defineEmits([
		'openEditModal',
		'removeFromPublication',
		'openAnnouncementPayModal',
		'openPublicationModal',
	]);

	const currentGalleryIndex = ref(0);
	const handleUpdatePhotoIndex = (index) => {
		currentGalleryIndex.value = index;
	};

	const showContacts = ref(false);

	const handleShowContacts = () => {
		if (showContacts.value) {
			showContacts.value = false;
		} else {
			announcementStore
				.updateAnnouncementShowContacts(props.data.id)
				.then((res) => {
					showContacts.value = true;
				});
		}
	};

	const handleOpenEditAnnouncementModal = () => {
		announcementStore.getAnnouncement(props.data.id).then((res) => {
			emit('openEditModal', {
				...res.data,
				category_ids: res.data.categories.map((category) => category.id),
			});
		});
	};

	const handleOpenRemoveFromPublicationModal = () => {
		emit('removeFromPublication', props.data);
	};

	const handleOpenAnnouncementPayModal = () => {
		emit('openAnnouncementPayModal', props.data);
	};

	const handleOpenPublicationModal = () => {
		emit('openPublicationModal', props.data);
	};
</script>

<style lang="scss">
	.board-catalog-details {
		font-size: 1rem;
		display: flex;
		flex-direction: column;
		row-gap: 3.2em;

		&__header {
			display: flex;
			padding: 3.2em;
			column-gap: 4.5em;
		}

		&__header-image {
			flex: 0 1 34%;
			aspect-ratio: 1/1.13 auto;
			max-height: 37.8em;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #ededf0;
			border-radius: 16px;
			img {
				width: 100%;
				height: 100%;
				object-fit: contain;
			}
		}

		&__header-content {
			flex: 0 1 38%;
			display: flex;
			flex-direction: column;
			row-gap: 2.4em;
		}

		&__header-content-row {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			column-gap: 1.56em;
			font-size: 1.6em;
			line-height: 1.5em;
			color: #797b89;
		}

		&__header-content-views {
			display: flex;
			align-items: center;
			column-gap: 0.5em;

			svg {
				width: 1.5em;
				height: 1.5em;
			}
		}

		&__header-badges {
			font-size: 1.2em;
		}

		&__header-title {
			font-family: 'Lato', sans-serif;
			font-size: 3.2em;
			line-height: 1.25em;
			font-weight: 700;
			color: #000;
		}

		&__header-price {
			font-family: 'Lato', sans-serif;
			font-size: 2.4em;
			line-height: 1em;
			font-weight: 700;
			color: #000;
			opacity: 0.8;
		}

		&__header-title-company {
			font-family: 'fira-sans', sans-serif;
			font-size: 2em;
			line-height: 1.2em;
			font-weight: 600;
			letter-spacing: -0.02em;
			color: rgba(19, 19, 19, 0.9);
		}

		&__header-buttons {
			display: flex;
			flex-wrap: wrap;
			gap: 1.6em;

			@include mobile {
				flex-direction: column;
			}
		}

		&__header-button {
			font-size: 1.2em;
			text-transform: uppercase;
			font-weight: 400;
			// max-width: 50%;
			// padding-block: 1.41em;
		}

		&__specs-contacts {
			display: flex;
			flex-wrap: wrap;
			gap: 1.6em;

			.details-badge {
				flex: 1 1 calc(25% - 1.6em);

				@include mobile {
					flex: 1 1 100%;
				}
			}
		}

		&__description {
			&-text {
				font-size: 1.8em;
				line-height: 1.5em;
				color: #040404;
				font-weight: 400;
				opacity: 0.8;
				white-space: pre-line;
			}
		}

		&__gallery-count {
			display: none;
			font-family: 'fira-sans', sans-serif;
			font-size: 1.4em;
			font-weight: 500;
			line-height: 1.4em;
			color: #000;

			@include mobile {
				display: block;
			}
		}

		@include tablet {
			&__header-content {
				flex-basis: 100%;
			}
		}

		@include mobile {
			&__header {
				flex-direction: column;
				row-gap: 2em;
			}

			&__header-content-row {
				justify-content: space-between;
				row-gap: 1em;
			}

			&__header-title {
				font-size: 2.4em;
			}

			&__header-button {
				max-width: 100%;
			}
		}

		.fade-slide-enter-active,
		.fade-slide-leave-active {
			transition:
				opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
				transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		}

		.fade-slide-enter-from,
		.fade-slide-leave-to {
			opacity: 0;
			transform: translateY(140px);
		}

		.fade-slide-enter-to,
		.fade-slide-leave-from {
			opacity: 1;
			transform: none;
		}
	}
</style>

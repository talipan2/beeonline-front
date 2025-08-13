<!--
	Компонент для опроса заказчика при снятии заказа с публикации.
	
	Состоит из двух этапов:
	1. Форма с вопросами о найденном исполнителе
	2. Выбор исполнителя из списка и создание отзыва (если исполнитель найден на платформе)
	
-->
<template>
	<UiModal
		v-model="isOpen"
		title="Снятие заказа с публикации"
		class="questionnaire-modal"
		@confirm="() => confirm()"
	>
		<template #content>
			<!-- Первый этап: Форма с вопросами о найденном исполнителе -->
			<div
				class="questionnaire-modal__content"
				v-if="!isQuestionnaireSending"
			>
				<p class="questionnaire-modal__content-title">
					Пожалуйста, пройдите небольшой опрос.
				</p>
				<UiForm
					:submit="handleSubmit"
					class="questionnaire-modal__content-questions"
				>
					<!-- Первый вопрос: найден ли исполнитель вообще -->
					<div class="form-group-data">
						<label class="form-group__title">1. Найден ли исполнитель?</label>
						<UiRadioButtonGroup
							:rules="{ required: true }"
							class="form-group__value"
							:options="[
								{ id: 1, value: 1, label: 'Да' },
								{ id: 0, value: 0, label: 'Нет' },
							]"
							v-model="questionnaireData.found_performer"
							name="found_performer"
							label="Найден ли исполнитель?"
						/>
					</div>
					<!-- Второй вопрос: найден ли исполнитель на данной платформе -->
					<transition name="fade">
						<div
							class="form-group-data"
							v-if="showAnotherQuestion"
						>
							<label class="form-group__title">
								2. Найден ли исполнитель на нашей платформе?
							</label>
							<UiRadioButtonGroup
								:rules="{ required: showAnotherQuestion ? true : false }"
								class="form-group__value"
								:options="[
									{ id: 1, value: 1, label: 'Да' },
									{ id: 0, value: 0, label: 'Нет' },
								]"
								v-model="questionnaireData.found_performer_on_platform"
								name="found_performer_on_platform"
								label="Найден ли исполнитель на нашей платформе?"
							/>
						</div>
					</transition>
					<!-- Кнопки управления формой -->
					<div class="questionnaire-modal__buttons">
						<UiButton
							variant="tertiary"
							size="large"
							type="button"
							class="questionnaire-modal__button"
							@click="confirm"
						>
							Отмена
						</UiButton>
						<UiButton
							class="questionnaire-modal__button"
							variant="quinary"
							size="large"
							type="submit"
						>
							Снять с публикации
						</UiButton>
					</div>
				</UiForm>
			</div>
			<!-- Второй этап: Выбор исполнителя и создание отзыва -->
			<div
				class="questionnaire-modal__content"
				v-else
			>
				<p class="questionnaire-modal__content-title">
					Вы можете оставить отзыв о выбранном исполнителе.
					<br />
					Выберите исполнителя заказа из списка ниже
				</p>
				<!-- Список исполнителей с бесконечным скроллом -->
				<div
					class="questionnaire-modal__list"
					:class="{ loading: isLoading }"
					v-if="performers.length > 0"
				>
					<!-- Карточка исполнителя -->
					<div
						class="questionnaire-modal__item"
						v-for="(performer, index) in performers"
						:key="performer?.id"
						:ref="(el) => setItemRef(el, index)"
					>
						<div class="questionnaire-modal__item-image">
							<UiImage
								:src="performer?.performer_pubcard?.logo || defaultImage"
								:alt="performer?.performer_pubcard?.name"
								external
							/>
						</div>
						<div class="questionnaire-modal__item-info">
							<h3 class="questionnaire-modal__item-name">
								{{ performer?.performer_pubcard?.name }}
							</h3>
							<!-- <CommonBadgeSecond
								class="questionnaire-modal__item-categories"
								:badges="performer?.categories"
								:type="paragraph"
							/>
							<CommonLocationsList
								class="questionnaire-modal__item-locations"
								:locationsList="{
									cities: performer?.cities,
									regions: performer?.regions,
									countries: performer?.countries,
								}"
								:isCountry="true"
								:showOnlyCountry="true"
							/> -->
							<p class="prop_type_hidden questionnaire-modal__item-description">
								{{ performer?.performer_pubcard?.description }}
							</p>
						</div>
						<!-- Кнопка выбора исполнителя (открывает модалку с отзывом) -->
						<UiButton
							class="questionnaire-modal__item-button"
							type="button"
							variant="quinary"
							size="large"
							@click="handleSelectPerformer(performer)"
						>
							Выбрать
						</UiButton>
					</div>
				</div>
				<!-- Сообщение если исполнители не найдены -->
				<CommonAlerts
					v-if="performers.length === 0 && !isLoading"
					type="primary"
					alert="Исполнители не найдены"
				/>
			</div>
		</template>
	</UiModal>
	<!-- Модалка для создания отзыва о выбранном исполнителе -->
	<UiModal v-model="isOpenReviewModal">
		<template #content>
			<ReviewsCreate @submit="createNewReview" />
		</template>
	</UiModal>
</template>

<script setup>
	import defaultImage from '~/assets/images/nophoto_pc.png';
	import { useEntityStore } from '~/store/entityStore';
	import { useReviewsStore } from '~/store/reviewsStore';
	import { useUserStore } from '~/store/userStore';
	import { useToast } from 'vue-toastification';

	/**
	 * Входные параметры компонента
	 */
	const props = defineProps({
		orderId: {
			type: Number,
			required: true, // ID заказа для снятия с публикации
		},
	});

	// Toast
	const toast = useToast();

	// Подключение стора
	const entityStore = useEntityStore();
	const reviewsStore = useReviewsStore();
	const userStore = useUserStore();

	/**
	 * Состояние компонента
	 */
	const isOpen = ref(false); // Состояние видимости основной модалки
	const isOpenReviewModal = ref(false); // Состояние видимости модалки отзыва
	const isQuestionnaireSending = ref(false); // Переключатель между этапами (false = опрос, true = выбор исполнителя)
	const id = ref(null); // ID (не используется)
	const performers = ref([]); // Список исполнителей заказа
	const orderPublicationId = ref(null); // ID публикации заказа
	const userData = computed(() => userStore.userData); // Данные текущего пользователя
	const selectedPerformer = ref({}); // Выбранный исполнитель для отзыва
	const isLoading = ref(false); // Состояние загрузки данных
	const hasMoreData = ref(true); // Есть ли еще данные для загрузки

	/**
	 * Данные формы опроса
	 */
	const questionnaireData = ref({
		found_performer: null, // Найден ли исполнитель (1 - да, 0 - нет)
		found_performer_on_platform: null, // Найден ли исполнитель на платформе (1 - да, 0 - нет)
	});

	const showAnotherQuestion = computed(
		() => questionnaireData.value.found_performer === 1
	);

	/**
	 * Состояние пагинации для бесконечного скролла
	 */
	const page = ref({
		current_page: 1,
		last_page: 1,
	});

	/**
	 * Переменные для бесконечного скролла
	 */
	const lastItemRef = ref(null); // Ссылка на последний элемент списка
	const observer = ref(null); // Intersection Observer для отслеживания прокрутки

	/**
	 * Устанавливаем ref на последний элемент списка для бесконечного скролла
	 * @param {HTMLElement} el - DOM элемент
	 * @param {number} index - Индекс элемента в списке
	 */
	const setItemRef = (el, index) => {
		if (index === performers.value.length - 1) {
			lastItemRef.value = el;
		}
	};

	/**
	 * Закрытие модального окна
	 */
	const confirm = () => {
		isOpen.value = false;
	};

	/**
	 * Методы, доступные родительскому компоненту
	 */
	defineExpose({
		open: () => {
			isOpen.value = true;
		},
		close: () => {
			confirm();
		},
	});

	/**
	 * Обработка отправки формы опроса
	 * @param {Object} values - Значения формы
	 * @param {Object} form - Объект формы
	 */
	const handleSubmit = (values, form) => {
		entityStore
			.orderUnpublish(
				props.orderId,
				{
					...values,
					found_performer_on_platform: values.found_performer_on_platform
						? 1
						: 0,
				},
				form
			)
			.then((res) => {
				// Обновляем данные заказа в сторе
				const order = entityStore.organizationOrders.find(
					(item) => item.id === props.orderId
				);

				if (order) {
					Object.assign(order, res?.data);
				}
				toast.success('Заказ успешно снят с публикации');
				orderPublicationId.value = res?.data?.order_publication_id;

				// Если исполнитель найден и найден на платформе - показываем список исполнителей
				if (
					orderPublicationId.value &&
					values.found_performer === 1 &&
					values.found_performer_on_platform === 1
				) {
					isQuestionnaireSending.value = true;
					getPerformers();
				} else {
					// Иначе просто закрываем модалку
					confirm();
				}
			});
	};

	/**
	 * Загрузка списка исполнителей заказа
	 * @param {number} nextPage - Номер страницы для загрузки
	 */
	const getPerformers = (nextPage = 1) => {
		isLoading.value = true;

		entityStore
			.getOrderPublicationsPerformers(orderPublicationId.value)
			.then((res) => {
				// Для первой страницы заменяем массив, для остальных - добавляем
				if (nextPage === 1) {
					performers.value = res?.data;
				} else {
					performers.value = [...performers.value, ...res?.data];
				}
				page.value = res?.meta;

				// Проверяем, есть ли еще данные для загрузки
				if (nextPage >= page.value.last_page) {
					hasMoreData.value = false;
				}
			})
			.finally(() => {
				isLoading.value = false;
			});
	};

	/**
	 * Загрузка следующей страницы исполнителей (для бесконечного скролла)
	 */
	const loadMore = () => {
		if (isLoading.value || !hasMoreData.value) return;

		const nextPage = page.value.current_page + 1;
		getPerformers(nextPage);
	};

	/**
	 * Создание отзыва о выбранном исполнителе
	 * @param {Object} values - Данные отзыва из формы
	 * @param {Object} form - Объект формы
	 */
	const createNewReview = (values, form) => {
		console.log(values, form);
		reviewsStore
			.createReview(
				{
					rate: values.rate,
					text_positive: values.text_positive,
					text_negative: values.text_negative,
					user_id: userData.value.id,
					owner_org_id: userData.value.organization_id,
					owner_org_type: userData.value.role,
					about_org_id: selectedPerformer.value.id,
					about_org_type: selectedPerformer.value.performer_pubcard.type,
					order_publication_id: orderPublicationId.value,
					media_ids: values.media_ids,
				},
				form
			)
			.then((res) => {
				// console.log(res);
				// Добавляем файлы к отзыву, если они есть
				// if (values.media_ids.length > 0) {
				// 	reviewsStore.addReviewFiles(res?.id, {
				// 		media_ids: values.media_ids,
				// 	});
				// }
				isOpenReviewModal.value = false;
				confirm();
				toast.success('Отзыв успешно отправлен');
			});
	};

	/**
	 * Обработка выбора исполнителя для создания отзыва
	 * @param {Object} performer - Данные выбранного исполнителя
	 */
	const handleSelectPerformer = (performer) => {
		selectedPerformer.value = performer;
		isOpenReviewModal.value = true;
	};

	/**
	 * Инициализация Intersection Observer для бесконечного скролла
	 */
	onMounted(() => {
		observer.value = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					loadMore();
				}
			},
			{ threshold: 0.1 } // Срабатывает когда 10% элемента видно
		);
	});

	/**
	 * Отслеживание изменений последнего элемента для обновления observer
	 */
	watch(
		lastItemRef,
		(newVal, oldVal) => {
			if (!observer.value) return;

			// Прекращаем наблюдение за старым элементом
			if (oldVal) observer.value.unobserve(oldVal);
			// Начинаем наблюдение за новым элементом
			if (newVal) observer.value.observe(newVal);
		},
		{ immediate: true }
	);

	/**
	 * Очистка observer при размонтировании компонента
	 */
	onBeforeUnmount(() => {
		if (observer.value && lastItemRef.value) {
			observer.value.unobserve(lastItemRef.value);
		}
		if (observer.value) {
			observer.value.disconnect();
		}
	});
</script>

<style lang="scss">
	.questionnaire-modal {
		font-size: 1rem;

		&__content {
			&-title {
				font-size: 1.4em;
				margin-bottom: 1em;
				font-weight: 600;
			}
		}

		&__buttons {
			display: flex;
			justify-content: flex-end;
			gap: 2em;
		}

		&__button {
			font-size: 1.2em;
			text-transform: uppercase;
		}

		&__list {
			display: flex;
			flex-direction: column;
			max-height: 60vh;
			overflow-y: auto;
		}

		&__item {
			display: flex;
			align-items: center;
			gap: 2em;
			padding: 1em;
			border-bottom: 1px solid #e0e0e0;
		}

		&__item-image {
			aspect-ratio: 1;
			flex: 0 0 20%;
			overflow: hidden;

			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}

		&__item-info {
			flex: 1;
			display: flex;
			flex-direction: column;
			gap: 1em;
			align-self: flex-start;
		}

		&__item-name {
			font-size: 1.6em;
		}

		&__item-categories {
			font-size: 0.7em;

			.badge-second__text {
				margin: 0;
			}
		}

		&__item-button {
			text-transform: uppercase;
			font-size: 1.2em;
		}

		&__item-locations {
			font-size: 1em;
		}

		&__item-description {
			font-size: 1.4em;
			font-weight: 400;
			-webkit-line-clamp: 3;
		}

		.fade-enter-active,
		.fade-leave-active {
			transition: all 0.3s ease;
		}
		.fade-enter-from {
			transform: translateY(50px);
			opacity: 0;
		}
		.fade-leave-to {
			transform: translateY(-50px);
			opacity: 0;
		}
	}
</style>

<template>
	<div
		class="reviews-details"
		v-if="review.id"
	>
		<CommonNotify
			v-if="review.status_code === 'REJECTED' && reviewsState === 'my-reviews'"
			:text="`Отзыв отклонен. ${review.reject_reason}`"
			type="danger"
			:btn-function="openEditReviewModal"
			:btn-text="'Редактировать'"
		/>
		<CommonNotify
			v-if="
				review.status_code === 'UNDER_MODERATION' &&
				reviewsState === 'my-reviews'
			"
			:text="`Отзыв находится на модерации. Он будет опубликован после проверки.`"
			type="warning"
			:btn-function="openEditReviewModal"
			:btn-text="'Редактировать'"
		/>
		<CommonNotify
			v-if="review.status_code === 'PUBLISHED' && reviewsState === 'my-reviews'"
			:text="`Отзыв опубликован`"
			type="success"
		/>
		<template v-if="review.status_code === 'PUBLISHED'">
			<p
				class="reviews-details__text"
				v-if="reviewsState === 'my-reviews'"
			>
				Вы можете дополнить отзыв по завершению сотрудничества с участником.
			</p>
			<p
				class="reviews-details__text"
				v-if="reviewsState === 'reviews'"
			>
				Вы можете ответить на отзыв.
			</p>
		</template>
		<div class="reviews-details__rating">
			<p>
				Оценка:
				<span>{{ review.rate }}/5</span>
			</p>
			<CommonRating
				:rating="review.rate"
				:isCountRating="false"
				:isCountReviews="false"
			/>
		</div>
		<template v-if="review.status_code === 'PUBLISHED'">
			<div class="reviews-details__add">
				<UiButton
					type="button"
					variant="quinary"
					size="large"
					v-if="reviewsState === 'my-reviews'"
					@click="settingStore.reviewModalStatus = true"
				>
					Дополнить отзыв
				</UiButton>
				<UiButton
					type="button"
					variant="quinary"
					size="large"
					v-if="reviewsState === 'reviews'"
					@click="settingStore.reviewModalStatus = true"
					:disabled="review.reply?.id"
				>
					Ответить на отзыв
				</UiButton>
			</div>
		</template>
		<ReviewsDetailsCard
			:data="review"
			:reviews-state="reviewsState"
		/>
		<ReviewsModal
			:reviewsState="reviewsState"
			:id="review.id"
			:user-id="userId"
			@updateAdditionalReview="updateAdditionalReview"
			@updateReplyReview="updateReplyReview"
		/>
		<UiModal
			v-model="editReviewModal"
			:title="'Редактировать отзыв'"
		>
			<template #content>
				<ReviewsCreate
					:review="editReviewData"
					@submit="handleEditReview"
				/>
			</template>
		</UiModal>
	</div>
</template>

<script setup>
	import { useReviewsStore } from '~/store/reviewsStore';
	import { useSettingStore } from '~/store/settingStore';
	import { useUserStore } from '~/store/userStore';
	import { useToast } from 'vue-toastification';

	const props = defineProps({
		reviewsState: {
			type: String,
			required: true,
			validate: (value) => ['my-reviews', 'reviews'].includes(value),
		},
		review: {
			type: Object,
			required: true,
			default: () => ({}),
		},
	});

	const settingStore = useSettingStore();
	const userStore = useUserStore();
	const reviewStore = useReviewsStore();
	const toast = useToast();

	const userId = computed(() => userStore.userData.id);
	const editReviewData = ref({});
	const editReviewModal = ref(false);

	const updateAdditionalReview = (additions) => {
		if (props.review && props.review.additions) {
			props.review.additions.push(additions);
		} else {
			props.review.additions = [additions];
		}
	};

	const updateReplyReview = (answer) => {
		if (props.review && !props.review.reply) {
			props.review.reply = answer;
		}
	};

	const openEditReviewModal = () => {
		reviewStore.getReview(props.review.id).then((res) => {
			editReviewData.value = {
				...res,
				rating: res.rate,
			};
			editReviewModal.value = true;
		});
	};

	const handleEditReview = (values, form) => {
		reviewStore.editReview(props.review.id, values, form).then((res) => {
			props.review.rate = res.data?.rate;
			props.review.text_positive = res.data?.text_positive;
			props.review.text_negative = res.data?.text_negative;
			props.review.files = res.data?.files;
			props.review.status_code = res.data?.status_code;
			props.review.status_name = res.data?.status_name;
			editReviewModal.value = false;
			toast.success('Отзыв отправлен на модерацию');
		});
	};
</script>

<style lang="scss">
	.reviews-details {
		font-size: 1.6rem;

		&__text {
			margin-bottom: 1.5em;

			@include mobile {
				font-size: 1.4rem;
			}
		}

		&__rating {
			display: flex;
			column-gap: 0.3em;
			font-family: 'fira-sans', sans-serif;
			font-size: 1.75em;
			margin-bottom: 0.89em;
			align-items: center;

			span {
				color: var(--text-color-ternary);
			}

			@include mobile {
				font-size: 1.8rem;
			}
		}

		&__add {
			font-size: 0.75em;
			max-width: 40%;
			margin-bottom: 4.15em;

			button {
				text-transform: uppercase;
				width: 100%;
			}

			@include mobile {
				max-width: 50%;
			}

			@include small-mobile {
				max-width: 100%;
			}
		}
	}
</style>

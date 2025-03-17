<template>
  <div class="reviews-details" v-if="review.id">
    <p class="reviews-details__text" v-if="reviewsState === 'my-reviews'">
      Вы можете дополнить отзыв по завершению сотрудничества с участником.
    </p>
    <p class="reviews-details__text" v-if="reviewsState === 'reviews'">
      Вы можете ответить на отзыв.
    </p>
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
    <div class="reviews-details__add">
      <UiButton
        type="button"
        variant="quinary"
        size="large"
        v-if="reviewsState === 'my-reviews'"
        @click="settingStore.reviewModalStatus = true"
        >Дополнить отзыв
      </UiButton>
      <UiButton
        type="button"
        variant="quinary"
        size="large"
        v-if="reviewsState === 'reviews'"
        @click="settingStore.reviewModalStatus = true"
        :disabled="review.reply?.id"
        >Ответить на отзыв</UiButton
      >
    </div>
    <ReviewsDetailsCard :data="review" :reviews-state="reviewsState" />
    <ReviewsModal
      :reviewsState="reviewsState"
      :id="review.id"
      :user-id="userId"
      @updateAdditionalReview="updateAdditionalReview"
      @updateReplyReview="updateReplyReview"
    />
  </div>
</template>

<script setup>;
import { useSettingStore } from "~/store/settingStore";
import { useUserStore } from "~/store/userStore";

const props = defineProps({
  reviewsState: {
    type: String,
    required: true,
    validate: (value) => ["my-reviews", "reviews"].includes(value),
  },
  review: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

const settingStore = useSettingStore();
const userStore = useUserStore();

const userId = computed(() => userStore.userData.id);

const updateAdditionalReview = (additions) => {
  if(props.review && props.review.additions) {
    props.review.additions.push(additions);
  } else {
    props.review.additions = [additions];
  }
};

const updateReplyReview = (answer) => {
  if(props.review && !props.review.reply) {
    props.review.reply = answer;
  }
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
    font-family: "fira-sans", sans-serif;
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

<template>
  <div class="reviews-details">
    <p class="reviews-details__text" v-if="reviewsState === 'my-reviews'" >
      Вы можете дополнить отзыв по завершению сотрудничества с участником.
    </p>
    <p class="reviews-details__text" v-if="reviewsState === 'reviews'" >Вы можете ответить на отзыв.</p>
    <div class="reviews-details__rating">
      <p>
        Оценка:
        <span>4/5</span>
      </p>
      <CommonRating :isCountRating="false" :isCountReviews="false" />
    </div>
    <div class="reviews-details__add">
      <UiButton type="button" variant="quinary" size="large" v-if="reviewsState === 'my-reviews'" @click="settingStore.reviewModalStatus = true" >Дополнить отзыв</UiButton>
      <UiButton type="button" variant="quinary" size="large" v-if="reviewsState === 'reviews'" @click="settingStore.reviewModalStatus = true" >Ответить на отзыв</UiButton>
    </div>
    <ReviewsEntity :reviewsState="reviewsState" />
    <ReviewsModal :reviewsState="reviewsState" />
  </div>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';


const props = defineProps({
  reviewsState: {
    type: String,
    required: true,
    validate: (value) => ['my-reviews', 'reviews'].includes(value),
  }
});

const settingStore = useSettingStore();

</script>

<style lang="scss">

.reviews-details {
  font-size: 1.6rem;

  &__text {
    margin-bottom: 1.5em;
  }

  &__rating {
    display: flex;
    column-gap: .3em;
    font-family: 'fira-sans', sans-serif;
    font-size: 1.75em;
    margin-bottom: .89em;

    span {
      color: var(--text-color-ternary);
    }
  }

  &__add {
    font-size: .75em;
    text-transform: uppercase;
    max-width: 33%;
    margin-bottom: 4.15em;

    button {
      width: 100%;
    }
  }
}

</style>
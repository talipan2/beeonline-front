<template>
  <div class="reviews-entity">
    <template v-if="data">
      <div class="reviews-entity__wrapper" v-if="data.length">
        <div class="reviews-entity__list">
          <template v-for="review in data" :key="review.id">
            <ReviewsDetailsCard :data="review" :reviewsState="reviewsState"/>
          </template>
        </div>
      </div>
      <div class="reviews-entity__empty" v-else>
        <p class="reviews-entity__text">Отзывов нет</p>
      </div>
    </template>
  </div>
</template>

<script setup>

const props = defineProps({
  data: {
    type: Array,
    default: () => ([]),
  },
  reviewsState: {
    type: String,
    default: '',
    validate: (value) => ['my-reviews', 'reviews'].includes(value),
  }
})

</script>

<style lang="scss">

.reviews-entity {
  background-color: #fff;

  &__empty {
    font-size: 1em;
    background-color: #fff3cd;
    border: 2px solid #ffeeba;
    color: var(--text-color-info-secondary);
    padding: .5em .81em;
  }

  &__list {
    display: flex;
    flex-direction: column;
    row-gap: 2em;
  }
}

</style>
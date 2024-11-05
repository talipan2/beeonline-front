<template>
  <div class="review-rating">
    <div class="review-rating__count-container">
      <h2 class="review-rating__title">Общий рейтинг</h2>
      <p class="review-rating__count">{{ 4.5 }}<span>/ 5</span></p>
      <CommonRating class="review-rating__rating" :rating="4" :reviews="5" :isReviewText="false" :isCountRating="false">
      </CommonRating>
    </div>
    <div class="stats-rating">
      <div v-for="(count, index) in ratings" :key="index" class="stats-rating__item">
        <div class="stats-rating__grade">{{ index + 1 }}</div>
        <div class="stats-rating__bar">
          <div class="stats-rating__bar-fill" :style="{ width: getBarWidth(count) + '%' }"></div>
        </div>
        <div class="stats-rating__count">{{ count }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  ratings: {
    type: Array,
    required: true,
    default: () => [0, 0, 0, 2, 2],
  },
});

const totalRatings = computed(() => props.ratings.reduce((acc, rating) => acc + rating, 0));

const getBarWidth = (count) => {
  return totalRatings.value ? (count / totalRatings.value) * 100 : 0;
};

</script>

<style lang="scss">

.review-rating {
  display: flex;
  font-family: 'fira-sans', sans-serif;
  font-size: 1.4rem;
  column-gap: 2.5em;
  margin-bottom: 2em;

  &__count-container {
    flex: 0 1 50%;
  }

  &__title {
    font-size: 1em;
    margin-bottom: .5em;
  }

  &__count {
    font-size: 3.42em;
    font-weight: 900;
    line-height: 1em;

    span {
      font-size: .33em;
      line-height: 1em;
    }
  }

  &__rating {
    .rate {
      margin-right: .6em;
    }

    .rating__count {
      font-size: 1em;
    }
  }
}

.stats-rating {
  flex: 0 1 50%;
  display: flex;
  font-family: 'fira-sans', sans-serif;
  font-size: 1.4rem;
  flex-direction: column;
  row-gap: .3em;

  &__item {
    display: flex;
    align-items: center;
    column-gap: 1em;
  }

  &__grade {
    font-size: 1em;
    color: #8b92a1;
  }

  &__bar {
    flex: 1;
    height: .57em;
    background-color: rgba(139,146,161,.1);
    border-radius: 4px;
    position: relative;
  }

  &__bar-fill {
    height: 100%;
    background-color: var(--button-background-primary);
    border-radius: 4px;
    position: absolute;
    top: 0;
    left: 0;
  }

  &__count {
    font-weight: 500;
    color: #000;
  }
}

</style>
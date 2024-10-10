<template>
  <div class="rating">
    <div class="rate" :style="{ '--rating': rating + '%' }"></div>
    <p class="rating__reviews" v-if="isCountReviews">({{ reviews + " " + plural(reviews, {one: 'отзыв', few: 'отзыва', many: 'отзывов'}) }})</p>
    <p class="rating__count" v-if="isCountRating">({{ rating }})</p>
  </div>
</template>

<script setup>
import { is } from '@vee-validate/rules';


const props = defineProps({
  rating: {
    type: Number,
    default: 0,
  },
  isCountReviews: {
    type: Boolean,
    default: true,
  },
  isCountRating: {
    type: Boolean,
    default: true,
  },
  reviews: {
    type: Number,
    default: 0,
  }
})

</script>

<style lang="scss">

.rating {
    display: flex;
    align-items: center;

    &__reviews {
      font-size: 1.3rem;
    }

    &__count {
      font-size: 1.6rem;
    }
}

.rate {
    display: inline-flex;
    position: relative;
    width: 8em;
    height: 1.6em;
    font-size: 10px;
    flex-shrink: 0;
    margin-right: 12px; 
}

.rate_choice {
    cursor: pointer;
    font-size: 20px;
}

.rate:before, .rate:after {
    content: "";
    height: 100%;
    background: url(~/assets/svg/stars.svg);
    background-size: 1.6em;
}

.rate:before {
    background-position: 0 100%;
    width: var(--rating, 0%);
}

.rate:after {
    background-position: 100% 0;
    flex: 1 1 auto;
}

</style>
<template>
  <div class="rating">
    <div class="rating__wrapper">
      <div class="rate" v-if="isSelected" :class="{ 'rate_selected': hoverRating }"
        :style="{ '--rating': (hoverRating !== null ? hoverRating : selectedRating || 0) / 5 * 100 + '%' }"
        @mouseleave="clearHoverRating"
        @mousemove="setHoverRating"
        @click="setRating">
      </div>
      <div class="rate" v-else
        :style="{ '--rating': (rating / 5) * 100 + '%' }">
      </div>
      <p v-if="isSelected && selectedRating > 0" class="rate__choice">{{ `${selectedRating}/5` }}</p>
      <p class="rating__reviews" v-if="isCountReviews">
        ({{ reviews }}<span v-if="isReviewText">{{" " + plural(reviews, { one: "отзыв", few: "отзыва", many: "отзывов" })}}</span>)
      </p>
      <p class="rating__count" v-if="isCountRating">({{ rating }})</p>
    </div>
    <UiInput
      v-if="isSelected"
      v-model="selectedRating"
      type="number"
      class="rating__input"
      name="rate"
      :rules="{ required: true }"
      customErrorMessage="Поставьте оценку"
    />
  </div>
</template>

<script setup>

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
  isReviewText: {
    type: Boolean,
    default: true,
  },
  reviews: {
    type: Number,
    default: 0,
  },
  isSelected: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: Number,
    default: 0,
  }
});

const hoverRating = ref(null);
const selectedRating = ref(null);
const emit = defineEmits(['update:modelValue']);

function setHoverRating(event) {
  const { width, left } = event.currentTarget.getBoundingClientRect();
  const mouseX = event.clientX - left;
  hoverRating.value = Math.ceil((mouseX / width) * 5);
}

function clearHoverRating() {
  hoverRating.value = null;
}

function setRating() {
  selectedRating.value = hoverRating.value;
  emit('update:modelValue', selectedRating.value);
}
</script>

<style lang="scss">
.rating {

  &__wrapper {
    display: flex;
    align-items: center;
  }

  &__reviews {
    font-size: 1.3rem;
  }

  &__count {
    font-size: 1.6rem;
  }

  &__input {
    display: none;
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

.rate:before,
.rate:after {
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

.rate_selected {
  cursor: pointer;
}

.rate__choice {
  font-size: 1em;
  color: #565263;
}

</style>

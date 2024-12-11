<template>
  <div class="reviews">
    <CommonSelectorListButtons :buttonsList="selectorButtons" @updateActiveButton="updateActiveButton" :active-btn="reviewsState" />
    <div class="reviews__rating" v-if="reviewsState === 'reviews'">
      <h3 class="reviews__rating-title">Ваш рейтинг:</h3>
      <span class="reviews__rating-value">0.89/5</span>
      <CommonRating :is-count-rating="false" :is-count-reviews="false" />
    </div>
    <CommonFilterSelectList class="reviews__filter" :filters="filterList" @setFilters="setFilters" :activeFilters="activeFilter"/>
    <div class="reviews__list" >
      <ReviewsCard v-for="i in 3" :key="i" :reviewsState="reviewsState"/>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  reviewsState: {
    type: String,
    default: "",
    required: true,
    validate: (val) => ["my-reviews", "reviews"].includes(val),
  },
});

const router = useRouter();

const currentStatusOptions = ref('all');
const currentTypeOptions = ref('all');
const activeFilter = ref({});

const selectorButtons = [
  { id: 1, label: 'Мои отзывы', value: 'my-reviews', count: 2, },
  { id: 2, label: 'Отзывы о нас', value: 'reviews', count: 3, },
];

const statusOptions = [
  { id: 1, label: "Все отзывы", value: "all" },
  { id: 2, label: "Положительные", value: "positive" },
  { id: 3, label: "Отрицательные", value: "negative" },
];

const typeOptions = [
  { id: 1, label: "От всех участников", value: "all" },
  { id: 2, label: "От исполнителей", value: "performer" },
  { id: 3, label: "От заказчиков", value: "customer" },
  { id: 4, label: "От поставщиков", value: "supplier" },
];

const filterList = ['statusReview', 'participant'];

const updateActiveButton = (type) => {
  if (type === "my-reviews") {
    router.push("my-reviews");
  } else if (type === "reviews") {
    router.push("reviews");
  }
};

const setFilters = (filters) => {
  activeFilter.value = filters
}

watch(() => activeFilter.value, (newVal) => {
  router.replace({ query: { rate_status: newVal.statusReview, from_type: newVal.participant } });
}, {deep: true});

onMounted(() => {
  if ( router.currentRoute.value.query ) {
    activeFilter.value = {
      statusReview: router.currentRoute.value.query.rate_status,
      participant: router.currentRoute.value.query.from_type
    }
  }
})

</script>

<style lang="scss">
.reviews {
  font-size: 1.6rem;

  &__rating {
    display: flex;
    font-size: 1.75em;
    align-items: center;
    column-gap: .3em;
    margin-bottom: .9em;
  }

  &__rating-title {
    font-size: 1em;
    line-height: 1em;
  }

  &__rating-value {
    font-family: 'fira-sans', sans-serif;
    color: var(--text-color-ternary);
    line-height: 1em;

  }

  &__filter {
    .select__select {
      padding: .625em;
    }
  }

  &__filter-select {
    flex: 0 1 30%;
  }

  @include small-mobile {
    &__list {
      display: flex;
      flex-direction: column;
      row-gap: 1em;
    }
  }
}
</style>

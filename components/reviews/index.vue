<template>
  <div class="reviews" :class="{'loading' : isLoading}">
    <CommonSelectorListButtons
      :buttonsList="selectorButtons"
      @updateActiveButton="updateActiveButton"
      :active-btn="currentButtonType"
    />
    <div class="reviews__rating" v-if="currentButtonType === 'reviews'">
      <h3 class="reviews__rating-title">Ваш рейтинг:</h3>
      <span class="reviews__rating-value">{{pubCardRate.average_rating}}/5</span>
      <CommonRating :is-count-rating="false" :is-count-reviews="false" :rating="pubCardRate.stars"/>
    </div>
    <CommonFilterSelectList
      v-if="currentButtonType === 'my-reviews'"
      class="reviews__filter"
      :filters="filterList"
      @setFilters="setFilters"
      :activeFilters="activeFilterMyReviews"
    />
    <CommonFilterSelectList
      v-if="currentButtonType === 'reviews'"
      class="reviews__filter"
      :filters="filterList"
      @setFilters="setFilters"
      :activeFilters="activeFilterReviewsAboutUs"
    />
    <div class="reviews__list">
      <template v-if="currentButtonType === 'my-reviews'">
        <template v-for="review in reviewsListFormatted" :key="review.id">
          <ReviewsCard :data="review" :reviewsState="currentButtonType" />
        </template>
        <CommonAlerts :alert="alertEmptyText" :type="'warning'" v-if="!reviewsListFormatted.length && isLoaded" />
        <CommonPagination
          v-if="pageReviews.lastPage > 1"
          :current-page="pageReviews.currentPage"
          :total-pages="pageReviews.lastPage"
          @change-page="handleChangePage"
        />
      </template>
      <template v-if="currentButtonType === 'reviews'">
        <template
          v-for="review in reviewsAboutUsListFormatted"
          :key="review.id"
        >
          <ReviewsCard :data="review" :reviewsState="currentButtonType" />
        </template>
        <CommonAlerts :alert="alertEmptyText" :type="'warning'" v-if="!reviewsAboutUsListFormatted.length && isLoaded" />
        <CommonPagination
          v-if="pageReviewsAboutUs.lastPage > 1"
          :current-page="pageReviewsAboutUs.currentPage"
          :total-pages="pageReviewsAboutUs.lastPage"
          @change-page="handleChangePage"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { del } from "~/node_modules/nuxt/dist/app/compat/capi";
import { useReviewsStore } from "~/store/reviewsStore";
import { useUserStore } from "~/store/userStore";

const props = defineProps({
  reviewsState: {
    type: String,
    default: "",
    required: true,
    validate: (val) => ["my-reviews", "reviews"].includes(val),
  },
});

const router = useRouter();

const emit = defineEmits(["updateState"]);

const currentStatusOptions = ref("all");
const currentTypeOptions = ref("all");
const activeFilterMyReviews = ref({});
const activeFilterReviewsAboutUs = ref({});
const reviewStore = useReviewsStore();
const userStore = useUserStore();

const pageReviews = ref({
  currentPage: 1,
  lastPage: 0,
  total: 0,
});

const pageReviewsAboutUs = ref({
  currentPage: 1,
  lastPage: 0,
  total: 0,
});

const reviewsList = ref([]);
const reviewsAboutUsList = ref([]);
const isLoading = ref(false);
const isLoaded = ref(false);

const alertEmptyText = computed(() => {
  if (currentButtonType.value === "my-reviews") {
    const filteredList = deleteEmptyFilters({...activeFilterMyReviews.value});
    if (Object.keys(filteredList).length) return "Отзывов нет. Попробуйте изменить условия отбора.";
    return "Отзывов нет";
  } else if (currentButtonType.value === "reviews") {
    const filteredList = deleteEmptyFilters({...activeFilterReviewsAboutUs.value});
    if (Object.keys(filteredList).length) return "Отзывов нет. Попробуйте изменить условия отбора.";
    return "Отзывов нет";
  }
})

const reviewsListFormatted = computed(() => {
  if (reviewsList.length === 0) return [];

  return reviewsList.value.map((item) => {
    return {
      id: item.id,
      rate: item.rate,
      positive: item.text_positive,
      negative: item.text_negative,
      status_name: item.status_name,
      status_code: item.status_code,
      about: {
        id: item.about_pubcard.id,
        name: item.about_pubcard.name,
        image: item.about_pubcard.image,
        role: item.about_pubcard.type,
      },
    };
  });
});

const reviewsAboutUsListFormatted = computed(() => {
  if (reviewsAboutUsList.length === 0) return [];

  return reviewsAboutUsList.value.map((item) => {
    return {
      id: item.id,
      rate: item.rate,
      positive: item.text_positive,
      negative: item.text_negative,
      about: {
        id: item.owner_pubcard.id,
        name: item.owner_pubcard.name,
        image: item.owner_pubcard.image,
        role: item.owner_pubcard.type,
      },
    };
  });
});

const organizationId = computed(() => userStore.userOrganization?.id);
const pubCardRate = computed(() => userStore.userPubCard?.reviews_stats_about || {});

const currentButtonType = ref("my-reviews");

const selectorButtons = [
  {
    id: 1,
    label: "Мои отзывы",
    value: "my-reviews",
    count: computed(() => pageReviews.value.total),
  },
  {
    id: 2,
    label: "Отзывы о нас",
    value: "reviews",
    count: computed(() => pageReviewsAboutUs.value.total),
  },
];
const filterList = ["rate", "org_type"];

const updateActiveButton = (type) => {
  currentButtonType.value = type;
  router.push({ query: { ...router.currentRoute.value.query, type: type } });
  emit("updateState", type);
};

const setFilters = (filters) => {
  console.log(filters)
  if(currentButtonType.value === "my-reviews") {
    activeFilterMyReviews.value = {...filters};
  } else if(currentButtonType.value === "reviews") {
    activeFilterReviewsAboutUs.value = {...filters};
  }
};

watch(() => activeFilterMyReviews.value, (newVal, oldVal) => {
  if (JSON.stringify(newVal) === JSON.stringify(oldVal)) {
    return; // Если объекты одинаковы, выходим из функции
  }
  const query = deleteEmptyFilters({...newVal});
  getReviews(query)
}, {deep: true});

watch(() => activeFilterReviewsAboutUs.value, (newVal, oldVal) => {
  if (JSON.stringify(newVal) === JSON.stringify(oldVal)) {
    return; // Если объекты одинаковы, выходим из функции
  }
  const query = deleteEmptyFilters({...newVal});
  getReviewsForUs(query);
}, {deep: true});

const deleteEmptyFilters = (filter) => {
  if(!filter) return;
  for (const key in filter) {
    if (filter[key] === "all") {
      delete filter[key];
    }
  }
  return filter;
}

function handleChangePage(page) {
  switch (currentButtonType.value) {
    case "my-reviews":
      const queryMyReview = deleteEmptyFilters({...activeFilterMyReviews.value});
      getReviews({ page, ...queryMyReview });
      router.replace({ query: {...router.currentRoute.value.query, page} });
      break;
    case "reviews":
      const queryReviewsAboutUs = deleteEmptyFilters({...activeFilterReviewsAboutUs.value});
      getReviewsForUs({ page, ...queryReviewsAboutUs });
      router.replace({ query: {...router.currentRoute.value.query, page} });
      break;
  }
}

const getReviews = (filters) => {
  if(isLoading.value) return;
  isLoading.value = true;
  reviewStore.getReviews(organizationId.value, filters)
  .then((res) => {
    if (res) {
      if (res.data) {
        reviewsList.value = res.data;
        if (res.meta) {
          pageReviews.value.currentPage = res.meta.current_page;
          pageReviews.value.lastPage = res.meta.last_page;
          pageReviews.value.total = res.meta.total;
        }
      }
    }
    router.replace({ query: {...router.currentRoute.value.query, page: pageReviews.value.currentPage, ...activeFilterMyReviews.value} });
  })
  .finally(() => {
    isLoading.value = false;
  });
};

const getReviewsForUs = (filters) => {
  if(isLoading.value) return;
  isLoading.value = true;
  reviewStore.getReviewsForUs(organizationId.value, filters)
  .then((res) => {
    if (res) {
      if (res.data) {
        reviewsAboutUsList.value = res.data;
        if (res.meta) {
          pageReviewsAboutUs.value.currentPage = res.meta.current_page;
          pageReviewsAboutUs.value.lastPage = res.meta.last_page;
          pageReviewsAboutUs.value.total = res.meta.total;
        }
      }
    }
    router.replace({ query: {...router.currentRoute.value.query, page: pageReviewsAboutUs.value.currentPage, ...activeFilterReviewsAboutUs.value} });

  })
  .finally(() => {
    isLoading.value = false;
  });
}

onMounted(() => {
  const query = router.currentRoute.value.query;
  let reviewsParams = {};
  let reviewsAboutUsParams = {};

  if (query.type) {
    updateActiveButton(query.type);
  }

  if(currentButtonType.value === "my-reviews") {
    activeFilterMyReviews.value = {
      rate: query.rate || "all",
      org_type: query.org_type || "all",
    };
    reviewsParams = deleteEmptyFilters({...activeFilterMyReviews.value});
    if(query.page) {
      reviewsParams.page = query.page
    }
  } else if(currentButtonType.value === "reviews") {
    activeFilterReviewsAboutUs.value = {
      rate: query.rate || "all",
      org_type: query.org_type || "all",
    };
    reviewsAboutUsParams = deleteEmptyFilters({...activeFilterReviewsAboutUs.value});
    if(query.page) {
      reviewsAboutUsParams.page = query.page
    }
  }

  isLoading.value = true
  reviewStore.getReviews(organizationId.value, reviewsParams).then((res) => {
    if (res) {
      if (res.data) {
        reviewsList.value = res.data;
        if (res.meta) {
          pageReviews.value = {
            currentPage: res.meta.current_page,
            lastPage: res.meta.last_page,
            total: res.meta.total,
          };
        }
      }
    }
  }).finally(() => {
    isLoaded.value = true
    isLoading.value = false
  });
  reviewStore.getReviewsForUs(organizationId.value, reviewsAboutUsParams).then((res) => {
    if (res) {
      if (res.data) {
        reviewsAboutUsList.value = res.data;
        if (res.meta) {
          pageReviewsAboutUs.value = {
            currentPage: res.meta.current_page,
            lastPage: res.meta.last_page,
            total: res.meta.total,
          };
        }
      }
    }
  }).finally(() => {
    isLoaded.value = true
    isLoading.value = false
  });
});
</script>

<style lang="scss">
.reviews {
  font-size: 1.6rem;

  &__rating {
    display: flex;
    font-size: 1.75em;
    align-items: center;
    column-gap: 0.3em;
    margin-bottom: 0.9em;
  }

  &__rating-title {
    font-size: 1em;
    line-height: 1em;
  }

  &__rating-value {
    font-family: "fira-sans", sans-serif;
    color: var(--text-color-ternary);
    line-height: 1em;
  }

  &__filter {
    .select__select {
      padding: 0.625em;
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

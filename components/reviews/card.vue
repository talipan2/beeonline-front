<template>
  <div class="reviews-card">
    <div class="reviews-card__col-1">
      <div class="reviews-card__container">
        <div class="image-box reviews-card__image">
          <img :src="data.about?.image || defaultImage" :alt="data.about?.name">
        </div>
        <div class="reviews-card__content">
          <h3 class="reviews-card__title">{{ data.about?.name }}</h3>
          <p class="reviews-card__text">{{ role }}</p>
        </div>
      </div>
    </div>
    <div class="reviews-card__col-2">
      <div class="reviews-card__rating">
        <p class="reviews-card__rating-text">Оценка: ({{ data.rate }}/5)</p>
        <CommonRating :rating="data.rate" :is-count-rating="false" :is-count-reviews="false"/>
      </div>
    </div>
    <div class="reviews-card__col-3">
        <div class="reviews-card__content">
          <p class="reviews-card__title">Плюсы сотрудничества</p>
          <p class="reviews-card__text">{{ data.positive }}</p>
        </div>
        <div class="reviews-card__content">
          <p class="reviews-card__title">Минусы сотрудничества</p>
          <p class="reviews-card__text">{{ data.negative }}</p>
        </div>
        <NuxtLink class="reviews-card__btn" :to="`reviews/show/${data.id}`" >
          <span>Подробнее</span>
          <SvgoBtnArrow class="svg-m"/>
        </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import defaultImage from '~/assets/images/nophoto_pc.png'

const props = defineProps({
  data: {
    type: Object,
    default: () => {},
    required: true,
  },
  reviewsState: {
    type: String,
    default: "",
    required: true,
    validate: (val) => ["my-reviews", "reviews"].includes(val),
  },
});

const router = useRouter();
const role = computed(() => {
  if(props.data && props.data.about?.role === 'customer') {
    return 'Заказчик';
  } else if (props.data && props.data.about?.role === 'performer') {
    return 'Производитель';
  }
})

</script>

<style lang="scss" scoped>

.reviews-card {
  display: flex;
  column-gap: 1em;
  font-size: 1em;
  padding-block: .625em;
  border-top: 1px solid var(--border-color-secondary);

  @include tablet {
    font-size: 1.5rem;
  }
  
  @include mobile {
    font-size: 1.3rem;
    flex-wrap: wrap;
    row-gap: 1em;
  }

  @include small-mobile {
    box-shadow: -2px -2px 0 #6937a5, 0 1px 1px rgba(0, 0, 0, 0.15);
    border-top: none;
    padding: 1em;
  }

  &:last-child {
    border-bottom: 1px solid var(--border-color-secondary)
  }

  &__col-1 {
    flex: 0 0 30%;

    @include mobile {
      flex: 0 1 50%;
    }

    @include small-mobile {
      flex: 0 1 100%;
    }
  }

  &__col-2 {
    flex: 0 0 20%;
    @include mobile {
      flex: 0 1 45%;
    }

    @include small-mobile {
      flex: 0 1 100%;
    }
  }

  &__col-3 {
    flex: 0 1 auto;
  }

  &__container {
    display: flex;
    column-gap: .5em;
  }

  &__rating {
    display: flex;
    align-items: center;
    column-gap: .5em;
    font-size: 1.06em;
  }

  &__image {
    flex-basis: 24%;
    padding-top: 24%;
    max-width: 24%;
  }

  &__title {
    font-size: 1.06em;
    margin-bottom: .58em;
  }

  &__text {
    font-size: .93em;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__content {
    margin-bottom: 1.4em;
  }

  &__btn {
    display: inline-flex;
    column-gap: .5em;
    position: relative;
    line-height: 1em;

    &:hover {
      color: var(--text-color-ternary);

      svg {
        fill: var(--text-color-ternary);
      }
    }

    &:hover::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: -2px;
      border-bottom: 1px solid var(--text-color-ternary);
    }

    svg {
      margin-top: 2px;
    }

  }
}

</style>
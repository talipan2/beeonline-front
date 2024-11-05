<template>
  <div class="reviews-card">
    <div class="reviews-card__col-1">
      <div class="reviews-card__container">
        <div class="image-box reviews-card__image">
          <img :src="defaultImage" alt="">
        </div>
        <div class="reviews-card__content">
          <h3 class="reviews-card__title">Организация Исполнитель 101</h3>
          <p class="reviews-card__text">Исполнитель</p>
        </div>
      </div>
    </div>
    <div class="reviews-card__col-2">
      <div class="reviews-card__rating">
        <p class="reviews-card__rating-text">Оценка: (4/5)</p>
        <CommonRating :is-count-rating="false" :is-count-reviews="false"/>
      </div>
    </div>
    <div class="reviews-card__col-3">
        <div class="reviews-card__content">
          <p class="reviews-card__title">Плюсы сотрудничества</p>
          <p class="reviews-card__text">Плюсы сотрудничества Плюсы сотрудничестваПлюсы сотрудничества Плюсы сотрудничестваПлюсы сотрудничества Плюсы сотрудничестваПлюсы сотрудничества Плюсы сотрудничестваПлюсы сотрудничества Плюсы сотрудничестваПлюсы сотрудничества Плюсы сотрудничестваПлюсы сотрудничества Плюсы сотрудничестваПлюсы сотрудничества Плюсы сотрудничестваПлюсы сотрудничества Плюсы сотрудничестваПлюсы сотрудничества Плюсы сотрудничестваПлюсы сотрудничества Плюсы сотрудничестваПлюсы сотрудничества Плюсы сотрудничестваПлюсы сотрудничества Плюсы сотрудничестваПлюсы сотрудничества Плюсы сотрудничестваПлюсы сотрудничества Плюсы сотрудничестваПлюсы сотрудничества Плюсы сотрудничества</p>
        </div>
        <div class="reviews-card__content">
          <p class="reviews-card__title">Минусы сотрудничества</p>
          <p class="reviews-card__text">Плюсы сотрудничества Плюсы сотрудничестваПлюсы сотрудничества Плюсы сотрудничестваПлюсы сотрудничества Плюсы сотрудничестваПлюсы сотрудничества Плюсы сотрудничестваПлюсы сотрудничества Плюсы сотрудничестваПлюсы сотрудничества Плюсы сотрудничестваПлюсы сотрудничества Плюсы сотрудничестваПлюсы сотрудничества Плюсы сотрудничестваПлюсы сотрудничества Плюсы сотрудничестваПлюсы сотрудничества Плюсы сотрудничестваПлюсы сотрудничества Плюсы сотрудничестваПлюсы сотрудничества Плюсы сотрудничества</p>
        </div>
        <NuxtLink class="reviews-card__btn" :to="`${reviewsState}/show/${1}`" >
          <span>Подробнее</span>
          <SvgoBtnArrow class="svg-m"/>
        </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import defaultImage from '~/assets/images/nophoto_pc.png'

const props = defineProps({
  reviewsState: {
    type: String,
    default: "",
    required: true,
    validate: (val) => ["my-reviews", "reviews"].includes(val),
  },
});

const router = useRouter();

</script>

<style lang="scss" scoped>

.reviews-card {
  display: flex;
  column-gap: 1em;
  font-size: 1em;
  padding-block: .625em;
  border-top: 1px solid var(--border-color-secondary);

  &:last-child {
    border-bottom: 1px solid var(--border-color-secondary)
  }

  &__col-1 {
    flex: 0 0 30%;
  }

  &__col-2 {
    flex: 0 0 20%;
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
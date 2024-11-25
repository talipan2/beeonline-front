<template>
  <div class="card bonus-rating" :class="{
  'bonus-rating_loading': loading,
}">
      <div class="bonus-rating__title">Рейтинг пользователей</div>
      <ul class="bonus-rating__list">
          <li v-for="(org, i) in rating" :key="i">
              <div class="bonus-rating__list-count">{{ i + 1 }}</div>
              <div class="bonus-rating__list-item">
                  <div class="bonus-rating__list-name">{{ org.name }}</div>
                  <div class="bonus-rating__list-score">{{ org.score }}</div>
              </div>
          </li>
      </ul>
  </div>
</template>

<script setup>

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Array,
    default: () => ([])
  },
})

</script>

<style lang="scss">

.bonus-rating {
  gap: 1.6em;
  margin-bottom: 0;

  &_loading {
    pointer-events: none;
    opacity: .6;
  }

  &__title {
    font-family: "fira-sans", sans-serif;
    font-size: 1.8em;
    line-height: 1.3;
    font-weight: 600;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 1.6em;
    padding: 0;
    margin: 0;

    >li {
      display: flex;
      gap: 1.2em;
    }

    &-count {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 auto;
      font-size: 1.6em;
      width: 2.75em;
      height: 2.75em;
      border-radius: 0.5em;
      background-color: #f1f3f9;
      color: var(--primary-color);
      font-weight: 800;
    }

    &-item {
      width: calc(100% - 5.6em);
    }

    &-name {
      color: #747087;
      font-size: 1.4em;
      line-height: 1.4;

      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    &-score {
      font-family: 'fira-sans', sans-serif;
      color: var(--primary-color);
      font-size: 2em;
      line-height: 1;
      font-weight: 500;
    }
  }
}
</style>
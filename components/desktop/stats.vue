<template>
  <DesktopCard title="Статистика">
    <template #body>
      <div class="stats">
        <div class="stats__list">
          <div class="stats__items-container">
            <div class="stats__item" @mouseover="currentViewSetting = 'profile'">
              <p class="stats__title" :class="{ 'active': currentViewSetting === 'profile'}">Просмотры профиля</p>
              <p class="stats__value">{{ `0 (0)` }}</p>
              <div class="stats__status">
                <div class="replenishment">
                  <SvgoBalanceArrow class="svg-m " />
                  <p class="stats__status-text">100%</p>
                </div>
                <span class="desktop__selected">за неделю</span>
              </div>
            </div>
            <div class="divider-vertical"></div>
            <div class="stats__item" @mouseover="currentViewSetting = 'orders'">
              <p class="stats__title" :class="{ 'active': currentViewSetting === 'orders'}" v-if="role === 'customer'">Просмотры заказов</p>
              <p class="stats__title" :class="{ 'active': currentViewSetting === 'orders'}" v-if="role === 'performer'">Просмотры услуг</p>
              <p class="stats__value">{{ `0 (0)` }}</p>
              <div class="stats__status">
                <div class="replenishment">
                  <SvgoBalanceArrow class="svg-m" />
                  <p class="stats__status-text">100%</p>
                </div>
                <span class="desktop__selected">за неделю</span>
              </div>
            </div>
            <div class="divider-vertical"></div>
            <div class="stats__item" @mouseover="currentViewSetting = 'favorites'">
              <p class="stats__title" :class="{ 'active': currentViewSetting === 'favorites'}" >Добавлен в избранное</p>
              <p class="stats__value">{{ `0 (0)` }}</p>
              <div class="stats__status">
                <div class="replenishment">
                  <SvgoBalanceArrow class="svg-m" />
                  <p class="stats__status-text">100%</p>
                </div>
                <span class="desktop__selected">за неделю</span>
              </div>
            </div>
          </div>
          <CommonChart class="stats__chart" :data="currentDataSet" />
        </div>
      </div>
    </template>
  </DesktopCard>
</template>

<script setup>

const props = defineProps({
  role: {
    type: String,
    required: true,
  }
})

const chartDataSets =[
  [2323, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 1],
  [150, 140, 130, 120, 110, 100, 90, 80, 70, 60, 50, 40, 30, 20, 2210],
  [15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 500]
];

const currentViewSetting = ref(null)
const isHover = ref(false)

watch(() => currentViewSetting.value, (newVal) => {
  console.log(newVal);
}, {deep: true});

const currentDataSet = computed(() => {
  switch (currentViewSetting.value) {
    case 'profile':
      return chartDataSets[0];
    case 'orders':
      return chartDataSets[1];
    case 'favorites':
      return chartDataSets[2];
    default:
      return Array(15).fill(0);
  }
});

</script>

<style lang="scss">

.stats {
  flex: 1;
  &__list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 10em;
  }

  &__items-container {
    flex: 1 0 50%;
    display: flex;
    justify-content: space-between;
  }

  &__item {
    font-family: 'fira-sans', sans-serif;
    flex: 0 1 auto;
    display: flex;
    flex-direction: column;
    font-size: 1.6em;
    cursor: pointer;
  }

  &__title {
    font-size: 1em;
    color: var(--text-color-monodecimal);
    transition: color .2s ease;
  }

  &__value {
    font-size: 2.25em;
    font-weight: 600;
  }

  &__status {
    display: flex;
    column-gap: .5em;
    align-items: center;
    font-size: .875em;
    line-height: 1em;
  }

  &__chart {
    flex: 0 1 31%;
    max-width: 31%;
  }

  .active {
    color: var(--text-color-ternary);
  }

   @include tablet {
     &__list {
       column-gap: 5em;
     }
   }

  @include mobile {
    &__list {
      flex-direction: column;
      align-items: normal;
    }

    &__items-container {
      order: 1;
    }

    &__chart {
      flex: 1 1 100%;
      max-width: 100%;
    }

    &__item {
      font-size: 1.4rem;
    }
  }
}

@include small-mobile {
  .stats {
    &__list {
      row-gap: 1em;
    }

    &__items-container {
      flex-direction: column;
      row-gap: 1em;
    }
  }
}

</style>
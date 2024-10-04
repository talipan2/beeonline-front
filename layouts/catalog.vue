<template>
  <section class="catalog container" :class="className">
    <slot name="header" />
    <h1 class="catalog__title">{{ title }}</h1>
    <div class="catalog__container">
      <div class="catalog__left">
        <slot name="leftSide"/>
      </div>
      <div class="catalog__content">
        <slot name="content"/> 
      </div>
    </div>
  </section>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  className: {
    type: String,
    default: '',
  }
});

const leftSide = ref(null);
const rightSide = ref(null);
const settingStore = useSettingStore();

const onScrollPage = () => {
  if (leftSide.value) {
    leftSide.value.$el.style.top = `${settingStore.headerHeight + 30}px`;
    if (rightSide.value) {
      rightSide.value.style.top = `${settingStore.headerHeight + 30}px`;
    }
  } else {
    console.log('Element not found');
  }
}

onMounted(() => {
  onScrollPage();
  window.addEventListener("scroll", onScrollPage)
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScrollPage)
});

</script>

<style lang="scss">

.catalog {
  &__container {
    display: flex;
    column-gap: 14em;
    margin-bottom: 10em;
  }

  &__container_type_second {
    column-gap: 3em;
  }

  &__title {
    font-size: 3.6rem;
    margin: 1.38em 0 0.78em;
  }

  &__left {
    flex: 0 0 17%;
  }

  &__content {
    flex: 1 1 100%;
  }

}

.entity-edit {
  
  .catalog__content {
    flex: 0 1 50%;
  }
}


</style>
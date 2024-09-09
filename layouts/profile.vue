<template>
  <section class="profile container">
    <slot name="header" />
    <h1 class="profile__title">{{ title }}</h1>
    <div class="profile__container" :class="{ 'profile__container_type_second': !$slots.rightSide }">
      <div class="profile__left">
        <CommonSidebar class="sticky" ref="leftSide" />
      </div>
      <div class="profile__content" :class="{ 'profile__content_type_full': !$slots.rightSide }">
        <slot name="content"/> 
      </div>
      <div class="profile__right" v-if="$slots.rightSide">
        <div ref="rightSide" class="sticky">
          <slot name="rightSide"  />
        </div>
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

.profile {
  &__container {
    display: flex;
    column-gap: 10em;
    margin-bottom: 10em;
  }

  &__container_type_second {
    column-gap: 3em;
  }

  &__title {
    font-size: 3.2em;
    margin: 1.25em 0 0.78em;
  }

  &__left {
    flex: 0 0 17%;
    // border: 1px solid red;
  }

  &__content {
    flex: 1 1 33%;
    // border: 1px solid red;
  }

  &__content_type_full {
    flex: 0 1 74%;
  }

  &__right {
    flex: 0 0 33%;
    // border: 1px solid red;
  }
}

</style>
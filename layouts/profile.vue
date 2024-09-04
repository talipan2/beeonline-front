<template>
  <section class="profile container">
    <UiBreadCrumb />
    <h1 class="profile__title">{{ title }}</h1>
    <div class="profile__container" :class="{ 'profile__container_type_second': !$slots.rightSide }">
      <div class="profile__left">
        <CommonSidebar />
      </div>
      <div class="profile__content" :class="{ 'profile__content_type_full': !$slots.rightSide }">
        <slot name="content"/> 
      </div>
      <div class="profile__right" v-if="$slots.rightSide">
        <slot name="rightSide" />
      </div>
    </div>
  </section>
</template>

<script setup>

const props = defineProps({
  title: {
    type: String,
    default: '',
  }
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
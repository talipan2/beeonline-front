<template>
  <section class="catalog container" :class="className">
    <slot name="header" />
    <h1 class="catalog__title">
      {{ title }}
      <slot name="title" />
    </h1>
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

</script>

<style lang="scss">

.catalog {
  &__container {
    display: flex;
    column-gap: 10em;
    margin-bottom: 10em;
  }

  &__title {
    display: flex;
    align-items: center;
    column-gap: .5em;
    font-size: 3.6rem;
    margin: 1.38em 0 0.78em;
    line-height: 1em;
  }

  &__left {
    flex: 0 0 17%;
  }

  &__content {
    flex: 1 1 100%;
  }

}

.members {
  .catalog__container {
    column-gap: 3em;
  }
}

.entity-edit {
  .catalog__content {
    flex: 0 1 50%;
  }
}


</style>
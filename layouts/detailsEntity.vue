<template>
  <section class="entity-detail container" :class="className">
    <slot name="header" />
    <div class="entity-detail__container">
      <div class="entity-detail__main">
        <div class="entity-detail__title-container">
          <h1 class="entity-detail__title">{{ title }}</h1>
          <CommonBadge :badge="badge" />
        </div>
        <div class="entity-detail__content">
          <slot name="content"  />
        </div>
      </div>
      <div class="entity-detail__right-side">
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
  },
  className: {
    type: String,
    default: '',
  },
  badge: {
    type: String,
    default: '',
  }
});

</script>

<style lang="scss">

.entity-detail {
  font-size: 1rem;
  padding-bottom: 10em;

  &__title-container {
    margin-block: 4em 2em;
  }

  &__title {
    vertical-align: middle;
    display: inline;
    font-size: 3.2em;
    line-height: 1.2em;
  }

  &__container {
    display: flex;
    column-gap: 3rem;
  }

  &__main {
    flex: 0 1 50%;
    max-width: 50%;
  }

  &__right-side {
    flex: 0 1 33%;
    max-width: 33%;
  }

}

</style>
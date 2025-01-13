<template>
  <section class="info container" :class="className">
    <slot name="header" />
    <h1 class="info__title">{{ title }}</h1>
    <div class="info__content">
        <slot name="content" />
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

.info {
  font-size: 1rem;
  &__title {
    font-size: 3.6em;
    margin-block: 1.38em .83em;
  }

  &__content {
    margin-bottom: 3em;
  }
}

@include tablet {
  .info {
    max-width: var(--desktop-content-width);
  }
}

@include small-tablet {
  .info {
    max-width: var(--tablet-content-width);
  }
}

@include mobile {
  .info {
    max-width: var(--mobile-content-width);

    &__title {
      font-size: 2.4rem;
    }
  }
}

</style>
<template>
  <section class="entity-detail container" :class="className">
    <slot name="header" />
    <div class="entity-detail__container">
      <div class="entity-detail__main">
        <div class="entity-detail__title-container" v-if="title">
          <h1 class="entity-detail__title">{{ title }}</h1>
          <CommonBadge :badge="badge" />
          <slot name="title" />
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

    @include mobile {
      font-size: 2rem;
    }
  }

  &__container {
    display: flex;
    column-gap: 3rem;
    justify-content: center;
  }

  &__main {
    flex: 1 1 60%;
    max-width: 60%;
  }

  &__right-side {
    flex: 0 1 33%;
    max-width: 33%;
  }

  @include tablet {
    margin-inline: auto;
    max-width: var(--desktop-content-width);
  }

  @include small-tablet {
    max-width: var(--tablet-content-width);

    &__main {
      max-width: 60%;
    }

    &__right-side {
      flex-basis: 40%;
    }
  }

  @include mobile {
    max-width: var(--mobile-content-width);

    &__container {
      flex-direction: column;
    }

    &__main {
      max-width: 100%;
    }

    &__right-side {
      max-width: 100%;
    }
  }

}

</style>
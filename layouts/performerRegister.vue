<template>
  <section class="performer-register container" :class="className">
    <slot name="header" />
    <div class="performer-register__container" :class="{ 'performer-register__container_type_second': !$slots.rightSide }">
      <div class="performer-register__left">
        <slot name="leftSide"/>
      </div>
      <div class="performer-register__content" :class="{ 'performer-register__content_type_full': !$slots.rightSide }">
        <slot name="content"/> 
      </div>
      <div class="performer-register__right" v-if="$slots.rightSide">
        <div ref="rightSide" :class="{ 'sticky': rightSideSticky }">
          <slot name="rightSide"  />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>

const props = defineProps ({
  title: {
    type: String,
    default: '',
  },
  className: {
    type: String,
    default: '',
  },
  rightSideSticky: {
    type: Boolean,
    default: true,
  }
})

</script>

<style lang="scss">

.performer-register {
  &__container {
    display: flex;
    column-gap: 7em;
    margin-bottom: 10em;
    margin-top: 6em;
  }

  &__container_type_second {
    column-gap: 3em;
  }

  &__left {
    flex: 0 0 20%;
  }

  &__content {
    flex: 1 1 46%;
  }

  &__content_type_full {
    flex: 1 1 74%;
  }

  &__right {
    flex: 0 0 20%;
  }

  @include desktop {
    &__container {
      column-gap: 3em;
    }
  }

  @include tablet {
    max-width: 960px;

    &__content {
      flex: 1 1 auto;
    }

    &__right {
      display: none;
    }
  }

  @include small-tablet {
    max-width: var(--tablet-content-width);
  }

  @include mobile {
    max-width: var(--mobile-content-width);
    &__container {
      flex-direction: column;
    }
  }
}

</style>
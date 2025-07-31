<template>
  <div class="desktop-card">
    <div class="desktop-card__header">
      <h2 class="desktop-card__title">{{ title }}</h2>
      <UiButton v-if="link?.url" :to="link.url" class="desktop-card__btn link" variant="default" without-padding>
        <slot name="svg" />
        {{ link.text }}
      </UiButton>
      <UiButton  v-if="action?.function" type="button" @click="action.function" class="desktop-card__btn link" variant="default" without-padding>
        <slot name="svg" />
        {{ action.text }}
      </UiButton>
    </div>
    <div class="desktop-card__body">
      <slot name="body" />  
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  link: {
    type: Object,
    default: () => ({}),
  },
  action: {
    type: Object,
    default: () => ({}),
  },
});

</script>

<style lang="scss">

.desktop-card {
  display: flex;
  flex-direction: column;
  flex: 1 1 50%;
  font-size: 1rem;
  margin-bottom: 7.4em;
  transition: all .3s ease;

  &__header {
    display: flex;
    justify-content: space-between;
    font-size: 1.8em;
    margin-bottom: 1.55em;
  }

  &__title {
    font-size: 1em;
  }

  &__btn {
    font-size: .66em;
    font-weight: 600;
    text-transform: uppercase;
    column-gap: .5em;

    svg {
      fill: inherit;

      path {
        fill: inherit;
      }
    }

    &:hover {
      svg {
        fill: var(--text-color-hover-primary);
        path {
          fill: var(--text-color-hover-primary);
        }
      }
    }

    &:has(svg):hover {
      text-decoration: none;
    }
  }

  &__body {
    display: flex;
    border: 1px solid var(--border-color-senary);
    background-color: #fff;
    padding: 2.4em;
    flex: 1;
  }
}

</style>
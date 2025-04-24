<template>
  <div class="tooltip">
    <UiNewDropdown placement="top" trigger="mouseenter focus">
      <div class="tooltip__wrapper" v-if="!$slots.trigger">
        ?
      </div>
      <slot name="trigger"></slot>
      <template #content>
        <div class="tooltip__content">
          <div class="tooltip__text" v-if="!isHtml">{{ text }}</div>
          <div class="tooltip__text" v-else v-html="text"></div>
        </div>
      </template>
    </UiNewDropdown>
  </div>
</template>

<script setup>

const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  isHtml: {
    type: Boolean,
    default: false
  },
})

</script>

<style lang="scss">
.tooltip {
  margin-left: .3rem;
  display: flex;

  [data-tippy-root] {
    max-width: 200px;
    min-width: 200px;
  }


  .tippy-box {
    border: none;
  }

  .tippy-content {
    background: rgba(0, 0, 0, 0.9);
    margin-bottom: 5px;
    color: #fff;
  }

  .tippy-box[data-placement^="top"]>.tippy-arrow:before {
    bottom: -5px;
    left: 3px;
    border-width: 5px 5px 0;
    border-top-color: initial;
    transform-origin: center top;
  }

  .tippy-box[data-placement^="bottom"]>.tippy-arrow:before {
    top: -7px;
    left: 0;
    border-width: 0 8px 8px;
    border-bottom-color: initial;
    transform-origin: center bottom;
  }

  .tippy-arrow {
    color: rgba(0, 0, 0, 0.9);
  }

  &__text {
    font-size: 1.4rem;
    padding: 0.17em .35em;
    text-align: center;
    white-space: pre-wrap;
  }
  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--button-background-primary);
    border-radius: 10rem;
    width: 22px;
    height: 22px;
    font-size: 1.3rem;
    color: #fff;
    flex: 1 0 auto;
  }
}

</style>

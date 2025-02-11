<template>
  <div class="tariffs-card" :class="{'tariffs-card_loading': loading}">
	<template v-if="loading">
		<CommonSpinner class="tariffs-card__spinner"/>
	</template>
    <slot v-else></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
    required: false,
  },
})
</script>

<style lang="scss">

.tariffs-card {
  flex: 1 1 50%;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  border-top: 2px solid var(--border-color-quaternary);
  border-left: 2px solid var(--border-color-quaternary);
  background-color: var(--bg-secondary-color);
  padding: 1.5em;

  &__spinner {
    font-size: 1.6em;
  }

  &_loading {
    justify-content: center;
    align-items: center;
  }
}

</style>
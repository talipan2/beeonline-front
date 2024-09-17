<template>
  <div class="alerts" :class="alertClass">
    <ul class="alerts__list">
      <li class="alerts__item" v-for="(alert, index) in alerts" :key="index">
        <span class="alerts__text">{{ `Поле "${alert}" обязательно.` }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>

const props = defineProps({
  alerts: {
    type: Array,
    default: () => [],
  },
  type: {
    type: String,
    default: 'primary',
    validator: value => ['primary'].includes(value),
  }
})

const alertClass = computed(() => {
  return [
    `alerts-${props.type}`,
  ];
});

</script>

<style lang="scss">

.alerts {
  border: 2px solid transparent;
  border-radius: 1px;
  margin-bottom: 3.3em;
  padding: .75em 1.25em;
  position: relative;
  font-size: 1rem;

  &__text {
    font-size: 1.6em;
  }
}

.alerts-primary {
  background-color: #e1d7ed;
  border-color: #d5c7e6;
  color: #371d56
}


</style>
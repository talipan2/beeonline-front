<template>
  <div class="alerts" :class="alertClass">
    <ul class="alerts__list" v-if="alerts && alerts.length">
      <li class="alerts__item" v-for="(alert, index) in alerts" :key="index">
        <span class="alerts__text" v-if="alertType === 'validation'">{{ alert }}</span>
        <span class="alerts__text" v-else>{{ `Поле "${alert}" обязательно.` }}</span>
      </li>
    </ul>
    <p class="alerts__text" v-else>{{ alert }}</p>
    <div class="alerts__text">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  alerts: {
    type: Array,
    default: () => [],
  },
  alert: {
    type: String,
    default: '',
  },
  alertType: {
    type: String,
    default: 'default',
    validator: value => ['default', 'validation' ].includes(value),
  },
  type: {
    type: String,
    default: 'primary',
    validator: value => ['primary', 'error', 'success', 'warning'].includes(value),
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
  width: 100%;
  box-sizing: border-box;

  &__text {
    font-size: 1.6em;
    margin-bottom: 0;
  }
}

.alerts-primary {
  background-color: #e1d7ed;
  border-color: #d5c7e6;
  color: #371d56
}

.alerts-error {
  background-color: #f8d7da;
  border-color: #f5c6cb;
  color: #721c24
}

.alerts-success {
  background-color: #e1d7ed;
  border-color: #d5c7e6;
  color: #371d56
}

.alerts-warning {
  background-color: #fff3cd;
  border-color: #ffeeba;
  color: #856404
}

.alerts-info {
  background-color: #e2f2d5;
  border-color: #d6edc5;
  color: #396318
}

</style>

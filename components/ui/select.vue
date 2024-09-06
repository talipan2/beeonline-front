<template>
  <div class="select">
    <select class="select__select" v-model="internalValue" @change="emitChange" :disabled="disabled" :required="required">
      <option class="select__option" v-for="option in options" :key="option.id" :value="option.value || option.id">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup>

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: null,
  },
  options: {
    type: Array,
    required: true,
    default: () => []
  },
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue']);
const internalValue = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
  internalValue.value = newValue;
});

function emitChange(event) {
  emit('update:modelValue', internalValue.value);
}
</script>

<style lang="scss">

.select {

  &__select {
    font-size: 1em;
    padding: 1rem;
    width: 100%;
    border: 1px solid var(--border-color-secondary);
    appearance: none;
    background: #fff url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15'%3E%3Cpath stroke='%23343a40' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' d='m12 6-4.5 4L3 6' fill='none'/%3E%3C/svg%3E") right 1rem center/15px 15px no-repeat;
  
    &:focus {
      border-color: var(--border-color-input-focus);
      box-shadow: 0 0 0 .2rem rgba(105, 55, 165, .25);
      color: var(--text-color-senary);
      outline: none;
    }
  }
}

</style>
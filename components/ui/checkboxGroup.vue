<template>
  <div class="checkbox-group">
    <UiCheckbox
      v-for="option in options"
      :key="option.id"
      :id="option.id"
      :modelValue="isChecked(option.id)"
      :disabled="disabled(option.id)"
      :indeterminate="indeterminate"
      :required="required"
      @update:modelValue="handleChange(option.id, $event)"
      :variant="variant"
    >
      {{ option.label }}
    </UiCheckbox>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [], 
  },
  options: {
    type: Array,
    required: true,
  },
  variant: {
    type: String,
    default: 'square',
    validator: (value) => ['square', 'round'].includes(value),
  },
  required: {
    type: Boolean,
    default: false,
  },
  indeterminate: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Function,
    default: () => false,
  }
});

const emit = defineEmits(['update:modelValue']);
const internalValue = ref([...props.modelValue]);

watch(() => props.modelValue, (newValue) => {
  internalValue.value = [...newValue];
});

const isChecked = (id) => {
  return internalValue.value.includes(id);
};

const handleChange = (id, isChecked) => {
  if (isChecked) {
    if (!internalValue.value.includes(id)) {
      internalValue.value.push(id);
    }
  } else {
    internalValue.value = internalValue.value.filter((item) => item !== id); 
  }
  emit('update:modelValue', [...internalValue.value]);
};
</script>

<style lang="scss">

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1.6rem;

  .checkbox__label {
    font-size: 1.6rem;
  }
}

</style>
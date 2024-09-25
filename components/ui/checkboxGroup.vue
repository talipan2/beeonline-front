<template>
  <Field :rules="rules" v-model="internalValue" v-slot="{ errors }" :name="name" :label="label">
  <div class="checkbox-group" :class="$attrs.class">
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
      :isValidated="false"
      :name="`checkbox-${option.id}`"
      :class="{'invalid': errors.length }"
    >
      {{ option.label }}
    </UiCheckbox>
    <div class="invalid-error">
      <span v-if="errors.length" class="invalid-error__text">{{ errors[0] }}</span>
    </div>
  </div>
  </Field>
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
  },
  name: {
    type: String,
    default: 'checkbox-group',
  },
  rules: {
    type: [String, Object],
    default: '',
  },
  isValidated: {
    type: Boolean,
    default: true,
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
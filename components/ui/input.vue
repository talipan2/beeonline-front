<template>
  <Field :rules="rules" v-slot="{ field, errors, meta }" :label="label" :type="type">
    <div class="input">
      <div class="input-container" :class="[field.class, $attrs.class, {'invalid': errors.length && meta.touched}] " >
        <input
          class="input__field"
          :type="type"
          v-bind="field"
          :disabled="disabled"
          :placeholder="placeholder"
          @input="updateValue($event.target.value)"
          :id="id"
          @keydown="onKeyDown"
        />
        <slot />
      </div>
        <slot name="action" />
        <div class="invalid-error">
          <span v-if="errors.length && meta.touched" class="invalid-error__text">{{ errors[0] }}</span>
        </div>
    </div>
  </Field>
</template>

<script setup>
import { Field } from 'vee-validate';

const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    default: null,
  },
  rules: {
    type: [String, Object],
    default: '',
  },
  mask: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  }
});

const internalValue = computed(() => props.modelValue);
 

const emit = defineEmits(['update:modelValue']);

function onKeyDown(event) {
  if ((props.type === 'number' || props.type === 'tel') && ['e', 'E', '+', '-'].includes(event.key)) {
    event.preventDefault();
  }
}

function updateValue(value) {
  if(props.type == 'number' || props.type == 'tel') {
    value = value.replace(/[eE\+\-]/g, "").replace(/\D/g, "");
  }
  emit('update:modelValue', value);
}

</script>

<style lang="scss">
  .input {
    display: flex;
    flex-wrap: wrap;
    flex: 1 1 100%;
  }

  .input-container {
    box-sizing: border-box;
    display: flex;
    border: 1px solid var(--border-color-secondary);
    background-color: var(--bg-secondary-color);
    padding: 1rem;

    &:focus-within {
      border-color: var(--border-color-input-focus);
      box-shadow: var(--box-shadow-input);
    }

    &:has(input:disabled) {
      background-color: var(--button-disabled-background);
      color: var(--button-disabled-color);
    }
    
  }

  .input__field {
    width: 100%;
    border: none;
    font-size: 1em;
    padding: 0;
    color: var(--text-color-monodecimal);
    pointer-events: visible;

    &::placeholder {
      color: var(--text-color-senary);
    }

    &:focus {
      outline: none;
    }
  }
  
  @include mobile {
    .input-container {
      padding: 10px;
    }

    .input {
      font-size: 16px;
    }
  }
</style>
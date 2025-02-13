<template>
  <Field :rules="rules" v-slot="{ field, errors, meta }" :label="label" :type="type">
    <div class="input" >
      <div class="input-container" :class="[field.class, $attrs.class, {'invalid': errors.length && meta.touched}]" >
        <input
          class="input__field"
          :type="type"
          v-bind="field"
          :disabled="disabled"
          :placeholder="placeholder"
          @input="updateValue($event.target.value)"
          :id="id"
          @keypress="onKeyDown"
          :maxlength="maxLength"
          @focus="$emit('focus', $event)"
          @blur="$emit('blur', $event)" 
        />
        <slot />
      </div>
        <slot name="action" />
        <div class="invalid-error" v-if="rules">
          <span v-if="errors.length && meta.touched" class="invalid-error__text">{{ customErrorMessage || errors[0] }}</span>
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
  label: {
    type: String,
    default: '',
  },
  customErrorMessage: {
    type: String,
    default: '',
  },
  phonePlus: {
    type: Boolean,
    default: false,
  },
  maxLength: {
    type: Number,
    default: null
  },
  inputType: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue', 'focus', 'blur']);

function onKeyDown(event) {
  if (props.type === 'number' && ['e', 'E', '+', '-'].includes(event.key) ) {
    event.preventDefault();
  }
  if(props.type === 'tel' && !/^[0-9]*$/.test(event.key)) {
    event.preventDefault();
  }
  if(props.inputType === 'number' && !/^[0-9]*$/.test(event.key)) {
    event.preventDefault();
  }
}

function updateValue(value) {
  if(props.phonePlus && !value.startsWith('+')) {
    value = `+${value}`
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
  width: 100%;

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
  color: var(--text-color-senary);
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
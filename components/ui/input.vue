<template>
  <div class="input-container">
    <input
      class="input"
      :type="type"
      :value="modelValue"
      @input="updateValue($event.target.value)"
      :disabled="disabled"
      :placeholder="placeholder"
      :required="required"
      :id="id"
    />
    <slot />
  </div>
</template>

<script setup>

const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    default: '',
  }
});

const emit = defineEmits(['update:modelValue']);

function updateValue(value) {
  emit('update:modelValue', value);
}

</script>

<style lang="scss">
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

  .input {
    width: 100%;
    border: none;
    font-size: 1em;
    padding: 0;
    color: var(--text-color-monodecimal);

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
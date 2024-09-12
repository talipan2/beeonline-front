<template>
  <div :class="['checkbox', variantClass]">
    <label class="checkbox__label">
      <input
        type="checkbox"
        v-model="internalValue"
        class="checkbox__input"
        :disabled="disabled"
        @change="emitChange"
        :indeterminate="indeterminate"
      />
      <div class="checkbox__icon"></div>
      <slot></slot>
    </label>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean, 
    default: false,
  },
  variant: {
    type: String,
    default: 'square',
    validator: (value) => ['square', 'round'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  indeterminate: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  }
});

const emit = defineEmits(['update:modelValue']);
const internalValue = ref(props.modelValue);

const variantClass = computed(() => {
  return props.variant === 'round' ? 'checkbox_type_round' : 'checkbox_type_square';
});

watch(() => props.modelValue, (newValue) => {
  internalValue.value = newValue;
});

function emitChange() {
  console.log(internalValue.value)
  emit('update:modelValue', internalValue.value);
}
</script>

<style lang="scss">
.checkbox__label {
  cursor: pointer;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  width: fit-content;
}

.checkbox__input {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

.checkbox__icon {
  width: 1.8rem;
  height: 1.8rem;
  margin-right: 1rem;
}

.checkbox__icon::before {
  content: '';
  display: inline-block;
  width: 1.8rem;
  height: 1.8rem;
  box-sizing: border-box;
  flex-shrink: 0;
  flex-grow: 0;
  border: 1px solid #adb5bd;
  margin-right: 0.5rem;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100%;
  background-color: #fff;
  border: 1px solid #c4c4c4;
  border-radius: 2px;
  min-width: 1rem;
  position: relative;
  transition: border-color .2s ease-in-out;
}

.checkbox_type_square .checkbox__input:checked + .checkbox__icon::before {
  background-image: url('@/assets/svg/checked.svg');
}

.checkbox__input:focus + .checkbox__icon::before {
  box-shadow: 0 0 0 .2rem hsla(240, 2%, 87%, .5);
}

.checkbox__label:hover .checkbox__icon::before {
  border-color: #6937a5;
}

.checkbox_type_round .checkbox__input:checked + .checkbox__icon::before {
  background-image: url('@/assets/svg/checked-circle.svg');
}

.checkbox_type_square .checkbox__input:indeterminate + .checkbox__icon::before {
  background-image: url('@/assets/svg/checkbox-indeterminate.svg');
}

.checkbox_type_round .checkbox__icon::before {
  border-radius: 50%;
}

.checkbox__label {
  font-size: 1.3rem;
  color: var(--text-color-primary);
  line-height: 1em;

  a:hover {
    text-decoration: underline;
    color: #44246c;
  }
}

.checkbox__input:disabled {
  cursor: not-allowed;
}
</style>
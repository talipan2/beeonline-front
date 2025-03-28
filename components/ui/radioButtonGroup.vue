<template>
  <Field
    :rules="rules"
    v-slot="{ errors, field, meta, handleChange }"
    :name="name"
  >
    <div class="radio-buttons" :class="$attrs.class">
      <label
        v-for="option in options"
        :key="option.value"
        class="radio-buttons__label"
      >
        <input
          type="radio"
          :name="name"
          :value="option.value"
          v-model="field.value"
          @input="handleChange(Number($event.target.value))"
          :checked="field.value === option.value"
          class="radio-buttons__input"
        />
        <div class="radio-buttons__icon"></div>
        <span>{{ option.label }}</span>
      </label>
      <div class="invalid-error" v-if="rules">
        <span
          v-if="errors.length && meta.touched"
          class="invalid-error__text"
          >{{ errors[0] }}</span
        >
      </div>
    </div>
  </Field>
</template>

<script setup>
const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  name: {
    type: String,
    default: "",
  },
  rules: {
    type: [Object, String],
    default: "",
  },
});
</script>

<style lang="scss">

.radio-buttons {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.radio-buttons__label {
  cursor: pointer;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  width: fit-content;
}

.radio-buttons__input {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

.radio-buttons__icon {
  width: 1.8rem;
  height: 1.8rem;
  margin-right: 1rem;
}

.radio-buttons__icon::before {
  content: "";
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
  transition: border-color 0.2s ease-in-out;
  border-radius: 50%;
}

.radio-buttons__input:focus + .radio-buttons__icon::before {
  box-shadow: 0 0 0 0.2rem hsla(240, 2%, 87%, 0.5);
}

.radio-buttons__label:hover .radio-buttons__icon::before {
  border-color: #6937a5;
}

.radio-buttons .radio-buttons__input:checked + .radio-buttons__icon::before {
  background-image: url("@/assets/svg/checked-circle.svg");
}

.radio-buttons__label {
  font-size: 1.3rem;
  color: var(--text-color-primary);
  line-height: 1em;

  a:hover {
    text-decoration: underline;
    color: #44246c;
  }
}

.radio-buttons__input:disabled {
  cursor: not-allowed;
}
</style>

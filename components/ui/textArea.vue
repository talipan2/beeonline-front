<template>
  <Field :rules="rules" v-slot="{ field, errors, meta }" :name="name" :label="label">
    <div class="text-area">
      <div class="text-area__container" :class="[field.class, $attrs.class]">
        <textarea 
          class="text-area__input" 
          v-bind="field"
          :rows="rows" 
          :disabled="disabled"
          @input="field.handleChange"
        />
      </div>
        <div class="invalid-error">
          <span v-if="errors.length && meta.touched" class="invalid-error__text">{{ errors[0] }}</span>
        </div>
    </div>
  </Field>
</template>

<script setup>

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  rows: {
    type: Number,
    default: 8,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  rules: {
    type: [String, Object],
    default: '',
  }
})

</script>

<style lang="scss">

.text-area__container {
  position: relative;
  padding-bottom:30%;
  margin-top: .5em;
}

.text-area__input {
  position: absolute;
  inset: 0;
  box-sizing: border-box;
  display: block;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1em;
  padding: 1rem;
  width: 100%;
  color: var(--text-color-senary);
  background-color: #fff;
  border: 1px solid var(--border-color-secondary);
  border-radius: 1px;
  resize: none;

  &:focus {
    background-color: #fff;
    border-color: var(--border-color-input-focus);
    box-shadow: 0 0 0 .2rem rgba(105, 55, 165, .25);
    color: var(--text-color-senary);
    outline: 0;
  }
}

</style>
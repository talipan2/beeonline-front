<template>
  <div class="text-area">
    <textarea 
      class="text-area__input" 
      :name="name" 
      :value="modelValue" 
      @input="$emit('update:modelValue', $event.target.value)"
      :rows="rows" 
      :required="required"
      :disabled="disabled" 
    />
  </div>
</template>

<script setup>

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  rows: {
    type: Number,
    default: 8,
  },
  modelValue: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  }
})

</script>

<style lang="scss">

.text-area {
  position: relative;
  padding-bottom: 63.1%;
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
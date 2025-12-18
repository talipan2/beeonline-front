<template>
  <Field :rules="rules" v-slot="{ field, errors, meta }" :name="name" :label="label">
    <div class="text-area" :class="[field.class, $attrs.class, {'invalid': errors.length && meta.touched}]">
      <div class="text-area__container" >
        <textarea 
          class="text-area__input" 
          v-bind="field"
          :rows="rows" 
          :disabled="disabled"
          :placeholder="placeholder"
          @input="field.handleChange"
          ref="refValue"
        />
      </div>
        <div class="invalid-error" v-if="errorShow">
          <span v-if="errors.length && meta.touched" class="invalid-error__text">{{ errors[0] }}</span>
        </div>
    </div>
  </Field>
</template>

<script setup>
import { useTippy } from 'vue-tippy';

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
  },
  alertMessage: {
    type: String,
    default: ''
  },
  errorShow: {
    type: Boolean,
    default: true,
  },
  placeholder: {
    type: String,
    default: '',
  }
})


const refValue = ref(null);

onMounted(() => {
  if(props.alertMessage) {
    useTippy(refValue.value, {
      className: 'text-area__tippy',
      content: props.alertMessage,
      placement: 'right',
      theme: 'text-area',
      trigger: 'focus',
      hideOnClick: false,
      arrow: true,
    })
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
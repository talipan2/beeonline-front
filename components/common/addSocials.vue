<template>
  <div class="add-socials">
    <h2 class="add-socials__title">Социальные сети</h2>
    <Form @submit="handleSubmit">
      <div class="add-socials__container">
        <div class="add-socials__item">
          <label class="form-group-data form-group__title"> Telegram </label>
          <div class="add-socials__input">
            <SvgoTelegram class="svg-lx add-socials__icon" />
            <UiInput
              name="url_tg"
              label="Ссылка на Telegram"
              class="form-group__value"
              v-model="data.urlTg"
              type="text"
              placeholder=""
              :rules="{ url: true }"
            />
          </div>
        </div>
        <div class="add-socials__item">
          <label class="form-group-data form-group__title"> VK </label>
          <div class="add-socials__input">
            <SvgoVk class="svg-lx add-socials__icon" />
            <UiInput
              name="url_vk"
              label="Ссылка на VK"
              class="form-group__value"
              v-model="data.urlVk"
              type="text"
              placeholder=""
              :rules="{ url: true }"
            />
          </div>
        </div>
        <div class="add-socials__item">
          <label class="form-group-data form-group__title"> Youtube </label>
          <div class="add-socials__input">
            <SvgoYoutube class="svg-lx add-socials__icon" />
            <UiInput
              name="url_yt"
              label="Ссылка на Youtube"
              class="form-group__value"
              v-model="data.urlYt"
              type="text"
              placeholder=""
              :rules="{ url: true }"
            />
          </div>
        </div>
      </div>
      <slot></slot>
    </Form>
  </div>
</template>

<script setup>

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
    required: true,
  },
  submitFunc: {
    type: Function,
    default: null
  }
})

const emit = defineEmits(['update:modelValue']);

const data = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  }
})

const handleSubmit = () => {
  if(props.submitFunc) props.submitFunc();
}

</script>

<style lang="scss">
.add-socials {
  margin-bottom: 2em;
  &__title {
    margin-bottom: 0.78em;
  }

  &__container {
    display: flex;
    flex-direction: column;

    label {
      margin-left: 3.46em;
      margin-bottom: 0;
    }
    
  }

  .form-group__title {
    width: auto;
  }

  .form-group-value {
    margin-top: 0;
  }

  &__icon {
    margin-bottom: 1em;
  }

  &__item {
    margin-bottom: 1em;
  }

  &__input {
    display: flex;
    align-items: center;
    column-gap: 1.5em;
  }
}
</style>

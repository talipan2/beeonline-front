<template>
  <div class="phone-mask input">
    <Field
      :rules="validatePhone"
      v-slot="{ field, errors, meta }"
      :label="label"
      :name="name"
      class="input__container"
    >
      <IntlTelInput
        ref="intlTelInput"
        class="phone-mask__input"
        v-bind="field"
        :options="{
          initialCountry: 'ru',
          autoPlaceholder: 'polite',
          countryOrder: ['RU', 'BY', 'KZ', 'KG', 'UZ', 'VN', 'TJ', 'TR', 'CN', 'BD', 'IN'],
          separateDialCode: true,
          strictMode: true,
          i18n: ru,
          formatOnDisplay: true,
          nationalMode: false,
          preferredCountries: ['ru'],
          utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.1/build/js/utils.js',
          containerClass: 'input-container'
        }"

        :inputProps="{
          name: name,
          label: label,
        }"

        @changeNumber="handleChangeNumber"
        @countryChange="handleCountryChange"
      />

      <div class="invalid-error" v-if="rules">
        <span v-if="errors.length && meta.touched" class="invalid-error__text">{{ errors[0] }}</span>
      </div>
    </Field>
  </div>
</template>

<script setup>
import IntlTelInput from "intl-tel-input/vueWithUtils";
import "intl-tel-input/styles";
import {ru} from "intl-tel-input/i18n";
import { useField } from 'vee-validate';
import { ref } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
  rules: {
    type: Object,
    default: () => ({}),
  },
  name: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue']);
const intlTelInput = ref(null);

// Функция валидации телефона
const validatePhone = (value) => {
  if (!value) return `Поле "${props.label}" обязательно для заполнения`;

  const isValid = intlTelInput.value?.instance?.isValidNumber();
  return isValid || `Неверный формат номера телефона для поля "${props.label}"`;
};

const { setErrors } = useField(props.name, validatePhone);

const handleCountryChange = () => {
  // При смене страны нужно перевалидировать номер
  const number = intlTelInput.value?.instance?.getNumber();
  if (number) {
    handleChangeNumber(number);
  }
};

const handleChangeNumber = (number) => {
  const region = intlTelInput.value?.instance?.getSelectedCountryData();
  const isValid = intlTelInput.value?.instance?.isValidNumber();
  const formattedNumber = intlTelInput.value.instance.getNumber();

  if (isValid) {
    setErrors(null);
  } else {
    setErrors(`Неверный формат номера телефона для поля "${props.label}"`);
  }

  emit('update:modelValue', {...props.modelValue, phone: formattedNumber, country_code: region?.iso2});
}

watch(() => props.modelValue, () => {
  if(props.modelValue?.phone) {
    intlTelInput.value.instance.setNumber(props.modelValue.phone);
  }
}, {deep: true, once: true})

onMounted(() => {
  if(props.modelValue?.phone) {
    intlTelInput.value.instance.setNumber(props.modelValue.phone);
  }
})
</script>

<style lang="scss">
.phone-mask {
  .iti {
    font-size: 1.6rem;
    width: 100%;
    max-width: 100%;
    border: 1px solid var(--border-color-secondary);
    background-color: var(--bg-secondary-color);
    padding: 1rem;
    // max-height: 2.5em;
    height: auto;
    box-sizing: border-box;
    display: flex;
    align-items: center;

    &__country-container {
      padding-block: 0;
    }

    &__tel-input {
      border: none !important;
      outline: none !important;
      padding-block: 0;
      width: 100%;
      color: var(--text-color-senary);

      &:focus {
        outline: none;
        box-shadow: none;
      }
    }

    &__search-input {
      padding: .5em;
      &:focus {
        outline: none;
        box-shadow: none;
      }
    }

    &__selected-dial-code {
      line-height: 1.15;
    }

    &:focus-within {
      border-color: var(--border-color-input-focus);
      box-shadow: var(--box-shadow-input);
    }
  }
}
</style>

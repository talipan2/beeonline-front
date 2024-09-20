<template>
  <div class="calendar">
    <label class="calendar__label form-group__title">
      Дата выполнения
    </label>
      <div class="calendar__container">
        <div class="input-container">
          <flat-pickr
            class="input"
            ref="picker"
            v-model="date"
            :config="config"
          />
        </div>
        <UiButton @click="picker.fp.open()" type="button" class="calendar__btn" variant="quinary" size="around">
          <SvgoCalendar class="svg-lx" />
        </UiButton>
      </div>
  </div>
</template>

<script setup>
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import {Russian} from 'flatpickr/dist/l10n/ru.js';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
    required: true,
  }
})

const emit = defineEmits(['update:modelValue']);

const picker = ref(null);
const date = ref('');
const config = ref({
    altFormat: 'd.m.Y',
    altInput: true,
    dateFormat: 'Y-m-d', 
    locale: Russian,
    minDate: new Date(),
    altInputClass: 'input',
});

watch(() => date.value, (newVal) => {
  emit('update:modelValue', newVal);
});

onMounted(() => {
  date.value = props.modelValue || ''
})

</script>

<style lang="scss">

.calendar {
  .flatpickr-input {
    overflow: hidden;
    border: none;
  }
  
  &__label {
    .input {
    }
  }

  &__container {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.6rem;

    .input-container {
      flex: 0 1 38%;
      padding: 0;

      .input {
        padding: 1rem;
      }

    }

    .btn {
      padding: 0;
      svg {
        fill: var(--text-color-ternary);
        width: 3.6rem;
        path {
          fill: inherit;
          stroke: #fff;
        }

        g {
          stroke:#fff;
        }
      }

      &:hover {
        svg {
        fill: #fff;
        path {
          fill: inherit;
          stroke: var(--text-color-primary);
        }

        g {
          stroke:var(--text-color-primary);
        }
      }
      }
    }
  }
}

</style>
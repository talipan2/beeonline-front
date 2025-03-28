<template>
  <div class="calendar">
    <label class="calendar__label form-group__title">
      Дата выполнения
    </label>
      <div class="calendar__container">
        <div class="input-container">
          <flat-pickr
            name="date"
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
    type: [String, null],
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
    disableMobile: true,
    allowInvalidPreload: true,
});

watch(() => date.value, (newVal) => {
  emit('update:modelValue', newVal);
});

let stopWatcher = false;

watchEffect(() => {
  if(props.modelValue && picker.value?.fp && !stopWatcher) {
    picker.value.fp.setDate(props.modelValue);
    stopWatcher = true
  }
})

// watch(() => props.modelValue, (newVal) => {
//   if(props.modelValue && picker.value?.fp) {
//     picker.value.fp.setDate(props.modelValue);
//   }
// });

// onMounted(() => {
//   console.log(props.modelValue)
//   if(props.modelValue && picker.value?.fp) {
//     picker.value.fp.setDate(props.modelValue);
//   }
// })

</script>

<style lang="scss">

.calendar {
  
  .flatpickr-input {
    overflow: hidden;
    border: none;
  }

  
  &__label {
    .input {
      border: none !important;
      background: transparent !important;
      cursor: pointer;
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
        border: none !important;
        background: transparent !important;
        cursor: pointer;
    
        /* Отключаем все эффекты при фокусе */
        &:focus {
          outline: none !important;
          box-shadow: none !important;
          border: none !important;
        }
      
        /* Отключаем выделение при активном состоянии */
        &:active {
          box-shadow: none !important;
          border: none !important;
        }
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
<template>
  <NuxtLayout name="performer-register" title="Регистрация исполнителя" class="performer-register-layout">
    <template #leftSide>
      <CommonCheckListStep
      class="performer-register-layout__steps performer-register-layout__steps_type_desktop"
      :steps="stepsConfig"
      :current-step="currentStep"
      :completed-steps="completedSteps"
      />
    </template>
    <template #content>
      <h1 class="performer-register-layout__title">Регистрация исполнителя</h1>
      <CommonCheckListStep
        class="performer-register-layout__steps performer-register-layout__steps_type_mobile"
        :steps="stepsConfig"
        :current-step="currentStep"
        :completed-steps="completedSteps"
      />
      <UiForm :submit="handleSubmit">
        <component :is="stepsConfig[currentStep].component" v-model="data" :title="stepsConfig[currentStep].title" :submitFunc="handleSubmit"/>
        <div class="performer-register-layout__btn-container" v-if="stepsConfig[currentStep]?.type === 'pubCard'" >
          <UiButton v-if="stepsConfig[currentStep - 1]?.route" class="performer-register-layout__btn" variant="senary" size="large" :to="`/performer-register${stepsConfig[currentStep - 1].route}`">Назад</UiButton>
          <UiButton v-if="stepsConfig.length === currentStep + 1" type="submit" class="performer-register-layout__btn" variant="quinary" size="large">Сохранить данные</UiButton>
          <UiButton v-else type="submit" class="performer-register-layout__btn" variant="quinary" size="large">Сохранить и продолжить</UiButton>
        </div>
      </UiForm>
    </template>
    <template #rightSide>
      <!-- <CommonNotify class="performer-register-layout__notify performer-register-layout__notify_type_desktop" text="текст уведомления" type="info" /> -->
    </template>
  </NuxtLayout>
</template>

<script setup>
import step1 from '~/components/register/step1.vue'
import step2 from '~/components/performerRegister/step1.vue';
import step3 from '~/components/performerRegister/step2.vue';
import step4 from '~/components/performerRegister/step3.vue';

const stepsConfig = [
  {id: 1, title: 'Данные организации', route: '/step1', component: step1},
  { id: 2, title: 'Карточка', route: '/step2', component: step2, type: 'pubCard' },
  { id: 3, title: 'Услуги', route: '/step3', component: step3, type: 'pubCard' },
  { id: 4, title: 'Галерея', route: '/step4', component: step4, type: 'pubCard' },
]


const route = useRoute();
const router = useRouter();

const data = ref({
  countryId: 1,
  inn: '',
  kpp: '',
  organizationForm: 3,
  ogrn: '',
  legalAddress: '',
  organizationName: '',
  name: '',
  logo: {
    url: 'https://api.bee-online.ru/storage/33105/photo_2024-12-29_01-07-06.jpg'
  },
  url_site: '',
  description: '',
  is_stm: null,
  free_samples: [],
  free_stock: null,
  materials: [],
  services: [
    {
      id: 11,
      name: 'Пошив изделий',
      product_categories: [
        {
          id: 2,
          name: "\u0412\u0435\u0440\u0445\u043d\u044f\u044f \u043e\u0434\u0435\u0436\u0434\u0430"
        },
        {
          id: 4,
          name: "\u0411\u043b\u0443\u0437\u044b, \u043f\u043b\u0430\u0442\u044c\u044f, \u044e\u0431\u043a\u0438, \u0431\u0440\u044e\u043a\u0438, \u0438 \u0442.\u0434. \u0416\u0435\u043d."
        },
        {
          id: 6,
          name: "\u041a\u043e\u0441\u0442\u044e\u043c\u044b,  \u0440\u0443\u0431\u0430\u0448\u043a\u0438,  \u0441\u0432\u0438\u0442\u0435\u0440\u0430  \u0438 \u0434\u0440. \u041c\u0443\u0436."
        },
        {
          id: 10,
          name: "\u0421\u043f\u0435\u0446\u043e\u0434\u0435\u0436\u0434\u0430"
        }
      ],
      batch_min: 10,
      batch_max: 20
    }
  ]
})

const currentStep = computed(() => stepsConfig.findIndex(step => route.path.includes(step.route))) // Текущий активный шаг
const completedSteps = computed(() => [...Array(currentStep.value).keys()]); // Завершенные шаги

const handleSubmit = (value, form) => {
  console.log(value)
  switch (currentStep.value) {
    case 0:
      router.push('/performer-register/step2')
      break;
    case 1:
      router.push('/performer-register/step3')
      break;
  }
}

</script>

<style lang="scss">

.performer-register-layout {
  font-size: 1rem;

  &__steps {
    margin-top: 6.4em;

    &_type_mobile {
      display: none;

      @include mobile {
        display: flex;
        margin-top: 0;
      }
    }

    &_type_desktop {

      @include mobile {
        display: none;
      }
    }
  }

  &__title {
    font-size: 3.2em;
    font-weight: 400;
    line-height: 0.75em;
    color: #000;
    margin-bottom: 1.15em;

    @include mobile {
      font-size: 2em;
      margin-bottom: 1em;
    }
  }

  &__btn-container {
    display: flex;
    column-gap: 1em;
    margin-top: 3em;
    justify-content: right;
  }

  &__btn {
    width: auto;
    font-size: 1.2em;
    text-transform: uppercase;
  }

  .register-container {

    .register__text {
      font-size: 1.3em;
      margin-bottom: 1.46em;
    }

    .register__subtitle {
      font-size: 2.8em;
      margin-bottom: 0.66em;
    }

    .register__btn-container {
      justify-content: flex-end;

      &_type_submit {
        justify-content: flex-start;

        .register__btn {
          flex-basis: 50%;
        }
      }
    }

    .register__btn {
      flex: 0 1 25%;
      text-transform: uppercase;

      svg {
        display: none;
      }
    }
  }

  &__notify {
    &_type_mobile {
      display: none;

      @include tablet {
        display: flex;
      }
    }
  }

  .register__subtitle {
    display: none;
  }

  .register__text {
    display: none;
  }

  .register__step-one {
    background-color: #fff;
    padding: 2.4em;
    border-radius: 20px;

    .register__label_type_location {

        .form-group__title {
          font-size: 1.4rem;
          font-weight: 600;
          color: #000;
          margin-bottom: 2em;
        }
    }

    .register__checkbox {
      margin-bottom: 3em;
    }

    .select__select {
      border-radius: 8px;
      border: 1px solid #d9dae1;
      padding: 1.4rem;
      color: var(--text-color-primary);
    }

    .form-group {
      margin-bottom: 1.5em;
      color: var(--text-color-primary);


      .form-group__title {
        font-size: 1.4rem;
        font-weight: 600;
        color: #000;
        margin-bottom: .6em;
      }

      .input-container {
        border-radius: 8px;
        border: 1px solid #d9dae1;
        flex-direction: row-reverse;
        padding: 1.4rem;
      }

      .input__field {
        color: var(--text-color-primary);
      }

      @include mobile {
        margin-bottom: 1.5em;

        .form-group-data:not(:last-child) {
          margin-bottom: 1.5rem;
        }

        .form-group-data:last-child {
          margin-bottom: 0;
        }
      }
    }

    .register__input-inn {
      .input-container {
        border-radius: 8px 0 0 8px;
        
      }

      .register__search-btn {
        height: 100%;
        max-height: 48px;
        border-radius: 0 8px 8px 0;
      }
    }

    .register__subtitle {
      display: block;
      font-weight: 400;
      font-size: 2em;
      line-height: 1.3em;
      color: #000;
    }

    .register__text {
      display: block;
      font-weight: 400;
      font-size: 1.6em;
      line-height: 1.5em;
      color: #8387a3;
    }
  }
}

</style>
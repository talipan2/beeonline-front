
<template>
  <section class="register container" :class="{register_type_performer: userStore.role === 'performer'}">
    <div class="register__container">
      <CommonCheckListStep
        v-if="userStore.role === 'performer'"
        class="register__checklist register__checklist_type_left-side sticky"
        :steps="stepCheckList"
        :current-step="currentStep"
        ref="leftSide" 
      />
      <CommonCheckList
        v-else
        class="register__checklist register__checklist_type_left-side sticky" 
        ref="leftSide" 
        title="Заполнение профиля" 
        :checkList="checkList" 
        adviceTitle="Полностью заполненный профиль выше в списке поиска"
        value-check
        type="checkStage"
      />
      <div class="register__main">
        <RegisterDefaultRegisterComponent/>
      </div>
      <div class="register__right-side" >
        <div class="register__right-side-container sticky" ref="rightSide">
          <!-- <CommonCheckList 
            class="register__checklist register__checklist_type_right-side sticky" 
            ref="leftSide" title="Заполнение профиля" 
            :checkList="checkList" 
            adviceTitle="Полностью заполненный профиль выше в списке поиска"
          /> -->
          <CommonAdvice class="register__advice">
            <p class="advice__text">ИНН используется в нашем сервисе:</p>
            <ul>
              <li>для автоматического заполнения вашего профиля</li>
              <li>для вывода вашей компании на карте</li>
              <li>для формирования платежных документов</li>
              <li>и наконец вы получаете галочку верифицированного пользователя, что повышает вас в поиске</li>
            </ul>
          </CommonAdvice>
        </div>
      </div>
    </div>
    <Alerts />
  </section>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';
import { useUserStore } from '~/store/userStore';

definePageMeta({
  middleware: 'telegram' 
});

const settingStore = useSettingStore();
const userStore = useUserStore();
const route = useRoute();

const rightSide = ref(null);
const leftSide = ref(null);

const checkList = [
  {label: 'Регистрационные данные', value: '/register'},
  {label: 'Данные организации', value: '/register/step1'},
  {label: 'Карточка организации', value: '/register/step2'},
  {label: 'Города фактического производства', value: '/register/step3'},
  {label: 'Проверка', value: '/register/step4'}
]

const stepCheckList = ref([
  { id: 1, title: 'Регистрационные данные', route: '/register'},
  { id: 2, title: 'Данные организации', route: '/step1', },
  { id: 3, title: 'Карточка', route: '/step2', },
  { id: 4, title: 'Услуги', route: '/step3', },
  { id: 5, title: 'Галерея', route: '/step4', },
])

const stepsConfig = ref([
  {id: 0, title: 'Регистрационные данные', route: '/register'},
  {id: 1, title: 'Данные организации', route: '/step1',},
  { id: 2, title: 'Карточка', route: '/step2',},
  { id: 3, title: 'Услуги', route: '/step3',},
  { id: 4, route: '/step4', },
])
const currentStep = computed(() => stepsConfig.value.findIndex(step => route.path.includes(step.route))) // Текущий активный шаг


const onScrollPage = () => {
  if (rightSide.value) {
    rightSide.value.style.top = `${settingStore.headerHeight + 70}px`;
    leftSide.value.$el.style.top = `${settingStore.headerHeight + 70}px`;
  } else {
    console.log('Element not found');
  }
}

onMounted(() => {
  onScrollPage();
  window.addEventListener("scroll", onScrollPage)
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScrollPage)
});

const userRole = computed(() => {
  if(userStore.role === 'customer') {
    return 'заказчика';
  } else if(userStore.role === 'performer') {
    return 'исполнителя';
  }
})

useHead({
  title: userRole,
  titleTemplate: 'Регистрация %s',
  meta: [
    {
      name: 'description',
      content: '',
    },
  ],
});

</script>

<style lang="scss">
.register {
  padding-block: 10em;
  position: relative;
}


.register__container {
    display: flex;
    justify-content: space-between;
    column-gap: 14.2em;
  }
  
  .register__main {
    flex: 1 1 100%;
  }

  .register__title {
    font-size: 3.2em;
    margin-bottom: 1.71em;
  }

  .register__subtitle {
    font-size: 3em;
    margin-bottom: .66em;
  }

  .register__text {
    font-size: 1.3em;
    margin-bottom: 1.46em;
  }

  .register__right-side {
    flex: 1 0 40em;
  }

  .register__label {
    font-size: 1.3em;
    flex: 1 0 40%;
  }

  .register__checkbox {
    margin-bottom: 3.6em;
  }

  .register__btn {
    column-gap: .71em;
    max-width: 55%;
    text-transform: uppercase;
    justify-content: center;  
    margin-bottom: 2.85em;
    font-size: 1.4rem;

    svg {
      path {
        fill: #fff;
      }
    }
  }

  .register__checklist, .register__advice {
    margin-top: 7em;
  }

  .register__btn_type_secondary {
    width: 100%;
    max-width: 66%;
    
    svg {
      margin: 0;
    }
  }

  .register__checklist, .register__advice {
    margin-top: 7em;
  }

.register__checklist {
  // max-width: 25.5em;
  flex: 1 0 25.5em;
}

.register__advice {
  max-width: 40em;
  height: fit-content;

  .advice__text {
    margin-bottom: 1.8em;
  }
}


@media screen and (max-width: 1500px) {
  .register {
    &__container {
      column-gap: 5em;
    }
  }
}

@include small-tablet {
  .register {
    &__container {
      column-gap: 5em;
      max-width: var(--tablet-content-width);
      margin-inline: auto;
    }


    &__container {
      flex-direction: column;
    }

    &__btn-container {
      flex-direction: column;
    }

    &__checklist {
      display: none;
    }

    &__advice {
      margin-top: 1em;
    }

    &__right-side {
      flex-basis: auto;
    }
  }
}

@include mobile {
  .register {
    padding-block: 3.5rem 9rem;
    max-width: var(--mobile-content-width);

    // &__container {
    //   flex-direction: column;
    // }

    // &__btn-container {
    //   flex-direction: column;
    // }

    // &__checklist {
    //   display: none;
    // }

    // &__advice {
    //   margin-top: 1em;
    // }

    // &__right-side {
    //   flex-basis: auto;
    // }

    &__btn {
      font-size: 12px;
      max-width: none;
      width: 100%;
      padding: 9px;
      margin-bottom: 1em;
    }

    &__checkbox {
      margin-bottom: 0;
    }

    &__title {
      font-size: 2rem;
    }

    &__subtitle {
      font-size: 1.6rem;
    }

    &__text {
      font-size: 1.3rem;
    }
  }
}

.register {
  &_type_performer {
    .checklist__header {
      display: none;
    }

    .checklist__advice {
      display: none;
    }

    .checklist__collapse {
      display: none;
    }

    .register__container {
      column-gap: 10em;

      @media screen and (max-width: 1500px) {
        column-gap: 5em;
        
      }

      @include tablet {
      }
    }

    .register__right-side {
      flex-basis: 30em;
    }

    .register__subtitle {
      display: none;
    }

    .register__text {
      display: none;
    }

    .register__title {
      margin-bottom: 1.3em;
    }

    .register__form-container {
      background-color: #fff;
      padding: 2.4em;
      border-radius: 20px;
      margin-bottom: 2.4em;

      .form-group__title {
        font-size: 1.4rem;
        font-weight: 600;
        color: #000;
        margin-bottom: .6em;
      }

        .form-group__value {
          margin-top: 0;
          input {
            color: var(--text-color-primary);
          }
        }

      .input-container {
        border-radius: 8px;
        border: 1px solid #d9dae1;
        flex-direction: row-reverse;
        padding: 1.4rem;
        margin-top: .6em;
    
        svg {
          margin-right: 8px;
        }
      }
    }

    .register__checkbox {
      margin-bottom: 0;
    }

    .register__btn {
      font-size: 1.2em;
      width: auto;
      margin-left: auto;

      svg {
        width: 2em;
        height: 2em;
      }
    }
  }
}

</style>
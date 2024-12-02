<template>
  <section class="register container">
    <div class="register__container">
      <CommonCheckList class="register__checklist sticky" ref="leftSide" title="Заполнение профиля" :checkList="checkList" adviceTitle="Полностью заполненный профиль выше в списке поиска" />
      <div class="register__main">
        <component :is="currentComponent" :data="organizationStore.registerOrg" :blockTitle="blockTitle"/>
      </div>
      <div class="register__right-side">
        <div class="register__right-side-container sticky" ref="rightSide">
          <div class="register__preview" v-if="['/register/step2', '/register/step4'].includes(route.path)">
            <h4 class="register__preview-title">Так вашу компанию будут видеть другие участники</h4>
            <CardsPublic :data="checkListCard"/>
          </div>
          <CommonAdvice class="register__advice sticky" v-else>
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
  </section>
</template>

<script setup>
import defaultRegisterComponent from '~/components/register/defaultRegisterComponent.vue';
import registerStep1 from '~/components/register/step1.vue';
import registerStep2 from '~/components/register/step2.vue';
import registerStep3  from '~/components/register/step3.vue';
import registerStep4  from '~/components/register/step4.vue';

import { useRoute } from '#app';
import { useOrganizationStore } from '~/store/organizationStore';
import { useSettingStore } from '~/store/settingStore';
import { useUserStore } from '~/store/userStore';

const route = useRoute();
const organizationStore = useOrganizationStore();
const settingStore = useSettingStore();
const userStore = useUserStore();

const blockTitle = computed(() => {
  const titles = {
    customer: 'Регистрация заказчика',
    performer: 'Регистрация исполнителя'
  };
  return titles[userStore.role] || 'Регистрация';
});

const currentComponent = computed(() => {
  switch (route.path) {
    case '/register/step1':
      return registerStep1
    case '/register/step2':
      return registerStep2
    case '/register/step3':
      return registerStep3
    case '/register/step4':
      return registerStep4
    default:
      return registerStep1
  }
})

const checkList = [
  {label: 'Регистрационные данные', value: '/register'},
  {label: 'Данные организации', value: '/register/step1'},
  {label: 'Карточка организации', value: '/register/step2'},
  {label: 'Города фактического производства', value: '/register/step3'},
  {label: 'Проверка', value: '/register/step4'}
]

const rightSide = ref(null);
const leftSide = ref(null);

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

const checkListCard = computed(() => {
  return {
    name: organizationStore.registerOrg.companyName,
  }
})

</script>

<style lang="scss">
.register {
  padding-block: 10em;

  // .form-group-data {
  //   margin-top: 0;
  //   margin-bottom: 1em;
  // }

  // .form-group__title {
  //   font-family: 'lato', sans-serif;
  //   margin-bottom: .4em;
  // }

  // .form-group__value {
  //   margin-top: .3em;
  // }

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

  // .register__input-list {
  //   display: flex;
  //   column-gap: 3em;
  //   row-gap: 1em;
  //   flex-wrap: wrap;
  //   margin-bottom: 1em;
  // }

  // &__input {
  //   margin-top: 0.31em;
  // }

  .register__label {
    font-size: 1.3em;
    flex: 1 0 45%;
    display: flex;
    flex-direction: column;
    row-gap: .38em;
    line-height: 1em;
    color: var(--text-color-secondary);
  }

  .register__checkbox {
    margin-bottom: 3.6em;
  }

  .register__btn {
    column-gap: .71em;
    max-width: 55%;
    text-transform: uppercase;
    font-size: 1.2em;
    justify-content: center;  
    margin-bottom: 2.85em;
    line-height: 1em;

    svg {
      path {
        fill: #fff;
      }
    }
  }

  .register__checklist, .register__advice {
    margin-top: 7em;
  }

  .register__soc-divider {
    display: flex;
    align-items: center;
    margin-bottom: 2.1em;


    &::before, &::after {
      content: "";
      display: block;
      flex: 1 1 100%;
      height: 1px;
      background-color: #F0F0F0;
      width: 100%;
    }

    p {
      white-space: nowrap;
      font-size: 1.2em;
    }

  }

  .register__soc-text{
    font-size: 1.3em;
    text-align: center;
  }

  
  .register__soc-links {
    padding-block: 1em;
    margin-bottom: 3em;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 1em;

    svg {
      border-radius: 3em;
    }
    
    a:hover {
      svg {
        box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.3);
      }

    }
    
  }

  .register__right-side {
    flex: 1 0 40em;
  }


  .register__preview-title {
    font-size: 2.4em;
    margin-bottom: 0.83em;
    margin-top: 4.16em;
  }

.register__checklist {
  max-width: 25.5em;
}



@media (min-width: 768px) {
    .checklist__header-right {
        display: none;
    }
}

@media (max-width: 767px) {
    .checklist__collapse {
        display: none;
    }
}

.register__checklist {
  max-width: 25.5em;
  flex: 1 0 25.5em;
}

.register__advice {
  max-width: 40em;
  height: fit-content;

  .advice__text {
    margin-bottom: 1.8em;
  }
}


</style>
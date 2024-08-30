<template>
  <section class="register container">
    <div class="register__container">
      <RegisterCheckList class="register__checklist sticky" ref="leftSide" />
      <div class="register__main">
        <component :is="currentComponent" />
      </div>
      <div class="register__right-side">
        <div class="register__right-side-container sticky" ref="rightSide">
          <div class="register__preview" v-if="route.path === '/register/step2' || route.path === '/register/step4'">
            <h4 class="register__preview-title">Так вашу компанию будут видеть другие участники</h4>
            <div class="card">
              <h5 class="card__title">{{ organizationStore.registerOrg.companyName || 'Название компании' }}</h5>
              <div class="card__content">
                <div class="card__image">
                  <img class="" :src="organizationStore.registerOrg.companyLogo || defaultCompanyLogo" alt="">
                </div>
                <div class="card__details">
                  <div class="card__details-container">
                    <span class="rate"></span>
                    <p>(0 отзывов)</p>
                  </div>
                  <div class="card__details-container">
                    <i class="flag flag_round" :class="selectFlag(organizationStore.registerOrg.location)"></i>
                    <p>{{ selectRegion(organizationStore.registerOrg.location) }}</p>
                  </div>
                  <div class="card__details-container">
                    <SvgoCase class="svg-m" fill="#C4C4C4" />
                    <p>Нет услуг</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Advice class="register__advice sticky" v-else>
            <p class="advice__text">ИНН используется в нашем сервисе:</p>
            <ul>
              <li>для автоматического заполнения вашего профиля</li>
              <li>для вывода вашей компании на карте</li>
              <li>для формирования платежных документов</li>
              <li>и наконец вы получаете галочку верифицированного пользователя, что повышает вас в поиске</li>
            </ul>
          </Advice>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import defaultRegisterComponent from '~/components/register/defaultRegisterComponent.vue';
import registerStep1Vue from '~/components/register/step1.vue';
import registerStep2 from '~/components/register/step2.vue';
import registerStep3  from '~/components/register/step3.vue';
import registerStep4  from '~/components/register/step4.vue';
import defaultCompanyLogo from '@/assets/images/nophoto_pc.png';
import selectFlag from '~/utils/selectFlag';
import selectRegion from '~/utils/selectRegion';

import { useRoute } from '#app';
import { useOrganizationStore } from '~/store/organizationStore';
import { useSettingStore } from '~/store/settingStore';

const route = useRoute();
const organizationStore = useOrganizationStore();
const settingStore = useSettingStore();

const currentComponent = computed(() => {
  switch (route.path) {
    case '/register/step1':
      return registerStep1Vue
    case '/register/step2':
      return registerStep2
    case '/register/step3':
      return registerStep3
    case '/register/step4':
      return registerStep4
    default:
      return defaultRegisterComponent
  }
})

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



</script>

<style lang="scss">
.register {
  &__container {
    display: flex;
    justify-content: space-between;
    column-gap: 14.2em;
  }
  
  &__main {
    flex: 1 1 100%;
  }

  &__title {
    font-size: 3.2em;
    margin-bottom: 1.71em;
  }

  &__subtitle {
    font-size: 3em;
    margin-bottom: .66em;
  }

  &__text {
    font-size: 1.3em;
    margin-bottom: 1.46em;
  }

  &__input-list {
    display: flex;
    column-gap: 3em;
    row-gap: 1em;
    flex-wrap: wrap;
    margin-bottom: 1em;
  }

  // &__input {
  //   margin-top: 0.31em;
  // }

  &__label {
    font-size: 1.3em;
    flex: 1 0 45%;
    display: flex;
    flex-direction: column;
    row-gap: .38em;
    line-height: 1em;
    color: var(--text-color-secondary);
  }

  &__checkbox {
    margin-bottom: 3.6em;
  }

  &__btn {
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

  &__checklist, &__advice {
    margin-top: 7em;
  }

  &__soc-divider {
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

  &__soc-text{
    font-size: 1.3em;
    text-align: center;
  }

  
  &__soc-links {
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

  &__right-side {
    flex: 1 0 40em;
  }


  &__preview-title {
    font-size: 2.4em;
    margin-bottom: 0.83em;
    margin-top: 4.16em;
  }


}

.card {
  padding: 2em;
  box-shadow: -2px -2px 0 #6937a5, 0 1px 1px rgba(0, 0, 0, 0.15);
  background-color: var(--bg-secondary-color);
  &__title {
    font-size: 1.8em;
    margin-bottom: 0.83em;
    padding-bottom: 0.83em;
    border-bottom: 1px solid #C4C4C4;
  }

  &__content {
    display: flex;
    column-gap: 2em;
  }

  &__image {
    flex: 0 0 10.8em;
    border: 1px solid #D9D9D9;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 10.8em;
    height: 10.8em;

    img {
      object-fit: cover;
      height: 100%;
    }
  }

  &__details {
    display: flex;
    flex-direction: column;
    row-gap: .4em;
  }

  &__details-container {
    display: flex;
    column-gap: 1em;
    align-items: center;
    font-size: 1.2em;
  }
}

.rate {
  display: inline-flex;
    position: relative;
    width: 8em;
    height: 1.6em;
    font-size: 10px;
    flex-shrink: 0;
}

.rate:before, .rate:after {
    content: "";
    height: 100%;
    background: url(~/assets/svg/stars.svg);
    background-size: 1.6em;
}

.rate:before {
    background-position: 0 100%;
}

.rate:after {
    background-position: 100% 0;
    flex: 1 1 auto;
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
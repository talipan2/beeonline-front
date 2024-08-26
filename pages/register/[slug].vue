<template>
  <section class="register container">
    <div class="register__container">
      <RegisterCheckList class="register__checklist" />
      <div class="register__main">
        <component :is="currentComponent" />
      </div>
      <div class="register__right-side">
        <div class="register__preview" v-if="route.path === '/register/step2' || route.path === '/register/step4'">
          <h4 class="register__preview-title">Так вашу компанию будут видеть другие участники</h4>
          <div class="card">
            <h5 class="card__title">Компания</h5>
            <div class="card__content">
              <div class="card__image">
                <img class="" src="~/assets/images/nophoto_pc.png" alt="">
              </div>
              <div class="card__details">
                <div class="card__details-container">
                  <span class="rate"></span>
                  <p>(0 отзывов)</p>
                </div>
                <div class="card__details-container">
                  <SvgoRuIcon class="svg-m flag" />
                  <p>Россия</p>
                </div>
                <div class="card__details-container">
                  <SvgoCase class="svg-m" fill="#C4C4C4"/>
                  <p>нет услуг</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Advice class="register__advice" v-else>
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
  </section>
</template>

<script setup>


import defaultRegisterComponent from '~/components/register/defaultRegisterComponent.vue';
import registerStep1Vue from '~/components/register/step1.vue';
import registerStep2 from '~/components/register/step2.vue';
import registerStep3  from '~/components/register/step3.vue';
import registerStep4  from '~/components/register/step4.vue';

import { useRoute } from '#app';

const route = useRoute();

const cardTitle = ref('Компания')

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

</script>

<style lang="scss">
.register {
  margin-block: 10em;

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

  &__input {
    margin-top: 0.31em;
  }

  &__label {
    font-size: 1.3em;
    flex: 1 0 45%;
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
  &__title {
    font-size: 1.8em;
    margin-bottom: 0.83em;
    padding-bottom: 0.83em;
    border-bottom: 1px solid #C4C4C4;
  }

  &__content {
    display: flex;
  }

  &__image {
    flex: 0 0 30%;
  }

  &__details-container {
    display: flex;
    column-gap: 1em;
    align-items: center;
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

.checklist__header {
  display: flex;
}

.checklist__header-left {
    flex: 1 1 auto;
}

.checklist__header-right {
    display: flex;
    flex: 0 1 auto;
    margin-bottom: 5px;
    margin-left: 2em;
}

.checklist__toggle {
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3em;
    height: 3em;
    color: #6937a5;
    background-color: #FFF;
    border: 1px solid #6937a5;
    text-decoration: none;
    border-radius: 3em;
}

.checklist__toggle:hover {
    color: #6937a5;
    text-decoration: none;
}

.checklist__toggle i {
    transform: rotate(-90deg);
    transition: transform .2s ease-in-out;
}

.checklist__toggle.active i {
    transform: rotate(90deg);
}

.checklist__head {
    display: flex;
    align-items: center;
}

.checklist__title {
    font-size: 1.6em;
    margin-right: .5em;
}

.checklist__status {
    font-size: 1.2em;
    color: #EF3520;
    margin-left: auto;
}

.checklist_50 .checklist__status {
    color: #FBBC05;
}

.checklist_80 .checklist__status {
    color: #BCBF2F;
}

.checklist_100 .checklist__status {
    color: #6DBF2F;
}


.checklist__progress {
    display: flex;
    margin: 1em -.3em 2em;
}

.checklist__progress > div {
    flex-basis: 0;
    flex-grow: 1;
    max-width: 100%;
    padding: 0 .3em;
}

.checklist__progress > div:before {
    content: "";
    display: block;
    background-color: #D9D9D9;
    height: .8em;
}

.checklist__progress > div.active:before {
    background-color: #EF3520;
}

.checklist_50 .checklist__progress > div.active:before {
    background-color: #FBBC05;
}

.checklist_80 .checklist__progress > div.active:before {
    background-color: #BCBF2F;
}

.checklist_100 .checklist__progress > div.active:before {
    background-color: #6DBF2F;
}

.checklist__advice {
  font-size: 1em;
}

.checklist__steps {
    list-style: none;
    padding: 0 0 1px;
    margin: 0;
    margin-top: 5em;
    font-weight: 400;
}

.checklist__step {
    position: relative;
    font-size: 1.6em;
    padding-left: 1.875em;
    margin-bottom: .75em;
    line-height: 1em;
}

.checklist__step_title {
    font-weight: 500;
}

.checklist__step:before {
    content: "";
    position: absolute;
    font-size: 1.25em;
    top: -.1em;
    left: 0;
    width: 1em; height: 1em;
    background: no-repeat center/contain;
}

.checklist__step_passed:before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='none'%3E%3Cpath d='M16 5.334l-7.119 8L4 8.593' stroke='%236dbf2f' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
}

.checklist__step_current:before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='%23d52b1e'%3E%3Ccircle cx='5' cy='10' r='1'/%3E%3Ccircle cx='15' cy='10' r='1'/%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3C/svg%3E");
}

.checklist__step_crossed:before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='none'%3E%3Cpath d='M5 5L15 15M5 15L15 5' stroke='%23de5434' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E%0A");
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

.register__advice {
  max-width: 40em;

  .advice__text {
    margin-bottom: 1.8em;
  }
}


</style>
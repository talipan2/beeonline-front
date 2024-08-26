
<template>
  <section class="register container">
    <div class="register__container">
      <RegisterCheckList class="register__checklist" />
      <div class="register__main">
        <RegisterDefaultRegisterComponent />
      </div>
      <div class="register__right-side">
        <div class="register__preview" v-if="route.path === '/register/step2'">
          <h4>Так вашу компанию будут видеть другие участники</h4>
          <div class="card">
            <h5 class="card__title">Компания</h5>
            <div class="card__content">
              <img class="card__image" src="~/assets/images/nophoto_pc.png" alt="">
              <div class="card__details">
                <p>0 отзывов</p>
                <p>Россия</p>
                <p>нет услуг</p>
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

import { useRoute } from '#app';

const route = useRoute();

const currentComponent = computed(() => {
  switch (route.path) {
    case '/register/step1':
      return registerStep1Vue
    case '/register/step2':
      return Step2Component
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
    flex: 1 0 40%;
  }

  &__checkbox {
    margin-bottom: 3.6em;
  }

  &__btn {
    column-gap: .71em;
    max-width: 55%;
    text-transform: uppercase;
    font-size: 1.4em;
    justify-content: center;  
    margin-bottom: 2.85em;

    svg {
      path {
        fill: #fff;
      }
    }
  }

  &__checklist, &__advice {
    margin-top: 7em;
  }

  

}

.register__checklist {
  max-width: 25.5em;
  flex: 1 0 25.5em;
}

.register__advice {
  max-width: 40em;

  .advice__text {
    margin-bottom: 1.8em;
  }
}


</style>
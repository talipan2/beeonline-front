<template>
  <TariffsCardLayout class="international-tariffs">
    <div class="international-tariffs__body">
      <div class="international-tariffs__header">
        <h3 class="international-tariffs__title">Международный</h3>
        <p class="international-tariffs__month">12 месяцев</p>
        <p class="international-tariffs__price">2 500 $</p>
      </div>
      <div class="international-tariffs__possibilities">
        <ul class="international-tariffs__list">
          <li class="international-tariffs__item" v-for="item in possibilitiesList[0]" :key="item">
            <div class="international-tariffs__item-icon">
              <SvgoChecked class="svg-m"/>
            </div>
            <p class="international-tariffs__item-text">{{ item }}</p>
          </li>
        </ul>
        <ul class="international-tariffs__list">
          <li class="international-tariffs__item" v-for="item in possibilitiesList[1]" :key="item">
            <div class="international-tariffs__item-icon">
              <SvgoChecked class="svg-m"/>
            </div>
            <p class="international-tariffs__item-text">{{ item }}</p>
          </li>
        </ul>
      </div>
      <UiButton type="button" class="international-tariffs__btn" variant="quinary" size="large" @click="handleOpenPayModal">Подключить</UiButton>
    </div>
  </TariffsCardLayout>
  <TariffsMobileCards 
    class="international-card" 
    :tariff="internationalTariff"  
    :price="internationalTariff.price" 
    :feature="possibilitiesListMobile" 
    currency="USD" 
    duration="12 месяцев"
    @handlePay="handleOpenPayModal"
  />
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';


const settingStore = useSettingStore();
const emit = defineEmits(['select']);

const internationalTariff = {
  title: 'Международный',
  value: 'international',
  price: 2500,
}

const possibilitiesList = [
  [
    'Мониторинг заказов',
    'Персональный менеджер (проф. оформление публичной карты и создание услуг)',
    'Доступ к контактам заказчика',
    'Приоритетная отправка уведомлений о новых заказах в личный кабинет на сайте, почта\телеграм',
    'Приоритетная отправка откликов',
    'Выделение отклика исполнителя в чате заказчика',
    'Размещение в начале диалогов заказчика',
  ],
  [
    'Закрепление интересующих чатов',
    'Проверенный исполнитель галочка, заказчик может бесплатно посмотреть отчет о компании',
    'Выделение карточки исполнителя в каталоге исполнителей',
    'Размещение карточки в слайдере на первой странице каталога услуг',
    'Поднятие карточки исполнителя в топ (не более 1 услуги в день)',
    'Сервис проверки контрагента'
  ]
]

const possibilitiesListMobile = [
    {
      feature: 'Мониторинг заказов',
      value: true,
    },
    {
      feature: 'Персональный менеджер (проф. оформление публичной карты и создание услуг)',
      value: true,
    },
    {
      feature: 'Доступ к контактам заказчика',
      value: true,
    },
    {
      feature: 'Приоритетная отправка уведомлений о новых заказах в личный кабинет на сайте, почта\телеграм',
      value: 'Мгновенно',
    },
    {
      feature: 'Приоритетная отправка откликов',
      value: 'Мгновенно',
    },
    {
      feature: 'Трекинг производства (Вы сможете уведомлять заказчика об этапах производства, аналог отслеживания заказа)',
      value: true,
    },
    {
      feature: 'Выделение отклика исполнителя в чате заказчика',
      value: true,
    },
    {
      feature: 'Размещение в начале диалогов заказчика',
      value: true,
    },
    {
      feature: 'Закрепление интересующих чатов',
      value: true,
    },
    {
      feature: "Проверенный исполнитель галочка, заказчик может бесплатно посмотреть отчет о компании",
      value: true,
    },
    {
      feature: 'Выделение карточки исполнителя в каталоге исполнителей',
      value: true,
    },
    {
      feature: 'Размещение карточки в слайдере на первой странице каталога услуг',
      value: true,
    },
    {
      feature: 'Поднятие карточки исполнителя в топ (не более 1 услуги в день)',
      value: '7 раз'
    },
    {
      feature: 'Сервис проверки контрагента',
      value: '7 проверок'
    }
]


const handleOpenPayModal = () => {
  emit('select', internationalTariff, internationalTariff.price, 'USD');
  settingStore.payModalStatus = true;
}

</script>

<style lang="scss">

.international-tariffs {
  font-size: 1rem;
  
  &__body {
    display: flex;
    column-gap: 6.4em;
  }
  &__header {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  &__title {
    font-size: 1.6em;
    font-weight: 700;
  }

  &__month {
    font-size: 1.6em;
    font-weight: 500;
    color: #989898;
  }

  &__price {
    font-size: 2.4em;
    font-weight: 700;
    line-height: 1.3em;
    color: #6937a5;
  }

  &__possibilities {
    flex: 0 1 66%;
    display: flex;
    gap: 2rem;
  }
  &__list {
    font-size: 1.6em;
    line-height: 1.3em;
    display: flex;
    flex-direction: column;
    row-gap: 1em;
  }

  &__item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }

  &__item-icon {
    flex: 0 0 1.25em;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.25em;
    height: 1.25em;
    background-color: #6937a5;
    border-radius: 100%;

    svg {
      width: 1em;
    }

    path {
      stroke: #fff;
    }

  }
  &__btn {
    flex: 0 1 12%;
    font-size: 1.2em;
    text-transform: uppercase;
    width: 100%;
    height: fit-content;
  }


  @include small-tablet {
    &__body {
      column-gap: 2.4rem;
    }
  }

  @include mobile {
    display: none;
  }
}

.international-card {
  display: none;

  @include mobile {
    display: block;
  }
}

</style>
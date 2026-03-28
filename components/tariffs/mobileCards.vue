<template>
  <div class="tariff-card">
    <div class="tariff-card__header">
      <div>
        <h3 class="tariff-card__title">{{ tariff.name }}</h3>
        <p class="tariff-card__subtitle" v-if="getTariffDescription(tariff.code)">{{ getTariffDescription(tariff.code) }}</p>
      </div>
      <p class="tariff-card__duration">{{ duration }} {{ plural(duration, {one: 'месяц', few: 'месяца', many: 'месяцев'}) }}</p>
    </div>
    <p class="tariff-card__price tariff-card__price_type_full" v-if="discount && !isFreeCode(tariff.code)">Итого: {{ formatMoney(price * 100 / (100 - discount), currency, 0) }}</p>
    <p class="tariff-card__discount" v-if="discount && !isFreeCode(tariff.code)">Скидка: {{ `-${discount}% (-${getDiscount(price, discount)})`}}</p>
    <p class="tariff-card__price">Итого к оплате: {{ formatMoney(price, currency, 0) }}</p>
    <ul class="tariff-card__list">
      <li class="tariff-card__item" v-for="item in feature" :key="item">
        <div class="tariff-card__item-icon">
          <SvgoChecked class="svg-m"/>
        </div>
        <p class="tariff-card__item-text">
          {{ item.name }}<br>
          <span class="tariff-card__item-value">
            {{ formatDescription(serviceInTariff(item, tariff.id)) }}
          </span>
        </p>
      </li>
    </ul>
    <UiButton v-if="!isFreeCode(tariff.code)" type="button" @click="$emit('handlePay')" class="tariff-card__btn" variant="quinary" size="large">Подключить</UiButton>
  </div>
</template>

<script setup>

const props = defineProps({
  tariff: {
    type: Object,
    required: true
  },
  feature: {
    type: Array,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    default: '',
  },
  discount: {
    type: Number,
    default: 0,
  }
});

const TARIFF_DESCRIPTIONS = {
  trial:   'Тест платформы и первые диалоги',
  premium: 'Быстрые отклики и мгновенные уведомления',
  ultra:   'Видимость + входящие клиенты',
  maximum: 'Максимальный приоритет',
};

function getTariffDescription(code) {
  return TARIFF_DESCRIPTIONS[code] ?? '';
}

function isFreeCode(code) {
  return code === 'free';
}

function getDiscount(price, discount) {
  const originalAmount = price / (1 - discount / 100);
  const discountAmount = originalAmount * (discount / 100)
  return formatMoney(discountAmount, props.currency, 0);
}

function formatDescription({ description, quantity }, locale = 'ru-RU') {
  if (!description) return null;

  const subDuration = props.duration || 1;
  quantity *= subDuration;

  const parts = description.split('|');

  if (parts.length === 1) {
    return parts[0]; // без форм — просто описание
  }

  const [one, few, many] = parts;
  const variants = { one, few, many };

  return `${quantity} ${plural(quantity, variants, locale)}`;
}

function serviceInTariff(service, tariff_id) {
	return service.tariffs.find(tariff => tariff.id === tariff_id);
}

</script>

<style lang="scss">

.tariff-card {
  font-size: 1rem;
  padding: 2em 1.6em;
  border-radius: 16px;
  background-color: #fff;

  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__title {
    font-family: 'lato', sans-serif;
    font-size: 1.6em;
    font-weight: 700;
    margin-bottom: .3em;
  }

  &__subtitle {
    font-size: 1.2em;
    font-weight: 400;
    line-height: 1.4em;
    color: #989898;
    margin-bottom: .7em;
  }

  &__duration {
    font-size: 1.6em;
    font-weight: 500;
    line-height: 1.5em;
    color: #989898;
  }

  &__price {
    font-family: 'fira-sans', sans-serif;
    font-size: 2em;
    font-weight: 700;
    line-height: 1.4em;
    color: #6937a5;
    margin-bottom: 1.6em;

    &_type_full {
      margin-bottom: .3em;
    }
  }

  &__discount {
    font-size: 1.4em;
    font-weight: 700;
    line-height: 1.4em;
    color: #de5434;
    margin-bottom: .5em;
  }

  &__list {
    display: flex;
    font-size: 1.6em;
    flex-direction: column;
    row-gap: 1em;
    margin-bottom: 2em;
  }

  &__item {
    display: flex;
    column-gap: .5em;
  }

  &__item-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.25em;
    height: 1.25em;
    background-color: #6937a5;
    border-radius: 100%;

    svg {
      width: 1em;
      path {
        stroke: #fff;
      }
    }
  }

  &__item-text {
    flex: 1 1 auto;
    font-size: .875em;
    font-weight: 500;
    line-height: 1.42em;
  }

  &__item-value {
    color: #989898;
  }

  &__btn {
    font-size: 1.2em;
    text-transform: uppercase;
    max-width: 20em;
    width: 100%;
    margin-inline: auto;
  }
}

</style>

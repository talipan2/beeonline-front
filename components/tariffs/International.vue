<template>
  <template v-for="tariff in tariffs" :key="tariff">
    <TariffsCardLayout class="international-tariffs" v-for="price in tariff.prices" :key="price">
      <div class="international-tariffs__body">
        <div class="international-tariffs__header">
          <h3 class="international-tariffs__title">{{tariff.name}}</h3>
          <p class="international-tariffs__month">{{ price.quantity }} {{ plural(price.quantity, {one: 'месяц', few: 'месяца', many: 'месяцев'}) }}</p>
          <p class="international-tariffs__price">{{ formatMoney(price.amount, price.currency, 0) }}</p>
        </div>
        <div class="international-tariffs__possibilities">
          <ul class="international-tariffs__list">
            <template v-for="service in services">
                <li class="international-tariffs__item" v-if="serviceInTariff(service, tariff.id)" :key="service">
                <div class="international-tariffs__item-icon">
                    <SvgoChecked class="svg-m"/>
                </div>
                <div>
                    <p class="international-tariffs__item-text">{{ service.name }}</p>
                    <p class="international-tariffs__item-value">{{ formatDescription(serviceInTariff(service, tariff.id), price.quantity) }}</p>
                </div>
                </li>
            </template>
          </ul>
        </div>
        <!-- <UiButton type="button" class="international-tariffs__btn" variant="quinary" size="large" @click="handleOpenPayModal(tariff, price)">Подключить</UiButton> -->
        <UiButton class="international-tariffs__btn" variant="quinary" size="large" to="/support">Написать в поддержку</UiButton>
      </div>
      <TariffsForeignerModal @payFunction="handleOpenPayModal(tariff, price)"/>
    </TariffsCardLayout>
		<template v-for="price in tariff.prices" :key="price">
			<TariffsMobileCards
				class="international-card"
				:tariff="tariff"
				:price="price.amount"
				:feature="getMobileTariffsFeatures(tariff.id)"
				:currency="price.currency"
				:duration="price.quantity"
				@handlePay="handleOpenPayModal(tariff, price)"
			/>
		</template>
  </template>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';
import { useTariffsStore } from '~/store/tariffsStore';


const settingStore = useSettingStore();
const tariffsStore = useTariffsStore();
const emit = defineEmits(['select']);

const tariffs = computed(() => tariffsStore.tariffs);
const services = computed(() => tariffsStore.services?.filter(service => service.tariffs.length));

const handleOpenPayModal = (tariff, price) => {
    emit('select', {...tariff, price: price, currency: price.currency}, price.amount);
  settingStore.payModalStatus = true;
}

function serviceInTariff(service, tariff_id) {
	return service.tariffs.find(tariff => tariff.id === tariff_id);
}

const getMobileTariffsFeatures = (tariff) => {
  const features = [];

  if(services.value.length === 0) return

  services.value.forEach(service => {
    const tariffValue = service.tariffs.find(item => item.id === tariff);
    if(tariffValue) features.push(service);
  })
  return features;
}

function formatDescription({ description, quantity }, subDuration) {
  if (!description) return null;

  quantity *= subDuration;

  const parts = description.split('|');

  if (parts.length === 1) {
    return parts[0]; // без форм — просто описание
  }

  const [one, few, many] = parts;
  const variants = { one, few, many };

  return `${quantity} ${plural(quantity, variants, 'ru-RU')}`;
}

</script>

<style lang="scss">

.international-tariffs {
  font-size: 1rem;
  margin-bottom: 3em;

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
    display: block;
    // columns: 2;
    gap: 1em;
  }

  &__item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1em;

    &-value {
        color: #989898;
    }
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

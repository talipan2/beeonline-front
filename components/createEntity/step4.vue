<template>
  <div class="entity entity_step-check">
    <h1 class="entity__title">{{ entityOfRole === 'services' ? 'Проверка вашей услуги' : 'Проверка вашего заказа' }}</h1>
    <CommonProfileCheckCard :title="entityOfRole === 'services' ? 'Услуга' : 'Заказ'"
      text="Указанные данные не разглашаются третьим лицам, и необходимы для успешной работы на сервисе"
      change-link-label="Изменить" change-link="/services/create" />
    <div class="form-group-data">
      <p class="form-group__title">Заголовок</p>
      <p class="form-group__value">{{ formatData.name || 'не указан' }}</p>
    </div>
    <div class="form-group">
      <div class="form-group-data">
        <p class="form-group__title">Категории</p>
        <p class="form-group__value">
          {{ (formatData.categories && formatData.categories.length > 0) ? formatData.categories[0] : 'не указан' }}
          <ModalsMoreCities 
            :list="formatData.categories" 
            title="Категории" 
            placement="bottom-end" 
            v-if="Array.isArray(formatData.categories) && formatData.categories && formatData.categories.length >= 1"
          />
          </p>
      </div>
      <div class="form-group-data">
        <p class="form-group__title">Место производства</p>
        <p class="form-group__value">
          <i class="flag flag_round" v-if="formatData.placeOfProductionId && formatData.placeOfProductionId[0]" 
            :class="formatData.placeOfProductionId[0]
            ? flagClass
            :''" 
          />
          {{ (formatData.placeOfProductionId && formatData.placeOfProductionId.length > 0) ? formatData.placeOfProductionId[0] : 'не указан' }}
          <ModalsMoreCities 
            :list="formatData.placeOfProductionId" 
            title="Место производства" 
            placement="bottom-end" 
            v-if="Array.isArray(formatData.placeOfProductionId) && formatData.placeOfProductionId && formatData.placeOfProductionId.length >= 1"
          />
        </p>
      </div>
      <div class="form-group-data" v-if="entityOfRole === 'services'">
        <p class="form-group__title">Мин. партия</p>
        <p class="form-group__value">
          {{ (formatData.minLot && formatData.minLot.length > 0) ? formatData.minLot[0] : 'не указан' }}
          <ModalsMoreCities 
            :list="formatData.minLot" 
            title="Мин. партия" 
            placement="bottom-end" 
            v-if="Array.isArray(formatData.minLot) && formatData.minLot && formatData.minLot.length >= 1"
          />
        </p>
      </div>
      <div class="form-group-data" v-if="entityOfRole === 'services'">
        <p class="form-group__title">Наличие СТМ</p>
        <p class="form-group__value">{{ formatData.availabilityStm || 'не указан' }}</p>
      </div>
      <div class="form-group-data" v-if="entityOfRole === 'services'">
        <p class="form-group__title">Бесплатные тестовые образцы</p>
        <p class="form-group__value">{{ formatData.freeTestSamples || 'не указан' }}</p>
      </div>
      <div class="form-group-data" v-if="entityOfRole === 'services'">
        <p class="form-group__title">Сырье</p>
        <p class="form-group__value">
          {{ (formatData.rawMaterials && formatData.rawMaterials.length > 0) ? formatData.rawMaterials[0] : 'не указан' }}
          <ModalsMoreCities 
            :list="formatData.rawMaterials" 
            title="Сырье" 
            placement="bottom-end" 
            v-if="Array.isArray(formatData.rawMaterials) && formatData.rawMaterials && formatData.rawMaterials.length >= 1"
          />
        </p>
      </div>
      <div class="form-group-data" v-if="entityOfRole === 'orders'">
        <p class="form-group__title">Партия</p>
        <p class="form-group__value">{{ formatData.batch || 'не указан' }}</p>
      </div>
      <div class="form-group-data" v-if="entityOfRole === 'orders'">
        <p class="form-group__title">Лекала</p>
        <p class="form-group__value">{{ formatData.patterns || 'не указан' }}</p>
      </div>
      <div class="form-group-data" v-if="entityOfRole === 'orders'">
        <p class="form-group__title">Сырье</p>
        <p class="form-group__value">
          {{ (formatData.rawMaterials && formatData.rawMaterials.length > 0) ? formatData.rawMaterials[0] : 'не указан' }}
          <ModalsMoreCities 
            :list="formatData.rawMaterials" 
            title="Сырье" 
            placement="bottom-end" 
            v-if="Array.isArray(formatData.rawMaterials) && formatData.rawMaterials && formatData.rawMaterials.length >= 1"
          />
        </p>
      </div>
      <div class="form-group-data" v-if="entityOfRole === 'orders'">
        <p class="form-group__title">Срок выполнения</p>
        <p class="form-group__value">{{ formatData.completionDate || '-' }}</p>
      </div>
    </div>
    <div class="form-group-data">
      <p class="form-group__title">Описание</p>
      <p class="form-group__value">{{ formatData.description|| '-' }}</p>
    </div>
    <div class="form-group-data">
      <p class="form-group__title">Условия сотрудничества</p>
      <p class="form-group__value">{{ formatData.termsOfCooperation || '-' }}</p>
    </div>
    <UiCheckbox class="form-group-data" v-if="entityOfRole === 'order'">
      Использовать &nbsp;<a>безопасную сделку.</a>
    </UiCheckbox>
    <UiCheckbox class="form-group-data" v-if="entityOfRole === 'order'">
      Согласен на размещение заказа в телеграм-канале "Аутсорсинг в легпроме".
    </UiCheckbox>
    <div class="form-group">
      <UiButton type="button" @click="router.push('/orders/create/step3')" class="form-group-data form-group-data__btn" variant="tertiary" size="large">Назад</UiButton>
      <UiButton type="button" @click="handleSubmit" class="form-group-data form-group-data__btn" variant="quinary" size="large">Подтвердить
      </UiButton>
    </div>
  </div>
</template>

<script setup>
import { useEntityStore } from '~/store/entityStore';
import { useUserStore } from '~/store/userStore';
import { selectFlag } from '#imports';

const userStore = useUserStore();
const entityStore = useEntityStore();
const router = useRouter();

const props = defineProps({
  role: {
    type: String,
    default: 'customer',
    required: true,
  },
  formatData: {
    type: Object,
    default: {},
    required: true,
  }
});

const entityOfRole = computed(() =>{
  if(props.role === 'performer') {
    return 'services'
  } else return 'orders'
});

const entity = computed(() => {
  if(props.role === 'performer') {
    return entityStore.service
  } else return entityStore.order
});

const flagClass = computed(() => selectFlag(entity.value.placeOfProduction[0].countryId))

const handleSubmit = () => {
  if(entityOfRole.value === 'orders') {
    router.push('/customer/orders')
    entityStore.orderList = [...entityStore.orderList, props.formatData]
  } else {
    entityStore.servicesList = [...entityStore.servicesList, props.formatData]
    router.push('/performer/services')
  }
}

</script>

<style lang="scss">

.entity_step-check {
  .check-card {
    margin-bottom: 2rem;
  }

  .form-group-data {
    margin-bottom: 1.5em;
  }

  .form-group__title {
    font-family: 'fira-sans', sans-serif;
    margin-bottom: 0;
  }

  .form-group__value {
    line-height: 1.5em;
    margin-top: 0;
  }

}

</style>
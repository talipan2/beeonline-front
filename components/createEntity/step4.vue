<template>
  <div class="entity entity_step-check">
    <h1 class="entity__title">{{ entityOfRole === 'services' ? 'Проверка вашей услуги' : 'Проверка вашего заказа' }}</h1>
    <CommonProfileCheckCard :title="entityOfRole === 'services' ? 'Услуга' : 'Заказ'"
      text="Указанные данные не разглашаются третьим лицам, и необходимы для успешной работы на сервисе"
      change-link-label="Изменить" change-link="/services/create" />
    <div class="form-group-data">
      <p class="form-group__title">Заголовок</p>
      <p class="form-group__value">{{ data.name || 'не указан' }}</p>
    </div>
    <div class="form-group">
      <div class="form-group-data">
        <p class="form-group__title">Категории</p>
        <p class="form-group__value">
          {{ data.categories[0] || 'не указан' }}
          <ModalsMoreCities 
            :list="data.categories" 
            title="Категории" 
            placement="bottom-end" 
            v-if="Array.isArray(data.categories) && data.categories && data.categories.length >= 1"
          />
          </p>
      </div>
      <div class="form-group-data">
        <p class="form-group__title">Место производства</p>
        <p class="form-group__value">
          <i class="flag flag_round" v-if="data.placeOfProductionId[0]" 
            :class="data.placeOfProductionId[0] 
            ? flagClass
            :''" 
          />
          {{ data.placeOfProductionId[0] || '-' }} 
          <ModalsMoreCities 
            :list="data.placeOfProductionId" 
            title="Место производства" 
            placement="bottom-end" 
            v-if="Array.isArray(data.placeOfProductionId) && data.placeOfProductionId && data.placeOfProductionId.length >= 1"
          />
        </p>
      </div>
      <div class="form-group-data" v-if="entityOfRole === 'services'">
        <p class="form-group__title">Мин. партия</p>
        <p class="form-group__value">
          {{ data.minLot[0] || '-' }}
          <ModalsMoreCities 
            :list="data.minLot" 
            title="Мин. партия" 
            placement="bottom-end" 
            v-if="Array.isArray(data.minLot) && data.minLot && data.minLot.length >= 1"
          />
        </p>
      </div>
      <div class="form-group-data" v-if="entityOfRole === 'services'">
        <p class="form-group__title">Наличие СТМ</p>
        <p class="form-group__value">{{ data.availabilityStm || '-' }}</p>
      </div>
      <div class="form-group-data" v-if="entityOfRole === 'services'">
        <p class="form-group__title">Бесплатные тестовые образцы</p>
        <p class="form-group__value">{{ data.freeTestSamples || '-' }}</p>
      </div>
      <div class="form-group-data" v-if="entityOfRole === 'services'">
        <p class="form-group__title">Сырье</p>
        <p class="form-group__value">
          {{ data.rawMaterials[0] || '-' }}
          <ModalsMoreCities 
            :list="data.rawMaterials" 
            title="Сырье" 
            placement="bottom-end" 
            v-if="Array.isArray(data.rawMaterials) && data.rawMaterials && data.rawMaterials.length >= 1"
          />
        </p>
      </div>
      <div class="form-group-data" v-if="entityOfRole === 'orders'">
        <p class="form-group__title">Партия</p>
        <p class="form-group__value">{{ data.batch || '-' }}</p>
      </div>
      <div class="form-group-data" v-if="entityOfRole === 'orders'">
        <p class="form-group__title">Лекала</p>
        <p class="form-group__value">{{ data.patterns || '-' }}</p>
      </div>
      <div class="form-group-data" v-if="entityOfRole === 'orders'">
        <p class="form-group__title">Сырье</p>
        <p class="form-group__value">
          {{ data.rawMaterials[0] || '-' }}
          <ModalsMoreCities 
            :list="data.rawMaterials" 
            title="Сырье" 
            placement="bottom-end" 
            v-if="Array.isArray(data.rawMaterials) && data.rawMaterials && data.rawMaterials.length >= 1"
          />
        </p>
      </div>
      <div class="form-group-data" v-if="entityOfRole === 'orders'">
        <p class="form-group__title">Срок выполнения</p>
        <p class="form-group__value">{{ data.completionDate || '-' }}</p>
      </div>
    </div>
    <div class="form-group-data">
      <p class="form-group__title">Описание</p>
      <p class="form-group__value">{{ data.description|| '-' }}</p>
    </div>
    <div class="form-group-data">
      <p class="form-group__title">Условия сотрудничества</p>
      <p class="form-group__value">{{ data.termsOfCooperation || '-' }}</p>
    </div>
    <UiCheckbox class="form-group-data" v-if="entityOfRole === 'order'">
      Использовать &nbsp;<a>безопасную сделку.</a>
    </UiCheckbox>
    <UiCheckbox class="form-group-data" v-if="entityOfRole === 'order'">
      Согласен на размещение заказа в телеграм-канале "Аутсорсинг в легпроме".
    </UiCheckbox>
    <div class="form-group">
      <UiButton type="button" @click="router.push('/orders/create/step3')" class="form-group-data form-group-data__btn" variant="tertiary" size="large">Назад</UiButton>
      <UiButton type="button" @click="router.push('/services/create/step4')" class="form-group-data form-group-data__btn" variant="quinary" size="large">Подтвердить
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
  data: {
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

watch(() => props.data, () => {
  console.log(props.data)
}, {deep: true});

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
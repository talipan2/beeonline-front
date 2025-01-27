<template>
  <div class="entity entity_step-check">
    <h1 class="entity__title">{{ entityOfRole === 'services' ? 'Проверка вашей услуги' : 'Проверка вашего заказа' }}</h1>
    <!-- <CommonProfileCheckCard :title="entityOfRole === 'services' ? 'Услуга' : 'Заказ'"
      text="Указанные данные не разглашаются третьим лицам, и необходимы для успешной работы на сервисе"
      change-link-label="Изменить" change-link="/services/create" /> -->
      <div class="form-group">
        <div class="form-group-data form-group-data__btn entity_step-check__link">
          <NuxtLink to="/orders/create/step1" class="link" variant="quinary" size="large">Изменить</NuxtLink>
        </div>
        <UiButton type="button"  @click="handleSubmit" class="form-group-data form-group-data__btn " variant="quinary" size="large">Подтвердить</UiButton>
    </div>
    <div class="form-group-data">
      <p class="form-group__title">Заголовок</p>
      <p class="form-group__value">{{ formatData.name || 'не указан' }}</p>
    </div>    <div class="form-group">
      <div class="form-group-data">
        <p class="form-group__title">Категории</p>
        <p class="form-group__value">
          {{ (formatData.categories && formatData.categories.length > 0) ? formatData.categories[0] : 'не указан' }}
          <ModalsMoreCities 
            :list="formatData.categories.slice(1)" 
            title="Категории" 
            placement="bottom-end" 
            v-if="Array.isArray(formatData.categories) && formatData.categories && formatData.categories.length > 1"
          />
          </p>
      </div>
      <div class="form-group-data">
        <p class="form-group__title">Место производства</p>
        <p class="form-group__value">
          <i class="flag flag_round" v-if="formatData.locations && formatData.locations[0]" 
            :class="formatData.locations[0]
            ? flagClass
            :''" 
          />
          {{ (formatData.locations && formatData.locations.length > 0 && formatData.locations[0].name) 
            ? formatData.locations[0].name : 'не указан' 
          }}
          <ModalsMoreCities 
            :list="formatData.locations.map(item => item.name).slice(1)" 
            title="Место производства" 
            placement="bottom-end" 
            v-if="Array.isArray(formatData.locations) && formatData.locations && formatData.locations.length > 1"
          />
        </p>
      </div>
      <div class="form-group-data" v-if="entityOfRole === 'services'">
        <p class="form-group__title">Мин. партия</p>
        <p class="form-group__value">
          {{ (formatData.minLot && formatData.minLot.length > 0) ? formatData.minLot[0] : 'не указан' }}
          <ModalsMoreCities 
            :list="formatData.minLot.slice(1)" 
            title="Мин. партия" 
            placement="bottom-end" 
            v-if="Array.isArray(formatData.minLot) && formatData.minLot && formatData.minLot.length > 1"
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
            :list="formatData.rawMaterials.slice(1)" 
            title="Сырье" 
            placement="bottom-end" 
            v-if="Array.isArray(formatData.rawMaterials) && formatData.rawMaterials && formatData.rawMaterials.length > 1"
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
          {{ (formatData.rawMaterials && formatData.rawMaterials.length > 0) ? formatData.rawMaterials : 'не указан' }}
          <ModalsMoreCities 
            :list="formatData.rawMaterials.slice(1)" 
            title="Сырье" 
            placement="bottom-end" 
            v-if="Array.isArray(formatData.rawMaterials) && formatData.rawMaterials && formatData.rawMaterials.length > 1"
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
    <UiCheckbox v-model="data.isSafeDeal" class="form-group-data" v-if="entityOfRole === 'orders'" :isValidated="false">
      Использовать &nbsp;<a>безопасную сделку.</a>
      <CommonTooltip
        text='Безопасная сделка'
      />
    </UiCheckbox>
    <UiCheckbox v-model="data.isAgreedOrderPlacement" class="form-group-data entity_step-check__checkbox" v-if="entityOfRole === 'orders'" :isValidated="false">
      Согласен на размещение заказа в телеграм-канале &nbsp;<a>"Аутсорсинг в легпроме"</a>. 
      <CommonTooltip class=""
        text='Аутсорсинг в легпроме'
      />
    </UiCheckbox>
    <div class="form-group">
      <UiButton type="button"  @click="router.push('/orders/create/step3')" class="form-group-data form-group-data__btn" variant="tertiary" size="large">Назад</UiButton>
      <UiButton type="button"  @click="handleSubmit" class="form-group-data form-group-data__btn" variant="quinary" size="large">Подтвердить
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
  },
  handleSubmit: {
    type: Function,
    default: () => ({}),
  },
  data: {
    type: Object,
    default: () => ({}),
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

const flagClass = computed(() => selectFlag(props.formatData.locations[0].countryId));

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

  &__link {
    display: flex;
    align-items: center;
    justify-content: left;
  }

  &__checkbox {
    .checkbox__label {
      flex-wrap: wrap;
    }
  }



}

</style>
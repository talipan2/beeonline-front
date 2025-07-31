<template>
  <div class="entity">
    <h1 class="entity__title">Подробное описание</h1>
    <UiForm :submit="handleSubmit" @setError="getErrorList">
      <div class="entity__data">
        <div class="entity__photo">
          <label class="form-group__title entity__label">
            Фото
            <CommonTooltip text="Допустимы изображения размером до 5Мб" />
          </label>
          <CommonGalleryLoad v-model="data.gallery" :logo="true" @update:logo="handleSelectLogo" label="Загрузить еще" class="form-group__value" />
        </div>
      </div>
      <div class="entity__data">
        <label class="form-group__title entity__label">
          Описание *
          <CommonTooltip :text="`Пожалуйста, опишите ${
              role === 'performer' ? 'услугу' : 'заказ'
            } максимально подробно. Указание контактов (телефон, email) - запрещено.`" />
        </label>
        <UiTextArea
          :rules="{ required: true, min: 10 }"
          name="description-text"
          label="Описание"
          v-model="data.description"
          class="form-group__value"
        />
      </div>
      <div class="entity__data" v-if="role === 'performer'">
        <div class="entity__data-group">
          <div class="entity__data-item">
            <p class="form-group__title entity__label">
              Сырье *
            </p>
            <UiCheckboxGroup :rules="{ minSelected: 1 }" name="rawMaterials" label="Сырье"
              class="entity__group form-group__value" v-model="data.rawMaterials" :options="[
                { id: 0, label: 'Производителя' },
                { id: 1, label: 'Заказчика' },
              ]" />
          </div>
          <div class="entity__data-item">
            <p class="form-group__title entity__label">Наличие СТМ *</p>
            <UiRadioButtonGroup name="is_stm" label="наличие СТМ" :rules="{ required: true }"
              class="entity__group form-group__value" v-model="data.availabilityStm" :options="[
                { value: 1, label: 'Да' },
                { value: 0, label: 'Нет' },
              ]" />
          </div>
          <div class="entity__data-item">
            <p class="form-group__title entity__label">Бесплатные образцы *</p>
            <UiRadioButtonGroup :rules="{ required: true }" name="free_samples" label="Бесплатные образцы"
              class="entity__group form-group__value" v-model="data.freeTestSamples" :options="[
                { value: 0, label: 'По запросу' },
                { value: 1, label: 'Да' },
                { value: 2, label: 'Нет' },
              ]" />
          </div>
          <div class="entity__data-item">
            <p class="form-group__title entity__label">Мин. партия *</p>
            <UiCheckboxGroup :rules="{ minSelected: 1 }" name="min_lot" label="Мин. партия"
              class="entity__group form-group__value" v-model="data.minLot" :options="minPart" />
          </div>
          <div class="entity__data-item">
            <p class="form-group__title entity__label">Свободный склад *</p>
            <UiRadioButtonGroup :rules="{ required: true }" name="free_stock" label="Свободный склад"
              class="entity__group form-group__value" v-model="data.freeStock" :options="[
                { value: 0, label: 'Нет' },
                { value: 1, label: 'Да' },
              ]"
            />
          </div>
        </div>
      </div>
      <div class="entity__data entity__data_type_customer" v-else>
        <div class="entity__data-group">
          <div class="entity__data-item">
            <p class="form-group__title entity__label">
              Сырье *
              <CommonTooltip text="Укажите чье будет сырье" />
              </p>
            <UiRadioButtonGroup :rules="{ required: true }" name="rawMaterials" label="Сырье"
              class="entity__group form-group__value" v-model="data.rawMaterials" :options="[
                { value: 0, label: 'Производителя' },
                { value: 1, label: 'Заказчика' },
              ]" />
          </div>
          <div class="entity__data-item">
            <p class="form-group__title entity__label">
              Лекала *
              <CommonTooltip text="Укажите есть ли у вас лекала" />
              </p>
            <UiRadioButtonGroup :rules="{ required: true }" name="pattern" label="Лекала"
              class="entity__group form-group__value" v-model="data.patterns" :options="[
                { value: 1, label: 'Есть лекала' },
                { value: 0, label: 'Нужен конструктор' },
              ]" />
          </div>
          <div class="entity__data-item">
            <label class="form-group__title entity__label">Объем партии *
              <CommonTooltip text="Укажите количество в единицах измерения - шт." />
            </label>
            <UiInput :rules="{ required: true, min_value: 1 }" name="batch" label="Объем партии" v-model="data.batch"
              class="form-group__value" type="number" />
          </div>
          <div class="entity__data-item">
            <label class="form-group__title entity__label" :for="`price`">
              Предпочтительная цена *
              <CommonTooltip text="Укажите предпочтительную цену за единицу товара" />
            </label>
            <UiInput
              :rules="{ required: true, min_value: 1, max_value: 9999999999999 }"
              :id="`price`"
              name="price"
              label="Предпочтительная цена"
              v-model="data.price"
              class="form-group__value" type="number"
            >
              <UiSelect
                :options="currencyList"
                v-model="data.currency"
                return-id
                label="Валюта"
                name="currency"
                class="form-group__value entity__currency-select"
                :error-show="false"
              />
            </UiInput>
          </div>
        </div>
      </div>
      <div class="entity__data">
        <label class="form-group__title entity__label">
          Условия сотрудничества
          <CommonTooltip :text="`Опишите условия, на которых вы готовы сотрудничать с ${
              role === 'performer' ? 'заказчиками' : 'производителями заказа'
            }`" />
        </label>
        <UiTextArea
          :rules="{min: 10}"
          name="conditions"
          label="Условия сотрудничества"
          v-model="data.termsOfCooperation"
          class="form-group__value"
        />
      </div>
      <div class="entity__data" v-if="role === 'performer'">
        <CommonDocumentLoaderAndList v-model="data.tzFiles"
          text="Фото изделия можно прикрепить сюда."
          :extension="['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'rtf', 'pdf', 'jpeg', 'png', 'jpg', 'gif', 'psd', 'djvu', 'fb2', 'ps', 'zip', 'rar']"
        />
      </div>
      <div class="entity__data" v-if="role === 'customer'">
        <CommonDocumentLoaderAndList v-model="data.tzFiles"
          text="Готовое техническое задание (ТЗ) и
          фото изделия можно прикрепить сюда.
          Производители лучше поймут задачу и качественно выполнят заказ.
          Разрешено загружать файлы форматом
          - doc, .docx, .xls, .xlsx, .ppt, .pptx, .rtf, .pdf, .jpeg, .png, .jpg, .gif, .psd, .djvu, .fb2, .ps, .zip, .rar"
          :extension="['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'rtf', 'pdf', 'jpeg', 'png', 'jpg', 'gif', 'psd', 'djvu', 'fb2', 'ps', 'zip', 'rar']"
        />
      </div>
      <CommonAlerts v-if="errorList.selectedLocations" :alert="errorList.selectedLocations" alertType="validation" />
      <div class="entity__data" v-if="role === 'customer'">
        <h2 class="entity__subtitle">Регионы фактического производства заказа *</h2>
        <div class="entity__text-container">
          <p class="entity__text" v-if="role === 'performer'">
            Укажите город вашего производства. Если производств несколько - выберите несколько городов, но не более
            пяти.
          </p>
          <p class="entity__text" v-else>
            Укажите предпочтительные регионы производства заказа.
          </p>
          <p class="entity__text" v-if="role === 'performer'">
            Потенциальный заказчик сможет вас найти по регионам указанных городов.
          </p>
          <!-- <p class="entity__text" v-else>
            Указанные города и регионы используются для автоматического добавления в новые заказы и позволят
            потенциальным
            производителям находить их в поиске.
          </p> -->
        </div>
        <!-- <CommonLocation
          v-if="role === 'performer'"
          buttonLabel="Выбрать город"
          v-model="data.locations"
          :type="['selectCities']"
          :is-required="true"
          errorLabel="Города производства"
          name="selectedLocations"
        /> -->
        <CommonLocation
          v-if="role === 'customer'"
          buttonLabel="Выбрать регион"
          v-model="data.locations"
          :type="['selectCountry', 'selectRegions']"
          :is-required="true"
          errorLabel="Регионы производства"
          name="selectedLocations"
          modalTitle="Выберите регион"
        />
      </div>
      <div class="form-group">
        <UiButton
          :to="backLink"
          class="form-group-data form-group-data__btn" variant="tertiary" size="large"
        >
          Назад
        </UiButton>
        <UiButton type="submit" class="form-group-data form-group-data__btn" variant="quinary" size="large">Далее
          <SvgoBtnArrow class="svg-lx" />
        </UiButton>
      </div>
    </UiForm>
  </div>
</template>

<script setup>
import { fa } from 'intl-tel-input/i18n';
import { useEntityStore } from '~/store/entityStore';
import { useSettingStore } from '~/store/settingStore';
import { getErrorsList } from '~/utils/getValidationErrors';

const props = defineProps({
  role: {
    type: String,
    default: "",
    required: true,
  },
  data: {
    type: Object,
    default: () => ({}),
    required: true,
  },
  handleSubmit: {
    type: Function,
    default: () => ({}),
    required: true
  },
  type: {
    type: String,
    default: "create",
    validator: (value) => ['create', 'edit'].includes(value),
  },
});

const entityStore = useEntityStore();
const settingStore = useSettingStore();

const backLink = computed(() => {
  if(props.type === 'create') {
    return `/${currentEntity.value}/create/step1`
  } else if (props.type === 'edit') {
    return `/${props.role}/${currentEntity.value}/edit/${props.data.id}?step=1`
  }
})

const currentEntity = computed(() => {
  if(props.role === 'performer') {
    return 'services'
  }else if(props.role === 'customer') {
    return 'orders'
  }
})

const errorList = ref({});

const currencyList = computed(() => {
  if(settingStore.currencyList.length > 0) {
    return settingStore.currencyList
      .filter(item => item.code !== 'bonus')
      .map(item => ({
        id: item.id,
        label: item.code,
        value: item.code
      }))
  } else {
    return []
  }
});

const getErrorList = (errors) => {
  errorList.value = errors
}

const router = useRouter();

const handleSelectLogo = (url) => {
  props.data.logo = url
}

const handleSubmit = async (values, form) => {
  await props.handleSubmit(values, form)
}

// const locationData = ref({
//   locationId: props.data.placeOfProductionId,
//   fullNameLocation: props.data.placeOfProduction,
// })

// watch(()=> locationData.value, (newVal) => {
//   props.data.placeOfProductionId = newVal.locationId
//   props.data.placeOfProduction = newVal.fullNameLocation
// })

const minPart = [
  { id: 1, label: "до 100" },
  { id: 2, label: "от 100 до 500" },
  { id: 3, label: "от 500 до 1 000" },
  { id: 4, label: "1 000 и выше" },
];

const freeStockOptions = computed(() => entityStore.entityData?.freeStock || []);

onMounted(() => {
  if(settingStore.currencyList.length === 0) {
    settingStore.getCurrencyList()
  }
})

</script>

<style lang="scss">
.entity {
  &__photo {
    .load-image {
      flex-grow: 0;
    }

    .gallery-link {
      padding-bottom: 29%;
      flex: 0 1 29%;
    }
  }

  &__currency-select {
    margin-top: 0;
    flex: 0 0 5em;
    line-height: 1em;

    .select__select {
      border: none;
      padding-block: 0;

      &:focus {
        box-shadow: none;
      }
    }

  }

  .invalid .entity__currency-select .select__select {
    background: none;
  }

  &__label {
    display: flex;
    // column-gap: 0.3em;
    margin-bottom: 0.5em;
    align-items: flex-end;
  }

  &__data {
    // .text-area {
    //   padding-bottom: 20%;
    // }
    margin-bottom: 2em;
  }

  &__data-group {
    display: flex;
    flex-wrap: wrap;
    column-gap: 2.5em;
  }

  &__data-item {
    flex: 1 0 30%;
  }

  &__data_type_customer {
    margin-bottom: 0;
  }

  &__data_type_customer .entity__data-item {
    flex: 1 0 47%;
    margin-bottom: 1.5em;
  }

  &__group {
    display: flex;
    flex-direction: column;
    row-gap: 1.6rem;

    .checkbox__label {
      font-size: 1.6rem;
    }

    .radio-buttons__label {
      font-size: 1.6rem;
    }
  }
}
</style>

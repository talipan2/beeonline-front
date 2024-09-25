<template>
  <div class="entity">
    <h1 class="entity__title">Подробное описание</h1>
    <Form as="form" @submit="handleSubmit">
      <div class="entity__data">
        <div class="entity__photo">
          <label class="form-group__title entity__label">
            Фото
            <CommonTooltip text="Допустимы изображения размером до 5Мб" />
          </label>
          <CommonImageLoad v-model="data.logo" label="Загрузить еще" />
        </div>
      </div>
      <div class="entity__data">
        <label class="form-group__title entity__label">
          Описание *
          <CommonTooltip
            :text="`Пожалуйста, опишите ${
              role === 'performer' ? 'услугу' : 'заказ'
            } максимально подробно. Указание контактов (телефон, email) - запрещено.`"
          />
        </label>
        <UiTextArea
          name="description"
          label="Описание"
          :rules="{ required: true, min: 10 }"
          v-model="data.description"
          class="form-group-value"
        />
      </div>
      <div class="entity__data" v-if="role === 'performer'">
        <div class="entity__data-group">
          <div class="entity__data-item">
            <p class="form-group__title entity__label">Сырье *</p>
            <UiCheckboxGroup
              :rules="{ minSelected: 1 }"
              name="rawMaterials"
              label="Сырье"
              class="entity__group"
              v-model="data.rawMaterials"
              :options="[
                { id: 1, label: 'Собственное' },
                { id: 0, label: 'Давальческое' },
              ]"
            />
          </div>
          <div class="entity__data-item">
            <p class="form-group__title entity__label">Наличие СТМ *</p>
            <UiRadioButtonGroup
              name="is_stm"
              label="наличие СТМ"
              :rules="{ required: true }"
              class="entity__group"
              v-model="data.availabilityStm"
              :options="[
                { value: 1, label: 'Да' },
                { value: 0, label: 'Нет' },
              ]"
            />
          </div>
          <div class="entity__data-item">
            <p class="form-group__title entity__label">Бесплатные образцы *</p>
            <UiRadioButtonGroup
              :rules="{ required: true }"
              name="free_samples"
              label="Бесплатные образцы"
              class="entity__group"
              v-model="data.freeTestSamples"
              :options="[
                { value: 0, label: 'По запросу' },
                { value: 1, label: 'Да' },
                { value: 2, label: 'Нет' },
              ]"
            />
          </div>
          <div class="entity__data-item">
            <p class="form-group__title entity__label">Мин. партия *</p>
            <UiCheckboxGroup
              :rules="{ minSelected: 1 }"
              name="min_lot"
              label="Мин. партия"
              class="entity__group"
              v-model="data.minLot"
              :options="minPart"
            />
          </div>
        </div>
      </div>
      <div class="entity__data entity__data_type_customer" v-else>
        <div class="entity__data-group">
          <div class="entity__data-item">
            <p class="form-group__title entity__label">Сырье *</p>
            <UiRadioButtonGroup
              :rules="{ required: true }"
              name="rawMaterials"
              label="Сырье"
              class="entity__group"
              v-model="data.rawMaterials"
              :options="[
                { value: 1, label: 'Собственное' },
                { value: 0, label: 'Давальческое' },
              ]"
            />
          </div>
          <div class="entity__data-item">
            <p class="form-group__title entity__label">Лекала *</p>
            <UiRadioButtonGroup
              :rules="{ required: true }"
              name="pattern"
              label="Лекала"
              class="entity__group"
              v-model="data.patterns"
              :options="[
                { value: 1, label: 'Есть лекала' },
                { value: 0, label: 'Нужен конструктор' },
              ]"
            />
          </div>
          <div class="entity__data-item">
            <label class="form-group__title entity__label"
              >Партия *
              <CommonTooltip
                text="Укажите количество в единицах измерения - шт/метров."
            /></label>
            <UiInput
              :rules="{ required: true }"
              name="batch"
              label="Партия"
              v-model="data.batch"
              class="form-group__value"
              type="number"
            />
          </div>
          <div class="entity__data-item">
            <label class="form-group__title entity__label">
              Предпочтительная цена *
              <CommonTooltip
                text="Укажите предпочтительную цену за единицу товара"
              />
            </label>
            <UiInput
              :rules="{ required: true }"
              name="price"
              label="Предпочтительная цена"
              v-model="data.price"
              class="form-group__value"
              type="number"
            />
          </div>
        </div>
      </div>
      <div class="entity__data">
        <label class="form-group__title entity__label">
          Условия сотрудничества *<CommonTooltip
            :text="`Опишите условия, на которых вы готовы сотрудничать с ${
              role === 'performer' ? 'заказчиками' : 'исполнителями заказа'
            }`"
          />
        </label>
        <UiTextArea
          name="conditions"
          label="Условия сотрудничества"
          :rules="{ required: true, min: 10 }"
          v-model="data.termsOfCooperation"
          class="form-group-value"
        />
      </div>
      <div class="entity__data" v-if="role === 'performer'">
        <CommonDocumentLoader
          text="Готовое техническое задание (ТЗ) и фото изделия можно прикрепить сюда."
        />
      </div>
      <div class="entity__data" v-else>
        <CommonDocumentLoader
          text="Готовое техническое задание (ТЗ) и фото изделия можно прикрепить сюда. Исполнители лучше поймут задачу и качественно выполнят заказ. Разрешено загружать файлы форматом - doc, .docx, .xls, .xlsx, .ppt, .pptx, .rtf, .pdf, .jpeg, .png, .jpg, .gif, .psd, .djvu, .fb2, .ps, .zip, .rar"
        />
      </div>
      <div class="form-group">
        <UiButton
          type="button"
          @click="
            router.push(
              `/${role === 'performer' ? 'services' : 'orders'}/create/step1`
            )
          "
          class="form-group-data form-group-data__btn"
          variant="tertiary"
          size="large"
          >Назад</UiButton
        >
        <UiButton
          type="submit"
          class="form-group-data form-group-data__btn"
          variant="quinary"
          size="large"
          >Далее
          <SvgoBtnArrow class="svg-lx" />
        </UiButton>
      </div>
    </Form>
  </div>
</template>

<script setup>
const props = defineProps({
  role: {
    type: String,
    default: "",
    required: true,
  },
  data: {
    type: Object,
    default: () => {},
    required: true,
  },
  handleSubmit: {
    type: Function,
    default: () => ({}),
    required: true
  },
});

const router = useRouter();

watch(() => props.data, (newVal) => {
  console.log(props.data)
}, {deep: true});

const minPart = [
  { id: 1, label: "до 100" },
  { id: 2, label: "от 100 до 500" },
  { id: 3, label: "от 500 до 1 000" },
  { id: 4, label: "1 000 и выше" },
];
</script>

<style lang="scss">
.entity {
  &__photo {
    .load-image {
      flex-grow: 0;
    }
  }

  &__label {
    display: flex;
    column-gap: 0.3em;
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

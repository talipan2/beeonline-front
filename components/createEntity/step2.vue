<template>
  <div class="entity">
    <h1 class="entity__title">Подробное описание</h1>
    <form @submit.prevent="handleSubmit">
      <div class="entity__data">
        <div class="entity__photo">
          <label class="form-group__title entity__label">
            Фото 
            <CommonTooltip text="Допустимы изображения размером до 5Мб" />
          </label>
          <CommonImageLoad class="form-group-value" label="Загрузить еще"/>
        </div>
      </div>
      <div class="entity__data">
        <label class="form-group__title entity__label">
          Описание *
          <CommonTooltip :text="`Пожалуйста, опишите ${role === 'performer' ? 'услугу' : 'заказ'} максимально подробно. Указание контактов (телефон, email) - запрещено.`" />
        </label>
        <UiTextArea v-model="data.description" class="form-group-value"/>
      </div>
      <div class="entity__data" v-if="role === 'performer'">
        <div class="entity__data-group">
          <div class="entity__data-item">
            <p class="form-group__title entity__label">Сырье *</p>
            <UiCheckboxGroup class="entity__group" v-model="selectedGroup.raw" :options="[{id: 5, label: 'Собственное'}, {id: 6, label: 'Давальческое'}]" />
          </div>
          <div class="entity__data-item">
            <p class="form-group__title entity__label">Наличие СТМ *</p>
            <UiRadioButtonGroup class="entity__group" v-model="selectedGroup.stm" :options="[{value: '1', label: 'Да'}, {value: '0', label: 'Нет'}]" />
          </div>
          <div class="entity__data-item">
            <p class="form-group__title entity__label">Бесплатные образцы *</p>
            <UiRadioButtonGroup class="entity__group" v-model="selectedGroup.sample" :options="[{value: '0', label: 'По запросу'}, {value: '1', label: 'Да'}, {value: '2', label: 'Нет'}]" />
          </div>
          <div class="entity__data-item">
            <p class="form-group__title entity__label">Мин. партия *</p>
            <UiCheckboxGroup class="entity__group" v-model="selectedGroup.minPart" :options="minPart" />
          </div>
        </div>
      </div>
      <div class="entity__data entity__data_type_customer" v-else>
        <div class="entity__data-group">
          <div class="entity__data-item">
            <p class="form-group__title entity__label">Сырье *</p>
            <UiCheckboxGroup class="entity__group" v-model="data.rawMaterials" :options="[{id: 5, label: 'Собственное'}, {id: 6, label: 'Давальческое'}]" />
          </div>
          <div class="entity__data-item">
            <p class="form-group__title entity__label">Лекала *</p>
            <UiRadioButtonGroup class="entity__group" v-model="data.patterns" :options="[{value: '1', label: 'Есть лекала'}, {value: '0', label: 'Нужен конструктор'}]" />
          </div>
          <div class="entity__data-item">
            <label class="form-group__title entity__label">Партия * <CommonTooltip text="Укажите количество в единицах измерения - шт/метров."/></label>
              <UiInput v-model="data.batch" class="form-group__value" type="text" />
          </div>
          <div class="entity__data-item">
            <label class="form-group__title entity__label">
              Предпочтительная цена * 
              <CommonTooltip text="Укажите предпочтительную цену за единицу товара" />
            </label>
            <UiInput v-model="data.price" class="form-group__value" type="text" />
          </div>
        </div>
      </div>
      <div class="entity__data">
        <label class="form-group__title entity__label">
          Условия сотрудничества *<CommonTooltip :text="`Опишите условия, на которых вы готовы сотрудничать с ${role === 'performer' ? 'заказчиками' : 'исполнителями заказа'}`" />
        </label>
        <UiTextArea v-model="data.termsOfCooperation" class="form-group-value"/>
      </div>
      <div class="entity__data" v-if="role === 'performer'">
        <CommonDocumentLoader text="Готовое техническое задание (ТЗ) и фото изделия можно прикрепить сюда." />
      </div>
      <div class="entity__data" v-else>
        <CommonDocumentLoader text="Готовое техническое задание (ТЗ) и фото изделия можно прикрепить сюда. Исполнители лучше поймут задачу и качественно выполнят заказ. Разрешено загружать файлы форматом - doc, .docx, .xls, .xlsx, .ppt, .pptx, .rtf, .pdf, .jpeg, .png, .jpg, .gif, .psd, .djvu, .fb2, .ps, .zip, .rar" />
      </div>
      <div class="form-group">
        <UiButton type="button" @click="router.push(`/${role === 'performer' ? 'services' : 'orders'}/create/step1`)" class="form-group-data form-group-data__btn" variant="tertiary" size="large">Назад</UiButton>
        <UiButton type="submit" class="form-group-data form-group-data__btn" variant="quinary" size="large">Далее
          <SvgoBtnArrow class="svg-lx" />
        </UiButton>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useEntityStore } from '~/store/entityStore';
import { useUserStore } from '~/store/userStore';



const props = defineProps({
  role: {
    type: String,
    default: '',
    required: true,
  }
})

const router = useRouter();
const userStore = useUserStore();
const entityStore = useEntityStore();
const role = computed(() => userStore.role);

const data = computed(() => {
  if(role.value === 'performer') {
    return entityStore.service
  } else return entityStore.order
})

const selectedGroup = ref({
  raw: [],
  stm: null,
  sample: null,
  minPart: [],
});

const minPart = [
  {id: 1, label: 'до 100'}, 
  {id: 2, label: 'от 100 до 500'}, 
  {id: 3, label: 'от 500 до 1 000'}, 
  {id: 4, label: '1 000 и выше'}
]

const handleSubmit = (event) => {
  event.preventDefault();
  if (props.role === 'performer') {
    router.push('/services/create/step3');
  } else {
    router.push('/orders/create/step3');
  }
}

</script>

<style lang="scss">

.entity {
  &__photo {
    max-width: 33%;
  }

  &__label {
    display: flex;
    column-gap: .3em;
    margin-bottom: .5em;
    align-items: flex-end;
  }

  &__data {
    .text-area {
      padding-bottom: 20%;
    }
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

  &__data_type_customer  {
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
<template>
  <div class="entity">
    <h1 class="entity__title">{{ title }}</h1>
    <CommonAlerts :alerts="['Заголовок обязателен', 'Категория продукции обязательна']" />
    <form @submit.prevent="handleSubmit">
      <div class="form-group" v-if="router.currentRoute.value.name.includes('create')">
        <label class="form-group-data form-group__title">
          Введите заголовок {{ role === 'performer' ? 'услуги' : 'заказа' }} *
          <UiInput v-model="data.name" class="form-group__value" :required="true"/>
        </label>
      </div>
      <div class="form-group" v-else>
        <label class="form-group-data form-group__title">
          Название {{ role === 'performer' ? 'услуги' : 'заказа' }} *
          <UiInput v-model="data.name" class="form-group__value" :required="true"/>
        </label>
      </div>
      <h2 class="entity__subtitle">Категория продукции</h2>
      <p class="entity__description">Выберите до 4 категорий</p>
      <div class="entity__variants-list">
        <UiCheckboxGroup :options="categories" v-model="data.categories" :disabled="isDisabled" />
      </div>
      <div class="form-group">
        <div class="form-group-data"></div>
        <UiButton type="submit" class="form-group-data form-group-data__btn" variant="quinary" size="large">Далее
          <SvgoBtnArrow class="svg-lx" />
        </UiButton>
      </div>
    </form>
    <div>{{ selectedCategory }}</div>
  </div>
</template>

<script setup>
import { useEntityStore } from '~/store/entityStore';
import { useUserStore } from '~/store/userStore';


const props = defineProps({
  title: {
    type: String,
    default: '',
    required: true,
  },
  role: {
    type: String,
    default: '',
    required: true,
  },
  handleBack: {
    type: Function
  },
  data: {
    type: Object,
    default: () => {},
    required: true
  }

})

const entityStore = useEntityStore();
const userStore = useUserStore();
const router = useRouter();
const selectedCategory = ref([]);


const isDisabled = (id) => {
  return props.data.categories.length >= 4 && !props.data.categories.includes(id);
};


const categories = [
  { id: 1, label: "Вязаный трикотаж" },
  { id: 2, label: "Верхняя одежда" },
  { id: 3, label: "Детская одежда" },
  { id: 4, label: "Женская одежда" },
  { id: 5, label: "Головные уборы" },
  { id: 6, label: "Мужская одежда" },
  { id: 7, label: "Кроеный трикотаж" },
  { id: 8, label: "Термобелье" },
  { id: 9, label: "Носочно-чулочная продукция" },
  { id: 10, label: "Униформа и спецодежда" },
  { id: 11, label: "Сумки и аксессуары" },
  { id: 12, label: "Ткани, фурнитура, материалы" },
  { id: 13, label: "Верхний трикотаж" },
  { id: 14, label: "СИЗ" },
  { id: 15, label: "Большие размеры" },
  { id: 16, label: "Джинсовая одежда" },
  { id: 17, label: "Домашняя одежда и текстиль" },
  { id: 18, label: "Изделия из меха и кожи" },
  { id: 19, label: "Купальники" },
  { id: 20, label: "Медицинская одежда" },
  { id: 21, label: "Нижнее белье" },
  { id: 22, label: "Спортивная одежда" },
  { id: 23, label: "Школьная форма" },
  { id: 24, label: "Печать на ткани" },
  { id: 25, label: "Вышивка на ткани" },
  { id: 26, label: "Вязаные аксессуары" },
  { id: 27, label: "Разработка лекал" },
];

</script>

<style lang="scss">

.entity {
  &__title {
    margin-bottom: .7em;
  }

  &__subtitle {
    font-size: 2.4em;
    margin-block: 1.25em .83em;
  }

  &__description {
    font-size: 1.3em;
    padding-bottom: .38em;
    border-bottom: 1px solid var(--border-color-secondary);
    margin-bottom: 2.3em;
  }

  &__variants-list {
    margin-bottom: 1.8em;

    .checkbox {
      flex: 1 1 47%;
    }
  }

  &__variants-item {
    flex: 0 0 47%;
    label {
      font-size: 1.6rem;
    }
  }
}

</style>
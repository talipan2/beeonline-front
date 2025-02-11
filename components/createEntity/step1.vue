<template>
  <div class="entity">
    <h1 class="entity__title">{{ title }}</h1>
    <Form @submit="handleSubmit" as="form" v-slot="{validate}">
      <div
        class="form-group"
        v-if="router.currentRoute.value.name.includes('create')"
      >
        <label class="form-group-data form-group__title">
          Введите заголовок {{ role === "performer" ? "услуги" : "заказа" }} *
          <UiInput
            :rules="{ required: true, min: 2 }"
            name="name"
            label="Заголовок"
            v-model="data.name"
            class="form-group__value"
            :required="true"
          />
        </label>
      </div>
      <div class="form-group" v-else>
        <label class="form-group-data form-group__title">
          Название {{ role === "performer" ? "услуги" : "заказа" }} *
          <UiInput
            :rules="{ required: true, min: 2 }"
            name="Название заказа"
            v-model="data.name"
            class="form-group__value"
            :required="true"
          />
        </label>
      </div>
      <h2 class="entity__subtitle">Категория продукции</h2>
      <p class="entity__description">Выберите до 4 категорий</p>
      <div class="entity__variants-list">
        <UiCheckboxGroup
          name="categories"
          label="Категории"
          :rules="{ minSelected: 1 }"
          :options="categoryList"
          v-model="data.categories"
          :disabled="isDisabled"
          :priorityShowed="[2, 4, 6, 10]"
          :isDropDown="true" 
        />
      </div>
      <div v-if="role == 'customer'" class="entity__data">
        <h2 class="entity__subtitle">Сроки</h2>
        <p class="entity__description">Укажите дату до которой заказ будет актуален</p>
        {{ data.completionDate }}
        <CommonCalendar v-model="data.completionDate" class="entity__calendar" />
      </div>
      <div class="entity__btn-container">
        <UiButton
          type="submit"
          class="form-group-data__btn entity__btn"
          variant="quinary"
          size="large"
          @click="getErrorsList(validate)"
          >Далее
          <SvgoBtnArrow class="svg-lx" />
        </UiButton>
      </div>
    </Form>
  </div>
</template>

<script setup>
import { useEntityStore } from '~/store/entityStore';
import { getErrorsList } from '~/utils/getValidationErrors';

const props = defineProps({
  title: {
    type: String,
    default: "",
    required: true,
  },
  role: {
    type: String,
    default: "",
    required: true,
  },
  handleBack: {
    type: Function,
  },
  data: {
    type: Object,
    default: () => {},
    required: true,
  },
  handleSubmit: {
    type: Function,
    default: () => ({}),
    required: true,
  },
});

const entityStore = useEntityStore();

const categoryList = computed(() => entityStore.entityData.categories);

const router = useRouter();

const isDisabled = (id) => {
  return (
    props.data.categories.length >= 4 && !props.data.categories.includes(id)
  );
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
  font-size: 1rem;
  &__title {
    margin-bottom: 0.7em;

    @include mobile {
      font-size: 2em;
    }
  }

  &__subtitle {
    font-size: 2.4em;
    margin-block: .25em 0.83em;
  }

  &__description {
    font-size: 1.3em;
    padding-bottom: 0.38em;
    border-bottom: 1px solid var(--border-color-secondary);
    margin-bottom: 2.3em;
  }

  &__variants-list {
    margin-bottom: 4em;

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

  &__btn {
    width: 50%;
    margin-left: auto;
    margin-top: 2em;
  }

}
</style>

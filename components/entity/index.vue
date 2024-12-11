<template>
  <section class="entitys">
    <div class="entitys__header">
      <p class="entitys__announce">{{ subtitle }}</p>
      <div class="entitys__btn-wrapper">
        <UiButton :to="btnLink" class="entitys__btn" variant="quinary" size="large">{{ btnLabel }}</UiButton>
      </div>
      <div class="entitys__filter">
        <h2 class="entitys__title">{{ title }}</h2>
        <div class="entitys__filter-container">
          <div class="form-group form-group_type_entitys">
            <UiSelect class="form-group-data" v-model="selectedStatus" :options="statusList"  />
            <UiSelect class="form-group-data" v-model="selectedCategory" :options="categoriesList" />
          </div>
        </div>
      </div>
      <div class="divider mb-30"></div>
    </div>
    <div class="entitys__cards">
      <CardsEntityCards v-for="(service, index) in data" :key="index" :data="service" :role="role"/>
    </div>

  </section>
</template>

<script setup>

const props = defineProps({
  role: {
    type: String,
    default: '',
    required: true,
  },
  title: {
    type: String,
    default: 'Все услуги',
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
    required: true,
  },
  btnLink: {
    type: String,
    default: '',
    required: true,
  },
  btnLabel: {
    type: String,
    default: '',
    required: true,
  },
  data: {
    type: Array,
    default: () => [],
  }
})

const selectedStatus = ref(1)
const selectedCategory = ref(1)

const statusList = [
  { id: 1, label: 'Активный' },
  { id: 2, label: 'Черновик' },
  { id: 3, label: 'В архиве' },
]

const categoriesList = [
  { id: 1, label: 'Все категории' },
  { id: 2, label: 'Вязаный трикотаж' },
  { id: 3, label: 'Верхняя одежда' },
  { id: 4, label: 'Детская одежда' },
  { id: 5, label: 'Женская одежда' },
  { id: 6, label: 'Головные уборы' },
  { id: 7, label: 'Мужская одежда' },
  { id: 8, label: 'Кроеный трикотаж' },
  { id: 9, label: 'Термобелье' },
  { id: 10, label: 'Носочно-чулочная продукция' },
  { id: 11, label: 'Униформа и спецодежда' },
  { id: 12, label: 'Сумки и аксессуары' },
  { id: 13, label: 'Ткани, фурнитура, материалы' },
  { id: 14, label: 'Верхний трикотаж' },
  { id: 15, label: 'СИЗ' },
  { id: 16, label: 'Большие размеры' },
  { id: 17, label: 'Джинсовая одежда' },
]



</script>

<style lang="scss">

.entitys {

  &__announce {
    font-size: 1.6em;
    margin-bottom: 1.5em;
  }

  &__btn-wrapper {
    max-width: 25.5em;
    margin-bottom: 3.5em;
  }

  &__btn {
    font-size: 1.2em;
    line-height: 1em;
    text-transform: uppercase;
  }

  &__title {
    margin-bottom: .78em;
  }

  &__filter-container {
    max-width: 66%;

    @include mobile {
      max-width: 100%;
    }
  }

  .form-group_type_entitys {
    font-size: 1.6em;
    column-gap: 1.8em;
  }

  &__cards {
    display: flex;
    gap: 3em;
    flex-wrap: wrap;

    @include tablet {
      gap: 1rem;
    }
  }
}

</style>
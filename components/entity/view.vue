<template>
  <section class="view-entity">
    <div class="view-entity__container">
      <h3 class="view-entity__title">{{ data.name }}</h3>
      <div class="view-entity__props">
        <div class="view-entity__prop" v-for="prop in data.props" :key="prop">
          <p class="view-entity__prop-name">{{ prop.label }}:</p>
          <p class="view-entity__prop-value">{{ prop.value || 'Не указано' }}</p>
        </div>
      </div>
      <div class="form-group">
        <div class="view-entity__btn">
          <UiButton :to="`/performer/services/edit/${data.id}`" variant="senary" size="around">Изменить</UiButton>
        </div>
        <div class="view-entity__view">
          <SvgoViews class="svg-l" fill="#6937a5"/>
          <p class="view-entity__view-value">0</p>
        </div>
      </div>
    </div>
    <div class="view-entity__container">
      <h3 class="view-entity__title">Описание</h3>
      <p class="view-entity__prop-value">{{ data.description || 'Не указано' }}</p>
    </div>
    <div class="view-entity__container">
      <h3 class="view-entity__title">Условия сотрудничества</h3>
      <p class="view-entity__prop-value">{{ data.conditions || 'Не указано' }}</p>
    </div>
    <div class="view-entity__container" v-if="data.gallery.length">
      <h3 class="view-entity__title">Галерия</h3>
      <p class="view-entity__prop-value">Описание</p>
    </div>
  </section>
</template>

<script setup>

const props = defineProps({
  data: {
    type: Object,
    default: {},
    required: true,
  }
})


</script>

<style lang="scss">

.view-entity {
  max-width: 50%;
  &__container {
    margin-bottom: 5rem;
  }

  &__title {
    font-size: 2.4rem;
    margin-bottom: .83em;
  }

  &__props {
    margin-bottom: 2rem;
  }

  &__prop {
    font-size: 1.6rem;
    display: flex;
    column-gap: 0.625em;
    margin-bottom: 0.625em;
  }

  &__prop-value {
    font-size: 1.6rem;
  }

  &__btn {
    font-size: 1.2rem;
    text-transform: uppercase;
  }

  &__view {
    display: flex;
    align-items: center;
    font-size: 1.6rem;
  }
}

</style>
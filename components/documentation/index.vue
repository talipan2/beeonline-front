<template>
  <div class="documentation">
    <div class="documentation__content">
      <h2 class="documentation__title">Файлы организации</h2>
      <div class="documentation__list" v-if="dataList.length">
        <DocumentationList :dataList="dataList" />
      </div>
      <p v-else class="documentation__text">Файлы не загружены</p>
      <UiButton to="/customer/documentation/custom/create" class="documentation__btn" variant="quinary" size="around">Загрузить</UiButton>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  dataList: {
    type: Array,
    default: [],
  }
})

</script>

<style lang="scss">

.documentation {
  font-size: 1rem;

  &__title {
    font-size: 2.8em;
    margin-bottom: .89em;
  }

  &__text {
    font-size: 1.6em;
    margin-bottom: 1.5em;
  }

  &__btn {
    width: fit-content;
    text-transform: uppercase;
    padding: 1em;
  }
}

</style>
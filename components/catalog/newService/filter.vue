<template>
  <div>
    <!-- Кнопка для открытия Tippy -->
    <UiButton 
      type="button" 
      class="filter__btn" 
      variant="quinary" 
      size="large"
      @click="toggleFilterModal"
    >
      Применить
    </UiButton>

    <Tippy
      ref="filterModal"
      class="tippy"
      :interactive="true"
      :placement="'bottom-start'"
      :arrow="false"
      :maxWidth="744"
      :interactiveBorder="false"
      :visible="isVisible"
      trigger="manual"
    >
      <template #content>
        <div class="filter-modal">
          <h3 class="filter-modal__title">Еще фильтры</h3>
          <div class="filter-modal__content">
            <div class="filter-modal__item">
              <p class="filter-modal__text">Регионы производства</p>
            </div>
          </div>
        </div>
      </template>
    </Tippy>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const filterModal = ref(null);
const isVisible = ref(false);

const toggleFilterModal = () => {
  if (filterModal.value.state.isShown) {
    filterModal.value.hide();
  } else {
    filterModal.value.show();
  }
};

const hideFilterModal = () => {
  filterModal.value.hide();
};
</script>

<template>
  <div class="filter-modal filter-modal_type_desktop" v-if="!isMobile">
    <!-- Кнопка для открытия Tippy -->
    <UiButton 
      type="button" 
      class="filter-modal__action-btn" 
      variant="senary" 
      size="large"
      @click="toggleFilterModal"
    >
      Еще фильтры
      <SvgoFilter class="svg-m" />
    </UiButton>
    <Tippy
      ref="filterModal"
      class="filter-modal__tippy"
      :interactive="true"
      :placement="'bottom-end'"
      :arrow="false"
      :maxWidth="744"
      :interactiveBorder="false"
      :offset="[170, 10]"
      :clickOutside="false"
      :hide-on-click="false"
      trigger="manual"
      z-index="999"
    >
      <template #content>
        <div class="filter-modal__container">
          <UiButton 
            type="button"
            class="filter-modal__close"
            variant="default"
            :without-padding="true"
            @click="hideFilterModal"
          >
            <SvgoClose class="svg-l" />
          </UiButton>
          <h3 class="filter-modal__title">Еще фильтры</h3>
          <CatalogNewServiceFilterForm v-model="filter" ref="filterRef"/>
          <div class="filter-modal__footer">
            <UiButton 
              type="button" 
              class="filter-modal__btn" 
              variant="tertiary" 
              size="large"
              @click="resetFilter"
            >
              Сбросить фильтры
            </UiButton>
            <UiButton 
              type="button" 
              class="filter-modal__btn" 
              variant="quinary" 
              size="large"
              @click="handleUpdateFilter"
            >
              Применить фильтры
            </UiButton>
          </div>
        </div>
      </template>
    </Tippy>
  </div>
  <div class="filter-modal filter-modal_type_mobile" v-else>
    <UiButton 
      type="button" 
      class="filter-modal__action-btn filter-modal__action-btn_type_mobile" 
      variant="default" 
      size="small"
      @click="mobileModal = true"
    >
      Еще фильтры
      <SvgoFilter class="svg-m" />
    </UiButton>
    <ModalsRoundBorder v-model="mobileModal" title="Еще фильтры" class="filter-modal__mobile-modal">
      <CatalogNewServiceFilterForm v-model="filter" />
      <template #footer>
        <UiButton 
          type="button" 
          class="filter-modal__btn" 
          variant="tertiary" 
          size="large"
          @click="resetFilter"
        >
          Сбросить фильтры
        </UiButton>
        <UiButton 
          type="button" 
          class="filter-modal__btn" 
          variant="quinary" 
          size="large"
          @click="handleUpdateFilter"
        >
          Применить фильтры
        </UiButton>
      </template>
    </ModalsRoundBorder>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['update:modelValue', 'updateFilter', 'resetFilter']);
const filterModal = ref(null);
const isVisible = ref(false);
const mobileModal = ref(false);
const isMobile = ref(false);
const filterRef = ref(null);

const filter = ref({
  location: [],
  is_stm: null,
  free_samples: [],
  material: [],
  free_stock: null,
  verification: null,
  batch_id: null,
  open_contacts: false,
  is_international: false,
});

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

const resetFilter = () => {
  filter.value = {
    location: [],
    is_stm: null,
    free_samples: [],
    material: [],
    free_stock: null,
    verification: null,
    batch_id: null,
    is_international: null,
  };
  emit('resetFilter');
  hideFilterModal();
  if(filterRef.value) {
    filterRef.value.resetLocationFilter()
  }
}

const handleUpdateFilter = () => {
  emit('updateFilter', {...filter.value})
  emit('update:modelValue', {...filter.value})
  hideFilterModal();
};

const updateIsMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

watch(() => props.modelValue, () => {
  filter.value = {
    location: props.modelValue.location || [],
    is_stm: props.modelValue.is_stm != null ? props.modelValue.is_stm : null,
    free_samples: props.modelValue.free_samples || [],
    material: [props.modelValue.materials_own ? 0 : undefined, props.modelValue.materials_tolling ? 1 : undefined].filter(item => item !== undefined),
    free_stock: props.modelValue.free_stock != null ? props.modelValue.free_stock : null,
    verification: props.modelValue.verification || null,
    batch_id: props.modelValue.batch_id || null,
    open_contacts: props.modelValue.open_contacts ? props.modelValue.open_contacts : false,
    is_international: props.modelValue.is_international ? props.modelValue.is_international : false,
  }
}, {deep: true, immediate: true})


onMounted(() => {
  updateIsMobile();
  window.addEventListener('resize', updateIsMobile);
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateIsMobile);
});

</script>

<style lang="scss">


.filter-modal {
  font-size: 1rem;
  font-family: 'lato', sans-serif;

  &_type_mobile {
    display: none;
  }
  

  .tippy-box {
    width: 74rem;
    font-size: 1rem;
  }

  &__action-btn {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.07);
    background: var(--border-color-quaternary);
    font-size: 1.6em;
    font-weight: 400;
    font-family: 'lato', sans-serif;
    color: var(--text-color-octonary);
    column-gap: .5em;
    border-radius: 8px;
    border: 2px solid transparent;

    svg {
      path {
        fill: var(--text-color-octonary);
      }
    }

    @include hover {
      background: #fff;
      color: var(--text-color-primary);
      svg {
        path {
          fill: var(--text-color-primary);
        }
      }
    }

    @include mobile {
      padding-block: .5em;
    }
  }
  
  &__title {
    font-size: 2.4em;
    font-weight: 700;
    color: var(--text-color-monodecimal);
  }

  &__container {
    width: 100%;
    padding: 3.2em;
    position: relative;
  }

  &__close {
    position: absolute;
    top: 2em;
    right: 2em;
    cursor: pointer;
  }

  &__content {
    display: flex;
    flex-direction: column;
    row-gap: 3.2em;
    // max-width: 43.6em;
    padding-bottom: 2.4em;
    margin-bottom: 2.4em;
    border-bottom: 1px solid #d9dae1;
    
    @include mobile {
      border-bottom: none;
      margin-bottom: 0;
    }
  }

  .radio-buttons__list {
    flex-direction: row;
  }

  &__mobile-modal {
    .filter-modal__btn {
      text-transform: uppercase;
    }
  }

  &__item {
    display: flex;
    align-items: center;
    column-gap: 1em;

    &:not(:first-child) {
      align-items: flex-start;
    }

    &_type_column {
      .radio-buttons__list {
        flex-direction: column;
      }
    }

    @include mobile {
      flex-direction: column;
      align-items: flex-start;
      row-gap: 1em;
    }
  }

  &__text {
    flex: 0 1 40%;
    font-size: 1.6em;
    line-height: 1.5em;
    font-weight: 700;
    color: var(--text-color-monodecimal);
  }

  &__action {
    flex: 0 1 40%;
  }

  .location__btn {
    width: 100%;
    max-width: 100%;
  }

  .location__location {
    flex-basis: 100%;
  }

  &__radio {
    flex-direction: row;
    column-gap: 4rem;
    .radio-buttons__label {
      font-size: 1.6rem;
    }
  }

  &__checkbox {
    flex-direction: column;
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
    column-gap: 1.2em;

  }
  .filter-modal__btn {
    font-size: 1.2rem;
    text-transform: uppercase;
  }

  @include mobile {
    &_type_desktop {
      display: none;
    }

    &_type_mobile {
      display: block;
    }
  }

}

</style>

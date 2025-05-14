<template>
  <div class="service-form" :class="{'loading': !isLoaded}">
    <div class="form-group form-group_type_secondary">
      <label class="form-group__title">
        Название услуги
      </label>
      <UiInput
        :rules="{ required: true, min: 2 }"
        name="name"
        v-model="service.name"
        label="Название компании"
        class="form-group__value"
      />
    </div>
    <div
      class="form-group form-group_type_secondary service-form__category"
    >
      <label class="form-group__title"> Выбор категории </label>
      <p class="service-form__description">Выберите до 4 категории</p>
      <UiCheckboxGroup
        class="form-group__value"
        variant="rounded"
        :options="category"
        v-model="service.category"
        name="category"
        label="Категория"
        :rules="{ minSelected: 1 }"
        :is-drop-down="true"
        :disabled="categoryDisabled"
      />
    </div>
    <div class="form-group form-group_type_secondary service-form__radio">
      <label class="form-group__title"> Партия </label>
      <UiRadioButtonGroup 
        class="form-group__value"
        name="batches"
        v-model="service.batches"
        label="Партия"
        :options="batchList"
        return-number
        :rules="{ required: true }"
      />
    </div>
  </div>
</template>

<script setup>
import { useEntityStore } from '~/store/entityStore';


const props = defineProps({
  service: {
    type: Object,
    default: () => ({}),
  },
});

const entityStore = useEntityStore();

const category = computed(() => entityStore.entityData.categories);

const batchList = computed(() => entityStore.entityData.serviceBatch)

const isLoaded = ref(true)

const categoryDisabled = (id) => {
  return (
    props.service?.category?.length >= 4 && !props.service?.category?.includes(id)
  );
};

onMounted(() => {
  if(entityStore.entityData.serviceBatch.length === 0) {
    isLoaded.value = false
    entityStore.getBatches().then(() => {}).finally(() => isLoaded.value = true)
  }
})
</script>


<style lang="scss">

.service-form {
  &__category {
    margin-bottom: 3.2em;

    .checkbox-group {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
    }

    .checkbox {
      flex: 0 1 45%;
      font-weight: 500;
    }
  }

  &__radio {
    .form-group__value {
      .radio-buttons__list {
        flex-direction: column;
      }
    }
  }

  &__description {
    font-size: 1.3em;
    margin-bottom: 1em;
    margin-top: -.3em;
  }



  @include mobile {
    .checkbox-group {
      flex-direction: column;
    }

    .checkbox {
      flex-basis: auto;
    }
  }
}

</style>
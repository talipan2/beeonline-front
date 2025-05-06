<template>
  <div class="service-form">
    <div class="form-group form-group_type_secondary">
      <label class="form-group__title">
        Название компании
        <CommonTooltip text="Допустимы изображения размером до 5Мб" />
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
      <UiCheckboxGroup
        class="form-group__value"
        variant="rounded"
        :options="category"
        v-model="service.category"
        name="category"
        label="Категория"
        :rules="{ required: true }"
        :is-drop-down="true"
      />
    </div>
    <div class="form-group form-group_type_secondary service-form__radio">
      <label class="form-group__title"> Партия </label>
      <UiRadioButtonGroup 
        class="form-group__value"
        name="batch"
        v-model="service.batch"
        label="Партия"
        :options="[
          {
            label: 'до 100',
            value: 1,
          },
          {
            label: 'от 100 до 1000',
            value: 2,
          },
          {
            label: 'от 1000',
            value: 3,
          },
        ]"
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
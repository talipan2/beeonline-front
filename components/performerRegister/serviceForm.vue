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
    <div class="form-group form-group_type_secondary">
      <label class="form-group__title"> Партия </label>
      <div class="form-group form-group__value">
        <div class="form-group-data">
          <UiInput
            :rules="{ required: true }"
            name="batch_max"
            label="Партия"
            v-model="service.batch_max"
            class="form-group__value"
            placeholder="От"
            type="number"
          />
        </div>
        <div class="form-group-data">
          <UiInput
            :rules="{ required: true }"
            name="batch_min"
            label="Партия"
            v-model="service.batch_min"
            class="form-group__value"
            placeholder="До"
            type="number"
          />
        </div>
      </div>
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
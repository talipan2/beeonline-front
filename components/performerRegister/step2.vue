<template>
  <CommonLayoutInfoCard title="Услуги" class="new-service-card-layout">
    <template v-if="modelValue.services?.length > 0">
      <div class="new-service-card-layout__service-list">
        <div class="new-service-card-layout__service" v-for="item in modelValue.services" :key="item">
          <UiButton
            type="button"
            class="new-service-card-layout__edit-service"
            variant="default"
            :without-padding="true"
            @click="handleEditService(item)"
          >
            <SvgoPencil class="svg-l" />
            Редактировать услугу
          </UiButton>
          <div class="form-group form-group_type_secondary">
            <div class="form-group-data">
              <label class="form-group__title">
                Название услуги
              </label>
              <div class="form-value">{{ item.name }}</div>
            </div>
          </div>
          <div class="form-group form-group_type_secondary new-service-card-layout__category">
            <div class="form-group-data">
              <label class="form-group__title">
                Категории
              </label>
              <div class="new-service-card-layout__category-badge-list">
                <div class="new-service-card-layout__category-badge" v-for="badge in item.product_categories" :key="badge">
                  {{ badge.name }}
                </div>
              </div>
            </div>
          </div>
          <div class="form-group form-group_type_secondary">
            <div class="form-group-data">
              <label class="form-group__title">
                Партия
              </label>
              <div class="form-group__value">
                <div class="form-value">{{ entityStore.getEntityLabelById('serviceBatch', item.batch) || '-' }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-if="!isPreview">
      <UiForm :submit="handleCreateService">
        <template v-if="!modelValue.services?.length">
          <PerformerRegisterServiceForm />
        </template>
        <UiButton
          v-if="modelValue.services?.length === 0"
          type="submit"
          variant="tertiary"
          size="large"
          class="new-service-card-layout__add-service"
        >
          Добавить услугу
        </UiButton>
      </UiForm>

      <UiButton
        v-if="modelValue.services?.length > 0"
        type="button"
        variant="tertiary"
        size="large"
        class="new-service-card-layout__add-service"
        @click="handleOpenAddService"
      >
        Добавить еще услугу
      </UiButton>
    </template>
    <template v-if="isPreview">
      <CommonAlerts :alert="'Услуг нет'" type="warning" v-if="!modelValue.services?.length" border-radius/>
      <UiButton
        v-if="modelValue.services?.length === 0"
        type="button"
        variant="tertiary"
        size="large"
        class="new-service-card-layout__add-service"
        @click="handleOpenAddService"
      >
        Добавить услугу
      </UiButton>
      <UiButton
        v-if="modelValue.services?.length > 0"
        type="button"
        variant="tertiary"
        size="large"
        class="new-service-card-layout__add-service"
        @click="handleOpenAddService"
      >
        Добавить еще услугу
      </UiButton>
    </template>

    <ModalsRoundBorder :is-open="editServiceModal" title="Редактирование услуги" @close="editServiceModal = false" size="lg" class="service-modal">
      <UiForm :submit="(values, form) => handleUpdateService(values, form, editServiceData)" class="service-modal__form">
        <PerformerRegisterServiceForm :service="editServiceData" />
        <UiButton class="new-service-card-layout__remove-service" type="button" variant="default" without-padding @click="handleDeleteService(editServiceData.id)">
          <SvgoDelete class="svg-m" />
          Удалить услугу
        </UiButton>
        <div class="new-service-card-layout__edit-service-buttons">
          <UiButton class="new-service-card-layout__edit-service-button" type="button" variant="tertiary" size="large" >Отмена</UiButton>
          <UiButton class="new-service-card-layout__edit-service-button" type="submit" variant="quinary" size="large" >Сохранить изменения</UiButton>
        </div>
      </UiForm>
    </ModalsRoundBorder>
    <ModalsRoundBorder :is-open="addNewServiceModal" title="Добавление услуги" @close="addNewServiceModal = false" size="lg" class="service-modal">
      <UiForm :submit="handleCreateService" class="service-modal__form">
        <PerformerRegisterServiceForm />
        <div class="new-service-card-layout__edit-service-buttons">
          <UiButton 
            class="new-service-card-layout__edit-service-button" 
            type="button" 
            variant="tertiary" 
            size="large"
            @click="addNewServiceModal = false"
          >
            Отменить
          </UiButton>

          <UiButton
            type="submit"
            variant="quinary"
            size="large"
            class="new-service-card-layout__edit-service-button"
          >
            Добавить услугу
          </UiButton>
        </div>
    </UiForm>
    </ModalsRoundBorder>
    <ConfirmModal />
  </CommonLayoutInfoCard>
</template>

<script setup>
import { useEntityStore } from '~/store/entityStore';
import { useToast } from 'vue-toastification';

const props = defineProps({
  modelValue: {
    type: Object,
  },
  isPreview: {
    type: Boolean,
    default: false,
  }
});

const emit = defineEmits(['update:modelValue']);
const {ConfirmModal, confirm} = useConfirmModal();
const toast = useToast();

const entityStore = useEntityStore();
const isCreateService = ref(false);
const editServiceModal = ref(false)
const editServiceData = ref({});
const addNewServiceModal = ref(false);

const handleOpenAddService = () => {
  addNewServiceModal.value = true;
}

const handleEditService = (item) => {
  editServiceData.value = {...item, category: item.product_categories ? item.product_categories.map(i => i.id) : []};
  editServiceModal.value = true;
}


// Создание услуги
const handleCreateService = (value, form) => {
  emit('update:modelValue', {...props.modelValue, services: [...props.modelValue.services, {
    id: props.modelValue.services.length + 1,
    name: value.name,
    batch: value.batch,
    product_categories: value.category.map(id => ({id: id, name:entityStore.getEntityLabelById('categories', id)}))
  }]});
  addNewServiceModal.value = false;
  toast.success('Услуга отправлена на модерацию');
  form.resetForm();
}

// Удаление услуги
const handleDeleteService = (id) => {
  confirm({
    title: 'Удаление услуги',
    message: 'Вы уверены, что хотите удалить услугу? Данные этой  услуги не сохранятся',
    confirmText: 'Удалить',
    cancelText: 'Отменить',
    onConfirm: () => {
      emit('update:modelValue', {...props.modelValue, services: props.modelValue.services.filter(item => item.id !== id)});
      editServiceModal.value = false;
      toast.warning('Услуга удалена');
    },
    onCancel: () => {
    }
  });
}

const handleUpdateService = (value, form, item) => {
  console.log(value, form, item)
  const index = props.modelValue.services.findIndex(i => i.id === item.id);
  const services = [...props.modelValue.services];
  services[index] = {
    ...item,
    name: value.name,
    batch: value.batch,
    product_categories: value.category.map(id => ({ id: id, name: entityStore.getEntityLabelById('categories', id) }))
  };
  emit('update:modelValue', { ...props.modelValue, services: services });
  editServiceModal.value = false;
  toast.success('Услуга отправлена на модерацию');
  form.resetForm();
}

</script>

<style lang="scss">

.new-service-card-layout {

  &__edit-service {
    color: var(--text-color-ternary);
    column-gap: .5em;
    line-height: 1em;
    margin-bottom: 1.6em;
    margin-left: auto;

    svg {
      width: 2rem;
      height: 2rem;
    }

    @include hover {
      color: var(--text-color-gray);

      svg {
        path {
          fill: var(--text-color-gray);
        }
      }
    }

    @include mobile {
      margin-left: 0;
      order: 1;
    }
  }

  &__service {
    margin-bottom: 3.2em;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &:not(:last-child) {
      border-bottom: 1px solid #e7e7e7;
    }
  }

  &__add-service {
    text-transform: uppercase;
    color: var(--text-color-ternary);
  }

  &__edit-service-buttons {
    display: flex;
    column-gap: 1em;
    justify-content: flex-end;

    @include mobile {
      flex-direction: column;
      align-items: normal;
      gap: 1em;
      box-shadow: 0 -2px 12px 0 rgba(0, 0, 0, 0.02);
      border-top: 1px solid #eff0f5;
      margin-inline: -3em;
      margin-bottom: -2.4em;
      padding: 1.6em;
    }
  }

  &__remove-service {
    color: var(--text-color-ternary);
    column-gap: .5em;
    margin-bottom: 2em;
    line-height: 2em;
    margin-top: -3em;
    margin-right: auto;

    svg {
      width: 2rem;
      height: 2rem;

      path {
        fill: var(--text-color-ternary);
      }
    }

    @include hover {
      color: var(--text-color-gray);

      svg {
        path {
          fill: var(--text-color-gray);
        }
      }
    }

    @include mobile {
      margin-top: -1.5em;
    }
  }

  &__edit-service-button {
    font-size: 1.2em;
    text-transform: uppercase;
  }

  &__category {
    &-badge-list {
      display: flex;
      gap: .8em;
      flex-wrap: wrap;
    }

    &-badge {
      font-size: 1.2em;
      font-weight: 600;
      line-height: 1.3em;
      color: #5a2b96;
      padding: .4em 1em;
      border-radius: 100px;
      background-color: #f2edff;
    }
  }
}

.service-modal {
  &__form {
    display: flex;
    flex-direction: column;
    flex: 1;

    .service-form {
      flex: 1;
    }
  }
}

</style>
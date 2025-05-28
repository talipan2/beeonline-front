<template>
  <CommonLayoutInfoCard title="Услуги" class="new-service-card-layout" :class="{'loading' : isLoading}">
    <div v-if="isLoading" class="new-service-card-layout__loading">
      <span class="spinner-border text-primary" ></span>
    </div>
    <template v-else>
      <p class="new-service-card-layout__limit-services">
        Вы можете добавить до 
        <span class="new-service-card-layout__limit-services-count">
          {{ limitServices }}
          {{plural(limitServices, {one: 'услуги', few: 'услуг', many: 'услуг'})}}.
        </span>
        <span v-if="modelValue.services?.length < limitServices">
          Доступно к созданию еще
            <span class="new-service-card-layout__limit-services-count">
              {{ limitServices - modelValue.services?.length }}
              {{plural(limitServices - modelValue.services?.length, {one: 'услуга', few: 'услуги', many: 'услуг'})}}.
            </span> 
          </span>
      </p>
      <template v-if="modelValue.services?.length > 0">
        <div class="new-service-card-layout__service-list" ref="serviceList">
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
                  <div class="form-value">{{ item.batch?.name || '' }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- Кнопки с isPreview === false и отображение формы, если добавлено 0 услуг -->
      <template v-if="!isPreview">
        <UiForm :submit="handleCreateService">
          <template v-if="!modelValue.services?.length">
            <PerformerRegisterServiceForm />
          </template>
          <UiButton
            v-if="modelValue.services?.length === 0"
            type="submit"
            variant="quinary"
            size="large"
            class="new-service-card-layout__add-service new-service-card-layout__add-service_type_strong"
          >
            Добавить услугу
          </UiButton>
        </UiForm>
        <UiButton
          v-if="modelValue.services?.length > 0 && modelValue.services?.length < limitServices"
          type="button"
          variant="tertiary"
          size="large"
          class="new-service-card-layout__add-service"
          @click="handleOpenAddService"
        >
          Добавить еще услугу
        </UiButton>
        <CommonPagination 
          class="new-service-card-layout__pagination" 
          v-if="page.last_page > 1" 
          :current-page="page.current_page" 
          :total-pages="page.last_page" 
          btn-type="square" 
          :position="'center'" 
          @change-page="handleChangePage"
        />
      </template>

      <!-- Кнопки с isPreview === true -->
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
          v-if="modelValue.services?.length > 0 && modelValue.services?.length < limitServices"
          type="button"
          variant="tertiary"
          size="large"
          class="new-service-card-layout__add-service"
          @click="handleOpenAddService"
        >
          Добавить еще услугу
        </UiButton>
        <CommonPagination 
          class="new-service-card-layout__pagination" 
          v-if="page.last_page > 1" 
          :current-page="page.current_page" 
          :total-pages="page.last_page" 
          btn-type="square" 
          :position="'center'" 
          @change-page="handleChangePage"
        />
      </template>
    </template>

    <!-- Модалка редактирования услуги -->
    <ModalsRoundBorder :is-open="editServiceModal" title="Редактирование услуги" @close="editServiceModal = false" size="lg" class="service-modal">
      <UiForm :submit="(values, form) => handleUpdateService(values, form, editServiceData)" class="service-modal__form">
        <PerformerRegisterServiceForm :service="editServiceData" />
        <UiButton class="new-service-card-layout__remove-service" type="button" variant="default" without-padding @click="handleDeleteService(editServiceData)">
          <SvgoDelete class="svg-m" />
          Удалить услугу
        </UiButton>
        <div class="new-service-card-layout__edit-service-buttons">
          <UiButton class="new-service-card-layout__edit-service-button" type="button" variant="tertiary" size="large" >Отмена</UiButton>
          <UiButton class="new-service-card-layout__edit-service-button" type="submit" variant="quinary" size="large" >Сохранить изменения</UiButton>
        </div>
      </UiForm>
    </ModalsRoundBorder>

    <!-- Модалка создания услуги -->
    <ModalsRoundBorder :is-open="addNewServiceModal" title="Добавление услуги" @close="addNewServiceModal = false" size="lg" class="service-modal">
      <UiForm :submit="handleCreateService" class="service-modal__form">
        <PerformerRegisterServiceForm :service="serviceData" />
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

    <!-- Модалка подтверждения удаления услуги -->
    <ConfirmModal />
  </CommonLayoutInfoCard>
</template>

<script setup>
import { useEntityStore } from '~/store/entityStore';
import { useToast } from 'vue-toastification';
import { useUserStore } from '~/store/userStore';
import { useSettingStore } from '~/store/settingStore';

const props = defineProps({
  modelValue: {
    type: Object,
  },
  isPreview: {
    type: Boolean,
    default: false,
  }
});

const page = ref({
  current_page: 1,
  last_page: 1
})

const emit = defineEmits(['update:modelValue']);
const {ConfirmModal, confirm} = useConfirmModal();
const toast = useToast();
const userStore = useUserStore();
const settingStore = useSettingStore();

const entityStore = useEntityStore();
const isCreateService = ref(false);
const editServiceModal = ref(false)
const editServiceData = ref({});
const addNewServiceModal = ref(false);
const serviceList = ref(null);
const isLoading = ref(false);

// Лимит услуг для создания
const limitServices = computed(() => 4)

const serviceData = ref({
  name: '',
  batches: [],
  product_categories: [],
})

const handleOpenAddService = () => {
  addNewServiceModal.value = true;
}

const handleEditService = (item) => {
  editServiceData.value = {...item, category: item.product_categories ? item.product_categories.map(i => i.id) : [], batches: item.batch?.id ? item.batch?.id : ''};
  editServiceModal.value = true;
}

const generateTempId = () => {
  return 'temp_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
};

// Создание услуги
const handleCreateService = (value, form) => {
  entityStore.createService({
    name: value.name,
    batch_id: value.batches,
    product_category_ids: value.category
  }, form).then(res => {
      if(res) {
        emit('update:modelValue', {...props.modelValue, services: [{
          id: res.id,
          name: value.name,
          batch: {id: value.batches, name:entityStore.getEntityLabelById('serviceBatch', value.batches)},
          product_categories: value.category.map(id => ({id: id, name:entityStore.getEntityLabelById('categories', id)})),
        }, ...props.modelValue.services]})

        addNewServiceModal.value = false;
        toast.success('Услуга добавлена');
        form.resetForm();
        serviceData.value = {
          name: '',
          batches: [],
          product_categories: [],
        };
      }
    })

  if(serviceList.value) {
    // скролл на новую услугу
    const rect = serviceList.value.getBoundingClientRect();
    const offset = window.scrollY + rect.top - settingStore.headerHeight;
    smoothScroll(offset, false);
  }
}

// Удаление услуги
const handleDeleteService = (service) => {
  confirm({
    title: 'Удаление услуги',
    message: 'Вы уверены, что хотите удалить услугу? Данные этой  услуги не сохранятся',
    confirmText: 'Удалить',
    cancelText: 'Отменить',
    onConfirm: () => {
      if(service.isLocal) {
        emit('update:modelValue', {...props.modelValue, services: props.modelValue.services.filter(item => item.id !== service.id)});
        editServiceModal.value = false;
        toast.warning('Услуга удалена');
      } else {
        entityStore.deleteService(service.id).then(res => {
          emit('update:modelValue', {...props.modelValue, services: props.modelValue.services.filter(item => item.id !== service.id)});
          toast.warning('Услуга удалена');
          editServiceModal.value = false;
        })
      }
    },
    onCancel: () => {
    }
  });
}

const handleUpdateService = (value, form, item) => {
  entityStore.changeService(item.id,
    {
      name: value.name,
      batch_id: value.batches,
      product_category_ids: value.category
    }
  ).then(res => {
    if(res) {
      const index = props.modelValue.services.findIndex(i => i.id === item.id);
      const services = [...props.modelValue.services];
      services[index] = {
        ...item,
        name: value.name,
        batch: {id: value.batches, name:entityStore.getEntityLabelById('serviceBatch', value.batches)},
        product_categories: value.category.map(id => ({ id: id, name: entityStore.getEntityLabelById('categories', id) }))
      };
      emit('update:modelValue', { ...props.modelValue, services: services });
      editServiceModal.value = false;
      if(props.isPreview) {
        toast.success('Услуга успешно обновлена');
      } else {
        toast.success('Услуга успешно обновлена');
      }
      form.resetForm();
    }
  })
  
}

const isLoaded = ref(false);

const loading = ref(false);

const handleChangePage = (currentPage) => {
  if (loading.value) return;
  loading.value = true;
  entityStore.getSelfServices(userStore.userData?.organization_id, {page: currentPage, per_page: 5})
  .then(res => {
    if (res?.services) {
      emit('update:modelValue', {...props.modelValue, services: [...res.services]});
    }
    if(res?.pagination) {
      page.value = res.pagination;
    }

    const rect = serviceList.value.getBoundingClientRect();
    const offset = window.scrollY + rect.top - settingStore.headerHeight;
    smoothScroll(offset, false);

  }).finally(() => {loading.value = false})
}

onMounted(async () => {
  // try {
  //   const res = await entityStore.getSelfServices(userStore.userData?.organization_id, {per_page: 5});
  //   if (res?.services) {
  //     emit('update:modelValue', {...props.modelValue, services: [...res.services]});
  //   }
  //   if(res?.pagination) {
  //     page.value = res.pagination;
  //   }
  // } catch (error) {
  //   console.error(error);
  // } finally {
  //   isLoaded.value = true;
  // }

  await nextTick(() => {});

  isLoading.value = true;
  entityStore.getSelfServices(userStore.userData?.organization_id, {per_page: 5}).then(res => {
    if (res?.services) {
      emit('update:modelValue', {...props.modelValue, services: [...res.services]});
    }
    if(res?.pagination) {
      page.value = res.pagination;
    }
  }).finally(() => {
    isLoading.value = false;
    isLoaded.value = true;
  })
});
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

  &__loading {
    .spinner-border {
      width: 3em;
      height: 3em;
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

  &__limit-services {
    font-size: 1.4em;
    line-height: 1em;
    color: var(--text-color-primary);
    margin-bottom: 1em;
  }

  &__limit-services-count {
    font-weight: 600;
    color: var(--text-color-ternary);
  }

  &__add-service {
    text-transform: uppercase;
    color: var(--text-color-ternary);

    &_type_strong {
      font-size: 1.3em;
      color: #fff;
    }
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

  &__pagination {
    margin-bottom: 1em;
  }

  &__remove-service {
    color: var(--text-color-ternary);
    column-gap: .5em;
    margin-bottom: 2em;
    line-height: 2em;
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
<template>
  <div class="performer-register-step-three">
    <CommonLayoutInfoCard title="Фото образцов" class="performer-register-step-three__layout">
      <template #action>
        <UiButton
          v-if="isPreview"
          type="button"
          class="performer-register-step-three__edit-btn"
          variant="default"
          :without-padding="true"
          @click="editGalleryModal = true"
        >
          <SvgoPencil class="svg-l" />
          Редактировать
        </UiButton>
      </template>
      <div class="performer-register-step-three__gallery">
        <template v-if="!isPreview">
          <p class="performer-register-step-three__gallery-text">Фотографии сделают вашу карточку более привлекательной для заказчика. Первые 4 фотографии будут отображаться в примерах работ в каталоге исполнителей.</p>
          <p class="performer-register-step-three__gallery-text">Рекомендуемый размер 300 x 340 px.</p>
        </template>
        <CommonGalleryLoadSecondary 
          v-model="gallery" 
          class="performer-register-step-three__gallery" 
          :isPreview="isPreview" 
          @movingImage="(item) => handleMovingImage(item, 'workGallery')" 
          moving-text='Переместить изображение в "Оборудование"'
        />
      </div>
    </CommonLayoutInfoCard>
    <CommonLayoutInfoCard title="Описание оборудования" class="performer-register-step-three__layout">
      <template #action>
        <UiButton
          v-if="isPreview"
          type="button"
          class="performer-register-step-three__edit-btn"
          variant="default"
          :without-padding="true"
          @click="editEquipmentDescriptionModal = true"
        >
          <SvgoPencil class="svg-l" />
          Редактировать
        </UiButton>
      </template>
      <template v-if="!isPreview">
      <p class="performer-register-step-three__gallery-text">В нескольких предложениях расскажите об имеющимся оборудовании. Это даст более детальную информацию об ваших производственных возможностях.</p>
      </template>
      <div class="form-group form-group_type_secondary" v-if="!isPreview">
        <UiTextArea
          class="form-group__value"
          v-model="equipmentDescription"
          name="equipment_description"
          label="Описание оборудования"
        />
      </div>
      <div class="form-group form-group_type_secondary" v-else>
        <div class="form-group-data">
          <div class="form-value multiline-text">
            {{ equipmentDescription || "-" }}
          </div>
        </div>
      </div>
    </CommonLayoutInfoCard>
    <CommonLayoutInfoCard title="Фото оборудования" class="performer-register-step-three__layout">
      <template #action>
        <UiButton
          v-if="isPreview"
          type="button"
          class="performer-register-step-three__edit-btn"
          variant="default"
          :without-padding="true"
          @click="editWorkGalleryModal = true"
        >
          <SvgoPencil class="svg-l" />
          Редактировать
        </UiButton>
      </template>
      <div class="performer-register-step-three__gallery">
        <template v-if="!isPreview">
          <p class="performer-register-step-three__gallery-text">Прикрепите несколько фотографий оборудования, которым обладаете.</p>
          <p class="performer-register-step-three__gallery-text">Рекомендуемый размер 300 x 340 px.</p>
        </template>
        <CommonGalleryLoadSecondary 
          v-model="workGallery" 
          class="performer-register-step-three__gallery" 
          :isPreview="isPreview" 
          @movingImage="(item) => handleMovingImage(item, 'gallery')"
          moving-text='Переместить изображение в "Примеры работ"'
        />
      </div>
    </CommonLayoutInfoCard>
    <ModalsRoundBorder :is-open="editGalleryModal" title="Редактирование: Примеры работ" @close="editGalleryModal = false" size="lg">
      <CommonGalleryLoadSecondary v-model="galleryDataFormModal" class="performer-register-step-three__gallery" @movingImage="(item) => handleMovingImageModal(item, 'workGallery')" :moving-text="'Переместить в галерею «Оборудование»'" />
      <div class="performer-register-step-three__forward-container" v-if="forwardStatusWorkGalleryList.length > 0">
        <h3>Изображения, перемещённые в раздел «Оборудование»</h3>
        <div class="performer-register-step-three__forward-list">
          <div class="performer-register-step-three__forward-item" v-for="item in forwardStatusWorkGalleryList" :key="item?.id">
            <img :src="item.url" :alt="item.url">
            <UiButton class="gallery-load-secondary__btn gallery-load-secondary__btn_type_delete" type="button" variant="default" :without-padding="true" @click="handleReturnImage(item, 'gallery')">
                <SvgoClose class="svg-l"/>
              </UiButton>
          </div>
        </div>
    </div>
      <div class="performer-register-step-three__btn-container">
          <UiButton 
            class="performer-register-step-three__btn" 
            type="button" 
            variant="tertiary" 
            size="large"
            @click="editGalleryModal = false"
          >
            Отменить
          </UiButton>

          <UiButton
            type="button"
            variant="quinary"
            size="large"
            class="performer-register-step-three__btn"
            @click="handleSaveGalleryModal"
          >
            Сохранить изменения
          </UiButton>
          
        </div>
    </ModalsRoundBorder>
    <ModalsRoundBorder :is-open="editEquipmentDescriptionModal" title="Редактирование: Описание оборудования" @close="editEquipmentDescriptionModal = false" size="lg">
      <div class="form-group form-group_type_secondary">
        <UiTextArea
          class="form-group__value"
          v-model="equipmentDescriptionFormModal"
          name="equipment_description"
          label="Описание оборудования"
        />
      </div>
      <div class="performer-register-step-three__btn-container">
          <UiButton 
            class="performer-register-step-three__btn" 
            type="button" 
            variant="tertiary" 
            size="large"
            @click="editEquipmentDescriptionModal = false"
          >
            Отменить
          </UiButton>

          <UiButton
            type="button"
            variant="quinary"
            size="large"
            class="performer-register-step-three__btn"
            @click="handleUpdateEquipmentDescription"
          >
            Сохранить изменения
          </UiButton>
          
        </div>
    </ModalsRoundBorder>
    <ModalsRoundBorder :is-open="editWorkGalleryModal" title="Редактирование: Оборудование" @close="editWorkGalleryModal = false" size="lg">
      <CommonGalleryLoadSecondary v-model="workGalleryDataFormModal" class="performer-register-step-three__gallery" @movingImage="(item) => handleMovingImageModal(item, 'gallery')" :moving-text="'Переместить в галерею «Примеры работ»'"/>
      <div class="performer-register-step-three__forward-container" v-if="forwardStatusGalleryList.length > 0">
        <h3>Изображения перемещенные в "Примеры работ"</h3>
        <div class="performer-register-step-three__forward-list">
          <div class="performer-register-step-three__forward-item" v-for="item in forwardStatusGalleryList" :key="item?.id">
            <img :src="item.url" :alt="item.url">
            <UiButton class="gallery-load-secondary__btn gallery-load-secondary__btn_type_delete" type="button" variant="default" :without-padding="true" @click="handleReturnImage(item, 'workGallery')">
              <SvgoClose class="svg-l"/>
            </UiButton>
          </div>
        </div>
      </div>
      <div class="performer-register-step-three__btn-container">
          <UiButton 
            class="performer-register-step-three__btn" 
            type="button" 
            variant="tertiary" 
            size="large"
            @click="editWorkGalleryModal = false"
            
          >
            Отменить
          </UiButton>

          <UiButton
            type="button"
            variant="quinary"
            size="large"
            class="performer-register-step-three__btn"
            @click="handleSaveWorkGalleryModal"
          >
            Сохранить изменения
          </UiButton>
        </div>
    </ModalsRoundBorder>
  </div>
</template>

<script setup>
import { useOrganizationStore } from '~/store/organizationStore';


const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  },
  isPreview: {
    type: Boolean,
    default: false
  }
})

const editGalleryModal = ref(false);
const editWorkGalleryModal = ref(false);
const editEquipmentDescriptionModal = ref(false);
const organizationStore = useOrganizationStore();

const emit = defineEmits(['update:modelValue'])

const gallery = computed({
  get: () => props.modelValue.gallery,
  set: (value) => {
    emit('update:modelValue', {
      ...props.modelValue,
      gallery: [...value],
    })
  }
})

const workGallery = computed({
  get: () => props.modelValue.workSpaces,
  set: (value) => {
    emit('update:modelValue', {
      ...props.modelValue,
      workSpaces: [...value]
    })
  }
})

const equipmentDescription = computed({
  get: () => props.modelValue.equipment_description,
  set: (value) => {
    emit('update:modelValue', {
      ...props.modelValue,
      equipment_description: value,
    })
  }
});


const galleryDataFormModal = ref([]);
const workGalleryDataFormModal = ref([]);
const equipmentDescriptionFormModal = ref('');

const forwardStatusGalleryList = ref([]);
const forwardStatusWorkGalleryList = ref([]);

const handleMovingImage = (item, type) => {
  if (!item?.id || !type) return;
  
  switch (type) {
    case 'gallery':
      gallery.value.push(item);
      workGallery.value = workGallery.value.filter(el => Number(el.id) !== item?.id);
      break;

    case 'workGallery':     
      workGallery.value.push(item);
      gallery.value = gallery.value.filter(el => el.id !== item?.id);
      break;
  }
};

const handleMovingImageModal = (item, type) => {
  if (!item?.id || !type) return;
  
  switch (type) {
    case 'gallery':
      forwardStatusGalleryList.value.push(item);
      workGalleryDataFormModal.value = workGalleryDataFormModal.value.filter(el => Number(el.id) !== item?.id);
      break;
    case 'workGallery':
      forwardStatusWorkGalleryList.value.push(item);
      galleryDataFormModal.value = galleryDataFormModal.value.filter(el => el.id !== item?.id);
      break;
  }
};


const handleSaveGalleryModal = () => {
  const basePayload = [
    {
      collection_name: 'gallery',
      items: galleryDataFormModal.value.map(item => ({ id: item.id })),
    }
  ];

  if (forwardStatusWorkGalleryList.value.length > 0) {
    const item = [
      ...forwardStatusWorkGalleryList.value.map(item => ({ id: item.id })),
      ...workGallery.value.map(item => ({ id: item.id }))
    ]
    basePayload.push({
      collection_name: 'equipment',
      items: item,
    });
    
    forwardStatusWorkGalleryList.value.map(item => {
      workGallery.value.push(item);
    })
  }

  handleUpdateGallery(basePayload);
  gallery.value = [...galleryDataFormModal.value];
  editGalleryModal.value = false;
};

const handleSaveWorkGalleryModal = () => {
  const basePayload = [
    {
      collection_name: 'equipment',
      items: workGalleryDataFormModal.value.map(item => ({ id: item.id })),
    }
  ];

  if (forwardStatusGalleryList.value.length > 0) {
    const item = [
      ...forwardStatusGalleryList.value.map(item => ({ id: item.id })),
      ...gallery.value.map(item => ({ id: item.id }))
    ];
    basePayload.push({
      collection_name: 'gallery',
      items: item,
    });

    forwardStatusGalleryList.value.map(item => {
      gallery.value.push(item)
    })

  }

  handleUpdateGallery(basePayload);
  workGallery.value = [...workGalleryDataFormModal.value];
  editWorkGalleryModal.value = false;
}

const handleUpdateGallery = (data, type) => {
  if(!data.length) return;
  organizationStore.setPubCardsGallery(data).then((res) => {
    forwardStatusGalleryList.value = [];
    forwardStatusWorkGalleryList.value = [];
  })
}

const handleReturnImage = (item, type) => {
  switch (type) {
    case 'gallery':
      galleryDataFormModal.value.push(item);
      forwardStatusWorkGalleryList.value = forwardStatusWorkGalleryList.value.filter(el => el.id !== item?.id);
      break;

    case 'workGallery':
      workGalleryDataFormModal.value.push(item);
      forwardStatusGalleryList.value = forwardStatusGalleryList.value.filter(el => el.id !== item?.id);
  }
}

const handleUpdateEquipmentDescription = () => {
  organizationStore.editEquipmentDescription({
    equipment_description: equipmentDescriptionFormModal.value
  }).then(res => {
    equipmentDescription.value = equipmentDescriptionFormModal.value
    editEquipmentDescriptionModal.value = false
  })
}

watch(() => gallery.value, (value) => {
  if(gallery.value) {
    galleryDataFormModal.value = [...gallery.value];
  } else {
    return []
  }
}, { deep: true, immediate: true })

watch(() => workGallery.value, (value) => {
  if(workGallery.value) {
    workGalleryDataFormModal.value = [...workGallery.value];
  } else {
    return [];
  }
}, { deep: true, immediate: true })

watch(() => equipmentDescription.value, (value) => {
  equipmentDescriptionFormModal.value = equipmentDescription.value;
}, {deep: true, immediate: true})

</script>

<style lang="scss">

.performer-register-step-three {
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  row-gap: 2.4em;

  &__layout {
    padding: 3.2em;
  }

  &__gallery-text {
    font-size: 1.6em;
    font-weight: 500;
    line-height: 1.5em;
    color: #8387a3;
    margin-bottom: .5em;
  }

  &__gallery {
    margin-top: 3.2rem;
  }

  &__btn-container {
    margin-top: 3.2em;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    column-gap: 2em;

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

  &__btn {
    text-transform: uppercase;
  }

  &__edit-btn {
    color: var(--text-color-ternary);
    column-gap: .5em;
    line-height: 1em;

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
  }

  &__forward-container {
    margin-top: 3.2em;

    h3 {
      font-size: 2em;
      margin-bottom: .5em;
    }
  }

  &__forward-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
  }

  &__forward-item {
    flex: 0 1 calc(18% - 1.6em);
    aspect-ratio: 1 / 1;
    position: relative;
    background-color: transparent;
    border-radius: 8px;
    background-color: #F0F0F2;

    img {
      width: 100%;
      height: 100%;
      border-radius: inherit;
      object-fit: contain;
    }
  }
}

</style>
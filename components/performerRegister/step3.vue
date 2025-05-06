<template>
  <div class="performer-register-step-three">
    <CommonLayoutInfoCard title="Примеры работ" class="performer-register-step-three__layout">
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
          <p class="performer-register-step-three__gallery-text">Фотографии сделают вашу карточку более привлекательной для заказчика</p>
          <p class="performer-register-step-three__gallery-text">Рекомендуемый размер 300 x 340 px.</p>
        </template>
        <CommonGalleryLoadSecondary v-if="gallery.length > 0" v-model="gallery" class="performer-register-step-three__gallery" :isPreview="isPreview"/>
        <CommonAlerts v-else alert="Нет примеров работ" type="warning"/>
      </div>
    </CommonLayoutInfoCard>
    <CommonLayoutInfoCard title="Оборудование" class="performer-register-step-three__layout">
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
          <p class="performer-register-step-three__gallery-text">Фотографии сделают вашу карточку более привлекательной для заказчика</p>
          <p class="performer-register-step-three__gallery-text">Рекомендуемый размер 300 x 340 px.</p>
        </template>
        <CommonGalleryLoadSecondary v-if="workGallery.length > 0" v-model="workGallery" class="performer-register-step-three__gallery" :isPreview="isPreview"/>
        <CommonAlerts v-else alert="Нет оборудования" type="warning"/>
      </div>
    </CommonLayoutInfoCard>
    <ModalsRoundBorder :is-open="editGalleryModal" title="Редактирование: Примеры работ" @close="editGalleryModal = false" size="lg">
      <CommonGalleryLoadSecondary v-model="gallery" class="performer-register-step-three__gallery"/>
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
          >
            Сохранить изменения
          </UiButton>
          
        </div>
    </ModalsRoundBorder>
    <ModalsRoundBorder :is-open="editWorkGalleryModal" title="Редактирование: Оборудование" @close="editWorkGalleryModal = false" size="lg">
      <CommonGalleryLoadSecondary v-model="workGallery" class="performer-register-step-three__gallery"/>
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
          >
            Сохранить изменения
          </UiButton>
        </div>
    </ModalsRoundBorder>
  </div>
</template>

<script setup>

const props = defineProps({
  modelValue: {
    type: Object,
  },
  isPreview: {
    type: Boolean,
    default: false
  }
})



const editGalleryModal = ref(false);
const editWorkGalleryModal = ref(false);

const emit = defineEmits(['update:modelValue'])

const gallery = computed({
  get: () => props.modelValue.gallery,
  set: (value) => {
    emit('update:modelValue', {
      ...props.modelValue,
      gallery: value
    })
  }
})

const workGallery = computed({
  get: () => props.modelValue.gallery,
  set: (value) => {
    emit('update:modelValue', {
      ...props.modelValue,
      gallery: value
    })
  }
})



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
}

</style>
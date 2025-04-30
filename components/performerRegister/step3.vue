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
        <CommonGalleryLoadSecondary v-model="gallery" class="performer-register-step-three__gallery" :isPreview="isPreview"/>
      </div>
    </CommonLayoutInfoCard>
    <CommonLayoutInfoCard title="Фабрика и оборудование" class="performer-register-step-three__layout">
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
        <CommonGalleryLoadSecondary v-model="workGallery" class="performer-register-step-three__gallery" :isPreview="isPreview"/>
      </div>
    </CommonLayoutInfoCard>
    <ModalsRoundBorder :is-open="editGalleryModal" title="Карточка" @close="editGalleryModal = false" size="lg">
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
    <ModalsRoundBorder :is-open="editWorkGalleryModal" title="Карточка" @close="editWorkGalleryModal = false" size="lg">
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

const gallery = ref([
  {
    id: 2,
    url: "https://i.pinimg.com/736x/95/94/6b/95946bb1360de15e7d3ef2a8587a3c8f.jpg"
  },
  {
    id: 1,
    url: "https://i.pinimg.com/736x/95/94/6b/95946bb1360de15e7d3ef2a8587a3c8f.jpg"
  },
  {
    id: 3,
    url: "https://i.pinimg.com/736x/95/94/6b/95946bb1360de15e7d3ef2a8587a3c8f.jpg"
  },
  {
    id: 4,
    url: "https://api.test-v2.bee-online.ru/storage/32851/1.jpg"
  },
  {
    id: 5,
    url: "https://i.pinimg.com/736x/c4/3d/b1/c43db129f98f2e6fcd6028a1cb31bff9.jpg"
  }
])

const workGallery = ref([
  {
    id: 2,
    url: "https://api.test-v2.bee-online.ru/storage/32851/1.jpg"
  },
]);

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
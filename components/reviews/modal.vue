<template>
  <UiModal class="reviews-modal modal" v-model="settingStore.reviewModalStatus" @confirm="() => confirm()">
    <template #content>
      <div class="reviews-modal__content">
        <div class="reviews-modal__header">
          <h3 v-if="reviewsState === 'my-reviews'">Дополнить отзыв</h3>
          <h3 v-if="reviewsState === 'reviews'">Ответить на отзыв</h3>
        </div>
        <div>
          <p class="form-group__title" v-if="reviewsState === 'my-reviews'">Текст вашего дополнения</p>
          <p class="form-group__title" v-if="reviewsState === 'reviews'" >Текст вашего ответа</p>
          <UiTextArea />
        </div>
        <div class="reviews-modal__btn-container">
          <UiButton class="reviews-modal__btn" type="button" variant="quinary" size="large" @click="() => confirm()">Отправить</UiButton>
        </div>
      </div>
    </template>
  </UiModal>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';

const props = defineProps({
  reviewsState: {
    type: String,
    required: true,
    validate: (value) => ['my-reviews', 'reviews'].includes(value),
  },
})

const settingStore = useSettingStore();

function confirm() {
  settingStore.reviewModalStatus = false;
}

</script>

<style lang="scss">

.reviews-modal {
  font-size: 1.6rem;

  .modal-dialog {
    max-width: 35%;
    width: 100%;
  }

  .modal-content {
    padding: 3.4em 2.5em 2.5em;
  }

  &__header {
    border-bottom: 1px solid var(--border-color-secondary);
    margin-bottom: 1.875em;
    
    h3 {
      font-size: 1.75em;
      margin-bottom: .89em;
    }
  }

  &__btn-container {
    display: flex;
    justify-content: flex-end;
  }

  &__btn {
    font-size: .75em;
    flex: 0 1 33%;
    text-transform: uppercase;
  }
  
}

</style>
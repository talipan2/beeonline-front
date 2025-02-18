<template>
  <UiModal class="reviews-modal modal" size="xs" v-model="settingStore.reviewModalStatus" @confirm="() => confirm()">
    <template #content>
      <div class="reviews-modal__content">
        <div class="reviews-modal__header">
          <h3 v-if="reviewsState === 'my-reviews'">Дополнить отзыв</h3>
          <h3 v-if="reviewsState === 'reviews'">Ответить на отзыв</h3>
        </div>
        <div>
          <p class="form-group__title" v-if="reviewsState === 'my-reviews'">Текст вашего дополнения</p>
          <p class="form-group__title" v-if="reviewsState === 'reviews'" >Текст вашего ответа</p>
          <UiTextArea class="reviews-modal__textarea"/>
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

  // .modal-content {
  //   max-width: 35%;
  //   width: 100%;

  //   @include tablet {
  //     max-width: 50%;
  //   }

  //   @include mobile {
  //     max-width: 70%;
  //   }

  //   @include small-mobile {
  //     max-width: 95%;
  //   }
  // }

  .modal-content {
    padding: 3.4em 2.5em 2.5em;

    @include mobile {
      padding: 1em;
    }
  }

  &__header {
    border-bottom: 1px solid var(--border-color-secondary);
    margin-bottom: 1.875em;
    
    h3 {
      font-size: 1.75em;
      margin-bottom: .89em;

      @include mobile {
        font-size: 1.8rem;
      }
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

    @include mobile {
      flex-basis: 100%;
    }
  }

  &__textarea {
    @include mobile {
      .text-area__container {
        padding-bottom: 50%;
      }
    }
  }
  
}

</style>
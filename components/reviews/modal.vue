<template>
  <UiModal class="reviews-modal modal" size="xs" v-model="settingStore.reviewModalStatus" @confirm="() => confirm()">
    <template #content>
      <UiForm :submit="handleSubmit">
        <div class="reviews-modal__content">
          <div class="reviews-modal__header">
            <h3 v-if="reviewsState === 'my-reviews'">Дополнить отзыв</h3>
            <h3 v-if="reviewsState === 'reviews'">Ответить на отзыв</h3>
          </div>
          <div>
            <p class="form-group__title" v-if="reviewsState === 'my-reviews'">Текст вашего дополнения</p>
            <p class="form-group__title" v-if="reviewsState === 'reviews'" >Текст вашего ответа</p>
            <UiTextArea class="reviews-modal__textarea" name="text" :rules="{required: true}" v-model="text" label="Текст"/>
          </div>
          <div class="reviews-modal__btn-container">
            <UiButton class="reviews-modal__btn" type="submit" variant="quinary" size="large">Отправить</UiButton>
          </div>
        </div>
      </UiForm>
    </template>
  </UiModal>
</template>

<script setup>
import { useReviewsStore } from '~/store/reviewsStore';
import { useSettingStore } from '~/store/settingStore';
import { useToast } from 'vue-toastification';

const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  },
  userId: {
    type: [String, Number],
    required: true,
  },
  reviewsState: {
    type: String,
    required: true,
    validate: (value) => ['my-reviews', 'reviews'].includes(value),
  },
})

const text = ref('');

const settingStore = useSettingStore();
const reviewsStore = useReviewsStore();
const toast = useToast();

const emit = defineEmits(['updateReplyReview', 'updateAdditionalReview']);

const handleSubmit = (value, form) => {
  if(props.reviewsState === 'my-reviews' ) {
    addSupplementReview(value, form)
  } else if( props.reviewsState === 'reviews' ) {
    addAnswerReview(value, form)
  }
}

const addSupplementReview = (value, form) => {
  reviewsStore.addAdditionsReview({...value, id: props.id, user_id: props.userId}, form).then((res) => {
    emit('updateAdditionalReview', {id: res.id, text: res.text, created_at: res.created_at});
    toast.success('Отзыв успешно дополнен');
    settingStore.reviewModalStatus = false;
  }).catch(err => {
    toast.error('Произошла ошибка');
  })
}

const addAnswerReview = (value, form) => {
  reviewsStore.replyReview({...value, id: props.id, user_id: props.userId}, form).then(res => {
    emit('updateReplyReview', {id: res.id, text: res.text, created_at: res.created_at});
    toast.success('Ответ успешно отправлен');
    settingStore.reviewModalStatus = false;
  }).catch(err => {
    toast.error('Произошла ошибка');
  })
}

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
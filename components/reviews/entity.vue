<template>
  <div class="reviews-entity">
    <div class="reviews-entity__wrapper" v-if="data.length">
      <div class="reviews-entity__list">
        <div class="reviews-entity__review">
          <div class="reviews-entity__review-header">
            <div class="reviews-entity__title">
              <h3>РАФИ</h3>
              <span class="reviews-entity__date">03.10.2023 11:34</span>
            </div>
            <CommonRating :isCountRating="false" :isCountReviews="false" v-if="!reviewsState"/>
          </div>
          <div class="reviews-entity__review-content">
            <p class="reviews-entity__review-title">Плюсы сотрудничества:</p>
            <p class="reviews-entity__review-text">Сговорчивость руководства, адекаватность коммуникации, соблюдение
              договоренностей, неконфликтность и решение возникающи
              проблем в пользу заказчика.
              Прозрачный договор, возможность все оформлять официально и со всеми документами.
              Отдельная благодарность менеджеру Ольге за гибкое управление и сопровождение на все�
              этапа�</p>
            <p class="reviews-entity__review-title">Минусы сотрудничества:</p>
            <p class="reviews-entity__review-text">Сговорчивость руководства, адекаватность коммуникации, соблюдение
              договоренностей, неконфликтность и решение возникающи
              проблем в пользу заказчика.
              Прозрачный договор, возможность все оформлять официально и со всеми документами.
              Отдельная благодарность менеджеру Ольге за гибкое управление и сопровождение на все�
              этапа�</p>
          </div>
          <div class="reviews-entity__addition">
            <p class="reviews-entity__addition-date">Отзыв дополнен 13.08.2023 16:17</p>
            <p class="reviews-entity__addition-text">ДОПОЛНЕНИЕ от 13 августа 2023 года к отзыву в ответ на комментарий ниже от производства по пунктам, чтобы бравировать исключительно фактами, а не эмоциями.
              Уточню, данный ответ на комментарий дается мной не с целью оправдания себя, и не с целью очернения ООО Аурика. Единственная «идея» данного комментария – защитить свои интересы, если придется обращаться в высшие инстанции (и надеюсь, что не придется).
              • 28 марта я написала, что производство резинок будет задержано, 4 мая я написала, что производство отправляет резинки на склад ООО Аурика (в ответ на то, что я «пропала» и «не кто не предупредил о такой задержке, была полная тишина»).
              • «Менеджер Александра, с которой проис�
              одило общение госпожи Подкоповой, уведомляла ее, о том, что есть производственный график, который планируется на месяц вперед» - ни слова об этом не было. Более того, это я по телефону говорила, что понимаю, что у ни�
              может быть очередь на производство и это нормально, но мне нужно знать точную дату, когда оно начнется.
            </p>
          </div>
          <div class="reviews-entity__answer">
            <div class="image-box reviews-entity__answer-logo">
              <img :src="defaultImageLogo" alt="">
            </div>
            <div class="reviews-entity__answer-content">
              <div v-if="!reviewsState">
                <p class="reviews-entity__answer-date">01.09.2024 20:57</p>
                <h4 class="reviews-entity__answer-title">ООО"ЛИННЕТЕКС"</h4>
              </div>
              <div v-if="reviewsState === 'my-reviews'">
                <p class="reviews-entity__answer-title">Вам ответили 11.04.2023 11:01:</p>
              </div>
              <div v-if="reviewsState === 'reviews'">
                <p class="reviews-entity__answer-title">Вы ответили 11.04.2023 11:01:</p>
              </div>
              <p class="reviews-entity__answer-text">
                Генрик Давитович, благодарим вас за такие теплые слова! Работаем!)))
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="reviews-entity__empty" v-else>
      <p class="reviews-entity__text">Отзывов нет</p>
    </div>
  </div>
</template>

<script setup>
import defaultImageLogo from '~/assets/images/nophoto_pc.png'

const props = defineProps({
  data: {
    type: Array,
    default: () => ([1,2]),
  },
  reviewsState: {
    type: String,
    default: '',
    validate: (value) => ['my-reviews', 'reviews'].includes(value),
  }
})

</script>

<style lang="scss">

.reviews-entity {
  background-color: #fff;


  &__empty {
    font-size: 1em;
    background-color: #fff3cd;
    border: 2px solid #ffeeba;
    color: var(--text-color-info-secondary);
    padding: .5em .81em;
  }

  &__review {
    padding: 1.875em;
    box-shadow: var(--box-shadow-primary);
  }

  &__review-header {
    margin-bottom: 1.875em;
  }

  &__title {
    font-size: 1em;
    display: flex;
    justify-content: space-between;
    align-items: top;
    margin-bottom: .75em;

    h3 {
      font-size: 1.875em;

      @include mobile {
        font-size: 1.8rem;
      }
    }


  }

  &__date {
    color: var(--text-color-ternary);
    font-size: .875em;
    font-weight: 400;

    @include mobile {
      font-size: 1.2rem;
    }
  }

  &__review-content {
    padding-block: 2.625em 1.875em;
    border-top: 1px solid var(--border-color-secondary);
  }

  &__review-title {
    font-family: 'fira-sans', sans-serif;
    font-size: 1em;
    text-transform: uppercase;
    margin-bottom: .875em;

    @include mobile {
      font-size: 1.4rem;
    }
  }

  &__review-title:not(:first-child) {
    margin-top: 2.625em;
  }

  &__review-text {
    @include mobile {
      font-size: 1.2rem;
    }
  }

  &__answer {
    border-top: 1px solid var(--border-color-secondary);
    padding-top: 1.875em;
    display: flex;
  }

  &__answer-logo {
    flex: 0 1 13%;
    padding-top: 13%;

    @include small-mobile {
      flex: 0 0 25%;
      padding-top: 25%;
    }
  }

  &__answer-content {
    flex: 0 1 75%;
  }

  &__answer-date {
    font-size: .75em;
    line-height: 2em;
  }

  &__answer-title {
    font-family: 'lato', sans-serif;
    font-size: 0.93em;
    margin-bottom: 1.4em;

    @include mobile {
      font-size: 1.2rem;
    }
  }

  &__answer-text {
    font-size: 0.93em;

    @include mobile {
      font-size: 1.2rem;
    }
  }

  &__addition {
    margin-left: 8%;
    margin-bottom: 1.875em;
    border-left: 2px solid var(--border-color-quaternary);
    padding-block: 1.25em;
    padding-left: 1.25em;
  }

  &__addition-date {
    margin-bottom: 1em;
    @include mobile {
      font-size: 1.2rem;
    }
  }

  &__addition-text {
    @include mobile {
      font-size: 1.2rem;
    }
  }
}

</style>
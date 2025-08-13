<template>
  <div class="review-card">
    <div class="review-card__header">
      <div class="review-card__title">
        <h3 v-if="reviewsState">{{ data.user?.name }} {{ data.user?.position ? `, ${data.user?.position}` : '' }}</h3>
        <h3 v-else>{{ data.owner_pubcard?.name }}</h3>
        <span class="review-card__date">{{ data.date_created }}</span>
      </div>
      <CommonRating :isCountRating="false" :isCountReviews="false" v-if="!reviewsState" :rating="data.rate" />
    </div>
    <div class="review-card__review-content">
      <p class="review-card__review-title">Плюсы сотрудничества:</p>
      <p class="review-card__review-text">{{ data.text_positive }}</p>
      <p class="review-card__review-title">Минусы сотрудничества:</p>
      <p class="review-card__review-text">{{ data.text_negative }}</p>
    </div>

    <template v-if="data.additions?.length > 0">
      <template v-for="addition in data.additions" :key="addition.id">
        <div class="review-card__addition">
          <p class="review-card__addition-date">Отзыв дополнен {{ addition.date_added || formatDate(addition.created_at, 'DD.MM.YYYY mm:HH') }}</p>
          <p class="review-card__addition-text">{{ addition.text }}</p>
        </div>
      </template>
    </template>
    <template v-if="data.files">
      <CommonFileList class="review-card__files" :data-list="formattedFileList" :download-text="true"/>
    </template>
    <div class="review-card__answer" v-if="data.reply?.id">
      <div class="image-box review-card__answer-logo">
        <img :src="data.about_pubcard.logo || defaultImageLogo" alt="Логотип" v-if="reviewsState === 'my-reviews'">
        <img :src="data.owner_pubcard.logo || defaultImageLogo" alt="Логотип" v-else-if="reviewsState === 'reviews'">
        <img :src="data.about_pubcard.logo || defaultImageLogo" alt="Логотип" v-else>
      </div>
      <div class="review-card__answer-content">
        <div v-if="!reviewsState">
          <p class="review-card__answer-date">{{ formatDate(data.reply?.created_at, 'DD.MM.YYYY mm:HH') }}</p>
          <h4 class="review-card__answer-title">{{ data.about_pubcard.name }}</h4>
        </div>
        <div v-if="reviewsState === 'my-reviews'">
          <p class="review-card__answer-title">Вам ответили {{ data.reply?.date_replied || formatDate(data.reply?.created_at, 'DD.MM.YYYY mm:HH') }}</p>
        </div>
        <div v-if="reviewsState === 'reviews'">
          <p class="review-card__answer-title">Вы ответили {{ data.reply?.date_replied || formatDate(data.reply?.created_at, 'DD.MM.YYYY mm:HH') }}</p>
        </div>
        <p class="review-card__answer-text">{{ data.reply?.text }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import defaultImageLogo from '~/assets/images/nophoto_pc.png'

const props = defineProps({
  data: {
    type: Object,
    default: () => {},
    required: true
  },
  reviewsState: {
    type: String,
    default: '',
    validate: (value) => ['my-reviews', 'reviews'].includes(value),
  },
  isPubCurd: {
    type: Boolean,
    default: false
  }
})

const formattedFileList = computed(() => {
  if(props.data.files) {
    return props.data.files.map((file) => {
      return {id: file.id, name: file.url.split('/').pop(), url: file.url, type: file.url.split('.').pop().toLowerCase()}
    })
  } else {
    return []
  }
});

</script>

<style lang="scss">

.review-card {
    padding: 1.875em;
    box-shadow: var(--box-shadow-primary);
    background-color: var(--color-white);

  &__header {
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

  &__files {
    font-size: .6em;

    .file__icon {
      flex-basis: auto;
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
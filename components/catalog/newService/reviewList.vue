<template>
  <div class="new-service-reviews">
    <CommonRating :single-star="true" :rating="pub_card.reviews_stats_about?.average_rating" :reviews="pub_card.reviews_about_count" />
    <div class="new-service-reviews__list">
      <div class="new-service-reviews__item" v-for="review in reviewList" :key="review.id">
        <CommonRating :rating="review.rate" :is-count-rating="false" :is-count-reviews="false"/>
        <h3 class="new-service-reviews__item-title">{{ review.owner_pubcard?.name }}</h3>
        <p class="new-service-reviews__item-text"><span>Плюсы сотрудничества:</span><br>{{ review.text_positive}}</p>
        <p class="new-service-reviews__item-text"><span>Минусы сотрудничества:</span><br>{{ review.text_negative}}</p>
        <template v-if="review.additions && review.additions.length > 0">
          <div class="new-service-reviews__item-addition" v-for="addition in review.additions" :key="addition.id">
            <span>Отзыв дополнен: {{ addition.date_added }}</span>
            <p class="new-service-reviews__item-text">{{ addition.text }}</p>
          </div>
        </template>
        <CommonFileList class="new-service-reviews__item-files" :data-list="reviewsDocFormat(review.files)" :download-text="true"/>
        <div class="new-service-reviews__item-reply" v-if="review.reply">
          <span>{{ formatDate(review.reply.created_at, 'DD.MM.YYYY mm:HH') }}</span>
          <h4 class="new-service-reviews__item-title">{{ review.about_pubcard.name }}</h4>
          <p class="new-service-reviews__item-text">{{ review.reply.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  reviewList: {
    type: Array,
    default: () => ([]),
  },
  pub_card: {
    type: Object,
    default: () => ({}),
  }
})

const reviewsDocFormat = (file) => {
  if(!file || file.length === 0) return {};

  return file.map(item => { 
    return {
      id: item.id, 
      name: item.url ? item.url.split('/').pop() : '', 
      url: item.url, 
      type: item.url ? item.url.split('.').pop().toLowerCase() : '',
    }
   })
}

</script>

<style lang="scss">

.new-service-reviews {
  font-size: 1rem;

    .rating {
      margin-bottom: 3.2rem;
      font-family: 'fira-sans', sans-serif;
    }
    
    .rate {
      margin-right: .8rem;
      font-size: 1.4rem;
    }

    .rating__count {
      font-size: 2.4rem;
      margin-right: 2rem;
      font-weight: 500;
    }

    .rating__reviews {
      font-size: 2rem;
    }

    .file__icon {
      flex: 0 0 6%;
    } 

  &__list {
    display: flex;
    flex-direction: column;
    gap: 2.4em;
  }

  &__item {
    padding: 2.4em;
    background-color: #f8f8f8;
    border-radius: 24px;

    .rating {
      margin-bottom: 2.4rem;
    }
  }

  &__item-title {
    font-size: 2em;
    font-weight: 400;
    line-height: 1.2em;
    color: #000;
    margin-bottom: 1em;
  }

  &__item-text {
    font-family: 'Inter', sans-serif;
    font-size: 1.8em;
    font-weight: 400;
    line-height: 1.5em;
    color: #26222c;
    white-space: pre-line;
    margin-bottom: 2em;

    span {
      display: inline-block;
      text-transform: uppercase;
      font-weight: 500;
      margin-bottom: .5em;
    }
  }

  &__item-addition {
    margin-left: 8%;
    border-left: #D9D9D9 solid 2px;
    padding-left: 1em;

    span {
      display: inline-block;
      font-size: 1.4em;
      margin-bottom: 1em;
    }
  }

  &__item-reply {
    border-top: 2px solid #D9D9D9;
    padding-top: 2em;

    span {
      display: inline-block;
      font-size: 1.4em;
      margin-bottom: 1em;
    }
  }

  @include mobile {
    font-size: .9rem;
  }
}

</style>
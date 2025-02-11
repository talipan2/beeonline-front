<template>
  <div class="default-card">
    <div class="default-card__content">
      <div class="default-card__image">
        <img :src="card.logoUrl ? card.logoUrl : defaultImage" data-trademark-logo="" :alt="card.title">
      </div>
      <div class="default-card__info">
        <p class="default-card__title">{{ card.title }}</p>
        <div class="default-card__description" :class="{ 'show-full': showFullText }" v-html="card.description" ></div>
        <button type="button" class="default-card__btn" @click="showFullText = !showFullText">{{ showFullText ? 'Скрыть' : 'Подробнее' }}</button>
      </div>
      <div class="default-card__setting">
        <button type="button" class="default-card__btn" @click="editCard">Изменить</button>
        <button type="button" class="default-card__btn" @click="emitDelete">Удалить</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import defaultImage from '~/assets/images/nophoto_pc.png'
import { useSettingStore } from '~/store/settingStore';

const props = defineProps({
  card : {
    type: Object,
    default: {},
  },
})

const settingStore = useSettingStore();
const showFullText = ref(false);

const emit = defineEmits(['deleteCard', 'editCard']);

const emitDelete = () => {
  emit('deleteCard');
};

const editCard = () => {
  emit('editCard', {...props.card});
}

</script>



<style lang="scss">

.default-card {
  box-shadow: var(--box-shadow-primary);
  padding: 1.5rem;
  font-size: 1.6rem;
  word-break: break-all;

  &__content {
    display: flex;
    gap: 2rem;
  }

  &__image {
    flex: 1 0 auto;
    width: 16%;
    position: relative;
    height: 0;
    padding-bottom: 16%;
    background-color: #fff;
    display: block;
    margin: 5px 0;
    border: 1px solid #C4C4C4;
    overflow: hidden;

    img {
      position: absolute;
      inset: 0;
    }
  }



  &__info {
    flex: 1 1 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 1rem;
  }

  &__description {
    flex: 1;
    max-width: 100%;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* Показываем только 10 строк */
    -webkit-box-orient: vertical;
  }

  .show-full {
    -webkit-line-clamp: unset; /* Убираем ограничение строк */
  }

}

@include mobile {
  .default-card {
    font-size: 1.2rem;

    &__setting {
      flex: 0 0 20%;
    }
  }
}
</style>
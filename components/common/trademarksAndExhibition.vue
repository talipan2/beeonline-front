<template>
  <div class="brands-exhibitions">
    <div class="brands-exhibitions__container">
      <h3 class="brands-exhibitions__title">Собственные торговые марки</h3>
      <div class="brands-exhibitions__cards">
        <CardsDefaultCard v-for="(trademark, index) in trademarksList" :key="index" :card="trademark" @editCard="handleChangeCard($event)" 
        @deleteCard="deleteTrademarkCard(index)"/>
      </div>
      <div class="brands-exhibitions__btn-container form-group">
        <UiButton type="button" class="form-group-data__btn" variant="tertiary" size="large"
          @click="createNewCard">Добавить собственную торговую марку</UiButton>
      </div>
    </div>
    <div class="brands-exhibitions__container">
      <h3 class="brands-exhibitions__title">Участие в выставках</h3>
      <div class="brands-exhibitions__btn-container form-group">
        <UiButton type="button" class="form-group-data__btn" variant="tertiary" size="large"
          @click="openExhibitionsModal">Добавить выставку</UiButton>
      </div>
    </div>
    <ModalsTrademarksModal v-model="trademarksList" :editCard="currentEditCard"/>
    <ModalsExhibitionModal />
  </div>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';


const settingStore = useSettingStore();
const currentEditCard = ref(null);

function openTrademarksModal () {
  settingStore.trademarksModal = true;
}

function openExhibitionsModal () {
  settingStore.exhibitionModal = true;
}

const handleChangeCard = (card) => {
  currentEditCard.value = card;
  openTrademarksModal();
}

const createNewCard = () => {
  currentEditCard.value = null;
  openTrademarksModal();
}


const trademarksList = ref([]);

const deleteTrademarkCard = (index) => {
  trademarksList.value.splice(index, 1);
};

</script>

<style lang="scss">

.brands-exhibitions {
  
  &__container {
    margin-bottom: 3.5rem;
  }

  &__title {
    margin-bottom: .83em;
  }

  &__btn-container {
    max-width: 48%;

    button {
      color: var(--text-color-primary);
      font-weight: 400;
    }
  }

  &__cards{
    display: flex;
    flex-direction: column;
    row-gap: 1.5rem;
  }
}

</style>
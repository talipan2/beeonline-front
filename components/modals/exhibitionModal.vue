<template>
  <UiModal class="add-modal modal" v-model="settingStore.exhibitionModal" title="Добавить выставку" @confirm="() => confirm()">
    <template #header></template>
    <template #content>
      <div class="form-group">
        <label for="brand" class="form-group__title">
          Ссылка
          <UiInput id="brand" class="form-group__value"/>
        </label>
      </div>
      <div class="form-group">
        <label for="description" class="form-group__title">
          Описание
          <CommonWysiwyg class="form-group__value" id="description"/>
        </label>
      </div>
      <UiButton class="modal-btn" variant="quinary" size="large">Создать</UiButton>
    </template>
  </UiModal>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';


const settingStore = useSettingStore();

function confirm() {
  settingStore.exhibitionModal = false;
}
</script>

<style lang="scss">

.add-modal {
  .modal-title {
    margin-block: 3.5rem 2.5rem;
    font-size: 2.8rem;
  }

  .add-file {
    margin-block: 0 1.15rem;
  }

  .modal-btn {
    font-size: 1.3rem;
    padding: 10px;
    margin-top: 3rem;
  }

}

</style>
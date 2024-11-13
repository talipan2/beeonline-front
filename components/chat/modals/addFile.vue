<template>
  <UiModal class="add-file-modal modal" v-model="settingStore.addFileModal" title="" @confirm="() => confirm()" :closeButton="false">
    <template #content>
      <div class="add-file-modal__wrapper">
        <div class="add-file-modal__header">
          <h2 class="add-file-modal__title">Отправить файл</h2>
        </div>
        <div class="add-file-modal__content">
          <div class="add-file-modal__list">
            <CommonFileList 
              :data-list="fileList" 
              :changed="true" 
              @removeFile="$emit('removeFile', $event)" 
              :divider="false" 
              :download-text="true"
            />
          </div>
          <div class="form-group">
            <label class="form-group-data form-group__title"> 
              Подпись 
              <UiInput
                class="form-group__value"
                type="text"
                placeholder="Подпись"
                name="add-file-modal"

              />
            </label>
          </div>
        </div>
        <div class="add-file-modal__footer">
          <CommonDocumentLoader class="add-file-modal__loader add-file-modal__btn" v-model="formData" @addFile="$emit('addFile', $event)" :is-list="true">
            <template #action>
              <UiButton class="add-file-modal__btn" type="button" variant="quinary" size="large" >Добавить</UiButton>
            </template>
          </CommonDocumentLoader>
          <UiButton class="add-file-modal__btn" type="button" variant="tertiary" size="large" @click="() =>confirm()">Отмена</UiButton>
          <UiButton class="add-file-modal__btn" type="button" variant="quinary" size="large">Отправить</UiButton>
        </div>
      </div>
    </template>
  </UiModal>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';

const props = defineProps({
  fileList: {
    type: Array,
    default: [],
  },
  modelValue: {
    type: FormData,
    default: () => new FormData(),
  }
})

const formData = ref(new FormData());


const settingStore = useSettingStore();
const emit = defineEmits(['clearFiles', 'update:modelValue', 'addFile', 'removeFile']);

function confirm() {
  settingStore.addFileModal = false;
  emit('clearFiles');
}


// watch(() => props.fileList, () => {
//   if(props.fileList.length !== 0) {
//     props.modelValue.forEach((file) => {
//       formData.append('file[]', file);
//     })
//   }
//   emit('update:modelValue', formData);
// }, {deep: true})

watch(() => formData.value, () => {
  const newFormData = new FormData();

  formData.value.forEach((value, key) => {
    newFormData.append(key, value);
  });

  props.modelValue.forEach((value, key) => {
    newFormData.append(key, value);
  });

  // Обновляем modelValue с новыми файлами
  emit('update:modelValue', newFormData);
}, { deep: true });

</script>

<style lang="scss">

.add-file-modal {
  font-size: 1rem;
  
  .modal-content {
    width: 33vw;
  }

  &__header, &__footer, &__content {
    padding: 2em;
  }

  &__header {
    background-color: var(--bg-tertiary-color);
    padding-bottom: 1em;
  }
  
  &__title {
    font-size: 1.8em;
  }

  &__list {
    .file__item {
      justify-content: start;
    }

    .file__name {
      font-size: 1.1em;
      color: #000;

      &:hover {
        color: var(--text-color-hover-primary);
      }
    }
  }

  &__footer {
    display: flex;
    column-gap: 1em;
    background-color: var(--bg-tertiary-color);
  }

  &__loader {
    .add-file__input {
      margin-block: 0;
      font-size: 1rem;
    }
  }

  &__btn {
    font-size: 1.2em;
    text-transform: uppercase;
    line-height: 1em;
    font-weight: normal;
  }

  &__btn:first-child {
    margin-right: auto;
  }
}

</style>
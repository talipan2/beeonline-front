<template>
    <UiModal class="review-modal modal" v-model="settingStore.addReviewModal" title="" @confirm="() => confirm()">
      <template #content>
        <div class="review-modal__wrapper">
          <div class="review-modal__header">
            <h2 class="review-modal__title">Оставить отзыв</h2>
          </div>
          <div class="review-modal__content">
            <Form class="review-modal__form" @submit="handleSubmit">
              <div class="form-group">
                <label class="form-group-data form-group__title">
                  Выберите оценку
                  <CommonRating class="review-modal__rating"
                    :isSelected="true"
                    :isCountRating="false"
                    :isReviewText="false"
                    :isCountReviews="false"
                    v-model="reviewData.rating"
                  />
                </label>
              </div>
              <div class="form-group">
                <label class="form-group-data form-group__title">
                  Плюсы сотрудничества:
                  <UiTextArea
                    class="form-group__value review-modal__textarea"
                    type="text"
                    label="плюсы сотрудничества"
                    name="advantagesOfCooperation"
                    :rules="{required: true}"
                    v-model="reviewData.advantagesOfCooperation"
                  />
                </label>
              </div>
              <div class="form-group">
                <label class="form-group-data form-group__title">
                  Минусы сотрудничества:
                  <UiTextArea
                    class="form-group__value review-modal__textarea"
                    type="text"
                    label="минусы сотрудничества"
                    name="disadvantagesOfCooperation"
                    :rules="{ required: true }"
                    v-model="reviewData.disadvantagesOfCooperation"
                  />
                </label>
              </div>
              <div class="review-modal__file-load" ref="fileLoad">
                <UiDragAndDropFile
                  :visible="true"
                  :maxSize="maxFilesSize"
                  :accept="acceptFile"
                  @addFile="addFile"
                  :draggable-component="fileLoad || {}"
                />
              </div>
              <CommonFileList
                @removeFile="removeFile"
                :dataList="uploadedFiles"
                :changed="true"
                :divider="false"
                :download-text="true"
                variant="dark"
              />
              <UiButton class="review-modal__btn" type="submit" variant="quinary" size="large">Отправить</UiButton>
            </Form>
          </div>
        </div>
      </template>
    </UiModal>
  </template>

  <script setup>
  import { useSettingStore } from '~/store/settingStore';

  const fileLoad = ref(null);
  const maxFilesSize = 2048
  const acceptFile = ['jpg', 'jpeg', 'png', 'bmp', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'zip', 'rar', '7z']
  const formData = ref(new FormData());
  const reviewData = ref({
    rating: null,
    advantagesOfCooperation: null,
    disadvantagesOfCooperation: null,
    files: [],
  })

  const uploadedFiles = ref([]);

  const addFile = (file) => {
    uploadedFiles.value.push({
      id: crypto.randomUUID(),
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.name.split('.').pop().toLowerCase(),
    });
  }

  const removeFile = (id) => {
    uploadedFiles.value = uploadedFiles.value.filter(item => item.id !== id);
  }

  watch(uploadedFiles, (newFiles) => {
    const newFormData = new FormData();
    newFiles.forEach(item => {
      newFormData.append('file[]', item.file);
    });
    formData.value = newFormData;
    reviewData.value.files = formData.value;
  }, { deep: true });

  const settingStore = useSettingStore();
  function confirm() {
    settingStore.addReviewModal = false;
  }

  const handleSubmit = () => {
    console.log(reviewData.value)
  }

  </script>

  <style lang="scss">

  .review-modal {
    font-size: 1rem;

    .modal-content {
      width: 28vw;
    }

    &__header, &__content {
      padding: 2em;
    }

    &__header {
      background-color: var(--bg-tertiary-color);
      padding-bottom: 1em;
    }

    &__title {
      font-size: 1.8em;
    }

    &__rating {
      margin-top: .5em;

      .rate {
        font-size: 20px;
      }

      .rate__choice {
        font-size: 13px;
      }
    }

    .form-group__title {
      color: var(--text-color-secondary);
    }

    &__file-load {
      height: 15em;
      position: relative;
      margin-block: 1em;
    }

    &__textarea {
      .text-area__container {
        padding-bottom: 18%;
      }
    }

    &__btn {
      font-size: 1.2em;
      margin-inline: auto;
      width: 50%;
      text-transform: uppercase;
      font-weight: 400;
    }
  }

  </style>

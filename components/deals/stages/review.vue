<template>
    <div class="step-review">
      <p class="step-review__text">Сделка завершится когда заказчик напишет отзыв</p>
      <Form class="step-review__form" @submit="handleSubmit">
        <div class="form-group">
          <label class="form-group-data form-group__title">
            Выберите оценку
            <CommonRating class="step-review__rating"
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
              class="form-group__value step-review__textarea"
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
              class="form-group__value step-review__textarea"
              type="text"
              label="минусы сотрудничества"
              name="disadvantagesOfCooperation"
              :rules="{ required: true }"
              v-model="reviewData.disadvantagesOfCooperation"
            />
          </label>
        </div>
        <div class="step-review__file-load" ref="fileLoad">
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
        />
        <UiButton class="step-review__btn" type="submit" variant="quinary" size="large">Отправить</UiButton>
      </Form>
    </div>
</template>

<script setup>

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

const handleSubmit = () => {
  console.log(reviewData.value)
}

</script>

<style lang="scss">

.step-review {

  &__text {
    font-size: 1.6em;
    margin-bottom: 1em;
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

  .file__icon {
    flex: 0 0 10%;
  }

  &__file-load {
    height: 15em;
    position: relative;
    margin-block: 1em;
  }

  &__textarea {
    .text-area__container {
      padding-bottom: 18%;

      @include mobile {
        padding-bottom: 30%;
      }
    }
  }

  &__btn {
    font-size: 1.2em;
    text-transform: uppercase;
    width: 50%;
    margin-inline: auto;
    margin-bottom: 1em;
  }
}

</style>
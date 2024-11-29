<template>
  <div class="support-create">
    <h2 class="support-create__title">Создать запрос</h2>
    <Form class="support-create__form" @submit="handleSubmit">
      <label class="support-create__label form-group__title">
        Тема обращения
        <UiSelect
          class="support-create__select form-group__value"
          :options="topicList"
          v-model="appealData.topic"
          name="support-topic"
          label="Тема обращения"
          :rules="{ required: true }"
        />
      </label>
      <label class="support-create__label form-group__title">
        Опишите вашу ситуацию
        <UiTextArea
          class="form-group__value"
          v-model="appealData.situation"
          name="support-situation"
          label="Опишите вашу ситуацию"
          :rules="{ required: true, min: 2 }"
        />
      </label>
      <div class="support-create__footer">
        <CommonFileList
          class="support-create__files"
          :dataList="appealData.files"
          :changed="true"
          @removeFile="removeFile"
        />
        <CommonDocumentLoader
          class="support-create__loader"
          @addFile="addFile"
          text="Прикрепить файлы"
          :isList="true"
        />
        <UiButton
          class="support-create__btn"
          type="submit"
          variant="quinary"
          size="large"
          >Отправить</UiButton
        >
      </div>
    </Form>
  </div>
</template>

<script setup>

const topicList = ref([
  { id: 1, label: "Выберете тему", value: "", disabled: true },
  { id: 2, label: "Вопросы по участию в мероприятии", value: "topic-2" },
  { id: 3, label: "Прочее", value: "topic-3" },
  { id: 4, label: "Вопросы по модерации", value: "topic-4" },
  { id: 5, label: "Отзывы", value: "topic-5" },
  { id: 6, label: "Технические вопросы", value: "topic-6" },
  { id: 7, label: "Финансовый отдел", value: "topic-7" },
  { id: 8, label: "Другое", value: "topic-7" },
  { id: 9, label: "Жалоба на заказчика", value: "topic-7" },
  { id: 10, label: "Информация о компании", value: "topic-7" },
]);

const appealData = ref({
  topic: "",
  situation: "",
  files: [],
});

const formData = ref(new FormData());

function addFile(files) {
  appealData.value.files.push({
    id: crypto.randomUUID(),
    name: files.name,
    url: URL.createObjectURL(files),
    type: files.name.split(".").pop().toLowerCase(),
    file: files,
  });
  formData.value.append("files[]", files);
}

function removeFile(id) {
  appealData.value.files = appealData.value.files.filter(
    (file) => file.id != id
  );
  formData.value.delete("files[]");
  appealData.value.files.forEach((file) =>
    formData.value.append("files[]", file.file)
  );
}



const handleSubmit = () => {
  console.log(appealData.value);
};
</script>

<style lang="scss">
.support-create {
  font-size: 1rem;

  &__title {
    font-size: 2.8em;
    margin-bottom: 0.5em;
  }

  &__form {
    color: var(--text-color-secondary);
  }

  &__select {
    select {
      color: var(--text-color-secondary);
    }
  }

  &__footer {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    column-gap: 1em;

    .add-file__input {
      margin-block: 0;
    }
  }

  &__files {
    flex: 0 1 100%;
  }

  &__btn {
    font-size: 1.2em;
    text-transform: uppercase;
    flex: 0 1 50%;
  }
}
</style>

<template>
  <div class="support-create">
    <h2 class="support-create__title">Создать запрос</h2>
    <UiForm class="support-create__form" :submit="handleSubmit">
      <label class="support-create__label form-group__title">
        Тема обращения
        <UiSelect
          class="support-create__select form-group__value"
          :options="typeList"
          v-model="appealData.type"
          name="type"
          label="Тема обращения"
          :rules="{ required: true }"
        />
      </label>
      <label class="support-create__label form-group__title">
        Опишите вашу ситуацию
        <UiTextArea
          class="form-group__value"
          v-model="appealData.description"
          name="description"
          label="Опишите вашу ситуацию"
          :rules="{ required: true, min: 2 }"
        />
      </label>
      <CommonDocumentLoaderAndList v-model="appealData.files"
          text="Прикрепить файлы"
          :extension="['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'rtf', 'pdf', 'jpeg', 'png', 'jpg', 'gif', 'psd', 'djvu', 'fb2', 'ps', 'zip', 'rar']"
        />
      <div class="support-create__footer">
        <UiButton
          class="support-create__btn"
          type="submit"
          variant="quinary"
          size="large"
          >Отправить</UiButton
        >
      </div>
    </UiForm>
  </div>
</template>

<script setup>
import { useSupportStore } from "~/store/supportStore";

const supportStore = useSupportStore();

const typeList = computed(() => {
  const list = [
    { id: null, label: "Выберите тему", value: null, disabled: true },
  ];
  return list.concat(supportStore.getSupportTicketTypes.map((item) => (
    { id: item.id, label: item.label, value: item.value }
  )));
});

const appealData = ref({
  type: null,
  situation: "",
  files: [],
});

const loading = ref(false);

const handleSubmit = (values, form) => {
    if (loading.value) return;
    loading.value = true;

    const data = {
        ...appealData.value,
    };

    data.files = data.files.map((file) => {
        return file.id;
    });

    return supportStore
    .createSupportTicket(data)
    .then((response) => {
        form.resetForm();
        appealData.value = {
            type: null,
            situation: "",
            files: [],
        };

        navigateTo({ path: `/support/${response.data.id}` });
    });
};

onMounted(() => {
    supportStore.fetchSupportTicketTypes();
});
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

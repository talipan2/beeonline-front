<template>
  <UiModal class="modal balance-documents-modal" v-model="settingStore.balanceDocumentsModalStatus" title="Запрос закрывающих документов" @confirm="() => confirm()">
    <template #header></template>
    <template #content>
      <Form @submit="handleSubmit">
        <label class="form-group-data form-group__title">
          Комментарий
          <UiTextArea type="number" class="form-group__value" name="message"/>
        </label>
        <UiButton type="submit" class="balance-documents-modal__btn" variant="quinary" size="large">Отправить</UiButton>
      </Form>
    </template>
  </UiModal>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';
import { useTariffsStore } from "~/store/tariffsStore";

const settingStore = useSettingStore();
const tariffsStore = useTariffsStore();

const loading = ref(false);

const confirm = () => {
  settingStore.balanceDocumentsModalStatus = false;
}

const handleSubmit = (values, form) => {
    console.log(values, form);
    if (loading.value) return;
    loading.value = true;

    tariffsStore.closingDocsRequest(values, form)
    .then((data) => {
        form.resetForm();
        confirm();
    }).finally(() => {
        loading.value = false;
    });
}

</script>

<style lang="scss">

.balance-documents-modal {
  font-size: 1rem;

  .modal-dialog {
    width: 21%;
  }

  .modal-content {
    padding: 5.5em 2em 2em;
  }

  .modal-title {
    font-size: 2.8em;
  }

  &__btn {
    font-size: 1.2em;
    text-transform: uppercase;
    width: 50%;
    margin-inline: auto;
  }

  @include desktop {
    .modal-dialog {
      width: 30%;
    }

    .modal-title {
      font-size: 2em;
    }
  }

  @include tablet {
    .modal-dialog {
      width: 40%;
    }
  }

  @include mobile {
    .modal-dialog {
      width: 70%;
    }
  }

  @include small-mobile {
    .modal-dialog {
      width: 95%;
    }
  }
}

</style>

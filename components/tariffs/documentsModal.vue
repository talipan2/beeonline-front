<template>
  <UiModal class="modal balance-documents-modal" size="xs" v-model="settingStore.balanceDocumentsModalStatus" title="Запрос закрывающих документов" @confirm="() => confirm()">
    <template #header></template>
    <template #content>
      <Form @submit="handleSubmit" v-if="!ticket">
        <label class="form-group-data form-group__title">
          Комментарий
          <UiTextArea type="number" class="form-group__value" name="message" :rules="{max: 255}" label="Комментарий"/>
        </label>
        <UiButton type="submit" class="balance-documents-modal__btn" variant="quinary" size="large">Отправить</UiButton>
      </Form>
      <template v-else>
        <p class="balance-documents-modal__text">Запрос успешно отправлен</p>
        <UiButton type="button" @click="toChat" class="balance-documents-modal__btn" variant="quinary" size="large">Перейти</UiButton>
      </template>
    </template>
  </UiModal>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';
import { useTariffsStore } from "~/store/tariffsStore";
import { useUserStore } from '~/store/userStore';

const settingStore = useSettingStore();
const tariffsStore = useTariffsStore();
const userStore = useUserStore();

const loading = ref(false);
const ticket = ref(null);

const confirm = () => {
  settingStore.balanceDocumentsModalStatus = false;
}

const handleSubmit = (values, form) => {
    if (loading.value) return;
    loading.value = true;

    tariffsStore.closingDocsRequest(userStore.userData?.id, values, form)
    .then((response) => {
        form.resetForm();
        // confirm();
        ticket.value = response.data;
    }).finally(() => {
        loading.value = false;
    });
}

watch(() => settingStore.balanceDocumentsModalStatus, (newVal) => {
    if (newVal) {
        ticket.value = null;
    }
})

function toChat() {
    console.log(ticket.value);
    if (!ticket.value) return;
    settingStore.balanceDocumentsModalStatus = false;
    navigateTo(`/support/${ticket.value.id}`);
}

</script>

<style lang="scss">
.balance-documents-modal {
  font-size: 1rem;

  .modal-content {
    padding: 2em 2em 2em;
  }

  .modal-title {
    font-size: 2.8em;
  }

  &__text {
    font-size: 1.6em;
    margin-bottom: 1em;
  }

  &__btn {
    font-size: 1.2em;
    text-transform: uppercase;
    width: 50%;
    margin-inline: auto;
  }

  @include desktop {

    .modal-title {
      font-size: 2em;
    }
  }

}

</style>

<template>
  <UiModal
    v-model="settingStore.authModalStatus"
    @confirm="() => confirm()"
    class="auth-modal modal"
  >
    <template #content>
      <Login />
    </template>

  </UiModal>
</template>

<script setup>
import { useSettingStore } from "~/store/settingStore";

const settingStore = useSettingStore();


const confirm = () => {
  settingStore.authModalStatus = false;
};

</script>

<style lang="scss">
.auth-modal {
  font-family: "lato", sans-serif;
  font-size: 1rem;

  .modal-dialog {
    max-width: 40em;
  }

  .modal-content {
    padding: 2em;
    width: 100%;
  }

  .modal-title {
    font-size: 2.8em;
    margin-block: 1.66em 1.11em;
  }

  .login__title {
    font-size: 2.8em;
    margin-block: 1.25em .9em;
  }
  
}
</style>

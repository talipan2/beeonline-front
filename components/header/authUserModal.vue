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

  .modal-content {
    max-width: 40em;
    padding: 2em;
  }

  .modal-title {
    font-size: 2.8em;
    margin-block: 1.66em 1.11em;
  }

}

@include tablet {
  .auth-modal {
    .modal-content {
      max-width: none;
      width: 40%;
    }
  }
}

@include mobile {
  .auth-modal {
    .modal-content {
      width: 60%;
    }
  }
}

@include small-mobile {
  .auth-modal {
    .modal-content {
      width: 96%;

    }
  }
}
</style>

<template>
  <UiModal class="modal replenishment-modal" v-model="settingStore.replenishmentModalStatus" title="Пополнение баланса" @confirm="() => confirm()">
    <template #header></template>
    <template #content>
      <form @submit.prevent="handleSubmit">
        <p class="replenishment-modal__text">Вы будете перенаправлены на страницу банка.</p>
        <label class="form-group-data form-group__title">
          Сумма пополнения, {{ currentCurrency }}.
          <UiInput name="sum" v-model="sumReplenishment" type="number" class="form-group__value" />
        </label>
        <div class="replenishment-modal__buttons">
          <UiButton type="submit" class="replenishment-modal__btn" variant="quinary" size="large">Оплатить картой</UiButton>
          <UiButton type="button" class="replenishment-modal__btn replenishment-modal__btn__type-account" variant="tertiary" size="large">Сформировать счет</UiButton>
        </div>
      </form>
    </template>
  </UiModal>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';

const props = defineProps({
  currentCurrency: {
    type: String,
    required: true
  }
});

const settingStore = useSettingStore();

const sumReplenishment = ref(1000);

const confirm = () => {
  settingStore.replenishmentModalStatus = false;
}

function handleSubmit() {
  console.log(sumReplenishment.value)
  confirm();
}

</script>

<style lang="scss">

.replenishment-modal {
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

  &__text {
    font-size: 1.6em;
    margin-bottom: 1em;
  }

  .form-group-data {
    margin-bottom: 2em;
  }

  &__buttons {
    display: flex;
    gap: 2em;
    margin-bottom: 1em;
  }

  &__btn {
    font-size: 1.2em;
    font-weight: 400;
    text-transform: uppercase;
    width: 100%;
    padding: .8em;
    text-wrap: wrap;

    &_type-account {
      color: #212529;
    }
  }

  @include desktop {
    .modal-dialog {
      width: 30%;
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
<template>
  <UiModal
    v-model="settingStore.openContactsModal"
    @confirm="confirm"
    class="modal"
    :closeButton="false">
    <template #content>
      <div class="open-contacts-modal">
        <p class="open-contacts-modal__description">
          Пожалуйста, проверьте, контактные данные. Если есть несоответствия
          внесите изменения в
          <a href="javascript:void(0)" class="link open-contacts-modal__link" @click="openProfile">Карточку компании</a>
        </p>
        <div class="form-group form-group_type_secondary">
          <div class="form-group form-group__value">
            <div class="form-group-data">
              <label class="form-group__title">Контактное лицо (ФИО)</label>
              <div class="form-value">{{ pubCard.contact_name }}</div>
            </div>
            <div class="form-group-data">
              <label class="form-group__title">Контактный email</label>
              <div class="form-value">{{ pubCard.contact_email }}</div>
            </div>
          </div>
        </div>
        <div class="form-group form-group_type_secondary">
          <div class="form-group form-group__value">
            <div class="form-group-data">
              <label class="form-group__title">Контактный телефон</label>
              <div class="form-value">{{ pubCard.contact_phone }}</div>
            </div>
          </div>
        </div>
        <div class="open-contacts-modal__buttons">
          <UiButton
            type="button"
            variant="tertiary"
            size="large"
            class="open-contacts-modal__button"
            @click="openProfile"
            >
            Внести изменения
          </UiButton>
          <UiButton
            type="button"
            variant="quinary"
            size="large"
            class="open-contacts-modal__button"
            @click="confirm">
            Закрыть
          </UiButton>
        </div>
      </div>
    </template>
  </UiModal>
</template>

<script setup>
  import { useSettingStore } from "~/store/settingStore";
  import { useOrganizationStore } from "~/store/organizationStore";
  import { useUserStore } from "~/store/userStore";

  const settingStore = useSettingStore();
  const organizationStore = useOrganizationStore();
  const userStore = useUserStore();

  const pubCard = computed(() => userStore.userPubCard || {});

  const openProfile = () => {
    router.push('/profile');
    confirm()
  }

  const confirm = () => {
    settingStore.openContactsModal = false;
  };

  const router = useRouter();
</script>

<style lang="scss">
.open-contacts-modal {
  &__description {
    font-size: 1.6rem;
    line-height: 1.5;
    margin-bottom: 2rem;
  }

  &__link {
    display: inline;
  }

  &__buttons {
    display: flex;
    gap: 1rem;
    justify-content: right;
    margin-top: 2rem;
  }
  
  &__button {
    text-transform: uppercase;
    font-size: 1.2rem;
  }
}


</style>

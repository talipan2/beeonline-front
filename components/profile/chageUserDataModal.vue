<template>
  <UiModal 
    class="user-data-modal modal" 
    v-model="settingStore.changeUserDataModal" 
    title="Контактные данные" 
    @confirm="() => confirm()" 
    :closeButton="false"
    size="lg"
  >
    <template #header />
    <template #content>
      <p class="user-data-modal__text">Указанные данные не разглашаются третьим лицам и необходимы для успешной работы на портале.</p>
      <Form @submit="handleSubmit">
        <div class="form-group">
          <label class="form-group__title form-group-data">
            Ваше имя *
            <UiInput
              :rules="{ required: true, min: 2 }"
              name="name"
              label="Ваше имя"
              class="form-group__value"
              type="text"
              placeholder="Ваше имя"
              v-model="data.name"
            />
          </label>
          <label class="form-group__title form-group-data">
            Ваша должность
            <UiInput
              name="post"
              label="Ваша должность"
              class="form-group__value"
              type="text"
              placeholder="Ваша должность"
              v-model="data.post"
            />
          </label>
          <label class="form-group__title form-group-data">
            E-mail *
            <UiInput
              :rules="{ required: true, email: true }"
              name="email"
              label="E-mail"
              class="form-group__value"
              type="text"
              placeholder="E-mail"
              v-model="data.email"
            />
          </label>
          <label class="form-group__title form-group-data">
            Ваш телефон *
            <UiInput
              :rules="{ required: true, max: 16 }"
              name="phone"
              label="Ваш телефон"
              class="form-group__value"
              type="text"
              placeholder="Ваш телефон"
              v-model="data.phone"
            />
          </label>
        </div>
        <div class="user-data-modal__btn-container">
          <UiButton class="user-data-modal__btn" type="submit" variant="quinary" size="large">Сохранить</UiButton>
        </div>
      </Form>
    </template>
  </UiModal>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';
import { useUserStore } from '~/store/userStore';

const userStore = useUserStore();

const data = ref({
  id: null,
  name: '',
  post: '',
  email: '',
  phone: ''
});

const settingStore = useSettingStore();

const handleSubmit = (values, form) => {
  if(data.value.id) {
    userStore.setUserData({
      name: data.value.name,
      post: data.value.post,
      email: data.value.email,
      phone: data.value.phone.replace(/^\+/, "")
    }, data.value.id, form).then(res => {
      if(res) {
        settingStore.changeUserDataModal = false;
      }
    })
  }
}

const confirm = () => {
  settingStore.changeUserDataModal = false;
};

watch(() => settingStore.changeUserDataModal, (newVal) => {
  if(newVal) {
    data.value = {
      id: userStore.userData.id,
      name: userStore.userData.name,
      post: userStore.userData.post,
      email: userStore.userData.email,
      phone: userStore.userData.phone
    }
  }
})

</script>

<style lang="scss">

.user-data-modal {
  font-size: 1rem;

  .modal-content {
    padding: 2em;
  }

  &__text {
    font-size: 1.3em;
    margin-bottom: 1.5em;
  }

  &__btn-container {
    display: flex;
    justify-content: center;
  }

  &__btn {
    font-size: 12px;
    text-transform: uppercase;
  }

}

</style>
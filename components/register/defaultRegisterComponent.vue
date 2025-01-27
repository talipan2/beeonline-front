<template>
  <RegisterLayout
    :block-title="`${
      role === 'customer' ? 'Регистрация заказчика' : 'Регистрация исполнителя'
    }`"
    title="Контактные данные"
    description="Указанные данные не разглашаются третьим лицам и необходимы для успешной работы на портале."
  >
    <Form as="form" @submit="handleSubmit">
      <div class="form-group">
        <label class="form-group-data form-group__title">
          Ваше имя *
          <UiInput
            :rules="{ required: true, min: 2 }"
            name="name"
            label="Ваше имя"
            class="form-group__value"
            type="text"
            placeholder="Ваше имя"
            v-model="userData.name"
          />
        </label>
        <label class="form-group-data form-group__title">
          Ваша должность
          <UiInput
            :rules="{min: 2}"
            name="jobTitle"
            label="Ваша должность"
            class="form-group__value"
            type="text"
            placeholder="Ваша должность"
            v-model="userData.jobTitle"
          />
        </label>
        <label class="form-group-data form-group__title">
          E-mail *
          <UiInput
            :rules="{ required: true, min: 6, email: true }"
            name="email"
            label="E-mail"
            class="form-group__value"
            type="email"
            placeholder="____@_____"
            v-model="userData.email"
          />
        </label>
        <label class="form-group-data form-group__title">
          Ваш телефон *
          <UiInput
            :rules="{ required: true, min: 16, max: 16 }"
            name="phone"
            label="Телефон"
            class="form-group__value"
            type="tel"
            placeholder="Телефон"
            v-model="userData.phone"
            :phonePlus="true"
            :max-length="16"
          />
        </label>
      </div>
      <div class="register__checkbox">
        <UiCheckbox name="Политика конфиденциальности" :rules="{ required: true }" v-model="userData.privacyPolicy">
          Я согласен(а) с&nbsp;
          <NuxtLink to="/">политикой конфиденциальности.</NuxtLink>
        </UiCheckbox>
      </div>
      <UiButton
        type="submit"
        class="register__btn register__btn_type_secondary"
        variant="quinary"
        size="large"
      >
        Зарегистрироваться
        <SvgoBtnArrow class="svg-lx" />
      </UiButton>
      {{ userData }}
    </Form>
    <template #soc-reg>
      <RegisterSocialRegistr />
    </template>
  </RegisterLayout>
</template>

<script setup>
import { useSettingStore } from "~/store/settingStore";
import { useUserStore } from "~/store/userStore";
const userStore = useUserStore();
const settingStore = useSettingStore();
const router = useRouter();

const role = computed(() => userStore.role);
const userData = ref({
  name: "",
  jobTitle: "",
  email: "",
  phone: "",
  privacyPolicy: false,
  role: role.value
});
const isCreateOrder = computed(() => settingStore.isCreateOrder);

const handleSubmit = () => {
  userStore
    .registerUser(
      userData.value.name,
      userData.value.email,
      userData.value.jobTitle,
      userData.value.phone,
      userData.value.role
    )
    .then((res) => {
      if (isCreateOrder.value) {
        router.push({ path: "/orders/create/step1" });
      } else {
        router.push({ path: "/register/step1" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => {
  if(router.currentRoute.value.query && router.currentRoute.value.query.role === 'customer' && router.currentRoute.value.query.action === 'create-order') {
    userStore.role = router.currentRoute.value.query.role
    userData.value.role = router.currentRoute.value.query.role
    settingStore.isCreateOrder = true
  } else if(router.currentRoute.value.query && router.currentRoute.value.query.role) {
    userStore.role = router.currentRoute.value.query.role
    userData.value.role = router.currentRoute.value.query.role
  }
})
</script>

<style lang="scss"></style>

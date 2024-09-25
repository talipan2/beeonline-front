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
            :rules="{ required: true, min: 6, numeric: true }"
            name="phone"
            label="Телефон"
            class="form-group__value"
            type="tel"
            placeholder="Телефон"
            v-model="userData.phone"
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
    </Form>
    <template #soc-reg>
      <RegisterSocialRegistr />
    </template>
  </RegisterLayout>
</template>

<script setup>
import { useUserStore } from "~/store/userStore";
const userStore = useUserStore();
const router = useRouter();


const role = computed(() => userStore.role);

const userData = ref({
  name: "",
  jobTitle: "",
  email: "",
  phone: "",
  privacyPolicy: false,
});

watch(() => userData.value.privacyPolicy, (newVal) => {
  console.log(newVal)
});

const handleSubmit = () => {
  userStore
    .registerUser(
      userData.value.name,
      userData.value.email,
      userData.value.jobTitle,
      userData.value.phone
    )
    .then((res) => {
      router.push({ path: "/register/step1" });
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<style lang="scss"></style>

<template>
  <RegisterLayout
    :block-title="`${
      role === 'customer' ? 'Регистрация заказчика' : 'Регистрация исполнителя'
    }`"
    title="Контактные данные"
    description="Указанные данные не разглашаются третьим лицам и необходимы для успешной работы на портале."
  >
    <UiForm :submit="handleSubmit">
      <div class="register__form-container">
        <div class="register__performer-header" v-if="userStore.role === 'performer'">
        <h2>Контактные данные</h2>
        <p>Указанные данные не разглашаются третьим лицам и необходимы для успешной работы на портале.</p>
      </div>
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
              name="post"
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
            <CommonPhoneMusk class="form-group__value register__phone-mask" v-model="userData" :rules="{ required: true, max: 16 }" name="phone" label="Телефон" />
          </label>
        </div>
        <div class="register__checkbox">
          <UiCheckbox name="Политика конфиденциальности" :rules="{ required: true }" v-model="userData.privacyPolicy">
            Я согласен(а) с&nbsp;
            <NuxtLink to="/page-policy" target="_blank">политикой конфиденциальности.</NuxtLink>
          </UiCheckbox>
        </div>
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
    </UiForm>
    <template #soc-reg>
      <RegisterSocialRegistr :role="role" />
    </template>
  </RegisterLayout>
</template>

<script setup>
import { useSettingStore } from "~/store/settingStore";
import { useUserStore } from "~/store/userStore";
import { useTranslateStore } from "~/store/translateStore";
const translateStore = useTranslateStore();
const userStore = useUserStore();
const settingStore = useSettingStore();
const router = useRouter();

const role = computed(() => userStore.role);
const userData = ref({
  name: "",
  jobTitle: "",
  email: "",
  phone: "",
  privacyPolicy: true,
  role: role.value,
  country_code: "",
});
const isCreateOrder = computed(() => settingStore.isCreateOrder);

const handleSubmit = async (values, form) => {

  const utm = localStorage.getItem('utm_params');
  const locale = translateStore.lang === 'ru' ? 'ru' : 'en';
  await userStore
    .registerUser({...values, role: userData.value.role, utm: utm, country_code: userData.value.country_code, phone: userData.value.phone, notification_locale: locale}, form)
    .then((res) => {
      if(userData.value.role === 'customer') {
        if (isCreateOrder.value) {
          router.push({ path: "/orders/create/step1" });
        } else {
          router.push({ path: "/register/step1" });
        }
      } else if (userData.value.role === 'performer') {
        router.push({ path: "/performer-register/step1" });
      }
    })
};

// watch(() => router.currentRoute.value.query, (newVal) => {
//   if(newVal && newVal.action === 'create-order') {
//     settingStore.isCreateOrder = true
//   } else {
//     settingStore.isCreateOrder = false
//   }
// })

onMounted(() => {
  if(router.currentRoute.value.query && router.currentRoute.value.query.role === 'customer' && router.currentRoute.value.query.action === 'create-order') {
    userStore.role = router.currentRoute.value.query.role
    userData.value.role = router.currentRoute.value.query.role
    settingStore.isCreateOrder = true
  } else if(router.currentRoute.value.query && router.currentRoute.value.query.role) {
    userStore.role = router.currentRoute.value.query.role
    userData.value.role = router.currentRoute.value.query.role
    settingStore.isCreateOrder = false
  }
})
</script>

<style lang="scss">

.register {
  &__performer-header {
    h2 {
      font-size: 2.6em;
      margin-bottom: 0.3em;
    }

    p {
      font-size: 1.2em;
      margin-bottom: 1.46em;
    }


  }
  &__phone-mask {
    flex: 0 1 40%;
  }

}

</style>

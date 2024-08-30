<template>
  <RegisterLayout title="Контактные данные" description="Указанные данные не разглашаются третьим лицам и необходимы для успешной работы на
      портале.">
    <form @submit="handleSubmit">
      <div class="register__input-list">
        <label class="register__label">
          Ваше имя *
          <UiInput class="register__input" type="text" placeholder="Ваше имя" :required="true"
            v-model="userData.name" />
        </label>
        <label class="register__label">
          Ваша должность
          <UiInput class="register__input" type="text" placeholder="Ваша должность" v-model="userData.jobTitle" />
        </label>
        <label class="register__label">
          E-mail *
          <UiInput class="register__input" type="email" placeholder="____@_____" :required="true"
            v-model="userData.email" />
        </label>
        <label class="register__label">
          Ваш телефон *
          <UiInput class="register__input" type="tel" placeholder="Телефон" :required="true" v-model="userData.phone" />
        </label>
      </div>
      <div class="register__checkbox">
        <UiCheckbox>
          Я согласен(а) с&nbsp;<NuxtLink to="/">политикой конфиденциальности.</NuxtLink>
        </UiCheckbox>
      </div>
      <UiButton type="submit" class="register__btn register__btn_type_secondary" variant="quinary" size="large">
        Зарегистрироваться
        <SvgoBtnArrow class="svg-lx" />
      </UiButton>
    </form>
    <template #soc-reg>
      <RegisterSocialRegistr />
    </template>
  </RegisterLayout>
</template>

<script setup>
import { useUserStore } from '~/store/userStore';
const userStore = useUserStore();
const router = useRouter();

const userData = ref({
  name: '',
  jobTitle: '',
  email: '',
  phone: '',
})

const handleSubmit = (e) => {
  e.preventDefault();
  userStore.registerUser(userData.value.name, userData.value.email, userData.value.jobTitle, userData.value.phone).then((res) => {
    router.push({ path: '/register/step1' })
  }).catch((err) => {
    console.log(err)
  })
}

</script>

<style lang="scss">

</style>
<template>
  <RegisterLayout title="Контактные данные" description="Указанные данные не разглашаются третьим лицам и необходимы для успешной работы на
      портале.">
    <div class="register__input-list">
      <label class="register__label">
        Ваше имя *
        <UiInput class="register__input" type="text" placeholder="Ваше имя" :required="true" />
      </label>
      <label class="register__label">
        Ваша должность
        <UiInput class="register__input" type="text" placeholder="Ваша должность" />
      </label>
      <label class="register__label">
        E-mail *
        <UiInput class="register__input" type="email" placeholder="____@_____" :required="true" />
      </label>
      <label class="register__label">
        Ваш телефон *
        <UiInput class="register__input" type="tel" placeholder="Телефон" :required="true" />
      </label>
    </div>
    <div class="register__checkbox">
      <input type="checkbox" id="confidentiality">
      <label for="confidentiality">Я согласен(а) с политикой конфиденциальности.</label>
    </div>
    <UiButton type="button" @click="handleSubmit" class="register__btn" variant="quinary" size="large">Зарегистрироваться
      <SvgoBtnArrow class="svg-lx" />
    </UiButton>
    <template #soc-reg>
      <RegisterSocialRegistr />
    </template>
  </RegisterLayout>
</template>

<script setup>

const router = useRouter();


const handleSubmit = () => {
  router.push({path: '/register/step1'})
}

</script>
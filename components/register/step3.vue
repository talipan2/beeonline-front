<template>
  <RegisterLayout title="Города фактического производства *">
    <div class="register__step-three">
      <div class="register__text-container">
        <p class="register__text">Укажите город вашего производства. Если производств несколько - выберите несколько городов, но не более пяти.</p>
        <p class="register__text">Указанные города используются для автоматического добавления в новые услуги и позволят потенциальным заказчикам находить их в поиске по регионам.</p>
      </div>
        <UiButton class="register__btn register__btn_type_half" variant="tertiary" size="large">Выбрать город или регион</UiButton>
      <div class="register__btn-container">
        <UiButton class="register__btn" variant="senary" size="large">Назад</UiButton>
        <UiButton class="register__btn" variant="quinary" size="large">Далее
          <SvgoBtnArrow class="svg-lx" />
        </UiButton>
      </div>
    </div>
  </RegisterLayout>
</template>

<style lang="scss">

.register {
  &__step-three {
    .register__text{
      margin-bottom: 0;
    }

    .register__text-container {
      margin-bottom: 3em;
    }

    .register__btn_type_half {
      max-width: 44%;
      margin-bottom: 2em;
    }

    .register__btn {
      font-size: 1.2em;
      line-height: 1em;
    }
  }
}

</style>
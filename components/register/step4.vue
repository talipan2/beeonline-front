<template>
  <RegisterLayout title="Проверка вашего профиля">
    <RegisterCheckCard title="Контактные данные"
      text="Указанные данные не разглашаются третьим лицам, и необходимы для успешной работы на портале">
      <div class="form-group">
        <div class="form-group-data">
          <div class="form-group-data__title">Почта</div>
          <div class="form-group-data__value">qq@qq.ru</div>
        </div>
        <div class="form-group-data">
          <div class="form-group-data__title">Телефон</div>
          <div class="form-group-data__value">+7 999 999 99 99</div>
        </div>
      </div>
      <UiButton class="register__btn register__btn_type_tg" variant="telegram" size="large">Включить уведомления в
        Telegram</UiButton>
    </RegisterCheckCard>
    <RegisterCheckCard title="Карточка компании" text="Указанные данные будут видны другим участникам портала"
      changeLink="/register/step2">
      <div class="register__check-company">
        <div class="register__check-company-container">
          <div class="register__check-company-logo">
            <p class="form-group-data__title">Логотип</p>
            <div class="form-group-data__logo">
              <img src="~/assets/images/nophoto_pc.png" alt="">
            </div>
          </div>
          <div class="register__check-company-details">
            <div class="form-group-data">
              <p class="form-group-data__title">Название</p>
              <p class="form-group-data__value">Компания</p>
            </div>
            <div class="form-group-data">
              <p class="form-group-data__title">География фактического производства</p>
              <p class="form-group-data__value">Компания</p>
            </div>
          </div>
        </div>
        <div class="form-group-data">
          <p class="form-group-data__title">Описание</p>
          <p class="form-group-data__value">Компания</p>
        </div>
      </div>
    </RegisterCheckCard>
    <RegisterCheckCard title="Данные организации"
      text="Указанные данные не разглашаются третьим лицам, и необходимы для успешной работы на портале"
      changeLink="/register/step2">
      <div class="register__organization-data">
        <div class="form-group-data">
          <p class="form-group-data__title">Юридическое названии организации</p>
          <p class="form-group-data__value">Без имени</p>
        </div>
      </div>
      <div class="form-group">
        <div class="form-group-data">
          <p class="form-group-data__title">Форма организации</p>
          <p class="form-group-data__value">Другое</p>
        </div>
        <div class="form-group-data">
          <p class="form-group-data__title">ИНН</p>
          <p class="form-group-data__value">-</p>
        </div>
        <div class="form-group-data">
          <p class="form-group-data__title">КПП</p>
          <p class="form-group-data__value">-</p>
        </div>
        <div class="form-group-data">
          <p class="form-group-data__title">ОГРН</p>
          <p class="form-group-data__value">-</p>
        </div>
      </div>
      <div class="form-group-data">
        <p class="form-group-data__title">Страна</p>
        <p class="form-group-data__value">Россия</p>
      </div>
      <div class="form-group-data">
        <p class="form-group-data__title">Юридический адрес</p>
        <p class="form-group-data__value">-</p>
      </div>
      <div class="register__btn-container">
        <UiButton class="register__btn" variant="senary" size="large">Назад</UiButton>
        <UiButton class="register__btn" variant="quinary" size="large">Подтвердить </UiButton>
      </div>
    </RegisterCheckCard>
  </RegisterLayout>
</template>

<style lang="scss">

.form-group {
  display: flex;
  column-gap: 3em;
  justify-content: space-between;
  align-items: center;

  flex-wrap: wrap;

  &-data {
    flex: 1 0 45%;
    font-size: 1.3em;
    margin-bottom: 2em;
  }

  &-data__title {
    font-family: 'fira-sans', sans-serif;
  }

  &-data__value {
    font-size: 1.23em;
  }
}
.register {
  .register__btn_type_tg {
    text-wrap: wrap;
    text-align: center;
    max-width: 45%;
  }

  &__check-company {
    font-size: 1em;
  }

  &__check-company-container {
    display: flex;
    column-gap: 5.5%;
    color: #565263;
    margin-bottom: 1.53em;
  }

  &__check-company-logo {
    flex: 1 0 20%;
    min-width: 9em;
    font-size: 1.3em;

    img {
      width: 100%;
      border: 1px solid #d1d5db;
    }
    
  }

  &__check-company-details {
    flex: 1 0 80%;
    display: flex;
    flex-direction: column;
    row-gap: 1.53em;
  }

  
}


</style>
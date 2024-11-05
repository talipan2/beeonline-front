<template>
  <div class="notification-setting">
    <h2 class="notification-setting__title">Настройка уведомлений</h2>
    <div class="notification-setting__list">
      <div class="notification-setting__container">
        <p class="notification-setting__text">
          Хочу получать уведомления о новых заказах
        </p>
        <UiCheckboxGroup
          class="notification-setting__checkbox"
          :options="[
            { id: 0, label: 'по электронной почте' },
            { id: 1, label: 'в личном кабинете' },
          ]"
          :isValidated="false"
        />
      </div>
      <div class="notification-setting__container">
        <p class="notification-setting__text">
          Хочу получать уведомления о новых отзывах или ответах на мои отзывы
        </p>
        <UiCheckboxGroup
          class="notification-setting__checkbox"
          :options="[
            { id: 0, label: 'по электронной почте' },
            { id: 1, label: 'в личном кабинете' },
          ]"
          :isValidated="false"
        />
      </div>
      <div class="notification-setting__container">
        <p class="notification-setting__text">
          Хочу получать уведомления о новых сообщениях в чате
        </p>
        <UiCheckboxGroup
          class="notification-setting__checkbox"
          :options="[
            { id: 0, label: 'по электронной почте' },
            { id: 1, label: 'в личном кабинете' },
          ]"
          :isValidated="false"
        />
      </div>
      <div class="notification-setting__container">
        <p class="notification-setting__text">
          Хочу получать системные уведомления
        </p>
        <UiCheckboxGroup
          class="notification-setting__checkbox"
          :options="[
            { id: 0, label: 'по электронной почте' },
            { id: 1, label: 'в личном кабинете' },
          ]"
          :isValidated="false"
        />
      </div>
      <div class="notification-setting__container">
        <p class="notification-setting__text">
          Хочу получать уведомления о новостях
        </p>
        <UiCheckboxGroup
          class="notification-setting__checkbox"
          :options="[
            { id: 0, label: 'по электронной почте' },
            { id: 1, label: 'в личном кабинете' },
          ]"
          :isValidated="false"
        />
      </div>
    </div>
    <div class="notification-setting__buttons">
      <UiButton
        class="notification-setting__button"
        variant="telegram"
        size="small"
        >Включить уведомления в telegram
      </UiButton>
      <UiButton
        class="notification-setting__button"
        variant="tertiary"
        size="small"
      >
        Сохранить
        <SvgoBtnArrow class="svg-lx" />
      </UiButton>
    </div>
  </div>
</template>

<style lang="scss">
.notification-setting {
  font-size: 1.6rem;
  padding: 3.75em 1.875em 1.875em;
  box-shadow: var(--box-shadow-primary);
  background-color: #fff;

  &__title {
    font-size: 1.5em;
    margin-bottom: 1.25em;
  }

  &__list {
    display: flex;
    flex-direction: column;
    row-gap: 1.875em;
    margin-bottom: 1.875em;
  }

  &__text {
    margin-bottom: .625em;
  }

  &__checkbox {
    flex-direction: column;
    row-gap: .3em;
  }

  &__buttons {
    display: flex;
    flex-direction: column;
    row-gap: 1em;
  }

  &__button {
    font-size: .75em;
    line-height: 1em;
    font-weight: 400;
    column-gap: 1em;
    padding: .83em;
    color: var(--text-color-primary);
    text-transform: uppercase;

    svg {
      margin-block: -1em;
      fill: var(--text-color-ternary);
    }
  }
}
</style>

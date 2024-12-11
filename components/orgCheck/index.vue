<template>
  <div class="org-check">
    <div class="org-check__container">
      <div class="org-check__header">
        <p class="org-check__col org-check__col_type_one">Дата:</p>
        <p class="org-check__col org-check__col_type_two">Название компании:</p>
      </div>
      <div class="org-check__list">
        <div class="org-check__item" v-for="i in 5" :key="i">
          <p class="org-check__col org-check__col_type_one">05.02.2024 - 17:04</p>
          <p class="org-check__col org-check__col_type_two">«Интай-Текстиль» / Intai-Textile</p>
          <div class="org-check__col org-check__btn-container">
            <UiButton type="button" class="org-check__btn org-check__btn_type_one" variant="tertiary" size="large">
              <SvgoRefresh class="svg-m" fill="#6937a5"/>
              Обновить
            </UiButton>
            <UiButton class="org-check__btn org-check__btn_type_one" variant="tertiary" size="large">
              Открыть
            </UiButton>
            <UiButton class="org-check__btn" variant="quinary" size="large">
              <SvgoDownload class="svg-m" fill="#fff"/>
              Скачать PDF
            </UiButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">

.org-check {
  font-size: 1.6rem;

  &__header {
    display: flex;
    border-top: 1px solid var(--border-color-secondary);
    border-bottom: 1px solid var(--border-color-secondary);
    padding: 1.25em .93em;
    margin-bottom: .625em;
  }

  &__list {
    display: flex;
    flex-direction: column;
    row-gap: .625em;
  }

  &__item {
    display: flex;
    align-items: center;
    padding: 1.25em .93em;
    box-shadow: var(--box-shadow-primary);
    background-color: #fff;
  }

  &__btn-container {
    display: flex;
    flex: 0 1 auto;
    column-gap: .5em;
    font-size: .75em;
  }

  &__btn {
    column-gap: .5em;
    padding: .83em;
    text-transform: uppercase;
    font-weight: 400;

    svg {
      margin-block: -1em;
    }

    &_type_one {
      color: var(--text-color-primary);

      svg {
        fill: var(--text-color-primary);
      }
    }
  }

  &__col_type_one {
    flex: 0 0 20%;
  }

  &__col_type_two {
    flex: 1 1 auto;
  }

  @include mobile {
    &__header {
      display: none;
    }

    &__item {
      align-items: flex-start;
      flex-direction: column;
      row-gap: 1em;
    }

    &__btn-container {
      font-size: 1rem;
    }
  }
}

</style>
<template>
  <div class="support">
    <div class="support__header">
      <p class="support__text">
        Вы можете сформировать запрос в нашу службу поддержки или отправить запрос на почту
        <a href="mailto:service@bee-online.ru" class="link">service@bee-online.ru.</a>
      </p>
      <UiButton to="/support/create" class="support__button" variant="quinary" size="large">Создать запрос</UiButton>
    </div>
    <h2 class="support__title">Ваши обращения</h2>
    <UiSelect class="support__select" :options="supportList" v-model="selectedSupport" />
    <div class="support__list">
      <div class="support__list-header">
        <p class="support__list-col-1">Запрос</p>
        <p class="support__list-col-2">Обновлено</p>
        <p class="support__list-col-3">Статус</p>
        <p class="support__list-col-4">Тема обращения</p>
      </div>
      <div class="support__list-item-container" v-for="(item, index) in 5" :key="index">
        <div class="support__list-item support__list-item_type_solved">
          <p class="support__list-col-1">#3</p>
          <p class="support__list-col-2">2021-08-06 09:58:26</p>
          <p class="support__list-col-3">Есть ответ</p>
          <p class="support__list-col-4">Работа сервиса</p>
          <NuxtLink class="support__list-link" to="/support/show/2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

const selectedSupport = ref('all')

const supportList = [
  {id: 1, label: 'Все запросы', value: 'all'},
  {id: 2, label: 'Есть ответ', value: 'answered'},
  {id: 3, label: 'Ожидает ответа', value: 'wait_answer'},
  {id: 4, label: 'Закрыт', value: 'closed'},
]



</script>

<style lang="scss">

.support {
  font-size: 1rem;

  &__header {
    display: flex;
    align-items: center;
    margin-bottom: 3.5em;
    column-gap: 1em;
  }

  &__text {
    font-size: 1.6em;

    a {
      display: inline;
    }
  }

  &__button {
    font-size: 1.2em;
    flex: 0 1 20%;
    text-transform: uppercase;
    margin-left: auto;
  }

  &__select {
    font-size: 1.6em;
    max-width: 30%;
    margin-bottom: 1.5em;
  }

  &__title {
    font-size: 2.8em;
    margin-bottom: 1em;
  }

  &__list {
    display: flex;
    flex-direction: column;
    font-size: 1.6em;
  }

  &__list-col-1 {
    flex: 0 1 20%;
  }

  &__list-col-2 {
    flex: 0 1 30%;
  }

  &__list-col-3 {
    flex: 0 1 20%;
  }

  &__list-col-4 {
    flex: 1 1 20%;
    text-align: right;
  }

  &__list-header {
    display: flex;
    border-top: 1px solid var(--border-color-secondary);
    border-bottom: 1px solid var(--border-color-secondary);
    padding: 1.125em;
    column-gap: 1em;

    p {
      font-weight: 600;
    }
  }

  &__list-item {
    position: relative;
    display: flex;
    padding: .56em 1.125em;
    margin-block: .56em;
    column-gap: 1em;

    &:hover {
      background-color: #F2F2F2;
    }

    &_type_solved {
      background-color: #fff;
    }
  }

  &__list-link {
    position: absolute;
    inset: 0;
  }

}

</style>
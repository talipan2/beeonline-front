<template>
  <div class="support support-show">
    <h2 class="support__title">Данные запроса</h2>
    <div class="support-show__header">
      <div class="support-show__header-col">
        <div class="support-show__header-item">
          <p class="support-show__header-label">Запрос №:</p>
          <p class="support-show__header-value">3</p>
        </div>
        <div class="support-show__header-item">
          <p class="support-show__header-label">Статус:</p>
          <p class="support-show__header-value">Ожидает ответа</p>
        </div>
      </div>
      <div class="support-show__header-col">
        <div class="support-show__header-item">
          <p class="support-show__header-label">Создан:</p>
          <p class="support-show__header-value">2024-11-27 15:11:02</p>
        </div>
        <div class="support-show__header-item">
          <p class="support-show__header-label">Обновлено:</p>
          <p class="support-show__header-value">2024-11-27 15:11:02</p>
        </div>
      </div>
      <div class="support-show__header-col">
        <div class="support-show__header-item">
          <p class="support-show__header-label">Тема:</p>
          <p class="support-show__header-value">Прочее</p>
        </div>
      </div>
    </div>
    <div class="support-show__chat">
      <SupportChat :chat_id="3552"/>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss">


.support-show {
  font-size: 1rem;

  &__header {
    font-size: 1.6em;
    display: flex;
    column-gap: 1em;
    padding-block: 1em;
    border-top: 1px solid var(--border-color-secondary);
    border-bottom: 1px solid var(--border-color-secondary);
  }

  &__header-col {
    display: flex;
    flex-direction: column;
    row-gap: 1em;
    flex: 1;
  }

  &__header-item {
    display: flex;
  }

  &__header-label {
    flex: 0 1 30%;
    text-align: right;
  }
  &__header-value {
    margin-left: 1em;
  }

  &__chat {
    position: relative;
    height: 70em;
    
    .dialog__body {
      font-size: 1.2em;
    }
  }
}


</style>
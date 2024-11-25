<template>
  <div class="staff staff-edit">
    <StaffContent />
    <div class="form-group staff__buttons">
      <div class="form-group-data">
        <UiButton type="submit" class="form-group-data__btn" variant="quinary" size="large">Создать</UiButton>
      </div>
      <div class="form-group-data">
        <UiButton type="submit" class="form-group-data__btn" variant="senary" size="large">Вернуться к списку сотрудников</UiButton>
      </div>
      <UiButton type="submit" class="form-group-data__btn" variant="quinary" size="large">Отвязать от компании</UiButton>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss">

.staff {

  &__buttons {
    padding-top: 2em;
    border-top: 1px solid var(--border-color-secondary);
  }
}

</style>
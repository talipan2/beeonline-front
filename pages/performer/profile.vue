<template>
  <div>
    <NuxtLayout name="profile" title="Кабинет исполнителя">
      <template #header>
        <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: 'Кабинет исполнителя', link: '/performer' }, { label: 'Профиль', link: '' }]" />
      </template>
      <template #content>
        <Profile />
      </template>
      <template #rightSide>
        <CommonCheckList />
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup>


</script>

<style lang="scss">

.profile {
  
  .checklist {
    max-width: 25.5em;
  }
}

</style>
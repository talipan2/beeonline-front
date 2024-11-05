<template>
  <NuxtLayout name="profile" title="Документы организации" class="document-layout">
    <template #header>
      <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: 'Кабинет заказчика', link: '/customer/desktop' }, { label: 'Документы организации', link: '' }]" />
    </template>
    <template #content>
      <Documentation :dataList="dataList" />
    </template>
  </NuxtLayout>
</template>

<script setup>

const dataList = ref([
  {
    id: "ae66da3e-5dcd-4ff5-852e-637e109943cc", 
    name: "7b06907c2a25dfcb72142b71d335b9fc.jpg",
    type: "jpg",
    url:"blob:http://localhost:3000/5a5c26c4-90eb-4845-8208-a33d9b4b70fa"
  },
  {
    id: "ae66da3e-5dcd-4ff5-852e-637e109943cw", 
    name: "7b06907c2a25dfcb72142b71d335b9fc.jpg",
    type: "jpg",
    url:"blob:http://localhost:3000/5a5c26c4-90eb-4845-8208-a33d9b4b70fa"
  },
  {
    id: "ae66da3e-5dcd-4ff5-852e-637e109943cf", 
    name: "7b06907c2a25dfcb72142b71d335b9fc.jpg",
    type: "jpg",
    url:"blob:http://localhost:3000/5a5c26c4-90eb-4845-8208-a33d9b4b70fa"
  }
]);

</script>
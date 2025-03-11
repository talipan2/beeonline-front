<template>
  <NuxtLayout name="profile" title="Документы организации" class="document-layout">
    <template #header>
      <UiBreadCrumb :list="[
        {label: 'Главная', link: '/'}, 
        { label: `Кабинет ${translateRole}`, link: '/desktop' }, 
        { label: 'Документы организации', link: '' }
      ]" />
    </template>
    <template #content>
      <Documentation :dataList="dataList" />
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useOrganizationStore } from '~/store/organizationStore';
import { useUserStore } from '~/store/userStore';

useHead({
  title: 'Документы организации',
  meta: [
    {
      name: 'description',
      content: '',
    },
  ],
});

const organizationStore = useOrganizationStore();
const userStore = useUserStore();

const role = computed(() => userStore.role);
const translateRole = computed(() => role.value === 'customer' ? 'заказчика' : 'исполнителя');
const dataList = ref([]);

onMounted(() => {
  if(userStore.userData.organization_id) {
    organizationStore.getVerificationDocuments(userStore.userData.organization_id)
    .then(res => {
      if(res) {
        dataList.value = res.map(item => {
          return {
            id: item.id,
            name: item.file_url?.split('/').pop(),
            url: item.file_url,
            type: item.file_url?.split('.').pop().toLowerCase(),
          }
        });
      }
    });
  }
})

</script>
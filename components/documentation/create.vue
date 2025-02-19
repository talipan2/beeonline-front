<template>
  <div class="documentation-loading">
    <CommonDocumentLoaderAndList 
      :extension="['jpeg', 'pdf', 'doc', 'zip']"
      text="Загрузить jpeg, pdf, doc, zip"
      :is-list="true"
      :changed="true"
      v-model="dataListId"
      :documentList="documentsList"
    />
    <UiButton 
      type="button" 
      class="documentation-loading__btn" 
      variant="quinary" 
      size="around" 
      @click="handleSaveFiles"
    >
      Сохранить
    </UiButton>
    <DocumentationErrorModal />
  </div>
</template>

<script setup>
import { useOrganizationStore } from '~/store/organizationStore';
import { useUserStore } from '~/store/userStore';


const organizationStore = useOrganizationStore();
const userStore = useUserStore();
const router = useRouter()

const dataListId = ref([]);

const documentsList = ref([]);

const handleSaveFiles = () => {
  console.log(dataListId.value)
  organizationStore.setVerificationDocuments(userStore.userData.organization_id, dataListId.value)
  router.push({path: `/documentation`})
}

onMounted(() => {
  if(userStore.userData.organization_id) {
    organizationStore.getVerificationDocuments(userStore.userData.organization_id)
    .then(res => {
      if(res) {
        dataListId.value = res.map(item => {
          return {
            id: item.media_id,
            status: item.status
          }
          });
        documentsList.value = res.map(item => {
          return {
            id: item.media_id,
            name: 'Не приходит url с бека',
            url: item.file_url,
            type: 'pdf',
          }
        });
      }
    });
  }
})

</script>

<style lang="scss">

.documentation-loading {
  font-size: 1rem;

  &__btn {
    font-size: 1.2em;
    text-transform: uppercase;
    max-width: 50%;
    width: 100%;
  }
}

</style>
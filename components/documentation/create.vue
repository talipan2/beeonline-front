<template>
  <div class="documentation-loading">
    <CommonDocumentLoader text="Загрузить jpeg, pdf, doc, zip" :isList="true" :dataList="dataList" v-model="formData" @addFile="addFile"/>
    <CommonFileList :dataList="dataList" @removeFile="removeFile" :changed="true"/>
    <UiButton class="documentation-loading__btn" variant="quinary" size="around">Сохранить</UiButton>
    <DocumentationErrorModal />
  </div>
</template>

<script setup>

const dataList = ref([]);
const formData = new FormData();

function addFile(file) {
  dataList.value.push({ 
    id: crypto.randomUUID(), 
    name: file.name, 
    url: URL.createObjectURL(file), 
    type: file.name.split('.').pop().toLowerCase() 
  });
}

function removeFile(id) {
  dataList.value = dataList.value.filter(item => item.id !== id);

  formData.delete('file[]');  // Удаляет все файлы с ключом 'file[]'
  
  dataList.value.forEach(item => {
    formData.append('file[]', item.file);  // Добавляем файлы обратно в formData
  });
}

</script>

<style lang="scss">

.documentation-loading {
  font-size: 1rem;

  &__btn {
    font-size: 1.2em;
    text-transform: uppercase;
    max-width: 50%;
  }
}

</style>
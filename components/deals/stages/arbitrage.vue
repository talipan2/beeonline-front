<template>
  <div class="stage-arbitrage">
    <UiTextArea
      class="stage-arbitrage__textarea"
      type="text"
      label="Сообщение менеджеру"
      name="message"
      placeholder="Напишите сообщение менеджеру"
      :rules="{required: true}"
      v-model="data.message"
    />
    <div class="stage-arbitrage__file-load" ref="fileLoad">
      <UiDragAndDropFile
        :visible="true"
        :maxSize="maxFilesSize"
        :accept="acceptFile"
        @addFile="addFile"
        :draggable-component="fileLoad || {}"
      />
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
    isActive: {
        type: Boolean,
        default: false,
    },
});

const maxFilesSize = 2048
const acceptFile = ['jpg', 'jpeg', 'png', 'bmp', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'zip', 'rar', '7z']

const data = ref({
  message: '',
  file: [],
});

const fileLoad = ref(null);
const uploadedFiles = ref([]);

const addFile = (file) => {
  uploadedFiles.value.push({
    id: crypto.randomUUID(),
    name: file.name,
    url: URL.createObjectURL(file),
    type: file.name.split('.').pop().toLowerCase(),
  });
}

</script>

<style lang="scss">

.stage-arbitrage {
  &__file-load {
    position: relative;
    height: 15em;
    margin-block: 1em;
  }
}

</style>

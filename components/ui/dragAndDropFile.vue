<template>
    <div v-if="isVisible || visible" class="dropzone"
      @dragover.prevent="onDragOver"
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop"
      :class="{ 'dropzone_dragover': isDragOver }"
    >
      <!-- <CommonDocumentLoader class="dropzone__loader" @addFile="$emit('addFile', $event)" @removeFile="$emit('removeFile', $event)">
        <template #action></template>
      </CommonDocumentLoader> -->
      <p class="dropzone__text">{{ text }}</p>
      <p class="dropzone__text">{{ maxSizeText }}</p>
      <p class="dropzone__text">{{ acceptText }}</p>
    </div>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';


const props = defineProps({
  draggableComponent: {
    type: Object,
    required: true,
  },
  text: {
    type: String,
    default: 'Перетащите документ сюда или нажмите, чтобы загрузить.'
  },
  maxSize: {
    type: Number,
    default: 1024
  },
  accept: {
    type: Array,
    default: [
      "jpg", "jpeg", "png", "bmp", "pdf",
      "doc", "docx", "xls", "xlsx", "ppt", 
      "pptx", "zip", "rar", "7z"
    ]
  },
  visible: {
    type: Boolean,
    default: false
  }
})

const settingStore = useSettingStore();
const emit = defineEmits(['update:modelValue', 'addFile']);
const maxSizeText = computed(() => "Максимальный размер файла: " + Number.parseFloat(props.maxSize / 1024).toFixed(0) + " Мб.");
const acceptText = computed(() => "Допустимые расширения: " + props.accept.join(', ')  + ".");

// Управляет видимостью drop-зоны
const isVisible = ref(false);
const isDragOver = ref(false);  // Состояние, когда файл находится над зоной

const onDragOver = () => {
  isDragOver.value = true;
  if(!props.visible) {
    isVisible.value = true;
  }
};

const onDragLeave = () => {
  isDragOver.value = false;
  if(!props.visible) {
    setTimeout(() => {
      if (!isDragOver.value) isVisible.value = false;
    }, 100);
  }
};

// Обработка события drop
const onDrop = (event) => {
  isDragOver.value = false;
  if(!props.visible) {
    isVisible.value = false;
  }
  handleFiles(event.dataTransfer.files); // Обработка файлов
};

// Обработка файлов
const handleFiles = (fileList) => {
  const acceptedFiles = Array.from(fileList);
  acceptedFiles.forEach((file, index) => {
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if(!props.accept.includes(fileExtension)) {
      settingStore.alertModal.isOpen = true;
      settingStore.alertModal.text = `Файл "${file.name}" должен быть типа: ${props.accept.join(', ')}`;
      settingStore.alertModal.status = "error";
      return
    }
    emit('addFile', file);
  });
};


onMounted(async () => {
  await nextTick();
  if (props.draggableComponent) {
    props.draggableComponent.addEventListener('dragenter', onDragOver);
    props.draggableComponent.addEventListener('dragleave', onDragLeave);
  }
});

onUnmounted(() => {
  if (props.draggableComponent) {
    props.draggableComponent.removeEventListener('dragenter', onDragOver);
    props.draggableComponent.removeEventListener('dragleave', onDragLeave);
  }
});
</script>

<style lang="scss">

.dropzone {
  position: absolute;
  inset: 0;
  font-size: 1.4rem;
  padding: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: .5em;
  background-color: #f0f4fb;
  border: 1px solid #a29699;
  color: #716568;
  cursor: pointer;
  z-index: 99;

  &__text {
    text-align: center;
    line-height: 1.5em;
  }

  &_dragover {
    border: 1px dashed #a29699;

  }

  &__loader {
    position: absolute;
    inset: 0;

    .add-file__input {
      margin-block: 0;
      width: 100%;
      height: 100%;
    }
  }
}

</style>


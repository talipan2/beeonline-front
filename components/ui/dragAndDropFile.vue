<template>
  <div class="dropzone-wrapper">
    <div v-if="isVisible" class="dropzone"
      @dragover.prevent="onDragOver"
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop"
    >
      <p class="dropzone__text">{{ text }}</p>
      <p class="dropzone__text">{{ maxSizeText }}</p>
      <p class="dropzone__text">{{ acceptText }}</p>
    </div>
  </div>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';


const props = defineProps({
  drabbleComponent: {
    type: Object,
    default: null,
    required: true,
  },
  text: {
    type: String,
    default: 'Перетащите документ сюда или нажмите, чтобы загрузить.'
  },
  maxSize: {
    type: String,
    default: '5 МБ'
  },
  accept: {
    type: Array,
    default: ['.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.rtf', '.pdf', '.jpeg', '.png', '.jpg', '.gif', '.psd', '.djvu', '.ps', '.zip', '.rar']
  },
  modelValue: {
    type: FormData,
    default: () => new FormData(),
    required: true,
  },
})

const emit = defineEmits(['update:modelValue', 'addFile']);
const settingStore = useSettingStore();
const maxSizeText = computed(() => "Максимальный размер файла: " + props.maxSize + ".");
const acceptText = computed(() => "Допустимые расширения: " + props.accept.join(', ')  + ".");

// Управляет видимостью drop-зоны
const isVisible = ref(false);
const isDragOver = ref(false);  // Состояние, когда файл находится над зоной

watch(() => isVisible.value, (newVal) => {
  console.log(isVisible.value)
}, {deep: true})

// Функция для отображения drop-зоны при перетаскивании
const onDragEnter = (event) => {
  console.log(1)
  if (event.dataTransfer?.types?.includes('Files')) {
    isVisible.value = true;
  }
};

// Функция скрытия drop-зоны при уходе из неё
const onDragOver = () => {
  isDragOver.value = true;
  isVisible.value = true;
};

const onDragLeave = () => {
  isDragOver.value = false;
  setTimeout(() => {
    if (!isDragOver.value) isVisible.value = false;
  }, 100);
};

// Обработка события drop
const onDrop = (event) => {
  isDragOver.value = false;
  isVisible.value = false;
  settingStore.addFileModal = true;
  handleFiles(event.dataTransfer.files); // Обработка файлов
};

// Обработка файлов
const handleFiles = (fileList) => {
  const formData = new FormData();
  const acceptedFiles = Array.from(fileList);
  acceptedFiles.forEach((file, index) => {
    formData.append(`file[]`, file);
    emit('addFile', file);
  });

  emit('update:modelValue', formData);
  console.log("Загруженные файлы:", formData);
};


onMounted(async () => {
  await nextTick();
  if (props.drabbleComponent) {
    props.drabbleComponent.addEventListener('dragenter', onDragOver);
    props.drabbleComponent.addEventListener('dragleave', onDragLeave);
  }
});

onUnmounted(() => {
  if (props.drabbleComponent) {
    props.drabbleComponent.removeEventListener('dragenter', onDragOver);
    props.drabbleComponent.removeEventListener('dragleave', onDragLeave);
  }
});
</script>

<style lang="scss">

.dropzone {
  position: absolute;
  inset: 0;
  font-size: 1.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: .5em;
  background-color: #f0f4fb;
  color: #716568;
  cursor: pointer;
  border: 1px dashed #a29699;
  z-index: 99;
}
</style>


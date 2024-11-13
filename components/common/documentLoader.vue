<template>
  <div class="add-file">
    <label class="add-file__input">
      <SvgoClip class="svg-m add-file__clip" v-if="!$slots.action"/>
      <span v-if="!$slots.action">{{ selectedFile !== null && !isList ? selectedFile.name : text }}</span>
      <slot name="action" />
      <input type="file"
        accept=".doc, .docx, .xls, .xlsx, .ppt, .pptx, .rtf, .pdf, .jpeg, .png, .jpg, .gif, .psd, .djvu, .fb2, .ps, .zip, .rar"
        @change="handleFileChange">
    </label>
  </div>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';


const props = defineProps({
  text: {
    type: String,
    default: 'Загрузить'
  },
  modelValue: {
    type: FormData,
    default: {}
  },
  isList: {
    type: Boolean,
    default: false
  },
  extension: {
    type: [Array],
    default: ['jpeg', 'jpg', 'png', 'pdf', 'doc', 'zip']
  }
})

const emit = defineEmits(['update:modelValue', 'addFile']);
const settingStore = useSettingStore();

const selectedFile = ref(null);


const allowedExtensions = computed(() => props.extension);

const handleFileChange = (event) => {
  const formData = ref(new FormData());
  const fileInput = event.target;
  selectedFile.value = fileInput.files[0];
  const fileExtension = selectedFile.value.name.split('.').pop().toLowerCase();
  if(!allowedExtensions.value.includes(fileExtension)) {
    // settingStore.errorModal = true;
    // settingStore.errorModalText = `Файл "${selectedFile.value.name}" должен быть файлом типа: jpeg, pdf, doc, zip.`;
    fileInput.value = '';
    return
  }
  if(props.isList) {
    formData.value.append('file[]', selectedFile.value);
    emit('addFile', selectedFile.value);
    emit('update:modelValue', formData.value);
  } else {
    formData.append('file', selectedFile.value);
    emit('update:modelValue', formData.value);
  }
  fileInput.value = '';
}

// onMounted(() => {
//   if (props.modelValue && Object.keys(props.modelValue).length !== 0) {
//     selectedFile.value = props.modelValue.file;
//   }
// })

</script>

<style lang="scss">
.add-file {
  font-size: 1em;

  &__input {
    display: flex;
    align-items: center;
    position: relative;
    color: #565263;
    word-break: break-word;
    line-height: 1;
    font-size: 1.3em;
    margin-block: 1.53em 3.07em;

    input {
      opacity: 0;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;

      &::-webkit-file-upload-button {
        display: none;
      }
    }
  }

  &__clip {
    background-color: #6937a5;
    color: #fff;
    margin-right: 10px;
    flex-shrink: 0;
    -ms-flex-item-align: baseline;
    align-self: baseline;
    width: 3em;
  }
}
</style>
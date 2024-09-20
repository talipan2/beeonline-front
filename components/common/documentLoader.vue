<template>
  <div>
    <label class="add-file">
      <SvgoClip class="svg-m" />
      <span>{{ selectedFile !== null ? selectedFile.name : text }}</span>
      <input type="file"
        accept=".doc, .docx, .xls, .xlsx, .ppt, .pptx, .rtf, .pdf, .jpeg, .png, .jpg, .gif, .psd, .djvu, .fb2, .ps, .zip, .rar"
        @change="handleFileChange"
      >
    </label>
  </div>
</template>

<script setup>

const props = defineProps({
  text: {
    type: String,
    default: 'Загрузить'
  },
  modelValue: {
    type: Object,
    default: {}
  }
})

const emit = defineEmits(['update:modelValue']);

const selectedFile = ref(null);
const fileUrl = ref(null);
const formData = new FormData();

const handleFileChange = (event) => {
  const fileInput = event.target;
  selectedFile.value = fileInput.files[0];
  formData.append('file', selectedFile.value);
  fileUrl.value = URL.createObjectURL(selectedFile.value);
  emit('update:modelValue', {url:fileUrl.value, file: formData.get('file')});
}

onMounted(() => {
  if (props.modelValue && Object.keys(props.modelValue).length !== 0) {
    selectedFile.value = props.modelValue.file;
  }
})


</script>

<style lang="scss">

.add-file {
  display: flex;
  align-items: center;
  position: relative;
  color: #565263;
  word-break: break-word;
  line-height: 1;
  font-size: 1.3em;
  margin-block: 1.53em 3.07em;
}

.add-file svg {
  background-color: #6937a5;
  color: #fff;
  margin-right: 10px;
  flex-shrink: 0;
  -ms-flex-item-align: baseline;
  align-self: baseline;
  width: 3em;
}

.add-file input {
  opacity: 0;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

</style>
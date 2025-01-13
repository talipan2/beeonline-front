<template>
  <div class="documentation-loading">
    <CommonDocumentLoader :text="text" :isList="isList" :dataList="dataList" @addFile="addFile" :extension="extension"/>
    <CommonFileList :dataList="dataList" @removeFile="removeFile" :changed="changed"/>
    <Alerts/>
  </div>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';
import { useUserStore } from '~/store/userStore';


const props = defineProps({
  modelValue: {
    type: Array,
    default: [],
  },
  isList: {
    type: Boolean,
    default: true,
  },
  changed: {
    type: Boolean,
    default: true  
  },
  text: {
    type: String,
  },
  extension: {
    type: Array,
  },
  documentList: {
    type: Array,
    default: () => []
  }
})

const dataList = ref([]);
const formData = ref(new FormData());
const settingStore = useSettingStore();
const userStore = useUserStore();

const emit = defineEmits(['update:modelValue']);

function addFile(file) {
  formData.value.append('file', file);

  settingStore.uploadFiles(userStore.userData.id, formData.value)
    .then(res => {
      if(res && res.media_id) {
        emit('update:modelValue', [...props.modelValue, { media_id: res.media_id, status: 'pending' }]);
        dataList.value.push({ 
          id: res.media_id, 
          name: file.name, 
          url: URL.createObjectURL(file), 
          type: file.name.split('.').pop().toLowerCase(),
        });
      }
    })
    .catch(err => console.log(err))
}

function removeFile(id) {
  dataList.value = dataList.value.filter(item => item.id !== id);

  emit('update:modelValue', props.modelValue.filter(item => item.media_id !== id));
}

watch(() => props.documentList, () => {
  dataList.value = [...props.documentList];
}, {deep: true})

</script>
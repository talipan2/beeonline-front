<template>
  <UiModal 
    class="create-entity-final-modal modal"
    v-model="settingStore.createEntityFinalModal"
    @confirm="confirm"
    :closeButton="false"
    size="md"
  >
  <template #content>
    <!-- <p>{{ text }}</p> -->
    <Banners :banner="banner" />
  </template>
  </UiModal>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'order',
  }
})

const settingStore = useSettingStore();

const modalState = computed(() => settingStore.createEntityFinalModal);
const banner = ref({});

const confirm = () => {
  settingStore.createEntityFinalModal = false;
}

onMounted(() => {
  settingStore.getBanners({banner_type: 'banner'}).then((res) => {
    if(res && res.length > 0) {
      if(props.type === 'order') {
        banner.value = res.find(item => item.type === 'order_created_popup');
      } else if (props.type === 'service') {
        banner.value = res.find(item => item.type === 'service_created_popup');
      }
    }
  })
})

watch(() => modalState.value, (newVal) => {
  if(newVal === true) {
    if(banner.value.length === 0) {
      settingStore.createEntityFinalModal = false;
      return
    }
    setTimeout(() => {
      settingStore.createEntityFinalModal = false;
    }, 4000);
  }
}, {immediate: true});

</script>

<style lang="scss">

.create-entity-final-modal {
  font-size: 1rem;

  .modal-content {
    padding: 4em;
  }

  p {
    font-family: 'fira-sans', sans-serif;
    font-size: 2.8em;
    text-align: center;
  }
}

</style>
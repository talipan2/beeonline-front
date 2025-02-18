<template>
  <UiModal class="add-modal modal" v-model="settingStore.exhibitionModal" title="Добавить выставку" @confirm="() => confirm()">
    <template #header></template>
    <template #content>
      <form @submit="handleSubmit">
        <div class="form-group">
          <div class="image-box">
            <img :src="data.logoUrl || defaultImage" alt="Логотип выставки">
          </div>
          <UiSelect class="form-group__value" v-model="selectedExhibition" :options="options" />
        </div>
        {{ selectedExhibition }}
        <div class="form-group">
          <label for="brand" class="form-group__title">
            Ссылка
            <UiInput v-model="data.title" id="brand" class="form-group__value"/>
          </label>
        </div>
        <div class="form-group">
          <label for="description" class="form-group__title">
            Описание
            <CommonWysiwyg v-model="data.description" class="form-group__value" id="description"/>
          </label>
        </div>
        <UiButton type="submit" class="modal-btn" variant="quinary" size="large">{{ isEdit? 'Изменить' : 'Создать' }}</UiButton>
      </form>
    </template>
  </UiModal>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';
import defaultImage from '~/assets/images/nophoto_pc.png';

const props = defineProps({
  modelValue: {
    type: Array,
    default: [],
  },
  editCard: {
    type: Object,
    default: null,
  },
});

const options = [
  {
    id: 1, 
    label: 'https://bee-together.ru', 
    link: 'https://bee-together.ru', 
    img: ''
  },
] 



const selectedExhibition = ref(null);

const settingStore = useSettingStore();
const emit = defineEmits(['update:modelValue']);
const isEdit = ref(false);

const data = ref({
  logoUrl: '',
  title: '',
  description: '',
});

const handleSubmit = (event) => {
  event.preventDefault();
  if (isEdit.value) {
    // Редактирование карточки
    const updatedCards = props.modelValue.map(card =>
      card.id === props.editCard.id ? data.value : card
    );
    emit('update:modelValue', updatedCards);
  } else {
    // Добавление новой карточки
    emit('update:modelValue', [...props.modelValue, {...data.value, id: Math.random().toString(36).substr(2, 9)}]);
  }
  confirm();
};

function confirm() {
  settingStore.exhibitionModal = false;
  data.value = {
    logoUrl: '',
    title: '',
    description: '',
  };
  selectedExhibition.value = null;
}

watch(() => props.editCard, (editCard) => {
  if (editCard) {
    isEdit.value = true;
    data.value = { ...editCard };
  } else {
    isEdit.value = false;
    data.value = []
  }
}, { immediate: true });

watch(() => selectedExhibition.value, (newVal) => {
  if(!newVal) return
  const element = options.find((option) => option.id === newVal);
  data.value.logoUrl = element.img;
  data.value.title = element.link;
}, {deep: true});

</script>

<style lang="scss">

.add-modal {
  .modal-title {
    margin-block: 3.5rem 2.5rem;
    font-size: 2.8rem;
  }

  .add-file {
    margin-block: 0 1.15rem;
  }

  .modal-btn {
    font-size: 1.3rem;
    padding: 10px;
    margin-top: 3rem;
  }

}

</style>
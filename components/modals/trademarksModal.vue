<template>
  <UiModal class="add-modal modal" v-model="settingStore.trademarksModal" title="Добавить новый бренд"
    @confirm="() => confirm()">
    <template #header></template>
    <template #content>
      <form @submit="handleSubmit">
        <div class="form-group">
          <label for="brand" class="form-group__title">
            Название компании
            <UiInput v-model="data.title" id="brand" class="form-group__value" :required="true"/>
          </label>
        </div>
        <CommonDocumentLoader v-model="data.logoUrl" text="Прикрепить логотип бренда" />
        <div class="form-group">
          <label for="description" class="form-group__title">
            Описание
            <CommonWysiwyg v-model="data.description" class="form-group__value" id="description" :required="true"/>
          </label>
        </div>
        <UiButton type="submit" class="modal-btn" variant="quinary" size="large">{{ isEdit? 'Изменить' : 'Создать' }}</UiButton>
      </form>
    </template>
  </UiModal>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';

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

const settingStore = useSettingStore();
const emit = defineEmits(['update:modelValue']);
const isEdit = ref(false);

const data = ref({
  title: '',
  logoUrl: '',
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
  data.value = {};
  settingStore.trademarksModal = false;
};

function confirm() {
  settingStore.trademarksModal = false;
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
    width: 100%;
  }

}

</style>
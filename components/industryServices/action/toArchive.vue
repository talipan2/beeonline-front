<template>
    <slot name="button" :open="openModal" />
    <UiModal v-model="open" title="Снятие с публикации">
        <template #content>
            <UiForm :submit="submit">
                <div class="modal-text">
                    <p>Вы уверены, что хотите снять с публикации эту услугу?</p>
                </div>
                <div class="modal-buttons">
                    <UiButton class="modal-button" type="submit" variant="quinary" size="large">Подтвердить</UiButton>
                    <UiButton class="modal-button" type="button" variant="tertiary" size="large" @click="closeModal">Закрыть</UiButton>
                </div>
            </UiForm>
        </template>
    </UiModal>
</template>

<script setup>
import { useAdjacentStore } from '~/store/adjacentStore';
import { useToast } from 'vue-toastification';

const adjacentStore = useAdjacentStore();
const open = ref(false);
const loading = ref(false);

const emit = defineEmits(['success']);

const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
});

function openModal()
{
    open.value = true;
}
function closeModal()
{
    open.value = false;
}

function submit(values, form)
{
    adjacentStore
    .toArchive(props.data.pubcard.id, props.data.id)
    .then((response) => {
        closeModal();
        useToast().success("Услуга отправлена в архив");
        props.data.status = 'ARCHIVED';
        emit('success', props.data.id);
    });
}
</script>

<style lang="scss" scoped>
.modal-text {
    font-size: max(12px, 1.4em);
}
.modal-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 1em;
}
.modal-button {
    font-size: 12px;
    text-transform: uppercase;
}
</style>

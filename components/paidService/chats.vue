<template>
    <PaidServiceModal title="Создание чата" :prepare="prepare" :use="use" ref="modal">
        <template #button="{ open }">
            <slot name="button" :open="open" />
        </template>
        <template #prepared>
        </template>
        <template #used>
        </template>
        <template #buttons>
        </template>
    </PaidServiceModal>
</template>

<script setup>
const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
});

const modal = ref(null);
const preparedData = ref(null);
const usedData = ref(null);
const interval = ref(null);
const loading = ref(false);
const _error = ref(null);
const _success = ref(null);
const _first = ref(false);

const prepare = () => {
    if (_first.value) {
        _first.value = false;
        return new Promise((resolve, reject) => {
            reject(_error.value);
        });
    } else {
        modal.value.closeModal();
        _success.value();
        return new Promise((resolve, reject) => {
            resolve({
                message: 'Услуга успешно оплачена',
            });
        });
    }
};

const openModal = (error, success) => {
    _error.value = error;
    _success.value = success;
    _first.value = true;
    modal.value.openModal();
};

const use = () => {
};

defineExpose({
    openModal,
});
</script>

<style lang="scss" scoped>
.counterparty-check {
    font-size: 14px;

    &__organization {
        margin: 1em 0;
        padding: 1em 0;
        border-top: 1px solid var(--border-color-secondary);
        border-bottom: 1px solid var(--border-color-secondary);

        &-title {
            font-weight: 700;
        }
    }

    &-btn {
        font-size: 12px;
        font-weight: 400;
        text-transform: uppercase;
    }
}
</style>

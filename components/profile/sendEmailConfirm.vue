<template>
    <slot :send="sendEmailConfirm" />
</template>

<script setup>
import { useUserStore } from "~/store/userStore";
import { useToast } from 'vue-toastification';
const userStore = useUserStore();
const toast = useToast();
const loading = ref(false);

const emit = defineEmits(['success', 'fail', 'finally']);

const sendEmailConfirm = () => {
    if (loading.value) return;
    loading.value = true;
    userStore.sendEmailConfirm()
    .then(res => {
        if (res) {
            toast.success(res.message || 'Письмо отправлено');
            emit('success');
        }
    })
    .catch(err => {
        emit('fail');
    })
    .finally(() => {
        loading.value = false;
        emit('finally');
    });
}
</script>

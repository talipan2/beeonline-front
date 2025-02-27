<template>

</template>

<script setup>
import { useDealStore } from "~/store/dealStore";

const props = defineProps({
    id: {
        type: Number,
        default: null,
    },
    isManager: {
        type: Boolean,
        default: false,
    }
});

const dealStore = useDealStore();
const loading = ref(false);
const deal = ref(null);

function handleInit() {
    fetchDeal().catch((error) => {
        throw createError(error);
    });
}

async function fetchDeal() {
    if (loading.value) return;
    loading.value = true;

    dealStore.getDeal(props.id, {
        isManager: props.isManager
    })
    .then((response) => {
        deal.value = response;
    })
    .finally(() => {
        loading.value = false;
    });
}

handleInit();
</script>

<style lang="scss">
</style>

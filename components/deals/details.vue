<template>
 <div class="deals-details">
    <CommonSpinner
        :type="`grow`"
        v-if="loading && !deal"
    />
    <template v-else>
        <template v-if="deal">
            <DealsInfo :deal="deal"
                @action="(action, data, callback, errorCallback, form) => handleAction(action, data, callback, errorCallback, form)"
            />
            <DealsStages :deal="deal"
                @action="(action, data, callback, errorCallback, form) => handleAction(action, data, callback, errorCallback, form)"
            />
        </template>
        <CommonAlerts alert="Сделка не найдена" :type="'error'" v-else />
    </template>
 </div>
</template>

<script setup>
import { useDealStore } from "~/store/dealStore";
import { useChannelsStore } from "~/store/channelsStore";

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

const emit = defineEmits(['chat:open']);

const dealStore = useDealStore();
const channelsStore = useChannelsStore();

const loading = ref(false);
const deal = ref(null);
const channel = ref(null);

async function fetchDeal() {
    if (loading.value) return;
    loading.value = true;

    dealStore
    .getDeal(props.id, {
        is_manager: props.isManager
    })
    .then((response) => {
        deal.value = response.data;
        emit('chat:open', deal.value.chat_id);
        channel.value = channelsStore.private('deals.' + deal.value.id);
        channel.value.listen("DealUpdate", (event) => {
            handleAction('update');
        });
    })
    .catch((error) => {
        throw createError(error);
    })
    .finally(() => {
        loading.value = false;
    });
}

fetchDeal(true);

async function handleAction(action, values = null, callback = null, errorCallback = null, form = null) {
    if (deal.value.loading) return;
    deal.value.loading = true;

    dealStore
    .handleAction(deal.value.id, action, values, form)
    .then((response) => {
        deal.value = Object.assign(deal.value, response.data);
        if (typeof callback === 'function') {
            callback(response);
        }
    })
    .catch((error) => {
        if (typeof errorCallback === 'function') {
            errorCallback(error);
        }
    })
    .finally(() => {
        deal.value.loading = false;
    });
}
</script>

<style lang="scss">
</style>

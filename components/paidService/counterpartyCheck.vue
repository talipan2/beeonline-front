<template>
    <PaidServiceModal title="Проверка контрагента" :prepare="prepare" :use="use">
        <template #button="{ open }">
            <slot name="button" :open="open" />
        </template>
        <template #prepared>
            <div class="counterparty-check" v-if="preparedData">
                <template v-if="preparedData.is_free">
                    <p>Контрагент верифицирован, проверка будет бесплатна</p>
                </template>
                <template v-else>
                    <p>Обратите внимание что повторная проверка контрагента так же будет платной</p>
                    <p>Количество доступных проверок: {{ preparedData.check_service?.quantity || 0 }}</p>
                </template>
                <div class="counterparty-check__organization">
                    <div class="counterparty-check__organization-title">Юридическое название организации</div>
                    <div class="counterparty-check__organization-name">{{ preparedData.organization_name }}</div>
                </div>
            </div>
        </template>
        <template #used>
            <div class="counterparty-check" v-if="usedData">
                {{ usedData }}
            </div>
        </template>
    </PaidServiceModal>
</template>

<script setup>
import { useCounterpartyCheckStore } from '~/store/counterpartyCheckStore';
import { useChannelsStore } from '~/store/channelsStore';

const counterpartyCheckStore = useCounterpartyCheckStore();
const channelsStore = useChannelsStore();

const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
});

const preparedData = ref(null);
const usedData = ref(null);

const prepare = () => {
    return counterpartyCheckStore.prepare(props.id)
    .then((response) => {
        preparedData.value = response;
    });
};
const use = () => {
    return counterpartyCheckStore.check(props.id)
    .then((response) => {
        usedData.value = response.data;
        channelsStore.orgChannel.stopListening("CounterpartyUpdate")
            .listen("CounterpartyUpdate", (event) => {
                if (event.id == props.id) {
                    counterpartyCheckStore.show(usedData.value.id);
                }
            })
    });
};
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
}
</style>

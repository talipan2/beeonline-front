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
                <div class="counterparty-check__organization">
                    <div class="counterparty-check__organization-title">Юридическое название организации</div>
                    <div class="counterparty-check__organization-name">{{ usedData.counterparty_name }}</div>
                </div>
                <ul class="counterparty-check__list">
                    <li>Номер проверки: {{ usedData.id }}</li>
                    <li>Статус: {{ usedData.status_name }}</li>
                </ul>
                <CommonSpinner v-if="usedData.status === 'in_progress'" />
                <CommonAlerts :alert="'Во время проверки произошла ошибка'" type="error" v-if="usedData.status === 'failed'"/>
            </div>
        </template>
        <template #buttons>
            <UiButton
                class="counterparty-check-btn"
                variant="primary"
                size="large"
                :to="usedData?.file?.url"
                v-if="usedData?.file?.url"
                target="_blank"
            >
                Открыть
            </UiButton>
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
const interval = ref(null);
const loading = ref(false);

channelsStore.orgChannel
.stopListening("CounterpartyCheckUpdate")
.listen("CounterpartyCheckUpdate", (event) => {
    if (event.id == usedData.value.id) {
        counterpartyCheckUpdate();
    }
});

const prepare = () => {
    usedData.value = null;
    preparedData.value = null;

    return counterpartyCheckStore.prepare(props.id)
    .then((response) => {
        preparedData.value = response;
    });
};
const use = () => {
    return counterpartyCheckStore.check(props.id)
    .then((response) => {
        usedData.value = response.data;

        clearInterval(interval.value);
        interval.value = setInterval(() => {
            counterpartyCheckUpdate();
        }, 5000);
    });
};

function counterpartyCheckUpdate() {
    if (loading.value) return;
    if (!usedData.value) return;
    loading.value = true;

    counterpartyCheckStore.show(usedData.value.id)
    .then((response) => {
        usedData.value = response.data;
        if (usedData.value.file?.url) {
            clearInterval(interval.value);
            window.open(usedData.value.file?.url, '_blank');
        }
    })
    .finally(() => {
        loading.value = false;
    });
}
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

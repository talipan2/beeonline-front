<template>
    <slot name="button" :open="openModal" />
    <UiModal v-model="open" :title="title">
        <template #content>
            <div class="modal-text">
                <CommonSpinner v-if="prepareLoading"/>
                <template v-else>
                    <template v-if="responseError">
                        <CommonAlerts :alert="responseError.message" :type="'error'"/>
                        <template v-if="responseErrorKey === 'buy_service' && responseErrorData">
                            <TariffsPayModal
                                :data="responseErrorData"
                                :userBalance="formatMoney(responseErrorData.balance)"
                                :userBonuses="responseErrorData.bonuses"
                                :currentCurrency="responseErrorData.currency"
                                :reset="prepare"
                            />
                            <TariffsReplenishmentModal :currentCurrency="responseErrorData.currency" />
                        </template>
                    </template>
                    <template v-else>
                        <slot name="prepared" v-if="!used" />
                        <slot name="used" v-else />
                    </template>
                </template>
            </div>
            <div class="modal-buttons">
                <template v-if="responseErrorKey === 'buy_service' && responseErrorData">
                    <UiButton class="modal-button" type="submit" variant="quinary" size="large" @click="settingStore.payModalStatus = true">Приобрести</UiButton>
                </template>
                <template v-if="canUse">
                    <UiButton class="modal-button" type="submit" variant="quinary" size="large" @click="use">Подтвердить</UiButton>
                </template>
                <UiButton class="modal-button" type="button" variant="tertiary" size="large" @click="closeModal">Закрыть</UiButton>
            </div>
        </template>
    </UiModal>
</template>

<script setup>
import { useSettingStore } from "~/store/settingStore";

const settingStore = useSettingStore();

const open = ref(false);

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    prepare: {
        type: Function,
        required: true,
    },
    use: {
        type: Function,
        required: true,
    },
});

const prepareLoading = ref(false);
const useLoading = ref(false);
const canUse = ref(false);
const used = ref(false);

const responseError = ref(null);
const responseErrorKey = ref(null);
const responseErrorData = ref(null);

watch(() => open.value, (value) => {
    if (!value) return;
    prepare();
});

function openModal()
{
    open.value = true;
}
function closeModal()
{
    open.value = false;
}

function prepare()
{
    reset();

    if (prepareLoading.value) return;
    prepareLoading.value = true;

    props.prepare()
    .then((response) => {
        canUse.value = true;
    })
    .catch((error) => {
        responseError.value = error;
        if (error.data?.error_key) {
            responseErrorKey.value = error.data.error_key;
        }
        if (error.data?.error_data) {
            responseErrorData.value = error.data.error_data;
            settingStore.payModalStatus = true;
        }
    })
    .finally(() => {
        prepareLoading.value = false;
    });
}

function use()
{
    if (useLoading.value) return;
    useLoading.value = true;

    props.use()
    .then((response) => {
        canUse.value = false;
        used.value = true;
    })
    .catch((error) => {
        responseError.value = error;
        if (error.data?.error_key) {
            responseErrorKey.value = error.data.error_key;
        }
    })
    .finally(() => {
        useLoading.value = false;
    });
}

function reset() {
    prepareLoading.value = false;
    useLoading.value = false;
    canUse.value = false;
    used.value = false;
    responseError.value = null;
    responseErrorKey.value = null;
    responseErrorData.value = null;
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

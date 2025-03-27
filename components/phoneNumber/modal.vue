<template>
    <slot
        name="button"
        :open="openModal"
    />
    <UiModal
        v-model="open"
        title="Позвонить заказчику"
    >
        <template #content>
            <div
                class="modal-text"
                v-if="open"
            >
                <CommonSpinner v-if="loading" />
                <template v-else>
                    <template v-if="responseError">
                        <CommonAlerts
                            :alert="responseError.message"
                            :type="'error'"
                        />
                    </template>
                    <template v-else>
                        {{ phoneNumberAssignment }}
                    </template>
                </template>
            </div>
            <div class="modal-buttons">
                <template v-if="responseErrorData">
                    <template v-if="responseErrorData.button">
                        <UiButton
                            class="modal-button"
                            variant="quinary"
                            size="large"
                            :target="responseErrorData.button.target"
                            :to="responseErrorData.button.url"
                            >{{ responseErrorData.button.title }}</UiButton
                        >
                    </template>
                    <template v-if="responseErrorData.can_chat">
                        <UiButton
                            class="modal-button"
                            variant="quinary"
                            size="large"
                            :to="`/chat?order_id=${orderId}`"
                            >Написать заказчику</UiButton
                        >
                    </template>
                </template>
                <UiButton
                    class="modal-button"
                    type="button"
                    variant="tertiary"
                    size="large"
                    @click="closeModal"
                    >Закрыть</UiButton
                >
            </div>
        </template>
    </UiModal>
</template>

<script setup>
import { useEntityStore } from "~/store/entityStore";

const entityStore = useEntityStore();

const open = ref(false);

const props = defineProps({
    orderId: {
        type: Number,
        required: true,
    },
});

const phoneNumberAssignment = ref(null);
const loading = ref(false);
const responseError = ref(null);
const responseErrorKey = ref(null);
const responseErrorData = ref(null);

const getPhoneNumber = async () => {
    if (loading.value) return;

    entityStore
        .getPhoneNumber(props.orderId)
        .then((response) => {
            phoneNumberAssignment.value = response.data;
        })
        .catch((error) => {
            responseError.value = error;
            if (error.data?.error_key) {
                responseErrorKey.value = error.data.error_key;
            }
            if (error.data?.error_data) {
                responseErrorData.value = error.data.error_data;
            }
        })
        .finally(() => {
            loading.value = false;
        });
};

function reset() {
    loading.value = false;
    phoneNumberAssignment.value = null;
    responseError.value = null;
    responseErrorKey.value = null;
    responseErrorData.value = null;
}

const openModal = () => {
    open.value = true;
};

const closeModal = () => {
    open.value = false;
};

watch(
    () => open.value,
    () => {
        if (open.value) {
            reset();
            getPhoneNumber();
        }
    }
);
</script>

<style lang="scss" scoped>
.modal-text {
    font-size: max(12px, 1.4em);
}
.modal-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 1em;

    @include mobile {
        flex-direction: column;
    }
}
.modal-button {
    font-size: 12px;
    text-transform: uppercase;
}
</style>

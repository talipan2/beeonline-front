<template>
    <UiModal
        class="modal replenishment-modal"
        v-model="settingStore.replenishmentModalStatus"
        title="Пополнение баланса"
        @confirm="() => confirm()"
    >
        <template #content>
            <template v-if="invoice">
                <div class="invoice">
                    <ul class="invoice__list">
                        <li>Номер: {{ invoice.number }}</li>
                        <li>Сумма: {{ invoice.amount }}</li>
                        <li>Статус: {{ invoice.status_name }}</li>
                    </ul>
                    <UiButton
                        type="submit"
                        class="invoice__btn"
                        variant="primary"
                        size="large"
                        @click="payInvoice"
                        v-if="invoice.status === 'generated'"
                    >
                        Оплатить
                    </UiButton>
                    <CommonSpinner v-if="invoice.status === 'in_progress'" />
                    <CommonAlerts :alert="invoice.message || 'Что-то пошло не так'" type="error" v-if="invoice.status === 'failed'"/>
                </div>
            </template>
            <Form @submit="handleSubmit" v-else>
                <p class="replenishment-modal__text">
                    Вы будете перенаправлены на страницу банка.
                </p>
                <label class="form-group-data form-group__title">
                    Сумма пополнения, {{ currentCurrency }}.
                    <UiInput
                        name="amount"
                        v-model="amount"
                        type="number"
                        class="form-group__value"
                    />
                </label>
                <div class="replenishment-modal__buttons">
                    <UiButton
                        type="submit"
                        class="replenishment-modal__btn"
                        variant="primary"
                        size="large"
                        @click="buttonValue = 'external'"
                        >Оплатить картой</UiButton
                    >
                    <UiButton
                        type="submit"
                        name="type"
                        value="invoice"
                        class="replenishment-modal__btn replenishment-modal__btn__type-account"
                        variant="tertiary"
                        size="large"
                        @click="buttonValue = 'invoice'"
                        >Сформировать счет</UiButton
                    >
                </div>
            </Form>
        </template>
    </UiModal>
</template>

<script setup>
import { useSettingStore } from "~/store/settingStore";
import { useInvoiceStore } from "~/store/invoiceStore";
import { useChannelsStore } from "~/store/channelsStore";

const props = defineProps({
    currentCurrency: {
        type: String,
        required: true,
    },
});

const router = useRouter();

const invoiceStore = useInvoiceStore();
const settingStore = useSettingStore();
const channelsStore = useChannelsStore();

const buttonValue = ref('');
const amount = ref(1000);

const loading = ref(false);
const invoice = ref(null);

const confirm = () => {
    settingStore.replenishmentModalStatus = false;
};

function handleSubmit(values, form) {
    if (loading.value) return;
	loading.value = true;
	const data = {
		...values,
		type: buttonValue.value,
        redirect_url: router.currentRoute.value.fullPath,
	};

	invoiceStore.makeInvoice(data)
	.then((response) => {
        invoice.value = response.data;
        channelsStore
        .orgChannel.stopListening("InvoiceUpdate")
        .listen("InvoiceUpdate", (event) => {
            console.log("InvoiceUpdate", event);
            if (invoice.value?.id === event.id) {
                invoice.value = event;
                payInvoice();
            }
        });
	}).finally(() => {
		loading.value = false;
	});
}

function payInvoice() {
    if (!invoice.value) return;
    if (invoice.value.status != 'generated') return;
    if (invoice.value.type === 'external') {
        window.open(invoice.value.payment_url, '_blank');
    } else if (invoice.value.type === 'invoice') {
        window.open(invoice.value.pdf_url, '_blank');
    }
}

watch(() => settingStore.replenishmentModalStatus, (newVal) => {
    loading.value = false;
    invoice.value = null;
});
</script>

<style lang="scss">
.replenishment-modal {
    font-size: 1rem;

    form {
        display: flex;
        flex-direction: column;
    }

    .modal-content {
        max-width: 21%;
    }

    .modal-title {
        font-size: 2.8em;
    }

    &__text {
        font-size: 1.6em;
        margin-bottom: 1em;
    }

    .form-group-data {
        margin-bottom: 2em;
    }

    &__buttons {
        display: flex;
        gap: 2em;
        margin-bottom: 1em;
    }

    &__btn {
        font-size: 1.2em;
        font-weight: 400;
        text-transform: uppercase;
        width: 100%;
        padding: 0.8em;
        text-wrap: wrap;

        &_type-account {
            color: #212529;
        }
    }

    @include desktop {
        .modal-dialog {
            width: 30%;
        }
    }

    @include tablet {
        .modal-dialog {
            width: 40%;
        }
    }

    @include mobile {
        .modal-dialog {
            width: 70%;
        }
    }

    @include small-mobile {
        .modal-dialog {
            width: 95%;
        }
    }
}

.invoice {
    font-size: 14px;
    &__list {
        li {
            margin-bottom: 0.5em;
        }
    }

    &__btn {
        font-size: 1em;
        font-weight: 400;
        text-transform: uppercase;
        width: 100%;
        padding: 0.8em;
        text-wrap: wrap;
    }
}
</style>

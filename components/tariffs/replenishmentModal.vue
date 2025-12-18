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
                        <li>Сумма: {{ invoice.amount / 100 }}</li>
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
                        v-if="!withoutInvoice"
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
    withoutInvoice: {
        type: Boolean,
        default: false,
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
const interval = ref(null);
const opened = ref(false);

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
        opened.value = false;
        startInvoiceInterval(5000);
	}).finally(() => {
		loading.value = false;
	});
}

function payInvoice(fromUpdate = false) {
    if (!invoice.value) return;
    if (invoice.value.status != 'generated') {
        clearInterval(interval.value);
        return;
    }
    if (fromUpdate && opened.value) return; // предотвращаем повторное открытие
    if (invoice.value.type === 'external') {
        opened.value = true;
        window.open(invoice.value.payment_url, '_blank');
        // перезапускаем с большим интервалом
        startInvoiceInterval(10000);
    } else if (invoice.value.type === 'invoice') {
        opened.value = true;
        window.open(invoice.value.pdf_url, '_blank');
        clearInterval(interval.value);
    }
}

watch(() => settingStore.replenishmentModalStatus, (newVal) => {
    if (newVal) {
        eventBus.on('InvoiceUpdate', invoiceUpdateHandler);
    } else {
        eventBus.off('InvoiceUpdate', invoiceUpdateHandler);
    }
    clearInterval(interval.value);
    loading.value = false;
    invoice.value = null;
});

function startInvoiceInterval(delay = 5000) {
    clearInterval(interval.value);
    interval.value = setInterval(() => {
        invoiceUpdate('interval');
    }, delay);
}

function invoiceUpdateHandler(event) {
    if (!invoice.value) return;
    if (event.id !== invoice.value.id) return;
    invoiceUpdate('handler');
}

function invoiceUpdate(from) {
    if (loading.value) return;
    if (!invoice.value) return;
    loading.value = true;
    console.log(`from: ${from}`);

    invoiceStore.show(invoice.value.id)
    .then((response) => {
        invoice.value = response.data;
        payInvoice(true);
    })
    .finally(() => {
        loading.value = false;
    });
}
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
        .modal-content {
            max-width: 30%;
        }
    }

    @include tablet {
        .modal-content {
            max-width: 40%;
        }
    }

    @include mobile {
        .modal-content {
            max-width: 70%;
        }
    }

    @include small-mobile {
        .modal-content {
            max-width: 95%;
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

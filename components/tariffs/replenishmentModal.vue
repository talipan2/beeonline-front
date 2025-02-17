<template>
    <UiModal
        class="modal replenishment-modal"
        v-model="settingStore.replenishmentModalStatus"
        title="Пополнение баланса"
        @confirm="() => confirm()"
    >
        <template #content>
            <Form @submit="handleSubmit">
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
                        @click="buttonValue = 'ext'"
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
import { useTariffsStore } from "~/store/tariffsStore";

const props = defineProps({
    currentCurrency: {
        type: String,
        required: true,
    },
});

const router = useRouter();

const settingStore = useSettingStore();
const tariffsStore = useTariffsStore();

const buttonValue = ref('');
const amount = ref(1000);

const loading = ref(false);

const confirm = () => {
    settingStore.replenishmentModalStatus = false;
};


function handleSubmit(form) {
    if (loading.value) return;
	loading.value = true;
	const data = {
		...form,
		type: buttonValue.value,
	};

	tariffsStore.balanceAdd(data)
	.then((response) => {
		confirm();
		if (response.open_new_tab?.length) {
			showMessage(
				"Счет создан",
				response.message,
			);
			setTimeout(() => {
				window.open(response.open_new_tab, "_blank");
			}, 500);
		} else if (response.redirect?.length) {
			showMessage(
				"Счет создан",
				response.message,
			);
			setTimeout(() => {
                router.push({ path: response.redirect });
			}, 500);
		}
	}).finally(() => {
		loading.value = false;
		confirm();
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

    .modal-dialog {
        width: 21%;
    }

    .modal-content {
        padding: 5.5em 2em 2em;
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
</style>

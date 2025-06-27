<template>
    <PaidServiceModal :title="title" :prepare="prepare" :use="use" ref="modal">
        <template #button="{ open }">
            <slot name="button" :open="open" />
        </template>
        <template #prepared>
            <div class="counterparty-check" v-if="preparedData">
                <div class="counterparty-check__organization">
                    <div class="counterparty-check__organization-title">Заказ:</div>
                    <div class="counterparty-check__organization-name">{{ preparedData.order_name }}</div>
                </div>
                <div class="counterparty-check__organization">
                    <template v-if="preparedData.is_free">
                        <div class="counterparty-check__organization-title">Приветствие уже установлено, вы можете изменить его</div>
                    </template>
                    <template v-else>
                        <div class="counterparty-check__organization-title">{{ preparedData.paid_service.name }}</div>
                        <div class="counterparty-check__organization-name">Количество: {{ preparedData.paid_service.quantity }}</div>
                    </template>
                </div>
                <div class="counterparty-check__organization">
                    <Form as="" v-slot="{ values, submitForm, handleSubmit }" @invalid-submit="onInvalidSubmit">
                        <form @submit="handleSubmit($event, submit)" ref="form">
                            <div class="form-group">
                                <label class="form-group__title">
                                Приветственная ссылка *
                                <UiInput
                                    label="Приветственная ссылка"
                                    name="intro_link"
                                    placeholder=""
                                    v-model="formData.intro_link"
                                    type="text"
                                    :rules="{ required: true, url: true }"
                                />
                                </label>
                            </div>
                            <div class="form-group">
                                <label class="form-group__title">
                                Приветственный комментарий *
                                <UiTextArea
                                    label="Приветственный комментарий"
                                    type="text"
                                    placeholder=""
                                    name="intro_comment"
                                    v-model="formData.intro_comment"
                                    :rules="{ required: true }"
                                />
                                </label>
                            </div>

                            <!-- сохраняем submitForm во внешний ref -->
                            <!-- <template v-if="captureSubmitForm(submitForm)" /> -->
                        </form>
                    </Form>
                </div>
            </div>
        </template>
        <template #used>
            <CommonAlerts :alert="'Приветствие успешно добавлено'" type="success"/>
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
import { useEntityStore } from '~/store/entityStore';

const entityStore = useEntityStore();

const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        default: 'Добавить ссылку на форму сбора',
    },
});

const preparedData = ref(null);
const usedData = ref(null);
const formData = ref({
    intro_link: null,
    intro_comment: null,
});
const form = ref(null);
const modal = ref(null);
const promiseReject = ref(null);
const promiseResolve = ref(null);

function onInvalidSubmit({values, errors, results}) {
    promiseReject.value(null);
}

function submit(values, ctx) {
    entityStore.setOrderIntro(props.id, values, ctx)
    .then((response) => {
        promiseResolve.value(response);
    })
    .catch((error) => {
        if (error.statusCode === 422) {
            console.log('reject');
            // ошибка валидации
            promiseReject.value(null);
        }
    });
}

const prepare = () => {
    usedData.value = null;
    preparedData.value = null;

    return entityStore.prepareOrderIntro(props.id)
    .then((response) => {
        preparedData.value = response;
        formData.value.intro_link = response.intro_link;
        formData.value.intro_comment = response.intro_comment;
    });
};

const use = () => {
    return new Promise((resolve, reject) => {
        promiseReject.value = reject;
        promiseResolve.value = resolve;
        form.value.requestSubmit();
    });
};

</script>

<style lang="scss" scoped>
.counterparty-check {
    font-size: 14px;
    display: flex;
    flex-direction: column;
    margin: 1em 0;

    &__organization {
        // margin: 1em 0;
        padding: 1em 0;
        border-top: 1px solid var(--border-color-secondary);
        border-bottom: 1px solid var(--border-color-secondary);

        &-title {
            font-weight: 700;
        }
    }

    &__organization + &__organization {
        border-top: none;
    }

    &-btn {
        font-size: 12px;
        font-weight: 400;
        text-transform: uppercase;
    }
}
</style>

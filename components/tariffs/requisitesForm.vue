<template>
    <div class="requisites-form">
        <p class="requisites-form__text">
            Для формирования счета необходимо заполнить реквизиты организации
        </p>
        <Form @submit="handleSubmit" v-slot="{ errors }">
            <div class="requisites-form__fields">
                <label class="form-group-data">
                    <span class="form-group__title">
                        Название организации <span class="required">*</span>
                    </span>
                    <UiInput
                        name="name"
                        v-model="formData.name"
                        type="text"
                        class="form-group__value"
                        :class="{ 'input-error': !formData.name }"
                        placeholder="Введите название"
                    />
                    <span v-if="!formData.name" class="error-text">Поле обязательно для заполнения</span>
                </label>

                <label class="form-group-data">
                    <span class="form-group__title">
                        ИНН <span class="required">*</span>
                    </span>
                    <UiInput
                        name="inn"
                        v-model="formData.inn"
                        type="text"
                        class="form-group__value"
                        :class="{ 'input-error': !formData.inn }"
                        placeholder="Введите ИНН"
                    />
                    <span v-if="!formData.inn" class="error-text">Поле обязательно для заполнения</span>
                </label>

                <label class="form-group-data" v-if="!isIP">
                    <span class="form-group__title">
                        КПП <span class="required">*</span>
                    </span>
                    <UiInput
                        name="kpp"
                        v-model="formData.kpp"
                        type="text"
                        class="form-group__value"
                        :class="{ 'input-error': !isIP && !formData.kpp }"
                        placeholder="Введите КПП"
                    />
                    <span v-if="!isIP && !formData.kpp" class="error-text">Поле обязательно для заполнения</span>
                </label>

                <label class="form-group-data">
                    <span class="form-group__title">
                        Юридический адрес <span class="required">*</span>
                    </span>
                    <UiInput
                        name="legal_address"
                        v-model="formData.legal_address"
                        type="text"
                        class="form-group__value"
                        :class="{ 'input-error': !formData.legal_address }"
                        placeholder="Введите юридический адрес"
                    />
                    <span v-if="!formData.legal_address" class="error-text">Поле обязательно для заполнения</span>
                </label>

                <div class="form-group-data">
                    <UiCheckbox 
                        v-model="saveRequisites" 
                        name="save_requisites"
                        :is-validated="false"
                    >
                        Сохранить реквизиты в карточке организации для дальнейших счетов
                    </UiCheckbox>
                </div>
            </div>

            <div class="requisites-form__buttons">
                <UiButton
                    type="submit"
                    class="requisites-form__btn"
                    variant="primary"
                    size="large"
                    :disabled="!isFormValid"
                >
                    Сформировать счет
                </UiButton>
                <UiButton
                    type="button"
                    class="requisites-form__btn"
                    variant="tertiary"
                    size="large"
                    @click="$emit('cancel')"
                >
                    Отменить
                </UiButton>
            </div>
        </Form>
    </div>
</template>

<script setup>
import { Form } from 'vee-validate';
import { useOrganizationStore } from '~/store/organizationStore';

const props = defineProps({
    organizationData: {
        type: Object,
        default: () => ({}),
    },
    amount: {
        type: Number,
        required: true,
    },
});

const emit = defineEmits(['submit', 'cancel']);

const organizationStore = useOrganizationStore();

const formData = ref({
    inn: props.organizationData?.inn || '',
    kpp: props.organizationData?.kpp || '',
    legal_address: props.organizationData?.legal_address || '',
    name: props.organizationData?.name || '',
    org_form: props.organizationData?.org_form?.value || props.organizationData?.org_form || null,
});

const saveRequisites = ref(false);

// Обновляем formData при изменении organizationData
watch(() => props.organizationData, (newData) => {
    if (newData) {
        formData.value = {
            inn: newData.inn || '',
            kpp: newData.kpp || '',
            legal_address: newData.legal_address || '',
            name: newData.name || '',
            org_form: newData.org_form?.value || newData.org_form || null,
        };
    }
}, { deep: true, immediate: true });

const isIP = computed(() => {
    return formData.value.org_form === 1; // 1 = ИП
});

const isFormValid = computed(() => {
    const hasName = !!formData.value.name;
    const hasInn = !!formData.value.inn;
    const hasAddress = !!formData.value.legal_address;
    const hasKpp = isIP.value || !!formData.value.kpp;
    
    return hasName && hasInn && hasAddress && hasKpp;
});

function handleSubmit() {
    if (!isFormValid.value) {
        return;
    }

    emit('submit', {
        requisites: formData.value,
        saveRequisites: saveRequisites.value,
    });
}
</script>

<style lang="scss" scoped>
.requisites-form {
    font-size: 1rem;

    &__text {
        font-size: 1.6em;
        margin-bottom: 2em;
        color: #212529;
    }

    &__fields {
        display: flex;
        flex-direction: column;
        gap: 2em;
        margin-bottom: 2em;
    }

    .form-group-data {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
    }

    .form-group__title {
        font-size: 1.4em;
        font-weight: 500;
        color: #212529;

        .required {
            color: #dc3545;
        }
    }

    .form-group__value {
        font-size: 1.4em;
    }

    .input-error {
        border-color: #dc3545 !important;
    }

    .error-text {
        font-size: 1.2em;
        color: #dc3545;
        margin-top: 0.25em;
    }

    &__buttons {
        display: flex;
        gap: 1em;
        justify-content: flex-end;
        margin-top: 2em;
    }

    &__btn {
        font-size: 1.2em;
        text-transform: uppercase;
    }
}
</style>


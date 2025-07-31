<template>
    <div class="login">
        <h1 class="login__title">Обновление пароля</h1>
        <Form
            class="reset__form"
            @submit="handleSubmit"
            v-if="!success"
        >
            <UiInput
                :rules="{ required: true }"
                class="auth__input"
                v-model="formData.token"
                name="token"
                label="token"
                type="hidden"
            />
            <UiInput
                :rules="{ required: true, min: 6, email: true }"
                class="auth__input"
                placeholder="E-mail"
                v-model="formData.email"
                name="email"
                label="E-mail"
            />
            <UiInput
                :rules="{ required: true, min: 6 }"
                :type="isShowPassword ? 'text' : 'password'"
                name="password"
                label="Пароль"
                placeholder="Пароль"
                class="auth__input auth__input_type-password"
                v-model="formData.password"
            >
                <template #action>
                    <button
                        type="button"
                        class="auth__show-password"
                        @click="() => (isShowPassword = !isShowPassword)"
                    >
                        <SvgoViews
                            class="svg-lx"
                            fill="#6937a5"
                        />
                    </button>
                </template>
            </UiInput>
            <UiInput
                :rules="{ required: true, min: 6, confirmed: formData.password }"
                :type="isShowPassword ? 'text' : 'password'"
                name="password_confirmation"
                label="Пароль"
                placeholder="Пароль"
                class="auth__input auth__input_type-password"
                v-model="formData.password_confirmation"
            >
                <template #action>
                    <button
                        type="button"
                        class="auth__show-password"
                        @click="() => (isShowPassword = !isShowPassword)"
                    >
                        <SvgoViews
                            class="svg-lx"
                            fill="#6937a5"
                        />
                    </button>
                </template>
            </UiInput>

            <div class="reset__btn-container">
                <UiButton
                    to="/login"
                    class="reset__btn reset__btn_type-back"
                    variant="default"
                    >Вернуться к авторизации</UiButton
                >
                <UiButton
                    type="submit"
                    to="/login"
                    class="reset__btn"
                    variant="quinary"
                    size="large"
                    >Отправить</UiButton
                >
            </div>
        </Form>
        <CommonAlerts
            :alert="message"
            type="info"
            v-else-if="message"
        />
    </div>
</template>

<script setup>
import { useUserStore } from "~/store/userStore";

const userStore = useUserStore();

const formData = ref({
    email: "",
    password: "",
    password_confirmation: "",
    token: "",
});

const router = useRouter();

const loading = ref(false);
const success = ref(false);
const message = ref("");

const isShowPassword = ref(false);

const handleSubmit = (values, form) => {
    if (loading.value) return;
    loading.value = true;
    userStore
        .resetPassword(values, form)
        .then((res) => {
            console.log(res);
            success.value = true;
            message.value = res.message;
        })
        .finally(() => {
            loading.value = false;
        });
};

onMounted(() => {
    if (
        router.currentRoute.value.query &&
        router.currentRoute.value.query.token
    ) {
        formData.value.token = router.currentRoute.value.query?.token;
        formData.value.email = router.currentRoute.value.query?.email;
    }
});
</script>

<style lang="scss">
.login {
    font-size: 1rem;

    &__title {
        font-size: 3.6em;
        margin-bottom: 0.83em;
    }

    &__subtitle {
        font-size: 1.6em;
        margin-bottom: 1.5em;
    }
}

.reset {
    font-family: "lato", sans-serif;

    &__form {
        display: flex;
        flex-direction: column;
        row-gap: 1em;
        font-weight: 400;
        margin-bottom: 1em;
    }

    &__input {
        font-size: 1.6em;
        padding: 1.25em;
        position: relative;
        flex: 1;
    }

    &__btn-container {
        display: flex;
        gap: 1em;
        justify-content: space-between;
    }

    &__btn {
        flex: 0 1 50%;
        font-size: 1.2rem;
        text-transform: uppercase;
    }

    &__btn_type-back {
        flex: 0 0 auto;
        padding: 0;
        text-transform: none;
        font-size: 1.6rem;
        color: #a9abac;

        &:hover {
            color: #828586 !important;
            text-decoration: underline;
        }
    }
}
</style>

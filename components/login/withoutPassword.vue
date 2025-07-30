<template>
    <div class="login">
        <h1 class="login__title">Авторизация без пароля</h1>
        <template v-if="currentAuthPage === 'write-email'">
            <p class="login__subtitle">
                Введите email, на который вы регистрировали учетную запись. На
                нее мы отправим код авторизации, который необходимо ввести для
                входа в личный кабинет.
            </p>
            <Form
                class="auth__form"
                @submit="handleSubmit"
            >
                <UiInput
                    :rules="{ required: true, min: 6, email: true }"
                    class="auth__input"
                    placeholder="E-mail"
                    v-model="email"
                    name="email"
                    label="E-mail"
                />
                <div class="auth__btn-container">
                    <UiButton
                        to="/login"
                        class="auth__btn"
                        variant="tertiary"
                        size="large"
                        >Войти с паролем</UiButton
                    >
                    <UiButton
                        type="submit"
                        class="auth__btn"
                        variant="quinary"
                        size="large"
                        >Отправить</UiButton
                    >
                </div>
            </Form>
        </template>
        <template v-if="currentAuthPage === 'write-code'">
            <p class="login__subtitle">
                На ваш регистрационный email отправлен код. Введите его в поле
                ниже.
            </p>
            <Form
                class="auth__form"
                @submit="handleSubmitCode"
            >
                <UiInput
                    :rules="{ required: true }"
                    class="auth__input"
                    placeholder="Код из письма"
                    v-model="code"
                    name="code"
                    label="Код из письма"
                    type="text"
                />
                <div class="auth__btn-container">
                    <UiButton
                        to="/login"
                        class="auth__btn"
                        variant="tertiary"
                        size="large"
                        >Войти с паролем</UiButton
                    >
                    <UiButton
                        type="submit"
                        class="auth__btn"
                        variant="quinary"
                        size="large"
                        >Вход</UiButton
                    >
                </div>
            </Form>
        </template>
        <LoginFooter />
    </div>
</template>

<script setup>
import { useUserStore } from "~/store/userStore";

const router = useRouter();

const currentAuthPage = ref("write-email");
const userStore = useUserStore();

const email = ref("");
const code = ref("");

const loading = ref(false);

const handleSubmit = (values, form) => {
    if (loading.value) return;
    loading.value = true;

    userStore.otpSend(values, form)
    .then((res) => {
        currentAuthPage.value = "write-code";
    })
    .finally(() => {
        loading.value = false;
    });
};

const handleSubmitCode = (values, form) => {
    userStore
        .authUser(
            {
                email: email.value,
                code: code.value,
                is_otp: true
            },
            form
        )
        .then((res) => {
            router.push({ path: "/desktop" });
        });
};
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

.auth {
    font-family: "lato", sans-serif;

    &__form {
        display: flex;
        flex-direction: column;
        row-gap: 1em;
        font-weight: 400;
        margin-bottom: 1em;
    }

    &__input {
        font-size: 1.6rem;
        padding: 1.25rem;
        position: relative;
        flex: 1;
    }
}
</style>

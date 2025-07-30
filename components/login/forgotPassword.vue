<template>
    <div class="login">
        <h1 class="login__title">Восстановление пароля</h1>
        <p class="login__subtitle">
            Вы можете восстановить пароль, отправив свою электронную почту.
            На нее мы вышлем письмо с инструкцией по восстановлению.
        </p>
        <Form
            class="forgot__form"
            @submit="handleSubmit"
            v-if="!success"
        >
            <UiInput
                :rules="{ required: true, min: 6, email: true }"
                class="auth__input"
                placeholder="E-mail"
                name="email"
                label="E-mail"
            />
            <div class="forgot__btn-container">
                <UiButton
                    to="/login"
                    class="forgot__btn forgot__btn_type-back"
                    variant="default"
                    >Вернуться к авторизации</UiButton
                >
                <UiButton
                    type="submit"
                    to="/login"
                    class="forgot__btn"
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

const loading = ref(false);
const success = ref(false);
const message = ref("");

const router = useRouter();
const isSendedMailToReset = ref(false);

const handleSubmit = (values, form) => {
    if (loading.value) return;
    loading.value = true;
    userStore
        .forgotPassword(values, form)
        .then((res) => {
            console.log(res);
            success.value = true;
            message.value = res.message;
        })
        .finally(() => {
            loading.value = false;
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

.forgot {
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

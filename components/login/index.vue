<template>
    <div class="login">
        <div class="login__container">
            <h1 class="login__title">Авторизация</h1>
            <Form
                class="auth__form"
                as="form"
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
                <div class="auth__input-container">
                    <UiInput
                        :rules="{ required: true, min: 6 }"
                        :type="isShowPassword ? 'text' : 'password'"
                        name="password"
                        label="Пароль"
                        placeholder="Пароль"
                        class="auth__input auth__input_type-password"
                        v-model="password"
                    >
                        <template #action>
                            <button
                                type="button"
                                class="auth__show-password"
                                @click="
                                    () => (isShowPassword = !isShowPassword)
                                "
                            >
                                <SvgoViews
                                    class="svg-lx"
                                    fill="#6937a5"
                                />
                            </button>
                        </template>
                    </UiInput>
                </div>

                <div class="auth__btn-container">
                    <UiButton
                        type="submit"
                        class="auth__btn"
                        variant="quinary"
                        size="large"
                        >Войти</UiButton
                    >
                    <UiButton
                        type="button"
                        @click="
                            router.push({
                                path: '/login',
                                query: { type: 'without-password' },
                            })
                        "
                        class="auth__btn"
                        variant="tertiary"
                        size="large"
                        >Войти без пароля</UiButton
                    >
                </div>
                <div class="auth__btn-container">
                    <UiCheckbox
                        v-model="isRemember"
                        variant="square"
                        class="auth__checkbox"
                        name="is_remember"
                    >
                        Запомнить меня
                    </UiCheckbox>
                    <NuxtLink
                        to=""
                        class="auth__link"
                        >Забыли пароль?</NuxtLink
                    >
                </div>
            </Form>
            <div class="auth__soc-reg">
                <div class="auth__soc-divider">
                    <p>Или войти через</p>
                </div>
                <div class="auth__soc-links">
                    <a
                        href="https://test.bee-online.ru/auth/google?action=auth"
                    >
                        <SvgoGoogle class="svg-lx" />
                    </a>
                    <a
                        href="https://test.bee-online.ru/auth/vkontakte?action=auth"
                    >
                        <SvgoVkontakte class="svg-lx" />
                    </a>
                </div>
            </div>
            <Alerts />
            <LoginFooter />
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from "~/store/userStore";
import { useSettingStore } from "~/store/settingStore";

const role = computed(() => userStore.role);

const userStore = useUserStore();
const settingStore = useSettingStore();
const router = useRouter();

const email = ref("");
const password = ref("");
const isRemember = ref(false);
const isShowPassword = ref(false);

const handleSubmit = (values, form) => {
    userStore
        .authUser(values, form)
        .then((res) => {
            settingStore.authModalStatus = false;
            if (role.value === "customer") {
                router.push({ path: "/customer/desktop" });
            } else if (role.value === "performer") {
                router.push({ path: "/performer/desktop" });
            } else {
                router.push({ path: "/" });
            }
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
        font-size: 1.6em;
        padding: 1.25em;
        position: relative;
        flex: 1;
    }

    &__input_type-password {
        border-right: none;
    }

    &__show-password {
        border: 2px solid var(--border-color-quaternary);
        width: 100%;
        flex: 0 6em;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
            background-color: var(--button-background-primary);
            svg {
                fill: var(--button-background-quaternary);
            }
        }
    }

    &__checkbox {
        .checkbox__label {
            font-size: 1.6em;
            color: #000;
        }
    }

    &__btn-container {
        display: flex;
        justify-content: space-between;
        column-gap: 1em;
    }

    &__btn {
        flex: 1;
        justify-content: center;
        text-transform: uppercase;
        font-size: 1.2em;
        font-weight: 400;
        padding: 1em;
    }

    &__link {
        font-size: 1.6em;
        color: #a9abac;

        &:hover {
            text-decoration: underline;
        }
    }

    &__label {
        font-size: 1.6em;
    }

    &__soc-divider {
        display: flex;
        align-items: center;

        &::before,
        &::after {
            content: "";
            display: block;
            flex: 1 1 100%;
            height: 1px;
            background-color: #f0f0f0;
            width: 100%;
        }

        p {
            white-space: nowrap;
            font-size: 1.2em;
            color: #757575;
            font-family: "Inter", sans-serif;
        }
    }

    &__soc-links {
        padding-block: 1em;
        display: flex;
        align-items: center;
        justify-content: center;
        column-gap: 1em;
        svg {
            border-radius: 3em;
        }

        a:hover {
            svg {
                box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.3);
            }
        }
    }
}
.auth-modal {
    .login__title {
        font-size: 2.8em;
        margin-block: 1.25em 0.9em;
    }
}

@include mobile {
    .auth {
        &__title {
            font-size: 1.8rem;
        }

        &__input {
            padding: 1rem;
            font-size: 1.6rem;
        }

        &__show-password {
            flex: 0 2.5em;
        }
    }

    .auth-modal {
        .login__title {
            font-size: 1.8em;
        }
    }
}
</style>

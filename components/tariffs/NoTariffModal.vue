<template>
    <VueFinalModal
        :model-value="isVisible"
        @update:model-value="() => {}"
        class="modal no-tariff-modal"
        content-class="modal-vfm-content"
        overlay-transition="vfm-fade"
        content-transition="vfm-fade"
        :click-to-close="false"
        :esc-to-close="false"
        :lock-scroll="true"
        overlay-class="no-tariff-modal__overlay"
        background="non-interactive"
    >
        <div class="modal-dialog no-tariff-modal__dialog">
            <div class="no-tariff-modal__card">

                <!-- Шапка с иконкой -->
                <div class="no-tariff-modal__header">
                    <div class="no-tariff-modal__header-icon">
                        <SvgoAlertIcon />
                    </div>
                </div>

                <!-- Основное содержимое -->
                <div class="no-tariff-modal__body">
                    <h2 class="no-tariff-modal__title">
                        Для работы на площадке<br>необходим тариф
                    </h2>
                    <p class="no-tariff-modal__text">
                        Чтобы начать пользоваться всеми возможностями платформы,
                        приобретите стартовый тариф и получите доступ к заказам,
                        чатам и профилю производителя.
                    </p>

                    <!-- Карточка тарифа -->
                    <div class="no-tariff-modal__tariff-card">
                        <div class="no-tariff-modal__tariff-name">Тариф «Пробный»</div>
                        <div class="no-tariff-modal__tariff-price">
                            <span class="no-tariff-modal__price-amount">500&nbsp;₽</span>
                            <span class="no-tariff-modal__price-period">/ месяц</span>
                        </div>
                    </div>

                    <UiButton
                        type="link"
                        to="/tariffs"
                        variant="primary"
                        size="large"
                        class="no-tariff-modal__btn"
                    >
                        Перейти к покупке тарифа
                    </UiButton>

                    <p class="no-tariff-modal__hint">
                        Без тарифа доступ к функциям платформы ограничен
                    </p>
                </div>
            </div>
        </div>
    </VueFinalModal>
</template>

<script setup>
import { VueFinalModal } from 'vue-final-modal'
import { useUserStore } from '~/store/userStore'

const userStore = useUserStore()
const route = useRoute()

const isVisible = computed(() => {
    if (!userStore.isAuth) return false
    if (userStore.role !== 'performer') return false
    if (route.path === '/tariffs') return false

    const org = userStore.userOrganization
    if (!org || !org.id) return false

    // Нет тарифа
    if (!org.tariff_id) return true

    // Тариф есть, но срок истёк (джоб ещё не успел сбросить tariff_id)
    if (org.tariff_expired_at && new Date(org.tariff_expired_at) < new Date()) return true

    return false
})
</script>

<style lang="scss">
.no-tariff-modal {
    &__overlay {
        background-color: rgba(0, 0, 0, 0.7) !important;
        backdrop-filter: blur(4px);
    }

    &__dialog {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100%;
        padding: 2rem;
    }

    &__card {
        width: 100%;
        max-width: 58rem;
        background: #fff;
        border-radius: 1.6rem;
        overflow: hidden;
        box-shadow: 0 24px 60px rgba(0, 0, 0, 0.25);
        margin: auto;
    }

    &__header {
        background: linear-gradient(135deg, #6937a5 0%, #8b52cc 100%);
        padding: 4rem 3rem 3.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__header-icon {
        width: 7rem;
        height: 7rem;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
            width: 3.6rem;
            height: 3.6rem;
            color: #fff;
        }
    }

    &__body {
        padding: 3.6rem 4rem 4rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 2rem;
    }

    &__title {
        font-family: fira-sans, sans-serif;
        font-size: 2.8rem;
        font-weight: 700;
        line-height: 1.25;
        color: var(--text-color-quaternary);
        margin: 0;
    }

    &__text {
        font-size: 1.5rem;
        line-height: 1.65;
        color: var(--text-color-secondary);
        margin: 0;
        max-width: 42rem;
    }

    &__tariff-card {
        width: 100%;
        border: 2px solid var(--primary-color);
        border-radius: 1.2rem;
        padding: 2rem 2.4rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: linear-gradient(135deg, rgba(105, 55, 165, 0.04) 0%, rgba(139, 82, 204, 0.08) 100%);
        gap: 1.2rem;
    }

    &__tariff-name {
        font-size: 1.8rem;
        font-weight: 600;
        color: var(--primary-color);
    }

    &__tariff-price {
        display: flex;
        align-items: baseline;
        gap: 0.4rem;
        white-space: nowrap;
    }

    &__price-amount {
        font-size: 3rem;
        font-weight: 700;
        color: var(--text-color-quaternary);
        font-family: fira-sans, sans-serif;
    }

    &__price-period {
        font-size: 1.4rem;
        color: var(--text-color-tertiary);
    }

    &__btn {
        width: 100%;
        justify-content: center;
        margin-top: 0.4rem;
    }

    &__hint {
        font-size: 1.3rem;
        color: var(--text-color-quinary);
        margin: 0;
    }

    @include mobile {
        &__card {
            max-width: 100%;
            border-radius: 1.2rem;
        }

        &__header {
            padding: 3rem 2rem 2.5rem;
        }

        &__body {
            padding: 2.4rem 2rem 2.8rem;
            gap: 1.6rem;
        }

        &__title {
            font-size: 2.2rem;
        }

        &__tariff-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.8rem;
        }

        &__price-amount {
            font-size: 2.4rem;
        }
    }
}
</style>

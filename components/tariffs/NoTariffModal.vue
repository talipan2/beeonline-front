<template>
    <VueFinalModal
        :model-value="isVisible"
        @update:model-value="close"
        class="modal no-tariff-modal"
        content-class="modal-vfm-content"
        overlay-transition="vfm-fade"
        content-transition="vfm-fade"
        :click-to-close="false"
        :esc-to-close="true"
        :lock-scroll="true"
        overlay-class="no-tariff-modal__overlay"
        background="non-interactive"
    >
        <div class="modal-dialog no-tariff-modal__dialog">
            <div class="no-tariff-modal__card">

                <div class="no-tariff-modal__header">
                    <button class="no-tariff-modal__close" @click="close" aria-label="Закрыть">
                        <SvgoClose />
                    </button>
                    <div class="no-tariff-modal__header-icon">
                        <SvgoAlertIcon />
                    </div>
                </div>

                <div class="no-tariff-modal__body">
                    <h2 class="no-tariff-modal__title">
                        Для работы на площадке<br>необходим тариф
                    </h2>
                    <p class="no-tariff-modal__text">
                        Выберите подходящий тариф и получите доступ к заказам,
                        чатам и профилю производителя.
                    </p>

                    <div v-if="payableTariffs.length" class="no-tariff-modal__tariffs">
                        <div
                            v-for="tariff in payableTariffs"
                            :key="tariff.id"
                            class="no-tariff-modal__tariff-item"
                        >
                            <div class="no-tariff-modal__tariff-name">{{ tariff.name }}</div>
                            <div class="no-tariff-modal__tariff-desc">{{ getTariffDescription(tariff.code) }}</div>
                            <div class="no-tariff-modal__tariff-price">
                                <span class="no-tariff-modal__price-amount">{{ getMonthlyPrice(tariff) }}</span>
                                <span class="no-tariff-modal__price-period">/ мес</span>
                            </div>
                        </div>
                    </div>

                    <UiButton
                        type="link"
                        to="/tariffs"
                        variant="primary"
                        size="large"
                        class="no-tariff-modal__btn"
                    >
                        Перейти к выбору тарифа
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
import { useTariffsStore } from '~/store/tariffsStore'

const userStore = useUserStore()
const tariffsStore = useTariffsStore()
const route = useRoute()

const TARIFF_REQUIRED_FROM = new Date('2026-03-16T00:00:00')

const TARIFF_DESCRIPTIONS = {
    trial:   'Тест платформы и первые диалоги',
    premium: 'Быстрые отклики и мгновенные уведомления',
    ultra:   'Видимость + входящие клиенты',
    maximum: 'Максимальный приоритет',
}

const closedManually = ref(false)

function close() {
    closedManually.value = true
}

function getTariffDescription(code) {
    return TARIFF_DESCRIPTIONS[code] ?? ''
}

function getMonthlyPrice(tariff) {
    const price = tariff.prices?.find(p => p.quantity === 1) ?? tariff.prices?.[0]
    if (!price) return '—'
    const symbol = price.currency === 'RUB' ? '₽' : price.currency
    return `${Math.round(price.amount / 100).toLocaleString('ru-RU')}\u00a0${symbol}`
}

const payableTariffs = computed(() =>
    (tariffsStore.tariffs ?? []).filter(t => t.code !== 'free')
)

const isVisible = computed(() => {
    if (closedManually.value) return false
    if (!userStore.isAuth) return false
    if (userStore.role !== 'performer') return false
    if (route.path === '/tariffs') return false
    if (route.path.startsWith('/register')) return false
    if (route.path.startsWith('/performer-register')) return false

    const org = userStore.userOrganization
    if (!org || !org.id) return false

    if (org.created_at && new Date(org.created_at) < TARIFF_REQUIRED_FROM) return false

    if (!org.tariff_id) return true

    if (org.tariff_expired_at && new Date(org.tariff_expired_at) < new Date()) return true

    return false
})

watch(isVisible, (val) => {
    if (val && !tariffsStore.tariffs) {
        tariffsStore.getTariffs(userStore.userData.id)
    }
}, { immediate: true })
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
        max-width: 74rem;
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
        position: relative;
    }

    &__close {
        position: absolute;
        top: 1.2rem;
        right: 1.2rem;
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.2s;
        color: #fff;

        svg {
            width: 1.4rem;
            height: 1.4rem;
        }

        &:hover {
            background: rgba(255, 255, 255, 0.3);
        }
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
        max-width: 48rem;
    }

    &__tariffs {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.2rem;
    }

    &__tariff-item {
        border: 1.5px solid #e8e8f0;
        border-radius: 1.2rem;
        padding: 1.6rem 2rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.6rem;
        text-align: left;
        background: #fafafa;
        transition: border-color 0.2s;

        &_featured {
            border-color: var(--primary-color);
            background: linear-gradient(135deg, rgba(105, 55, 165, 0.04) 0%, rgba(139, 82, 204, 0.08) 100%);
        }
    }

    &__tariff-name {
        font-size: 1.6rem;
        font-weight: 600;
        color: var(--text-color-quaternary);

        .no-tariff-modal__tariff-item_featured & {
            color: var(--primary-color);
        }
    }

    &__tariff-desc {
        font-size: 1.3rem;
        line-height: 1.45;
        color: var(--text-color-tertiary);
    }

    &__tariff-price {
        display: flex;
        align-items: baseline;
        gap: 0.3rem;
        margin-top: 0.4rem;
        white-space: nowrap;
    }

    &__price-amount {
        font-size: 2.4rem;
        font-weight: 700;
        color: var(--text-color-quaternary);
        font-family: fira-sans, sans-serif;
    }

    &__price-period {
        font-size: 1.3rem;
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

        &__tariffs {
            grid-template-columns: 1fr;
        }

        &__price-amount {
            font-size: 2rem;
        }
    }
}
</style>

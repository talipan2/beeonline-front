<template>
    <div class="deals-info"
        :class="{
            'loading': loading
        }"
    >
        <div class="deals-info__header">
            <p>
                Время и дата:
                <span>{{ formatDate(deal.created_at, 'weekday, DD.MM.YYYY - HH:mm:ss') }}</span>
            </p>
            <p>
                Номер сделки:
                <span>{{ deal.id }}</span>
            </p>
        </div>
        <div class="deals-info__body">
            <h3 class="deals-info__title">Сделка №{{ deal.id }}</h3>
            <p class="deals-info__name">
                {{ deal.order.name }}
            </p>
            <div class="deals-info__buttons">
                <UiButton
                    type="button"
                    class="deals-info__button"
                    variant="tertiary"
                    @click="emit('action', 'cancel')"
                    v-if="deal.is_active"
                    >Отменить сделку</UiButton
                >
                <template v-if="deal.is_manager">
                    <!-- <UiButton
                        type="button"
                        class="deals-info__button deals-info__button_type_reset"
                        variant="tertiary"
                        @click="emit('action', 'reset')"
                        >Сбросить сделку</UiButton
                    > -->
                    <!-- <UiButton
                        type="button"
                        class="deals-info__button"
                        variant="quinary"
                        @click="emit('action', 'arbitrage')"
                        >Начать арбитраж</UiButton
                    > -->
                </template>
                <template v-else>
                    <UiButton
                        type="button"
                        class="deals-info__button"
                        variant="tertiary"
                        @click="emit('action', 'help')"
                        >Нужна помощь менеджера</UiButton
                    >
                </template>
            </div>
            <DealsOrder
                :order="deal.order"
                :customer="deal.customer"
                :performer="deal.performer"
            />
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(["action"]);

const props = defineProps({
    deal: {
        type: Object,
        required: true,
    },
});
</script>

<style lang="scss">
.deals-info {
    font-size: 1rem;
    margin-bottom: 3em;

    &__header {
        font-size: 1.3em;
        display: flex;
        justify-content: space-between;
        margin-bottom: 1.15em;

        p {
            color: var(--text-color-tertiary);
        }

        span {
            color: var(--text-color-primary);
            font-weight: 700;
        }

        @include small-mobile {
            flex-direction: column;
        }
    }

    &__body {
        padding: 3em;
        background-color: var(--bg-secondary-color);
        border: 1px solid #e9e9e9;

        @include small-mobile {
            margin-inline: -13px;
        }
    }

    &__title {
        font-size: 1.8em;
        font-weight: 500;
        margin-bottom: 0.83em;
    }

    &__name {
        font-size: 1.6em;
        margin-bottom: 1.5em;
    }

    &__buttons {
        display: flex;
        column-gap: 1em;
        margin-bottom: 2.5em;

        @include mobile {
            flex-direction: column;
            row-gap: 1em;
        }
    }

    &__button {
        &_type_reset {
            border-color: #f1c8c0;

            &:hover {
                color: var(--text-color-primary);
                background-color: #f1c8c0;
                border-color: #f1c8c0;
            }
        }
    }
}
</style>

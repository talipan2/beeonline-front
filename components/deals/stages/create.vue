<template>
    <div class="stage-create">
        <p>
            Если вам отправили предложение заключить сделку, у вас есть 24 часа,
            чтобы подтвердить начало работы с безопасной сделкой. На всем
            протяжении работы с безопасной сделкой вас будет сопровождать
            персональный менеджер, вы можете написать ему через кнопку «Помощь
            менеджера».
        </p>
        <p>На подтверждение сделки у вас есть 24 часа!</p>

        <template v-if="deal.confirmed_at">
            <CommonAlerts
                alert="Сделка подтверждена"
                :type="'success'"
                class="stage-create__alert"
            />
        </template>
        <template v-if="!deal.confirmed_at">
            <CommonCountdown
                :end="deal.confirm_till"
                :expiredText="'Время подтверждения истекло'"
                ref="countdown"
            >
                <template #expired>
                    <CommonAlerts
                        alert="Время подтверждения истекло"
                        :type="'error'"
                    />
                </template>
            </CommonCountdown>
                <UiButton
                    class="stage-create__btn"
                    type="button"
                    variant="quinary"
                    v-if="(!deal.is_initiator && countdown?.timeExpired === false) || deal.is_manager"
                    @click="emit('action', 'confirm')"
                    >Подтвердить</UiButton
                >
        </template>
    </div>
</template>

<script setup>
const props = defineProps({
    deal: {
        type: Object,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(["action"]);

const countdown = ref(null);

const confirmTill = "2025-03-04T05:21:10.000000Z";
</script>

<style lang="scss">
.stage-create {
    font-size: 1.6em;
    margin-bottom: 0.0625em;

    &__timer {
        align-items: center;
        background-color: #f0f4fb;
        border: 1px solid #a29699;
        color: #000;
        display: flex;
        font-size: 1em;
        justify-content: center;
        line-height: 1.5;
        margin: 1em 0;
        padding: 2em;
        text-align: center;
    }

    &__timer-counts {
        display: flex;
        column-gap: 0.5em;
        align-items: center;
    }

    &__timer-count {
        font-size: 4em;
        font-weight: 900;
        margin-bottom: 0;

        span {
            font-size: 0.25em;
            font-weight: normal;
        }
    }

    &__alert {
        margin-top: 1em;
    }

    &__btn {
        width: fit-content;
        font-size: 1.2rem;
        margin-bottom: 1em;
    }

    &__confirm {
        margin-bottom: 1em;
    }

    @include mobile {
        &__timer {
            font-size: 1.4rem;
        }
    }
}
</style>

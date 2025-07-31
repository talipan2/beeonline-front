<template>
    <div class="deals-stages"
        :class="{
            'loading': loading
        }"
    >
        <h3 class="deals-stages__title">Этапы сделки</h3>
        <p class="deals-stages__text">
            Производитель предлагает сотрудничество и даёт возможность отслеживать
            работу над вашим заказом. Команда Bee-online подготовила новый
            инструмент, который позволит вам безопасно и эффективно
            взаимодействовать с производителями по всей стране. Для удобства
            процесс разбит на несколько этапов. Вы можете отслеживать здесь
            этапы работы над заказом.
        </p>
        <div class="deals-stages__stages">
            <template
                v-for="(step, index) in steps"
                :key="index"
            >
                <div
                    class="deals-stages__stage"
                    :class="{
                        'deals-stages__stage_type_active':
                            step.stage === deal.stage,
                        'deals-stages__stage_type_completed':
                            step.status === 'completed',
                    }"
                >
                    <div
                        class="deals-stages__header"
                        @click="step.isOpenContent = !step.isOpenContent"
                    >
                        <div
                            class="deals-stages__number"
                            v-if="step.stage === 'arbitrage'"
                        >
                            <span>×</span>
                        </div>
                        <div
                            class="deals-stages__number"
                            v-else
                        >
                            {{ index + 1 }}
                        </div>
                        <h3 class="deals-stages__header-title">
                            {{ step.title }}
                        </h3>
                        <UiButton
                            type="button"
                            class="deals-stages__btn"
                            variant="default"
                            size="around"
                            :class="{
                                'deals-stages__btn_type_active':
                                    step.isOpenContent,
                            }"
                            v-if="step.stage !== 'completed'"
                        >
                            <SvgoDropDownNew class="svg-m" />
                        </UiButton>
                    </div>
                    <div
                        class="deals-stages__body"
                        v-if="step.isOpenContent"
                    >
                        <component
                            :is="step.content"
                            v-if="
                                typeof step.content === 'function' ||
                                typeof step.content === 'object'
                            "
                            :deal="deal"
                            :is-active="step.active"
                            @action="
                                (action, data, callback, errorCallback, form) =>
                                    emit(
                                        'action',
                                        action,
                                        data,
                                        callback,
                                        errorCallback,
                                        form
                                    )
                            "
                        />
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
import DealsStagesCreate from "~/components/deals/stages/create.vue";
import DealsStagesProduction from "~/components/deals/stages/production.vue";
import DealsStagesReview from "~/components/deals/stages/review.vue";
import DealsStagesArbitrage from "~/components/deals/stages/arbitrage.vue";
import DealsStagesCompleted from "~/components/deals/stages/completed.vue";

const emit = defineEmits(["action"]);

const props = defineProps({
    deal: {
        type: Object,
        default: null,
    },
});

const steps = ref([
    {
        title: "Создание сделки",
        content: "Описание шага 1",
        stage: "creation",
        active: false,
        content: markRaw(DealsStagesCreate),
        isOpenContent: false,
    },
    {
        title: "Производство",
        content: "Описание шага 2",
        stage: "production",
        active: false,
        content: markRaw(DealsStagesProduction),
        isOpenContent: false,
    },
    {
        title: "Оставьте отзыв",
        stage: "review",
        active: false,
        content: markRaw(DealsStagesReview),
        isOpenContent: false,
    },
    {
        title: "Сделка завершена",
        stage: "completed",
        active: false,
        content: markRaw(DealsStagesCompleted),
        isOpenContent: false,
    },
]);

const arbitrage = props.deal.arbitrage_at;

const activeIndex = computed(() => {
    return steps.value.findIndex((step) => step.stage === props.deal.stage);
});

watch(
    () => steps.value,
    () => {
        let shouldBeActive = false;
        if (arbitrage) {
            // const activeIndex = steps.value.findIndex((step) => step.stage === props.deal.stage);
            console.log(activeIndex);

            if (
                activeIndex >= 0 &&
                steps.value[activeIndex].stage !== "arbitrage"
            ) {
                steps.value[activeIndex].active = false;

                const arbitrageStep = {
                    title: "Арбитраж",
                    stage: "arbitrage",
                    active: true,
                    content: markRaw(DealsStagesArbitrage),
                    isOpenContent: false,
                };

                const exists = steps.value.some(
                    (step) => step.stage === "arbitrage"
                );
                if (!exists) {
                    steps.value.splice(activeIndex, 0, arbitrageStep);
                }
            }
        }

        for (let i = steps.value.length - 1; i >= 0; i--) {
            steps.value[i].active = steps.value[i].stage === props.deal.stage;
            if (steps.value[i].active) {
                shouldBeActive = "completed";
                steps.value[i].isOpenContent = true;
            } else {
                if (shouldBeActive) {
                    steps.value[i].status = shouldBeActive;
                }
            }
        }
    },
    { immediate: true, deep: true, once: true }
);

watch(
    () => props.deal.stage,
    () => {
        steps.value.forEach((step) => {
            step.isOpenContent = false;
            step.active = false;
            if (step.stage === props.deal.stage) {
                step.isOpenContent = true;
                step.active = true;
            }
        });
    }
);
</script>

<style lang="scss">
.deals-stages {
    font-size: 1rem;
    background-color: var(--bg-secondary-color);
    border: 1px solid #e9e9e9;
    padding: 3em;

    @include small-mobile {
        margin-inline: -13px;
    }

    &__title {
        font-size: 1.8em;
        margin-bottom: 0.83em;
    }

    &__text {
        font-size: 1.6em;
        margin-bottom: 1.5em;
    }

    &__stages {
        display: flex;
        flex-direction: column;
        margin-left: 6em;
    }

    &__number {
        font-size: 2.6em;
        line-height: 1em;
        align-items: center;
        background-color: #e9e9e9;
        color: var(--text-color-octonary);
        border-radius: 100%;
        display: flex;
        flex: 0 0 auto;
        justify-content: center;
        margin-left: -2.3em;
        margin-right: 0.76em;
        text-align: center;
        width: 1.53em;
        height: 1.53em;
        z-index: 1;
    }

    &__stage {
        position: relative;
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid #e9e9e9;

        &_type_completed {
            &:not(:last-child)::after {
                background-color: var(--button-background-primary) !important;
            }
        }

        &_type_completed,
        &_type_active {
            .deals-stages__number {
                background-color: var(--button-background-primary);
            }

            .deals-stages__header-title {
                color: var(--text-color-primary);
            }

            .deals-stages__btn {
                svg {
                    path {
                        fill: var(--text-color-primary);
                    }
                }
            }
        }

        &:first-child {
            border-top: 1px solid #e9e9e9;
        }

        &:not(:last-child)::after {
            background-color: #e9e9e9;
            bottom: -3.5em;
            content: "";
            left: -4em;
            position: absolute;
            top: 3.5em;
            transform: translateX(-50%);
            width: 0.6em;
        }
    }

    &__header {
        display: flex;
        align-items: center;
        padding-block: 3em;
        cursor: pointer;
    }

    &__header-title {
        font-size: 2.4em;
        flex: 1 1 auto;
        color: #a29699;

        @include mobile {
            font-size: 1.8em;
        }
    }

    &__btn {
        svg {
            path {
                fill: #a29699;
            }
        }
        &_type_active {
            .svg-m {
                transform: rotate(180deg);
            }
        }
    }

    &__body {
        margin-left: -2em;
    }
}
</style>

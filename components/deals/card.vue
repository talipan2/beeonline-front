<template>
    <div class="deals-card">
        <div class="deals-card__header">
            <h3 class="deals-card__title">
                Агентство креативных индустрий (АКИ) и медиахолдинг PROfashion
                запускают в Москве первую совместную программу подготовки
                сотрудников в сфере легкой промышленности.
            </h3>
            <p class="deals-card__date">24.03.2023</p>
        </div>
        <div
            class="deals-body"
            v-html="data"
        ></div>
        <NuxtLink
            class="deals-card__link"
            :to="`/deals/${1}`"
        />
    </div>
</template>

<script setup>
const props = defineProps({
    data: {
        type: String,
        default: "",
    },
});
</script>

<style lang="scss">
.deals-card {
    font-size: 1.6rem;
    padding: 1.25em;
    box-shadow: var(--box-shadow-primary);
    background-color: #fff;
    position: relative;
    transition: box-shadow 0.2s ease;

    &:hover {
        box-shadow: -2px -2px 0 #6937a5, 0px 4px 20px rgba(0, 0, 0, 0.1);
    }

    &__header {
        display: flex;
        align-items: center;
        column-gap: 1em;
        font-size: 1.125em;
        border-bottom: 1px solid var(--border-color-secondary);
        margin-bottom: 1em;
    }

    &__title {
        flex: 1 1 auto;
        font-size: 1em;
        line-height: 1.3em;
        padding-bottom: 0.44em;
    }

    &__date {
        font-family: "fira-sans", sans-serif;
        flex: 0 0 auto;
    }

    &__link {
        z-index: 1;
        position: absolute;
        inset: 0;
    }
}
</style>

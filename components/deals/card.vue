<template>
    <div class="deals-card">
        <div class="deals-card__header">
            <h3 class="deals-card__title title-hidden">Сделка № {{ data.id }}</h3>
            <p class="deals-card__date">{{ formatDate(data.created_at, 'weekday, DD.MM.YYYY - HH:mm:ss') }}</p>
        </div>
        <div class="deals-body">
            <div class="deals-body__container">
                <div class="image-box">
                    <UiImage src="/assets/images/nophoto_pc.png" />
                </div>
                <div class="props">
                    <div class="prop">
                        <p class="prop__name">Название:</p>
                        <p class="prop__value">{{ data.order?.name || 'не указано' }}</p>
                    </div>
                    <div class="prop">
                        <p class="prop__name">Категории:</p>
                        <p class="prop__value">{{ data.order?.product_categories?.map(item => item.name).join(', ') || 'не указано' }}</p>
                    </div>
                    <div class="prop">
                        <p class="prop__name">Партия:</p>
                        <p class="prop__value">{{data.order && data.order.batch ? data.order?.batch.replace(/\.00$/, '') : 'не указано' }}</p>
                    </div>
                    <div class="prop">
                        <p class="prop__name">Сумма:</p>
                        <p class="prop__value">{{ data.order && data.order.price ? data.order?.price.replace(/\.00$/, '')  : 'не указано' }}</p>
                    </div>
                </div>
            </div>
            <div class="deals-body__contacts">
                <div class="deals-body__contacts-item">
                    <div class="deals-body__contacts-name">Заказчик:</div>
                    <div class="deals-body__contacts-value">{{ data.customer?.name || 'не указано' }}</div>
                </div>
                <div class="deals-body__contacts-item">
                    <div class="deals-body__contacts-name">Исполнитель:</div>
                    <div class="deals-body__contacts-value">{{ data.performer?.name || 'не указано' }}</div>
                </div>
            </div>
        </div>
        <NuxtLink
            class="deals-card__link"
            :to="`/deals/${data.id}`"
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
    font-size: 1rem;
    padding: 2em;
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
        column-gap: 1.6em;
        font-size: 1.2em;
        border-bottom: 1px solid var(--border-color-secondary);
        margin-bottom: 1em;
        padding-bottom: 1.25em;
    }

    &__title {
        flex: 1 1 auto;
        font-size: 1.5em;
        line-height: 1.3em;
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

.deals-body {
    &__container {
        display: flex;
        margin-bottom: 1.5em;
    }

    .image-box {
        flex-basis: 26%;
        max-width: 26%;
        padding-top: 26%;
    }

    &__contacts {
        font-size: 1.4em;

        &-value {
            font-family: 'fira-sans', sans-serif;
        }
    }

}
</style>

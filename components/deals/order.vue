<template>
    <div class="deals-order">
        <h3>Информация о заказе</h3>
        <div class="props">
            <div class="prop">
                <p class="prop__name prop__name_type_grey">Заказчик:</p>
                <p class="prop__value">{{ customer?.name || 'не указан' }}</p>
            </div>
            <div class="prop">
                <p class="prop__name prop__name_type_grey">Исполнитель:</p>
                <p class="prop__value">{{ performer?.name || 'не указан' }}</p>
            </div>
            <div class="prop">
                <p class="prop__name prop__name_type_grey">Категории:</p>
                <template v-if="order.product_categories?.length > 0">
                    <p class="prop__value">{{ order.product_categories.slice(0, 3).map(item => item.name).join(', ') }}</p>
                    <ModalsMoreCities
                        class=""
                        :list="order.product_categories.slice(3).map(item => item.name)"
                        v-if="order.product_categories && order.product_categories.length > 3"
                        title="Категории"
                    />
                </template>
                <template v-else>
                    <p class="prop__value">Не указано</p>
                </template>
            </div>
            <div class="prop prop_type_text">
                <p class="prop__name prop__name_type_grey">Описание:</p>
                <p class="prop__value">{{ order.description }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    order: {
        type: Object,
        required: true,
    },
    customer: {
        type: Object,
        required: true,
    },
    performer: {
        type: Object,
        required: true,
    },
});
</script>

<style lang="scss">
.deals-order {
    font-size: 1rem;

    h3 {
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 0.83em;
    }

    .props {
        font-size: 1.6em;
    }
}
</style>

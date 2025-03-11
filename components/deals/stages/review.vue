<template>
    <div class="step-review">
        <p class="step-review__text">
            Сделка завершится когда заказчик напишет отзыв
        </p>
        <template v-if="deal.is_customer">
            <ReviewsCreate v-if="!deal.review" @submit="handleSubmit" />
        </template>

        <ReviewsEntity v-if="deal.review"/>
    </div>
</template>

<script setup>
import { useDealStore } from "~/store/dealStore";

const dealStore = useDealStore();
const emit = defineEmits(["action"]);

const props = defineProps({
    deal: {
        type: Object,
        default: null,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
});

const handleSubmit = async (values, form) => {
    console.log(values, form);
    emit('action', 'setReview', values, null, null, form);
}
</script>

<style lang="scss">
.step-review {
    &__text {
        font-size: 1.6em;
        margin-bottom: 1em;
    }
}
</style>

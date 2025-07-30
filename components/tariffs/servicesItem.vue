<template>
    <slot :service="service" :price="price" :period="period"/>
</template>

<script lang="ts" setup>
const props = defineProps({
    service: {
        type: Object,
        required: true,
    },
    price: {
        type: Object,
        required: true,
    },
});

const period = computed(() => {
    let period = null;
    if (props.service.numeral_forms) {
        let defaultNumeralForm = props.service.numeral_forms[0];
        period = plural(props.price.quantity, {
            one: props.service.numeral_forms[0] || defaultNumeralForm,
            few: props.service.numeral_forms[1] || defaultNumeralForm,
            many: props.service.numeral_forms[2] || defaultNumeralForm,
            other: defaultNumeralForm,
        });

        if (props.price.quantity > 1) {
            period = props.price.quantity + '&nbsp;' + period;
        }
    }
    return period;
});
</script>

<style>

</style>

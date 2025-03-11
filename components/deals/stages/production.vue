<template>
    <div class="stage-production">
        <template v-if="deal.is_performer">
            <p>
                Мы подготовили для вас удобный инструмент мониторинга
                производства. Рекомендуем вам отмечать галочками завершённые
                этапы производства, чтобы уведомить заказчика о процессе
                изготовления заказа. Это увеличит лояльность вашего клиента и
                избавит от лишних вопросов, связанных со степенью готовности
                заказа. Вы можете отмечать только те этапы производства, которые
                соответствуют вашей технологической цепочке. Если на каком-то из
                этапов у вас возникли непредвиденные трудности, вы всегда можете
                уведомить об этом менеджера поддержки и вашего клиента.
            </p>
        </template>

        <template v-if="deal.is_customer">
            <p>
                Мы подготовили для вас удобный инструмент мониторинга
                производства, в котором исполнитель может отмечать завершённые
                этапы в процессе производства. Следите за производством и не
                волнуйтесь лишний раз о сроках!
            </p>
        </template>

        <template v-if="prodStatuses">
            <h3 class="stage-production__title">
                Процесс производства заказа:
            </h3>
            <ul class="stage-production__checkbox">
                <li
                    v-for="status in prodStatuses"
                    :key="status.id"
                >
                    <UiCheckbox
                        :label="status.name"
                        :modelValue="status.checked"
                        @update:modelValue="handleSelected(status.id, $event)"
                        :disabled="!isActive || deal.is_customer"
                    >
                        {{ status.name }}
                    </UiCheckbox>
                </li>
            </ul>
            <UiButton
                class="stage-production__btn"
                type="button"
                variant="quinary"
                v-if="isActive && (deal.is_performer || deal.is_manager)"
                @click="emit('action', 'setCompleted')"
            >
                Готовность к отгрузке
            </UiButton>
        </template>
    </div>
</template>

<script setup>
import { useDealStore } from "~/store/dealStore";

const dealStore = useDealStore();

const emit = defineEmits(["action"]);

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

const prodStatuses = computed(function () {
    if (!dealStore.prodStatuses) return null;
    let selectedStatus = dealStore.prodStatuses.find((status) => status.id == props.deal.deal_prod_status_id);

    return dealStore.prodStatuses
    .map((status) => {
        return {
            ...status,
            checked: selectedStatus ? status.sort <= selectedStatus.sort : false,
        };
    });
});

function handleSelected(id, isChecked) {
    let currentId = props.deal.deal_prod_status_id;
    try {
        if (!props.isActive) throw "Deal is not active";
        let index = dealStore.prodStatuses.findIndex((status) => status.id == id);
        if (index < 0) throw "Status not found";

        if (props.deal.loading) throw "Deal is loading";

        if (!isChecked) {
            props.deal.deal_prod_status_id = dealStore.prodStatuses[index - 1]?.id;
        } else {
            props.deal.deal_prod_status_id = dealStore.prodStatuses[index]?.id;
        }

        emit("action", "changeStatus", {
            'deal_prod_status_id': props.deal.deal_prod_status_id,
        }, null, (error) => {
            props.deal.deal_prod_status_id = currentId;
        });
    } catch (error) {
        console.log(error);
        props.deal.deal_prod_status_id = currentId;
    }
}

onMounted(() => {
    dealStore.getDealProdStatuses();
});
</script>

<style lang="scss">
.stage-production {
    font-size: 1.6em;
    p {
        margin-bottom: 2em;
    }

    &__title {
        font-size: 1.6em;
        margin-bottom: 1em;
    }

    &__checkbox {
        flex-direction: column;
        margin-bottom: 1em;

        label {
            font-size: 1em;
        }
    }

    &__btn {
        font-size: 0.75em;
        width: 50%;
        margin-bottom: 1em;

        @include mobile {
            width: 100%;
        }
    }
}
</style>

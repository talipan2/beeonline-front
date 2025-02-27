<template>
    <div class="deals">
        <Form ref="filter" @change="fetchDeals(1)">
            <UiSelect
                name="status"
                :options="statusList"
                :return-value="true"
                value="active"
            />
            <UiSelect
                name="stage"
                :options="stageList"
                :return-value="true"
                value="any"
            />
        </Form>

        <div class="deals__list">
            <div
                class="deals__item"
                v-for="(deal, index) in deals"
                :key="index"
            >
                <DealsCard :data="deal" />
            </div>
        </div>
        <CommonPagination
            v-if="page.last_page > 1"
            :current-page="page.current_page"
            :total-pages="page.last_page"
            @changePage="fetchDeals"
            :loading="loading"
        />
    </div>
</template>

<script setup>
import { useDealStore } from "~/store/dealStore";

const dealStore = useDealStore();
const deals = ref([]);
const page = ref({});
const loading = ref(false);
const filter = ref(null);

const statusList = [
    {
        value: "active",
        label: "Активные",
    },
    {
        value: "archived",
        label: "Завершенные",
    },
];

const stageList = [
    {
        value: "any",
        label: "Любой",
    },
    {
        value: "creation",
        label: "Создание",
    },
    {
        value: "production",
        label: "Производство",
    },
    {
        value: "delivery",
        label: "Доставка",
    },
    {
        value: "review",
        label: "Отзыв",
    },
];

function fetchDeals(currentPage) {
    if (loading.value) return;
    loading.value = true;

    dealStore
        .getDeals({
            limit: 10,
            page: currentPage,
            ...filter.value.values,
        })
        .then((response) => {
            console.log(response);
            deals.value = response.data;
            page.value = response.meta;
        })
        .finally(() => {
            loading.value = false;
        });
}

onMounted(() => {
    fetchDeals();
});
</script>

<style lang="scss">
.deals {
    font-size: 1.6rem;

    &__list {
        display: flex;
        flex-direction: column;
        row-gap: 1.875em;
    }
}
</style>

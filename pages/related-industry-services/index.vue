<template>
    <NuxtLayout
        name="catalog"
        className="industry-services"
        title="Сервисы смежных отраслей"
    >
        <template #header>
            <UiBreadCrumb
                :list="[
                    { label: 'Главная', link: '/' },
                    {label: 'Партнерские сервисы', link: ''}
                ]"
            />
        </template>
        <template #leftSide>
            <IndustryServicesFilter @updateFilter="updateFilter" />
        </template>
        <template #content>
            <IndustryServicesList :data="companyList" />
            <CommonPagination
                class="industry-services__pagination"
                v-if="page.lastPage > 1"
                :current-page="page.currentPage"
                :total-pages="page.lastPage"
                @changePage="fetchList"
                btnType="square"
                position="left"
                :loading="loading"
            />
        </template>
    </NuxtLayout>
</template>

<script setup>
import { useOrganizationStore } from '~/store/organizationStore';

const organizationStore = useOrganizationStore();
const companyList = ref([]);
const page = ref({});
const loading = ref(false);
const filter = ref({
    type: "adjacent",
});

function fetchList(currentPage) {
    if (loading.value) return;
    loading.value = true;

    organizationStore
        .getPubCardsList({
            per_page: 10,
            page: currentPage,
            ...filter.value,
        })
        .then((response) => {
            companyList.value = response.data;
            page.value = response.meta;
        })
        .finally(() => {
            loading.value = false;
        });
}

onMounted(() => {
    fetchList();
});

const updateFilter = (data) => {
    filter.value = { ...data };
    fetchList(0);
};
</script>

<style lang="scss">
.industry-services {
    &__pagination {
        margin-top: 4.8rem;
    }
}
</style>

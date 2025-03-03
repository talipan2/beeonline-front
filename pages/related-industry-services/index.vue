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
    console.log(data);
    filter.value = { ...data };
    fetchList(0);
};

// onMounted(() => {
//     setTimeout(() => {
//         companyList.value = [
//             {
//                 id: 1,
//                 name: "Компания 1",
//                 description:
//                     "Компания «НЦС» является аккредитованным органом по сертификации. Мы оказываем спектр услуг в области разрешительной документации с 2016 года. Занимаемся услугами по оценке соответствия, испытаниям продукции, разработке технической документации.",
//                 siteUrl: "https://example.com",
//                 logo: "",
//                 entityCount: 10,
//                 category: ["Категория 1", "Категория 2", "Категория 3"],
//                 countryId: { countries: [1] },
//             },
//             {
//                 id: 2,
//                 name: "Компания 2",
//                 description:
//                     "Компания «НЦС» является аккредитованным органом по сертификации. Мы оказываем спектр услуг в области разрешительной документации с 2016 года. Занимаемся услугами по оценке соответствия, испытаниям продукции, разработке технической документации. related-industry-services Компания «НЦС» является аккредитованным органом по сертификации. Мы оказываем спектр услуг в области разрешительной документации с 2016 года. Занимаемся услугами по оценке соответствия, испытаниям продукции, разработке технической документации. related-industry-services",
//                 siteUrl: "https://example.com",
//                 logo: "",
//                 entityCount: 10,
//                 category: ["Категория 1", "Категория 2", "Категория 3"],
//                 countryId: { countries: [1] },
//             },
//         ];
//     }, 1000);
// });
</script>

<style lang="scss">
.industry-services {
    &__pagination {
        margin-top: 4.8rem;
    }
}
</style>

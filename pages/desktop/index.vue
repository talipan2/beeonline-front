<template>
    <NuxtLayout
        name="profile"
        :title="`Рабочий стол`"
        class="desktop-layout"
    >
        <template #header>
            <UiBreadCrumb
                :list="[
                    { label: 'Главная', link: '/' },
                    { label: `Кабинет ${translateRole}`, link: '' },
                ]"
            />
        </template>
        <template #content>
            <Desktop
                :getEntity="getEntity"
                :role="role"
                :filterList="filterList"
                :filterMapping="filterMapping"
            />
        </template>
    </NuxtLayout>
</template>

<script setup>
import { useEntityStore } from "~/store/entityStore";
import { useUserStore } from "~/store/userStore";

useHead({
    title: "Рабочий стол",
    meta: [
        {
            name: "description",
            content: "",
        },
    ],
});

definePageMeta({
    disableMetrika: true,
});

const entityStore = useEntityStore();
const userStore = useUserStore();

const role = computed(() => userStore.role);

const translateRole = computed(() => {
    if (role.value === "customer") {
        return "заказчика";
    } else if (role.value === "performer") {
        return "производителя";
    } else if (role.value === "adjacent") {
        return "партнера";
    }
});

const filterList = computed(() => {
    switch (role.value) {
        case "customer":
            return ["category", "minLot", "date"];
        case "performer":
            return ["category"];
        default:
            return [];
    }
});

const filterMapping = computed(() => {
    switch (role.value) {
        case "customer":
            return {
                category: "product_category_id",
                minLot: "minLot",
                date: "date",
            };
        case "performer":
            return {
                category: "product_category_id",
            }
        default:
            return [];
    }
});

async function getEntity(filter) {
    switch (role.value) {
        case "customer":
            try {
                const res = await entityStore.getSelfOrders(userStore.userData.organization_id, filter);
                console.log(res.orders)
                if (res && res.orders) {
                    return {data: {data: res.orders, ...res.pagination}, total: res.order_counts, };
                }
                return [];
            } catch (error) {
                console.error("Error fetching organization orders:", error);
            }
        case "performer":
            try {
                const res = await entityStore.getSelfServices(userStore.userData.organization_id, filter);
                if (res) {
                    return {data: {data: res.services, ...res.pagination}, total: res.service_counts};
                }
                return [];
            } catch (error) {
                console.error("Error fetching organization services:", error);
            }
    }
}

watch(() => role.value, () => {
    getEntity({status: 'active'});
})

</script>

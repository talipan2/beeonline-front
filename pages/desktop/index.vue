<template>
    <NuxtLayout
        name="profile"
        :title="`Кабинет ${translateRole}`"
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

const entityStore = useEntityStore();
const userStore = useUserStore();

const role = computed(() => userStore.role);

const translateRole = computed(() => {
    if (role.value === "customer") {
        return "заказчика";
    } else if (role.value === "performer") {
        return "исполнителя";
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

async function getEntity(type, filter) {
    switch (role.value) {
        case "customer":
            try {
                const res = await entityStore.getOrganizationOrders(
                    userStore.userData.organization_id
                );
                if (res) {
                    return entityStore.organizationOrders;
                }
                return [];
            } catch (error) {
                console.error("Error fetching organization orders:", error);
            }
        case "performer":
            try {
                const res = await entityStore.getOrganizationServices(
                    userStore.userData.organization_id
                );
                if (res) {
                    return entityStore.organizationServices;
                }
                return [];
            } catch (error) {
                console.error("Error fetching organization services:", error);
            }
    }
}
</script>

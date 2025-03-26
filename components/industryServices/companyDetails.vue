<template>
    <div class="company-details">
        <IndustryServicesCompanyInfo
            :data="pubcard"
            v-if="pubcard"
        />

        <Form
            ref="form"
            class="company-details__filter"
            v-if="isCabinet"
        >
            <UiSelect
                name="status"
                :options="statusList"
                :return-value="true"
                v-model="filterList.status"
            />
        </Form>

        <div class="company-details__list" :class="{
            'company-details__list_type_2': isCabinet,
        }">
            <template
                v-for="(item, index) in services"
                :key="index"
            >
                <IndustryServicesCard
                    :data="item"
                    @selectInfoModal="$emit('selectInfoModal', $event)"
                />
            </template>
        </div>
        <CommonPagination
            v-if="page.last_page > 1"
            :current-page="page.current_page"
            :total-pages="page.last_page"
            btn-type="square"
            position="left"
            @changePage="fetchServices"
        />
    </div>
</template>

<script setup>
import { useAdjacentStore } from "~/store/adjacentStore";
import { useOrganizationStore } from "~/store/organizationStore";

const organizationStore = useOrganizationStore();
const router = useRouter();

const adjacentStore = useAdjacentStore();

const services = ref([]);
const page = ref({});
const loading = ref(false);
const pubcard = ref(null);

const statusList = computed(() => {
    return adjacentStore.statusList;
});

const emits = defineEmits(["pubcard:loaded"]);

const props = defineProps({
    id: {
        type: Number,
        requited: true,
    },
    isCabinet: {
        type: Boolean,
        default: false,
    },
});

const filterList = ref({
    status: props.isCabinet ? 'ANY' : 'ACTIVE',
});

onMounted(() => {
    organizationStore
    .getPubCard(props.id)
    .then((response) => {
        pubcard.value = response;
        emits("pubcard:loaded", response);
        fetchServices(1);
    });

    adjacentStore.getStatusList();
});

function fetchServices(currentPage) {
    // if (loading.value) return;
    // loading.value = true;

    adjacentStore
        .getServices(pubcard.value.id, {
            limit: 10,
            page: currentPage,
            ...filterList.value,
        })
        .then((response) => {
            services.value = response.data;
            page.value = response.meta;
        })
        .finally(() => {
            // loading.value = false;
        });
}

// const data = ref([
//   {
//     description: 'Добровольная сертификация представляет собой процесс получения официального подтверждения, свидетельствующего о том, что товары, услуги или выполненные работы отвечают определенным стандартам, включая ГОСТ Р. что товары, услуги или выполненные работы отвечают определенным стандартам, включая ГОСТ Р ',
//     siteUrl: 'https://www.youtube.com/feed/subscriptions',
//     logo: '',
//     category: ['Пошив женской одежды', 'Пошив мужской одежды']
//   },
//   {
//     description: 'Добровольная сертификация',
//     siteUrl: 'https://www.youtube.com/feed/subscriptions',
//     logo: '',
//     category: ['Пошив женской одежды', 'Пошив мужской одежды']
//   },
//   {
//     description: 'Добровольная сертификация',
//     siteUrl: 'https://www.youtube.com/feed/subscriptions',
//     logo: '',
//     category: ['Пошив женской одежды', 'Пошив мужской одежды']
//   },
//   {
//     description: 'Добровольная сертификация',
//     siteUrl: 'https://www.youtube.com/feed/subscriptions',
//     logo: '',
//     category: ['Пошив женской одежды', 'Пошив мужской одежды']
//   }
// ])

watch(() => filterList, (newValue, oldValue) => {
    fetchServices(1);
}, {deep: true});
</script>

<style lang="scss">
.company-details {
    &__list {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        flex-wrap: wrap;
        gap: 2em;

        &_type_2 {
            grid-template-columns: repeat(2, 1fr);
        }

        @include tablet {
            grid-template-columns: repeat(2, 1fr);
        }

        @include mobile {
            grid-template-columns: repeat(1, 1fr);
        }
    }
}
</style>

<template>
    <CommonFilter
        :submit-function="handleSubmit"
        :reset-function="resetFilter"
    >
        <template #body>
            <div class="filter__item">
                <h3 class="filter__title">Категории:</h3>
                <UiCheckboxGroup
                    :options="categories"
                    :isValidated="false"
                    v-model="searchProps.categories"
                    name="categories"
                >
                    <template #btn-image>
                        <SvgoDropDownNew class="svg-m" />
                    </template>
                </UiCheckboxGroup>
            </div>
        </template>
    </CommonFilter>
</template>

<script setup>
import { useEntityStore } from '~/store/entityStore';

const entityStore = useEntityStore();
const emit = defineEmits(["updateFilter"]);

const searchProps = ref({
    categories: [],
    type: "adjacent",
});

const categories = computed(() => entityStore.entityData.adjacentCategories);

const handleSubmit = () => {
    emit("updateFilter", { ...searchProps.value });
};

const resetFilter = () => {
    searchProps.value = {
        type: "adjacent",
        categories: [],
    };
    emit("updateFilter", searchProps.value);
};

entityStore.getAdjacentCategories();

</script>

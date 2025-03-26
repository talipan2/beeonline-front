<template>
    <div class="industry-services-edit">
        <UiForm :submit="handleSubmit">
            <div class="form-group">
                <label class="form-group__title"
                    >Название услуги
                    <UiInput
                        class="form-group__value"
                        :rules="{ required: true, min: 2 }"
                        type="text"
                        placeholder="Введите название услуги"
                        name="name"
                        label="Название услуги"
                        v-model="data.name"
                    />
                </label>
            </div>
            <div class="form-group industry-services-edit__categories">
                <label class="form-group__title">
                    Категории
                    <UiCheckboxGroup
                        class="form-group__value"
                        name="categories"
                        label="Категории"
                        :rules="{ minSelected: 1 }"
                        :options="categories"
                        v-model="data.categories"
                        :isDropDown="true"
                    />
                </label>
            </div>
            <label class="form-group__title">
                Описание
                <UiTextArea
                    class="form-group__value"
                    :rules="{ required: true }"
                    type="text"
                    placeholder="Описание"
                    name="description"
                    label="Описание"
                    v-model="data.description"
                />
            </label>
            <div class="form-group">
                <UiButton
                    type="submit"
                    class="form-group-data__btn"
                    variant="quinary"
                    size="large"
                    >Сохранить</UiButton
                >
            </div>
        </UiForm>
    </div>
</template>

<script setup>
import { useEntityStore } from "~/store/entityStore";
import { useAdjacentStore } from "~/store/adjacentStore";
import { useToast } from "vue-toastification";

const props = defineProps({
    data: {
        type: Object,
        default: () => {},
    },
});

const toast = useToast();
const router = useRouter();
const entityStore = useEntityStore();
const adjacentStore = useAdjacentStore();

const service = ref({
    name: "",
    logo: "",
    url: "",
    categories: [],
    description: "",
});

watch(
    () => props.data,
    (newVal) => {
        service.value = { ...props.data };
    },
    { deep: true, immediate: true }
);

const categories = computed(() => entityStore.entityData.adjacentCategories);
onMounted(() => {
    entityStore.getAdjacentCategories();
});

function handleSubmit(values, form) {
    adjacentStore.updateService(props.data.id, values)
    .then((response) => {
        router.push({ path: `/profile` });
        toast.success("Услуга успешно обновлена");
    });
}
</script>

<style lang="scss">
.industry-services-edit {
    &__logo {
        max-width: 30%;
        margin-bottom: 2em;

        .load-image {
            padding-bottom: 100%;
        }
    }

    &__categories {
        margin-bottom: 2em;
    }

    .checkbox-group {
        .checkbox {
            flex: 0 1 calc(50% - 1em);
        }
    }

    @include small-tablet {
        &__logo {
            max-width: 35%;
        }
    }
}
</style>

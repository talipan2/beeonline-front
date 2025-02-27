<template>
  <div class="industry-services-edit-company">
    <UiForm :submit="handleSubmit">
      <div class="industry-services-edit-company__logo">
        <CommonImageLoad
          class="form-group-data"
          title="Загрузить логотип"
          v-model="data.logo"
        />
      </div>
      <div class="form-group">
        <label class="form-group__title">
          Название *
          <UiInput
            class="form-group__value"
            :rules="{ required: true, min: 2 }"
            type="text"
            placeholder="Название"
            name="name"
            label="Название компании"
            v-model="data.name"
          />
        </label>
      </div>
      <div class="form-group">
        <label class="form-group__title">
          Регион производства
          <UiSelect
            class="form-group__value"
            :rules="{ required: true }"
            name="countryId"
            label="Регион"
            v-model="data.countryId"
            :options="locationList"
          />
        </label>
      </div>
      <div class="form-group">
        <label class="form-group__title">
          Сайт
          <UiInput
            class="form-group__value"
            :rules="{ url: true }"
            type="text"
            placeholder="Сайт"
            name="site"
            label="Сайт"
            v-model="data.siteUrl"
          />
        </label>
      </div>
      <div class="form-group">
        <label class="form-group__title">
          Описание
          <UiTextArea
            class="form-group__value"
            :rules="{ required: true, min: 2 }"
            type="text"
            placeholder="Описание"
            name="description"
            label="Описание"
            v-model="data.description"
          />
        </label>
      </div>
      <div class="industry-services-edit-company__gallery">
        <label class="form-group__title">
          Галерея
        </label>
        <CommonGalleryLoad v-model="data.gallery" label="Загрузить еще" />
      </div>
      <div class="form-group">
        <UiButton type="submit" class="form-group-data__btn" variant="quinary" size="large">Сохранить</UiButton>
      </div>
    </UiForm>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification';

const toast = useToast();
const router = useRouter();

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const locationList = ref([
  { id: 1, label: "Россия" },
  { id: 2, label: "Казахстан" },
  { id: 3, label: "Беларусь" },
  { id: 4, label: "Армения" },
  { id: 5, label: "Узбекистан" },
  { id: 6, label: "Киргизия" },
  { id: 7, label: "Испания" },
  { id: 8, label: "Тунис" },
]);

const handleSubmit = (value, form) => {
  toast.success('Компания успешно обновлена');
  router.push({ path: `/profile` });
}

</script>

<style lang="scss">

.industry-services-edit-company {
  &__logo {
    max-width: 30%;

    .load-image {
      padding-bottom: 100%;
    }

    @include small-tablet {
      max-width: 35%;
    }
  }

  &__gallery {
    .gallery-link {
      flex-basis: calc(33% - 1.2em);
      padding-bottom: 31%;
    }
  }
}

</style>
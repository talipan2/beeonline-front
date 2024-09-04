<template>
  <NuxtLayout name="profile" title="Обновление публичной карточки компании">
    <template #content>
      <div class="pub-card">
        <h2 class="pub-card__title">Основные данные компании</h2>
        <div class="pub-card__main">
          <CommonImageLoad class="pub-card__image" />
          <div class="pub-card__main-data">
            <div class="form-group">
              <div class="form-group-data">
                <div class="form-group-data__title">Название компании</div>
                <UiInput />
              </div>
              <div class="form-group-data">
                <div class="form-group-data__title">Ссылка на сайт</div>
                <UiInput />
              </div>
            </div>
            <div class="form-group-data">
              <div class="form-group-data__title">Описание</div>
              <UiTextArea class="pub-card__description-input" />
            </div>
          </div>
        </div>
        <div class="pub-card__location">
          <h3 class="pub-card__block-title">География фактического производства (по-умолчанию)*</h3>
          <p class="pub-card__location-description">
            Укажите предпочтительные города или регионы производства заказа.<br>
            Указанные города и регионы используются для автоматического добавления
            в новые заказы и позволят потенциальным исполнителям находить их в поиске.
          </p>
          <CommonLocation buttonLabel="Добавить город или регион" />
        </div>
        <div class="pub-card__gallery">
          <h3 class="pub-card__block-title">Галерея</h3>
          <CommonGallery />
          <p class="pub-card__gallery-description">Если у вас есть видео о компании, вы можете указать ссылку на видео в
            Youtube</p>
          <label class="pub-card__gallery-label" v-for="(link, index) in videoLinks" :key="index">Cсылка на видео в Youtube
            <div class="pub-card__gallery-link-add">
              <UiInput class="pub-card__gallery-link" />
              <UiButton v-if="index === videoLinks.length - 1" class="pub-card__gallery-btn" type="button" variant="quinary" size="around" @click="addLink">
                <SvgoAdd class="svg-m" />
              </UiButton>
              <UiButton v-else class="pub-card__gallery-btn" type="button" variant="quinary" size="around" @click="removeLink(index)">
                <SvgoSub class="svg-m" />
              </UiButton>
            </div>
          </label>
        </div>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup>

const videoLinks = ref(['']); // Изначально один инпут

const addLink = () => {
  videoLinks.value.push(''); // Добавление нового пустого инпута
};

const removeLink = (index) => {
  if (videoLinks.value.length > 1) {
    videoLinks.value.splice(index, 1); // Удаление инпута по индексу
  }
};

</script>

<style lang="scss">

.pub-card {
  &__title {
    margin-block: 1.25em .78em;
  }
  
  &__main {
    display: flex;
    column-gap: 3em;
  }

  &__image {
    flex: 0 0 22%;
  }

  &__main-data {
    flex: 1 1 75%;
  }

  &__description-input {
    input {
      height: 15em;
    }
  }

  &__location {
    max-width: 69%;
  }

  &__block-title {
    font-size: 2.3em;
    margin-block: 1.25em .83em;
  }

  &__location-description {
    font-size: 1.3em;
    line-height: 1.46em;
    margin-bottom: 1.53em;
  }

  &__gallery-link-add {
    display: flex;
    column-gap: 1em;
    max-width: 48%;
    align-items: center;
  }

  &__gallery-description {
    font-size: 1.6em;
    line-height: 1.5em;
    margin-bottom: 1.5em;
  }

  &__gallery-link {
    flex: 1 1 100%;
  }

  &__gallery-label {
    color: var(--text-color-secondary);
    font-size: 1.3em;
    line-height: 2em;

  }


  .load-image {
    padding-bottom: 100%;
  }
}

</style>
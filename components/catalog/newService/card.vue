<template>
  <div
    class="new-service-card"
    :class="{ 'new-service-card_type_revers': reversColor }">
    <CommonNameplate v-if="data?.tariff?.name" class="new-service-card__nameplate" :text="data?.tariff?.name" />
    <div class="new-service-card__header">
      <div class="new-service-card__pubcard">
        <!-- <p class="new-service-card__pubcard-title">Название компании</p> -->
        <div class="new-service-card__pubcard-content">
          <div
            class="image-box new-service-card__pubcard-logo image-box_type_not-border">
            <img :src="data.logo || defaultImage" :alt="data?.name" />
          </div>
          <div class="new-service-card__pubcard-info">
            <h3 class="new-service-card__pubcard-name">{{ data?.name }}</h3>
            <CommonLocationsList
              class="new-service-card__pubcard-locations"
              :locationsList="{
                cities: data?.cities,
                regions: data?.regions,
                countries: data?.countries,
              }"
              :isCountry="true" />
            <div class="new-service-card__pubcard-views">
              <SvgoViewsNew class="svg-m" />
              <p>{{ data.view_count }} просмотров</p>
            </div>
            <CommonUserOnlineStatus
              class="new-service-card__user-status new-service-card__user-status_type_mobile"
              :lastActivity="data.last_active_at" />
          </div>
        </div>
      </div>
      <p class="new-service-card__description prop_type_hidden">
        {{ data.description }}
      </p>
      <div class="new-service-card__pubcard-right">
        <UiButton
          class="new-service-card__btn"
          variant="quinary"
          size="large"
          :to="`/services/${data.id}`"
          >Подробнее</UiButton
        >
        <CommonUserOnlineStatus
          class="new-service-card__user-status"
          :lastActivity="data.last_active_at" />
      </div>
    </div>
    <div class="new-service-card__specs">
      <CatalogNewServiceDetailsBadge
        class="new-service-card__specs-item new-service-card__specs-item_type_desktop"
        :specs="[
          {
            name: 'Категория',
            value: data?.categories?.length
              ? data.categories.map((item) => item.name).join(' / ')
              : '',
          },
          // {name: 'Сырье', value: [data.materials_tolling ? 'Заказчика' : '', data.materials_own ? 'Исполнителя' : ''].filter(Boolean).join(' / ')},
          { name: 'Количество швей', value: data.workers_count },
        ]" />
      <CatalogNewServiceDetailsBadge
        class="new-service-card__specs-item new-service-card__specs-item_type_mobile"
        :specs="{
          name: 'Категория',
          value: data?.categories?.length
            ? data.categories.map((item) => item.name).join(' / ')
            : '',
        }" />
      <CatalogNewServiceDetailsBadge
        :specs="{
          name: 'Размер партии',
          value: data?.batches?.length
            ? data.batches.map((item) => item.name).join(' / ')
            : '-',
        }" />
      <CatalogNewServiceDetailsBadge
        :specs="{
          name: 'Свободный склад',
          value:
            data?.free_stock != null ? (data.free_stock ? 'Да' : 'Нет') : '',
        }" />
    </div>
    <div
      class="new-service-card__images"
      v-if="data.gallery && data.gallery.length">
      <p class="new-service-card__images-title">Примеры работ</p>
      <CatalogNewServiceImagesList :data="data.gallery" />
    </div>
    <UiButton
      class="new-service-card__btn new-service-card__btn_type_mobile"
      variant="quinary"
      size="large"
      :to="`/services/${data.id}`"
      >Подробнее</UiButton
    >
  </div>
</template>

<script setup>
  import defaultImage from "@/assets/images/nophoto_pc.png";

  const props = defineProps({
    data: {
      type: Object,
      default: () => ({}),
    },
    reversColor: {
      type: Boolean,
      default: false,
    },
  });
</script>

<style lang="scss">
  .new-service-card {
    font-family: "lato", sans-serif;
    font-size: 1rem;
    padding: 3.2em 3.2em 4em;
    background-color: #eff0f5;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    row-gap: 5.6em;
    flex: 1;
    position: relative;

    &_type_revers {
      background-color: #fff;

      .details-badge {
        background-color: #eff0f5;
      }
    }

    &__header {
      display: flex;
      gap: 1em;
      justify-content: space-between;
      align-items: center;
    }

    &__pubcard {
      flex: 0 0 23%;

      &-title {
        font-size: 1.8em;
        line-height: 1.3em;
        font-weight: 400;
        color: var(--text-color-gray);
        margin-bottom: 0.66em;
      }

      &-content {
        display: flex;
        align-items: center;

        @include mobile {
          margin-top: 2.5em;
        }
      }

      &-info {
        display: flex;
        flex-direction: column;
        row-gap: 1.2em;
      }

      &-logo {
        flex-basis: 32%;
        max-width: 32%;
        padding-top: 32%;
      }

      &-name {
        font-size: 2.4em;
        line-height: 1em;
        font-weight: 700;
        color: var(--text-color-monodecimal);
        word-break: break-word;
      }

      &-locations {
        font-size: 1.6em;
        line-height: 1em;
        font-weight: 400;
        color: var(--text-color-monodecimal);
      }

      &-views {
        display: flex;
        column-gap: 0.5em;
        font-size: 1.6em;
        line-height: 1em;
        font-weight: 400;
        color: var(--text-color-monodecimal);
      }

      &-right {
        display: flex;
        flex-direction: column;
        row-gap: 2.2em;
        align-items: center;
        max-width: 23em;
        width: 100%;
        margin-top: 3.5em;
        flex: 0 0 100%;

        @include small-tablet {
          margin-top: 4.5em;
        }
      }
    }

    &__description {
      font-size: 2em;
      font-weight: 400;
      line-height: 1.5em;
      color: var(--text-color-gray);
      max-width: 40em;
      flex: 1 1 100%;
    }

    &__btn {
      font-size: 1.2em;
      font-weight: 400;
      text-transform: uppercase;
      color: var(--text-color-hover-secondary);
      width: 100%;

      &_type_mobile {
        display: none;
      }
    }

    &__nameplate {
      position: absolute;
      right: 0;
      top: 12px;
      z-index: 2;
    }

    &__user-status {
      @include mobile {
        display: none;
      }

      &_type_mobile {
        display: none;

        @include mobile {
          display: flex;
        }
      }
    }

    &__specs {
      display: flex;
      justify-content: space-between;
      gap: 1.6em;

      .details-badge:first-child {
        flex: 0 1 50%;
      }

      .details-badge {
        flex: 0 1 25%;
      }

      &-item {
        &_type_mobile {
          display: none;
        }
      }

      @include mobile {
        flex-direction: column;
        gap: 2em;

        .details-badge:first-child {
          flex: 0 1 100%;
        }

        &-item {
          &_type_mobile {
            display: block;
          }

          &_type_desktop {
            display: none;
          }
        }
      }
    }

    &__images-title {
      font-size: 1.8em;
      font-weight: 400;
      line-height: 1.3em;
      color: var(--text-color-gray);
      margin-bottom: 1em;
    }

    @include tablet {
      font-size: 0.8rem;

      .details-badge {
        font-size: 0.8rem;
      }

      &__pubcard {
        flex-basis: 35%;
      }
    }

    @include small-tablet {
      &__pubcard {
        flex-basis: 30%;
      }
    }

    @include mobile {
      &__pubcard {
        flex-basis: 100%;
      }

      &__description {
        display: none;
      }

      &__btn {
        display: none;

        &_type_mobile {
          display: flex;
          max-width: none;
        }
      }

      &__header {
        order: 0;
      }

      &__specs {
        order: 2;
      }

      &__images {
        order: 1;
      }

      &__btn {
        order: 3;
      }
    }
  }
</style>

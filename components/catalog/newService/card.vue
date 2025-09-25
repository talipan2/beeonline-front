<template>
  <div
    class="new-service-card"
    :class="{ 'new-service-card_type_revers': reversColor }">
    <div class="new-service-card__nameplate-container">
      <CommonNameplate v-if="data?.is_open_contacts_active" class="new-service-card__nameplate" :text="'Контакты'" is-contacts />
      <CommonNameplate class="new-service-card__nameplate" v-if="data?.tariff?.name"  :text="data?.tariff?.name" />
    </div>
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
        <CommonUserOnlineStatus
          class="new-service-card__user-status"
          :lastActivity="data.last_active_at" />
        <UiButton
          class="new-service-card__btn"
          variant="quinary"
          size="large"
          :to="`/services/${data.id}`"
          >Подробнее</UiButton
        >
        <CatalogNewServiceContactsButton :id="data.id" v-if="data.is_open_contacts_active" v-slot="{ open }" @show="showContacts">
            <UiButton
              class="new-service-card__btn new-service-card__btn-contacts"
              :class="{
                'new-service-card__btn-contacts-hide': !!contactsData,
              }"
              variant="quinary"
              size="large"
              :disabled="!!contactsData"
              type="button"
              @click="open">
              Показать контакты
            </UiButton>
        </CatalogNewServiceContactsButton>
      </div>
    </div>
    <div class="new-service-card__specs">
        <div class="new-service-card__specs-contacts" v-if="contactsData">
            <CatalogNewServiceDetailsBadge
                grid-column="span 1"
                :specs="{
                    name: 'Контактное лицо',
                    value: contactsData.name || 'Не указано',
                }"
                :line-limit="false"
            />
            <CatalogNewServiceDetailsBadge
                grid-column="span 1"
                :specs="{
                    name: 'Сайт',
                    value: contactsData.site || 'Не указан',
                }"
                :line-limit="false"
            />
            <CatalogNewServiceDetailsBadge
                grid-column="span 1"
                :specs="{
                    name: 'Email',
                    value: contactsData.email || 'Не указан',
                }"
                :line-limit="false"
            />
            <CatalogNewServiceDetailsBadge
                grid-column="span 1"
                :specs="{
                    name: 'Телефон',
                    value: contactsData.phone || 'Не указан',
                }"
                :line-limit="false"
            />
        </div>

      <CatalogNewServiceDetailsBadge
      grid-column="span 2"
        class="new-service-card__specs-item new-service-card__specs-item_type_desktop"
        :specs="[
          {
            name: 'Категория',
            value: data?.categories?.length
              ? data.categories.map((item) => item.name).join(' / ')
              : '',
          },
          // {name: 'Сырье', value: [data.materials_tolling ? 'Заказчика' : '', data.materials_own ? 'Производителя' : ''].filter(Boolean).join(' / ')},
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
    <CatalogNewServiceContactsButton :id="data.id" v-if="data.is_open_contacts_active && !contactsData" v-slot="{ open }" @show="showContacts">
        <UiButton
            class="new-service-card__btn new-service-card__btn_type_mobile"
            variant="quinary"
            size="large"
            :disabled="!!contactsData"
            type="button"
            @click="open">
            Показать контакты
        </UiButton>
    </CatalogNewServiceContactsButton>
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

  const contactsData = ref(null);

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

  const showContacts = (contacts) => {
      contactsData.value = contacts;
  }
</script>

<style lang="scss">
  .new-service-card {
    font-family: "lato", sans-serif;
    font-size: 1rem;
    padding: 6em 3.2em 4em 3.2em;
    background-color: #eff0f5;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    row-gap: 5.6em;
    flex: 1;
    position: relative;

    @include mobile {
        row-gap: 2em;
    }

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
          margin-top: 3.5em;
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
        row-gap: 1em;
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

      &-contacts {
        transition: opacity 0.3s ease-in-out;
        opacity: 1;

        &-hide {
            opacity: 0;
        }
      }

      &_type_mobile {
        display: none;
      }
    }

    &__nameplate-container {
      position: absolute;
      right: 0;
      top: 12px;
      z-index: 2;
      display: flex;
      gap: .5em;
    }

    &__nameplate:last-child {
      border-radius: 8px 0 0 8px;
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
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1.6em;

      &-contacts {
        grid-column: span 4;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: inherit;

        p {
            overflow-wrap: anywhere;
        }

        @include mobile {
            display: flex;
            flex-direction: column;
            order: 1;
        }
      }

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
        display: flex;
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

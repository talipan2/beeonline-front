<template>
    <div v-if="dialog" class="dialogs-item" :class="{
      active: dialog.id == chat_id,
    }" @click="handleClick(dialog)">
      <div class="dialogs-item__wrap">
        <div class="dialogs-item__image" :class="{
          'dialogs-item__image_product': dialog.product,
        }">
          <div class="dialogs-item__image-wrap">
            <div class="dialogs-item__image-product" v-if="dialog.product">
              <img v-if="dialog.product.first_image" :src="dialog.product.first_image" :alt="dialog.product.name" />
              <img v-else src="" :alt="dialog.product.name" />
            </div>
            <div class="dialogs-item__image-orgs">
              <div class="dialogs-item__image-orgs-wrap"
                :class="['grid-' + ((dialog.organizations.length > 4) ? '4' : dialog.organizations.length)]">
                <template v-for="(organization, index) in dialog.organizations" :key="index">
                  <div v-if="organization.id != org_id">
                    <img v-if="organization.pubcard.logo" :src="organization.pubcard.logo"
                      :alt="organization.pubcard.name" />
                    <img v-else src="" :alt="organization.pubcard.name" />
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="dialogs-item__data">
          <div class="dialogs-item__org" v-for="(organization, index) in dialog.organizations" :key="index">
            <template v-if="organization.id != org_id">
              <div class="dialogs-item__org-title">
                {{ organization.pubcard.name }} ({{
                  getOrgType(organization)
                }})
              </div>
            </template>
          </div>
          <div class="dialogs-item__subtitle" v-if="dialog.product?.name">
            {{ getProductType(dialog.product) }}:
            {{ dialog.product.name }}
          </div>
          <div class="dialogs-item__deal" :class="{
            'disabled': dialog.deal?.ended
          }" v-if="dialog.deal">
            <span>{{ dialog.deal.status }}</span>
          </div>
          <div class="dialogs-item__info" v-if="dialog.last_message">
            <div class="dialogs-item__message">
              {{ dialog.last_message.text }}
            </div>
            <div class="dialogs-item__status" :class="{
              unreaded: dialog.read_message_id < dialog.last_message?.id
            }" v-if="dialog.last_message.date">
              {{ lastMessageTimeDiff(dialog.last_message.date) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

  <script setup>

  const props = defineProps({
    dialog: {
      type: Object,
      default: null
    },
    chat_id: {
      type: Number,
      default: null
    },
    org_id: {
      type: Number,
      default: null
    }
  });

  const emit = defineEmits(['change:chat', 'change:chat-by-message']);

  const getOrgType = (organization) => {
    return 'Исполнитель'
  }

  const getProductType = (product) => {
    return 'Заказ'
  }

  const handleClick = (dialog) => {
    if (dialog.is_message_search) {
      emit('change:chat-by-message', dialog.last_message);
    } else {
      emit('change:chat', dialog.id);
    }
  }

  function lastMessageTimeDiff(date) {
    const now = new Date();
    const diff = now - date;
    const oneDay = 24 * 60 * 60 * 1000; // один день в миллисекундах
    const oneYear = 365 * oneDay; // приблизительное количество дней в году

    // Вычисляем разницу в днях
    const daysDiff = Math.floor(diff / oneDay);

    if (daysDiff === 0) {
      return "Сегодня";
    } else if (daysDiff === 1) {
      return "Вчера";
    } else if (daysDiff < 7) {
      return `${daysDiff} ${plural(daysDiff, { one: "день", few: "дня", many: "дней" })}`;
    } else if (daysDiff < 30) {
      const weeks = Math.floor(daysDiff / 7);
      return `${weeks} ${plural(weeks, { one: "неделя", few: "недели", many: "недель" })}`;
    } else if (daysDiff < oneYear / oneDay) {
      const months = Math.floor(daysDiff / 30);
      return `${months} ${plural(months, { one: "месяц", few: "месяца", many: "месяцев" })}`;
    } else {
      const years = Math.floor(daysDiff / 365);
      return `${years} ${plural(years, { one: "год", few: "года", many: "лет" })}`;
    }
  }

  </script>

  <style lang="scss">
  .dialogs {
    --color-white: #fff;
    --color-black: #000000;
    --color-border-gray: #c4c4c4;
    --color-purple: #6937a5;
    --color-blue-100: #60a5fa;
    --color-blue-200: #3897f0;
    --color-gray-100: #f1f5f9;
    --color-gray-200: #f0f4fb;
    --color-gray-300: #e2e8f0;
    --color-gray-400: #cbd5e1;
    --color-gray-500: #94a3b8;
    --color-gray-600: #64748b;
    --color-gray-700: #475569;

    &-item {
      display: block;
      padding: 1.2em 2.4em;
      background-color: var(--bg-secondary-color);
      cursor: pointer;

      &.active,
      &:hover {
        background-color: var(--color-gray-100);
      }

      &__wrap {
        display: flex;
        gap: 1.6em;
      }

      &__image {
        width: 4.8em;
        flex: 0 0 4.8em;

        &-wrap {
          position: relative;
        }

        &_product {
          position: relative;

          .dialogs-item__image-orgs {
            position: absolute;
            width: 50%;
            height: 50%;
            padding-top: 0;
            left: 0;
            bottom: 0;
          }
        }

        &-orgs {
          position: relative;
          height: 0;
          padding-top: 100%;
          border-radius: 100%;
          overflow: hidden;
        }

        &-orgs-wrap {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background-color: var(--color-gray-300);
          display: grid;

          div {
            position: relative;
            width: 100%;
            height: 100%;

            img {
              position: absolute;
              inset: 0;
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }

          /* Сетка для одного изображения */
          &.grid-1 {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr;
          }

          /* Сетка для двух изображений: два столбца */
          &.grid-2 {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr;
          }

          /* Сетка для трёх изображений: одно сверху, два внизу */
          &.grid-3 {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr;

            div:nth-child(1) {
              grid-column: 1 / span 2;
            }
          }

          /* Сетка для четырёх изображений: четыре части */
          &.grid-4 {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr;
          }

          /* Скрыть все изображения после 4-го */
          div:nth-child(n + 5) {
            display: none;
          }
        }
      }

      &__image-product {
        position: relative;
        height: 0;
        padding-top: 100%;
        border-radius: 30%;
        overflow: hidden;
        background-color: var(--color-gray-400);

        img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      &__data {
        align-self: center;
        max-width: calc(100% - 6.4em);
      }

      &__org-title {
        font-size: 1.4em;
        line-height: 1.2;
        font-weight: 600;
        color: var(--color-gray-600);
      }

      &__subtitle {
        font-size: 1.3em;
        line-height: 1;
        font-weight: 400;
        margin: 0.2em 0;
        color: var(--color-gray-700);
      }

      &__deal {
        span {
          display: inline-block;
          font-size: 1.2em;
          line-height: 1.2;
          background-color: #6dbf2f;
          color: var(--color-white);
          padding: 0.2em 0.6em;
          border-radius: 2px;
        }

        &.disabled {
          span {
            background-color: var(--color-gray-500);
          }
        }
      }

      &__info {
        display: flex;
        align-items: center;
      }

      &__message {
        font-size: 1.2em;
        line-height: 1.5em;
        height: 1.5em;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        // white-space: nowrap;
        color: var(--color-gray-600);
      }

      &__status {
        position: relative;
        font-size: 1em;
        line-height: 1em;
        color: var(--color-gray-500);
        padding-left: 1.6em;
        white-space: nowrap;

        &::before {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          margin: auto 0;
          left: 0.6em;
          width: 0.4em;
          height: 0.4em;
          border-radius: 0.4em;
          background-color: var(--color-gray-400);
        }

        &.unreaded {
          &::before {
            background-color: var(--color-purple);
          }
        }
      }
    }
  }
  </style>

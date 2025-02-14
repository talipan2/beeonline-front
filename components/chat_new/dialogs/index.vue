<template>
    <div class="dialogs" :class="{'dialogs_loading': loading}">
      <div class="dialogs__head">
        <div class="dialogs__search">
          <div class="dialogs__search-wrap">
            <input type="text" class="dialogs__search-input" placeholder="Искать контакт или чат" v-model="search"
              @input="onSearch" />
            <div v-if="search.length" class="dialogs__search-reset" @click="resetSearch"></div>
          </div>
          <div class="dialogs__search-type" v-if="search.length">
            <label :class="{
              active: searchType === 'dialogs'
            }">
              <span>Диалоги</span>
              <input type="radio" value="dialogs" v-model="searchType" />
            </label>
            <label :class="{
              active: searchType === 'messages'
            }">
              <span>Сообщения</span>
              <input type="radio" value="messages" v-model="searchType" />
            </label>
          </div>
        </div>
      </div>
      <div class="dialogs__list" @scroll="onScroll" ref="dialogs">
        <template v-if="dialogs.length">
          <template v-for="(dialog, index) in dialogs" :key="index">
            <ChatDialogsItem :dialog="dialog" :chat_id="chat_id" @change:chat="$emit('change:chat', $event)"
              @change:chat-by-message="$emit('change:chat-by-message', $event)" />
          </template>
        </template>
        <template v-else-if="!loading">
          <div class="dialogs__text" v-if="search.length">
            <span v-if="searchType === 'dialogs'">Диалоги не найдены</span>
            <span v-else-if="searchType === 'messages'">Сообщения не найдены</span>
          </div>
        </template>
      </div>
    </div>
  </template>

  <script setup>
  import { useChatStore } from '~/store/chatStore';



  const chatStore = useChatStore();

//   const dialogs = computed(() =>
//     chatStore.chats.map(chat => ({
//       ...chat,
//       last_message: {...chat.messages[0], date: new Date(chat.messages[0].created_at)} || null
//     }))
//   );
  const search = ref('');
  const dialogs = ref([]);

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

    font-size: 10px;
    background-color: var(--color-white);

    flex-grow: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    &_loading {
      opacity: 0.5;
    }

    &__text {
      padding: 0 2.4em;

      span {
        font-size: 1.4em;
      }
    }

    &__head {
      padding: 2.4em;
      // display: flex;
      // align-items: center;

      &-title {
        font-size: 2em;
        line-height: 1.4em;
        font-weight: 600;
        color: var(--color-gray-700);
        flex-grow: 1;
      }

      &-link {
        font-size: 1.2em;
        line-height: 1.5em;
        font-weight: 600;
        color: var(--color-gray-600);
        margin-left: 1.5em;
      }
    }

    &__search {
      // padding: 0 2.4em 1.2em;

      &-wrap {
        position: relative;
        height: 4em;
      }

      &-input {
        position: absolute;
        inset: 0;
        // width: 100%;
        // height: 100%;
        font-size: 1.4em;
        line-height: 1.5em;
        background-color: var(--color-gray-300);
        border-radius: 2px;
        border: 0;
        padding-left: 1em;
        padding-right: 3em;
        outline: none;
        color: var(--color-gray-600);

        &::placeholder {
          color: var(--color-gray-500);
        }
      }

      &-reset {
        position: absolute;
        top: 0;
        right: 1em;
        bottom: 0;
        width: 2em;
        height: 2em;
        margin: auto 0;
        background-color: var(--color-gray-400);
        cursor: pointer;
        opacity: 0.7;

        &:hover {
          opacity: 1;
        }

        &::after,
        &::before {
          content: "";
          position: absolute;
          inset: 0;
          width: 50%;
          height: 2px;
          margin: auto;
          background-color: var(--color-gray-600);
        }

        &::after {
          transform: rotate(45deg);
        }

        &::before {
          transform: rotate(-45deg);
        }
      }
    }

    &__search-type {
      display: flex;
      align-items: center;
      padding: .5em;
      background-color: var(--color-gray-200);
      border-radius: 5px;
      gap: .5em;
      margin-top: .5em;

      label {
        flex: 1 1 auto;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0;
        background-color: var(--color-gray-300);
        position: relative;
        z-index: 0;
        border-radius: 5px;
        padding: .5em;
        cursor: pointer;

        &:hover,
        &.active {
          background-color: var(--color-gray-400);
        }

        input {
          position: absolute;
          pointer-events: none;
          z-index: -1;
          opacity: 0;
        }

        span {
          font-size: 1.3em;
        }
      }
    }

    &__list {
      overflow-y: auto;
    }
  }
  </style>

<template>
    <div class="dialog__top" v-if="!onlyBody">
    {{ formData.getAll('file[]') }}

      <div class="dialog__close">
        <a href="javascript:;" @click="$emit('close')">
          <i class="icon-arrow"></i>
        </a>
      </div>
      <div class="dialog__orgs">
        <template v-if="chat">
          <template v-for="(org, index) in chat.organizations" :key="index">
            <div class="dialog-head" v-if="org.id != org_id">
              <div class="dialog-head__img">
                <img v-if="org.pubcard.logo" :src="org.pubcard.logo" :alt="org.pubcard.name" />
                <img v-else src="../../assets/images/nophoto_pc.png" :alt="org.pubcard.name" />
              </div>
              <div class="dialog-head__info">
                <a :href="`/members/${org.id}/${org.pivot.org_type}`" target="_blank" class="dialog-head__info-title">
                  {{ org.pubcard.name }}
                </a>
                <div class="dialog-head__info-status">
                  {{ orgOnline(org) }}
                </div>
              </div>
              <div class="dialog-head__buttons">
                <UiButton class="dialog-head__btn dialog-head__btn_type_colored" v-if="chat.deal" :to="`/deals/`" variant="tertiary" size="around" target="_blank" >Открыть сделку</UiButton>
                <UiButton class="dialog-head__btn" v-else :to="`/deals/`" variant="quinary" size="around" target="_blank" >Начать работу</UiButton>
                <UiButton class="dialog-head__btn dialog-head__btn_type_colored" type="button" @click="settingStore.addReviewModal=true" variant="tertiary" size="around" target="_blank">
                  <SvgoDealIcon class="svg-m" fill="#6937a5"/>
                  Оставить отзыв
                </UiButton>
                <UiNewDropdown placement="bottom-end" :arrow="false">
                  <UiButton class="dialog-head__btn" variant="tertiary" size="around">
                    <SvgoDots class="svg-m" fill="#6937a5"/>
                  </UiButton>
                  <template #content>
                    <div class="dialog-head__dropdown-menu">
                      <UiButton class="dropdown-menu__btn" variant="default">Открыть сделку</UiButton>
                      <UiButton class="dropdown-menu__btn" variant="default">Оставить отзыв</UiButton>
                      <UiButton class="dropdown-menu__btn" variant="default">Проверить контрагента</UiButton>
                      <UiButton class="dropdown-menu__btn" variant="default">Перейти в профиль</UiButton>
                      <UiButton class="dropdown-menu__btn" variant="default">Перейти к заказу</UiButton>
                    </div>
                  </template>
                </UiNewDropdown>
              </div>
            </div>
          </template>
        </template>
      </div>
    </div>
    <div class="dialog__body" ref="chatContainer" @scroll="handleScroll">
      <template v-if="chat && chat.id">
        <template v-for="(group, index) in groupedMessages" :key="index">
          <div class="dialog__messages-group">
            <div class="dialog__messages-group-date">
              <span>{{ group.date }}</span>
            </div>
            <template v-for="(message, key) in group.messages" :key="key">
              <div :ref="'message-' + message.id" v-if="message.scrollTo"></div>
              <ChatMessage :small="small" :message="message" :prev="group.messages[key - 1]" :next="group.messages[key + 1]" />
            </template>
          </div>
        </template>
      </template>
      <div class="dialog__body-message" v-else>
        <template v-if="chat && !chat.id">Чтобы начать чат отправьте первое сообщение</template>
        <template v-else>Выберите чат</template>
      </div>
      <UiDragAndDropFile v-if="chat && chat.id" :draggableComponent="chatContainer" @addFile="addFile"/>
    </div>
    <div class="dialog__bottom" v-if="!onlyBody">
      <form @submit="submitMessage" class="dialog__form">
        <CommonTooltip :text="tooltipMessage">
          <template #trigger>
            <CommonDocumentLoader class="dialog__form-loader" @addFile="addFile">
              <template #action>
                <UiButton type="button" class="dialog__form-btn" variant="default">
                  <SvgoFileDrop class="svg-m"/>
                </UiButton>
              </template>
            </CommonDocumentLoader>
          </template>
        </CommonTooltip>
        <input class="dialog__form-message"
          v-model="message"
          placeholder="Сообщение"
          name="message"
          maxlength="255"
          required="required"
        />
        <button type="submit" class="dialog__form-submit">Отправить</button>
      </form>
    </div>
    <ChatModalsAddFile :fileList="addedFiles" @addFile="addFile" @removeFile="removeFile" @clearFiles="clearFiles"/>
    <ChatModalsReview />
  </template>

  <script setup>
  import { useChatStore } from '~/store/chatStore';
  import { useSettingStore } from '~/store/settingStore';

  const props = defineProps({
    init_chat_id: {
      type: Number,
      default: 0,
    },
    init_org_id: {
      type: Number,
      default: 0,
    },
    init_org_type: {
      type: String,
      default: "",
    },
    init_product_id: {
      type: Number,
      default: 0,
    },
    init_message_id: {
      type: Number,
      default: 0,
    },
    class: {
      type: String,
      default: "",
    },
    small: {
      type: Boolean,
      default: false,
    },
  })

  const addedFiles = ref([]);
  const formData = ref(new FormData());
  const settingStore = useSettingStore();
  const maxFilesCount = 2;
  const maxFileSize = 2048;
  const acceptFile = ['jpg', 'jpeg', 'png', 'bmp', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'zip', 'rar', '7z']

  const tooltipMessage =
    "Максимальный размер файла: " + Number.parseFloat(maxFileSize / 1024).toFixed(0) + " Мб.\n"
    + " Допустимые расширения: " + acceptFile.join(', ');
  ;

  function addFile(item) {
    if(addedFiles.value.length >= maxFilesCount) {
      settingStore.alertModal.isOpen = true;
      settingStore.alertModal.text = `Максимальное количество файлов: ${maxFilesCount}.`;
      settingStore.alertModal.status = "error";
      return;
    };
    addedFiles.value.push({
      id: crypto.randomUUID(),
      name: item.name,
      url: URL.createObjectURL(item),
      type: item.name.split('.').pop().toLowerCase(),
      file: item
    })

    if(!settingStore.addFileModal) {
      settingStore.addFileModal = true;
    }
  }

  // отслеживаем изменения в массиве для обновления формдата
  watch(addedFiles, (newFiles) => {
    const newFormData = new FormData();
    newFiles.forEach(item => {
      newFormData.append('file[]', item.file);
    });
    formData.value = newFormData;
  }, { deep: true });

  function removeFile(id) {
    addedFiles.value = addedFiles.value.filter(item => item.id !== id);
  }

  function clearFiles() {
    addedFiles.value = [];
    formData.value.delete('file[]');
  }

  const chatContainer = ref(null);

  const chatStore = useChatStore();
  // const messages = ref([]);

  const loading = ref(false);
  // const messages = ref([{
  //   id: 9856,
  //   chat_id: 3552,
  //   user_id: 2,
  //   user: {
  //     id: 2,
  //     org_id: 1,
  //     name: "\u0417\u0430\u043a\u0430\u0437\u0447\u0438\u043a 1"
  //   },
  //   organization_id: 1,
  //   recipient_id: null,
  //   recipient_type: null,
  //   sent: 1,
  //   options: null,
  //   text: "test",
  //   type: null,
  //   files: [
  //     {
  //       id: 2299,
  //       url: "\/storage\/uploads\/1\/chat_message\/dd4e6e63026dbf2ec5f2c3a586963a2cdf147d2c.png",
  //       name: "Frame 33478.png",
  //       ext: "png",
  //       loaded: true
  //     }
  //   ],
  //   created_at: "2024-10-14T09:32:33.000000Z",
  //   chat: null
  // },
  // {
  //   id: 9859,
  //   chat_id: 3552,
  //   user_id: 7,
  //   user: {
  //     id: 7,
  //     org_id: 6,
  //     name: "\u0418\u0441\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c 11"
  //   },
  //   organization_id: 6,
  //   recipient_id: null,
  //   recipient_type: null,
  //   sent: 1,
  //   options: null,
  //   text: "hi",
  //   type: null,
  //   files: [],
  //   created_at: "2024-10-14T09:36:06.000000Z",
  //   chat: null
  // },
  // {
  //   id: 9864,
  //   chat_id: 3552,
  //   user_id: 2,
  //   user: {
  //     id: 2,
  //     org_id: 1,
  //     name: "\u0417\u0430\u043a\u0430\u0437\u0447\u0438\u043a 1"
  //   },
  //   organization_id: 1,
  //   recipient_id: null,
  //   recipient_type: null,
  //   sent: 1,
  //   options: null,
  //   text: "123",
  //   type: null,
  //   files: [],
  //   created_at: "2024-10-14T10:07:06.000000Z",
  //   chat: null
  // }
  // ]);
  const init_org = ref(null);
  const chat = computed(() => {
    if (props.init_chat_id) {
      return chatStore.chats.find((chat) => chat.id === props.init_chat_id);
    }
  })

  const messages = ref([]);


  watch(() => props.init_chat_id, (newVal) => {
    if (newVal === chat.value.id && newVal === 3572) {
      messages.value = chatStore.messages[0];
    } else {
      messages.value = chatStore.messages[1];
    }
  }, {deep: true});

  // const chat = ref({
  //   id: 3572,
  //   user_id: 2,
  //   organization_id: 1,
  //   deal_id: null,
  //   deal: null,
  //   product_id: null,
  //   product: null,
  //   status: null,
  //   updated_at: "2024-10-15T06:04:35.000000Z",
  //   messages: [],
  //   organizations: [
  //     {
  //       id: 2322,
  //       name: "dgg",
  //       last_active_at: "2024-04-26T08:28:13.000000Z",
  //       pubcard: {
  //         id: 1700,
  //         active: 1,
  //         type: "performer",
  //         name: "dgg",
  //         logo: null,
  //         org_id: 2322
  //       },
  //       pivot: {
  //         chat_id: 3572,
  //         org_id: 2322,
  //         org_type: "performer",
  //         read_message_id: 0
  //       }
  //     }
  //   ],
  //   read_message_id: 9868
  // });

  const channel = ref(null);

  const user_id = ref(2);
  const org_id = ref(1);
  const message = ref("");
  const files = ref([]);
  const maxMessages = 50;
  const lastLoaded = ref(false);
  const firstLoaded = ref(false);
  const previousScrollHeight = ref(0);
  const previousScrollTop = ref(0);

  const onlyBody = computed(() => !chat.value);

  const groupedMessages = computed(() => {
    let groups = {};
    let options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    messages.value.forEach((message) => {
      prepareMessage(message);
      const date = message.date;
      let formattedDate = date.toLocaleDateString(
        navigator.language,
        options
      );

      if (date.toDateString() == new Date().toDateString()) {
        formattedDate = "Сегодня";
      }

      if (!groups[formattedDate]) {
        groups[formattedDate] = {
          messages: [],
          date: formattedDate,
        };
      }

      let group = groups[formattedDate];

      const index = group.messages.findIndex(
        (obj) => obj.id === message.id
      );

      if (index !== -1) {
        group.messages[index] = message;
      } else {
        group.messages.push(message);
      }
    });
    return groups;
  })



  const orgOnline = (org) => {
    // let last_active_at = new Date(org.last_active_at);
    // if (new Date() - last_active_at < 5 * 60 * 1000) {
    //   return "Онлайн";
    // }
    return "Офлайн"
  }

  function prepareMessage(message) {
    let date = new Date(message.created_at);

    message.date = date;
    message.own = message.user_id == user_id.value;
    if (message.organization_id == org_id.value) {
      message.side = "right";
    } else {
      message.side = "left";
    }
    message.readed = false;
    chat.value.organizations.forEach((org) => {
      if (org.pivot.read_message_id >= message.id) {
        message.readed = true;
      }
    });

    // const index = this.messages.findIndex(
    //     (obj) => obj.id === message.id
    // );
    // if (index !== -1) {
    //     this.messages[index] = message;
    // }
  }

  </script>

  <style lang="scss">
  .chat-filedrop {
    position: absolute !important;
    inset: 0 !important;
  }

  .dialog {
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

    --font-size-10: 1em;
    --font-size-11: 1.1em;
    --font-size-12: 1.2em;
    --font-size-14: 1.4em;
    --font-size-16: 1.6em;

    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;

    font-size: 10px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    &__top {
      border-bottom: 1px solid var(--border-color-secondary);
      display: flex;
    }

    &__close {
      flex: 0 0 auto;
      display: none;
      align-items: stretch;
      justify-content: center;

      @media (max-width: 767px) {
        display: flex;
      }

      a {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;

        &:hover {
          text-decoration: none;
        }
      }
    }

    &__orgs {
      flex: 1 1 100%;
    }

    &-head {
      display: flex;
      align-items: center;
      padding: 2em;

      &__img {
        position: relative;
        font-size: 1em;
        width: 4.8em;
        height: 4.8em;
        flex: 0 0 auto;
        margin-right: 1.6em;
        overflow: hidden;
        border-radius: 100%;
        background-color: var(--color-gray-300);

        img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      &__info {
        flex: 1 1 0;

        &-title {
          font-size: 1.4em;
          font-weight: 600;
          color: var(--color-gray-600);
        }

        &-status {
          font-size: 1em;
          color: var(--color-gray-500);
        }
      }

      &__buttons {
        flex: 0 1 auto;
        display: flex;
        gap: 1rem;

        @media screen and (max-width: 1379px) {
          display: none;
        }
      }

      &__btn {
        text-transform: uppercase;
        column-gap: 1em;
        font-size: 1.2em;
        font-weight: 400;

        &_type_colored {
          color: var(--text-color-primary);
        }
      }

      &__dropdown-menu {
        padding: 2em;
        font-size: 1.4rem;
        a {
          display: block;
          font-size: 1em;
          padding: .3em;
          justify-content: flex-start;
          color: var(--text-color-primary);

          &:hover {
            background-color: var(--button-background-secondary-hover);
          }
        }
      }
    }

    &__body {
      flex: 1 1 100%;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      background: var(--color-gray-200);

      &-message {
        padding: 1em 2em;
        background-color: var(--color-white);
        font-size: 1.6em;
        line-height: 1.5em;
        color: var(--color-gray-600);
        margin: auto;
        border-radius: 0.8em;
        max-width: 70%;
      }
    }

    &__bottom {
      flex: 0 0 auto;
      padding: 2em;
      border-top: 1px solid var(--border-color-secondary);
    }

    &__form {
      display: flex;
      align-items: center;

      &-loader {
        .add-file__input {
          margin-block: 0;
          font-size: 1em;

          input {
            cursor: pointer;
          }
        }
      }

      &-message {
        box-sizing: border-box;
        font-size: 1.4em;
        height: 2.8em;
        width: 100%;
        background: var(--color-gray-300);
        outline: none;
        border: none;
        border-radius: 0.8em;
        padding: 0.8em;
        margin: 0 1.6em;
      }

      &-btn {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.4em;
        background-color: var(--color-gray-300);
        height: 2.8em;
        min-width: 2.8em;
      }

      &-submit {
        border: 1px solid var(--border-color-secondary);
        font-size: 1.4em;
        line-height: 1em;
        height: 2.8em;
        border-radius: 0.8em;
        padding-inline: 0.42em;
        background-color: var(--color-gray-200);

        &:hover {
          color: initial;
        }
      }

      &-file {
        position: relative;

        input {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          pointer-events: none;
          z-index: -1;
        }
      }
    }

    &__messages-group {
      padding-bottom: 2em;

      &-date {
        font-size: 1.1em;
        position: sticky;
        top: 2em;
        margin-top: 2em;
        text-align: center;
        z-index: 2;

        span {
          display: inline-block;
          font-size: 1.2em;
          padding: 0.2em 0.5em;
          border-radius: 1em;
          color: var(--color-gray-600);
          background-color: var(--color-gray-200);
        }
      }
    }

    &_small {
      font-size: 5px;
      --font-size-10: 10px;
      --font-size-11: 10px;
      --font-size-12: 11px;
      --font-size-14: 12px;
      --font-size-16: 14px;
    }
  }
  </style>

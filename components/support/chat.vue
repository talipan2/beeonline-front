<template>
  <div class="support-chat dialog">
    <div class="dialog__body" ref="chatContainer" @scroll="handleScroll">
      <template v-if="chat">
        <template v-for="(group, index) in groupedMessages" :key="index">
          <div class="dialog__messages-group">
            <div class="dialog__messages-group-date">
              <span>{{ group.date }}</span>
            </div>
            <template v-for="(message, key) in group.messages" :key="key">
              <div :ref="'message-' + message.id" v-if="message.scrollTo"></div>
              <ChatMessage :small="false" :message="message" :prev="group.messages[key - 1]"
                :next="group.messages[key + 1]" />
            </template>
          </div>
        </template>
      </template>
      <UiDragAndDropFile v-if="chat && chat.id" :draggableComponent="chatContainer" @addFile="addFile" />
    </div>
    <div class="dialog__bottom" v-if="!onlyBody">
      <form @submit="submitMessage" class="dialog__form">
        <CommonTooltip :text="tooltipMessage">
          <template #trigger>
            <CommonDocumentLoader class="dialog__form-loader" @addFile="addFile">
              <template #action>
                <UiButton type="button" class="dialog__form-btn" variant="default">
                  <SvgoFileDrop class="svg-m" />
                </UiButton>
              </template>
            </CommonDocumentLoader>
          </template>
        </CommonTooltip>
        <input class="dialog__form-message" v-model="message" placeholder="Сообщение" name="message" maxlength="255"
          required="required" />
        <button type="submit" class="dialog__form-submit">Отправить</button>
      </form>
    </div>
    <ChatModalsAddFile :fileList="addedFiles" @addFile="addFile" @removeFile="removeFile" @clearFiles="clearFiles"/>
  </div>
</template>

<script setup>
import { useChatStore } from '~/store/chatStore';
import { useSettingStore } from '~/store/settingStore';


const props = defineProps({
  chat_id: {
    type: Number,
    default: null,
  },
});

const chatStore = useChatStore();
const settingStore = useSettingStore();

const chat = computed(() => {
  if (props.chat_id) {
    return chatStore.chats.find((chat) => chat.id === props.chat_id);
  }
})

const chatContainer = ref(null);
const maxFilesCount = 2;
const maxFileSize = 2048;
const acceptFile = ['jpg', 'jpeg', 'png', 'bmp', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'zip', 'rar', '7z']
const tooltipMessage = 
  "Максимальный размер файла: " + Number.parseFloat(maxFileSize / 1024).toFixed(0) + " Мб.\n" 
  + " Допустимые расширения: " + acceptFile.join(', ');
;
const user_id = ref(2);
const org_id = ref(1);
const messages = computed(() => chatStore.messages[0]);
const addedFiles = ref([]);
const formData = ref(new FormData());

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
}

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

</script>

<style lang="scss" scoped>

.dialog {

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

}

</style>
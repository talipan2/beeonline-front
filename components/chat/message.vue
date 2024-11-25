<template>
  <div class="message" :class="messageClass" ref="message">
    <div class="message__left">
      <div class="message__status" :class="{
        'message__status_error': message.error,
        'message__status_sent': message.sent,
        'message__status_readed': message.readed,
        'message__status_not_own': !message.own,
      }"></div>
    </div>
    <div class="message__body">
      <div class="message__title" v-if="isFirst && message.type != 'system' && message.user?.name">
        {{ message.user.name }}
      </div>
      <div class="message__text">
        {{ message.text }}
      </div>
      <file-list-new v-if="message.files && message.files.length" v-model:files-value="message.files" :readonly="true"
        :style="message.own ? 'dark' : 'light'" />
      <CommonFileList v-if="file.length" :data-list="file" :variant="message.own ? 'light' : 'dark' " :download-text="true"/>
    </div>
    <div class="message__right">
      <div class="message__time">{{ time }}</div>
    </div>

    <transition @after-enter="scrollToAnimate = false" name="msg-fade">
      <div v-if="scrollToAnimate" class="message__scrollto"></div>
    </transition>
  </div>
</template>

<script setup>

const props = defineProps({
  prev: {
    type: Object,
    default: null,
  },
  message: {
    type: Object,
    required: true,
  },
  next: {
    type: Object,
    default: null,
  },
  small: {
    type: Boolean,
    default: false,
  },
})

const file = computed(() => {
  return props.message.files.map((file) => {
    return {...file, type: file.ext}
  })
})

watch(() => props.message, (newVal) => {
  console.log(props.message)
}, {deep: true});

const scrollToAnimate = ref(false);

const isFirst = computed(() => {
  let is_first = true;
  if (props.prev) {
    if (props.prev.organization_id == props.message.organization_id) {
      if (Math.abs(props.prev.date.getTime() - props.message.date.getTime()) < 120000) {
        is_first = false;
      }
    }
  }
  return is_first;
})

const messageClass = computed(() => {
  let messageClass = [];
  let is_last = true;
  let is_system = false;


  if (props.message.type === "system") {
    is_system = true;
  }
  if (is_last) {
    messageClass.push("last");
  }
  if (is_system) {
    messageClass.push("system");
  }
  if (props.message.side) {
    messageClass.push(props.message.side);
  }
  if (props.message.own) {
    messageClass.push("own");
  }

  if (props.small) {
    messageClass.push("message_small");
  }

  return messageClass.join(" ");
})

</script>

<style lang="scss">
.msg-fade-enter-active,
.msg-fade-leave-active {
  transition: opacity 1s;
}

.msg-fade-enter,
.msg-fade-leave-to {
  opacity: 0;
}

.message {
  position: relative;
  z-index: 1;
  font-size: 10px;
  display: flex;
  padding: 0.3em 2.4em;

  &__scrollto {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background-color: var(--color-gray-400);
    pointer-events: none;
    z-index: -1;
  }

  &__left {
    flex: 0 0 3.2em;
    margin-right: 1.2em;
    display: flex;
    align-items: flex-end;
  }

  &__status {
    font-size: 2em;
    width: 1em;
    height: 1em;
    margin-left: 0.5em;
    background: no-repeat 0 / cover url("@/assets/svg/msg-status.svg");

    &_error {
      background-position-x: -1em;
    }

    &_sent {
      background-position-x: -2em;
    }

    &_readed {
      background-position-x: -3em;
    }

    &_not_own {
      background-position-x: -4em;

      &.message__status_readed {
        background-position-x: -5em;
      }
    }
  }

  &__body {
    padding: 1.4em 1.6em;
    flex: 0 1 auto;
    max-width: 100%;
    max-width: 40em;
    color: var(--color-gray-600);
    background-color: var(--bg-secondary-color);
    border-radius: 4px 8px 8px 4px;
  }

  &__title {
    font-size: 1.4em;
    margin-bottom: .5em;
    font-weight: bold;
  }

  &__text {
    font-size: 1.4em;
  }

  &__right {
    flex: 0 0 auto;
    display: flex;
    align-items: flex-end;
  }

  &__time {
    transition: opacity 0.3s ease-in-out;
    opacity: 0;
    font-size: 1.2em;
    color: var(--color-gray-600);
    margin: 0 0.5em;
  }

  &.own {
    .message {
      &__body {
        border-radius: 8px 4px 4px 8px;
        color: var(--bg-secondary-color);
        background-color: var(--primary-color);
      }
    }
  }

  &.first {
    padding-top: 2em;

    .message {
      &__body {
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }
    }
  }

  &.last {
    padding-bottom: 2em;

    .message {
      &__body {
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
      }
    }
  }

  &.system {
    .message {

      &__left,
      &__right {
        display: none;
      }

      &__body {
        margin-left: auto;
        margin-right: auto;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
      }
    }
  }

  &.right {
    flex-direction: row-reverse;
  }

  &:hover {
    .message {
      &__time {
        opacity: 1;
      }
    }
  }

  &_small {
    font-size: 5px;
    --font-size-12: 11px;
    --font-size-14: 12px;
  }
}
</style>
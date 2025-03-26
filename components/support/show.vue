<template>
  <div class="support support-show">
    <h2 class="support__title">Данные запроса</h2>
    <div class="support-show__header">
      <div class="support-show__header-col">
        <div class="support-show__header-item">
          <p class="support-show__header-label">Запрос №:</p>
          <p class="support-show__header-value">{{ ticket.id }}</p>
        </div>
        <div class="support-show__header-item">
          <p class="support-show__header-label">Статус:</p>
          <p class="support-show__header-value">{{ ticket.status_name }}</p>
        </div>
      </div>
      <div class="support-show__header-col">
        <div class="support-show__header-item">
          <p class="support-show__header-label">Создан:</p>
          <p class="support-show__header-value">{{ formatDate(ticket.created_at, 'weekday, DD.MM.YYYY - HH:mm:ss') }}</p>
        </div>
        <div class="support-show__header-item">
          <p class="support-show__header-label">Обновлено:</p>
          <p class="support-show__header-value">{{ formatDate(ticket.updated_at, 'weekday, DD.MM.YYYY - HH:mm:ss') }}</p>
        </div>
      </div>
      <div class="support-show__header-col">
        <div class="support-show__header-item">
          <p class="support-show__header-label">Тема:</p>
          <p class="support-show__header-value">{{ ticket.type_name }}</p>
        </div>
      </div>
    </div>
    <div class="support-show__actions" v-if="ticket.is_manager">
        <UiButton
          type="button"
          variant="primary"
          size="around"
          class="support-show__actions-btn"
          @click="closeSupportTicket"
          :disabled="ticket.status === 'CLOSED'"
        >
          Закрыть запрос
        </UiButton>
    </div>
    <div class="support-show__chat">
        <Chat
            :init_chat_id="ticket.chat_id"
            :is-manager="ticket.is_manager"
        />
      <!-- <SupportChat :chat_id="3552"/> -->
    </div>
  </div>
</template>

<script setup>
import { useSupportStore } from "~/store/supportStore";
import { useChannelsStore } from "~/store/channelsStore";

const supportStore = useSupportStore();
const channelsStore = useChannelsStore();

const loading = ref(false);

const props = defineProps({
    id: { type: Number, default: null },
    ticket: { type: Object, default: null },
});

const { data: ticket } = props.id
    ? await supportStore.getSupportTicket(props.id)
    : { data: ref(props.ticket) };

const closeSupportTicket = async () => {
    if (loading.value) return;
    if (!ticket.value.is_manager) return;
    if (!confirm("Вы действительно хотите закрыть запрос?")) return;
    loading.value = true;
    supportStore.closeSupportTicket(ticket.value.id)
    .then((response) => {
       ticket.value = response.data;
    })
    .finally(() => {
        loading.value = false;
    });
};

channelsStore.private('supportTicket.' + ticket.value.id)
.listen("SupportTicketUpdate", (event) => {
    ticket.value = {
        ...ticket.value,
        ...event.data
    };
});

</script>

<style lang="scss">

.support-show {
  font-size: 1rem;

  &__actions {
    font-size: 1.4em;
    padding-block: 1em;

    &-btn {
      padding: 0 1em;
    }
  }

  &__header {
    font-size: 1.6em;
    display: flex;
    flex-wrap: wrap;
    column-gap: 1em;
    padding-block: 1em;
    border-top: 1px solid var(--border-color-secondary);
    border-bottom: 1px solid var(--border-color-secondary);
  }

  &__header-col {
    display: flex;
    flex-direction: column;
    row-gap: 1em;
    flex: 1;
  }

  &__header-item {
    display: flex;
  }

  &__header-label {
    flex: 0 1 30%;
    text-align: right;
  }
  &__header-value {
    margin-left: 1em;
  }

  &__chat {
    position: relative;
    height: 70em;

    .dialog__body {
      font-size: 1.2em;
    }
  }
}


</style>

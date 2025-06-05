<template>
  <div class="user-activity-status">
    <div
      class="user-activity-status__icon"
      :class="{ 'user-activity-status__icon_type_active': isOnline }"></div>
    <span class="user-activity-status__text" v-if="isOnline"
      >Сейчас онлайн</span
    >
    <span class="user-activity-status__text" v-else-if="isToday"
      >Был(а) в сети сегодня в {{ lastSeenTime }}</span
    >
    <span class="user-activity-status__text" v-else
      >Был(а) в сети {{ lastSeenDate }}</span
    >
  </div>
</template>

<script setup>
  const props = defineProps({
    lastActivity: {
      type: String,
      default: "",
    },
  });

  const now = new Date();

  // Преобразуем время из UTC в локальное время пользователя
  const convertToLocalTime = (dateString) => {
    if(!dateString) return ''
    // Создаем дату из UTC строки
    const utcDate = new Date(dateString);
    
    // Получаем смещение часового пояса пользователя в минутах
    const userTimezoneOffset = new Date().getTimezoneOffset();
    
    // Корректируем время на смещение часового пояса пользователя
    return new Date(utcDate.getTime() - (userTimezoneOffset * 60 * 1000));
  };

  const lastSeen = computed(() => convertToLocalTime(props.lastActivity));

  const isOnline = computed(() => {
    if(!lastSeen.value) return false
    const diffInMinutes = (now - lastSeen.value) / (1000 * 60);
    return diffInMinutes < 5; // онлайн, если активность была менее 5 минут назад
  });

  const isToday = computed(() => {
    if(!lastSeen.value) return false
    return lastSeen.value.toDateString() === now.toDateString();
  });

  const lastSeenTime = computed(() => {
    if(!lastSeen.value) return ''
    return lastSeen.value.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  });

  const lastSeenDate = computed(() => {
    if(!lastSeen.value) return ''
    return lastSeen.value.toLocaleDateString([], {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  });
</script>

<style lang="scss">
  .user-activity-status {
    font-size: 1rem;
    display: inline-flex;
    align-items: center;
    gap: 0.8em;
    color: #868695;

    &__icon {
      width: 1.6em;
      height: 1.6em;
      border-radius: 100%;
      background: #c3c3c3;
      flex: 0 0 auto;

      &_type_active {
        background: #24a962;
      }
    }

    &__text {
      font-size: 1.4em;
      line-height: 1em;
      font-weight: 500;
    }

    @include tablet {
      font-size: 0.8rem;
    }
  }
</style>

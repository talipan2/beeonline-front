<template>
  <div class="user-activity-status">
    <div class="user-activity-status__icon" :class="{'user-activity-status__icon_type_active': isOnline}"></div>
    <span class="user-activity-status__text" v-if="isOnline">Сейчас онлайн</span>
    <span class="user-activity-status__text" v-else-if="isToday">Был(а) в сети сегодня в {{ lastSeenTime }}</span>
    <span class="user-activity-status__text" v-else>Был(а) в сети {{ lastSeenDate }}</span>
  </div>
</template>

<script setup>

const props = defineProps({
  lastActivity: {
    type: String,
    required: true,
    default: ''
  }
});

const now = new Date();
const lastSeen = new Date(props.lastActivity);

const isOnline = computed(() => {
  const diffInMinutes = (now - lastSeen) / (1000 * 60);
  return diffInMinutes < 5; // онлайн, если активность была менее 5 минут назад
});

const isToday = computed(() => {
  return lastSeen.toDateString() === now.toDateString();
});

const lastSeenTime = computed(() => {
  return lastSeen.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
});

const lastSeenDate = computed(() => {
  return lastSeen.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' });
});
</script>

<style lang="scss">
.user-activity-status {
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  gap: .8em;
  color: #868695;

  &__icon {
    width: 1.6em;
    height: 1.6em;
    border-radius: 100%;
    background: #c3c3c3;

    &_type_active {
      background: #24a962;
    }
  } 

  &__text {
    font-size: 1.6em;
    line-height: .75em;
    font-weight: 500;
  }

  @include tablet {
    font-size: .8rem;
  }
}


</style>
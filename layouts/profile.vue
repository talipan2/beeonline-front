<template>
  <section class="profile container" :class="className">
    <slot name="header" />
    <h1 class="profile__title">{{ title }}</h1>
    <div class="profile__container" :class="{ 'profile__container_type_second': !$slots.rightSide }">
      <div class="profile__left">
        <ProfileSidebar class="sticky" ref="leftSide" :role="role" />
      </div>
      <div class="profile__content" :class="{ 'profile__content_type_full': !$slots.rightSide }">
        <slot name="content"/> 
      </div>
      <div class="profile__right" v-if="$slots.rightSide">
        <div ref="rightSide" class="sticky">
          <slot name="rightSide"  />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';
import { useUserStore } from '~/store/userStore';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  className: {
    type: String,
    default: '',
  }
});

const userStore = useUserStore();
const role = computed(() => userStore.role);

const leftSide = ref(null);
const rightSide = ref(null);
const settingStore = useSettingStore();

const onScrollPage = () => {
  if (leftSide.value) {
    leftSide.value.$el.style.top = `${settingStore.headerHeight + 30}px`;
    if (rightSide.value) {
      rightSide.value.style.top = `${settingStore.headerHeight + 30}px`;
    }
  } else {
    console.log('Element not found');
  }
}

onMounted(() => {
  onScrollPage();
  window.addEventListener("scroll", onScrollPage)
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScrollPage)
});

</script>

<style lang="scss">

.profile {
  &__container {
    display: flex;
    column-gap: 10em;
    margin-bottom: 10em;
  }

  &__container_type_second {
    column-gap: 3em;
  }

  &__title {
    font-size: 3.2em;
    margin: 1.25em 0 0.78em;
  }

  &__left {
    flex: 0 0 17%;
    // border: 1px solid red;
  }

  &__content {
    flex: 1 1 33%;
    // border: 1px solid red;
  }

  &__content_type_full {
    flex: 1 1 74%;
  }

  &__right {
    flex: 0 0 33%;
    // border: 1px solid red;
  }
}

.entity-edit {
  
  .profile__content {
    flex: 0 1 50%;
  }
}

.notifications-layout {

  .profile__container {
    column-gap: 3em;
  }

  .profile__content {
    flex: 1 1 50%;
  }

  .profile__right {
    flex: 0 0 26%;
  }
}

.reviews-layout {

  .profile__container {
    column-gap: 3em;
  }

  .profile__content {
    flex: 1 1 50%;
  }

  .profile__right {
    flex: 0 0 30%;
  }
}

.news-layout {
  .profile__content {
    flex: 0 1 50%;
  }
}

.document-layout {
  .profile__container {
    column-gap: 15em;
  }

  .profile__content {
    flex: 0 1 33%;
  }
}


</style>
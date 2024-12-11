<template>
  <section class="create-entity container">
    <div class="create-entity__container">
      <div class="create-entity__left">
        <div class="create-entity__left-wrapper sticky" ref="leftSide">
          <slot  name="left"/>
        </div>
      </div>
      <div class="create-entity__content">
        <slot name="content"/> 
      </div>
      <div class="create-entity__right sticky">
        <div class="create-entity__right-wrapper sticky" ref="rightSide">
          <slot name="right"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';


const props = defineProps({

})

const settingStore = useSettingStore();
const leftSide = ref(null);
const rightSide = ref(null);

const onScrollPage = () => {
  if (rightSide.value) {
    rightSide.value.style.top = `${settingStore.headerHeight + 70}px`;
    leftSide.value.style.top = `${settingStore.headerHeight + 70}px`;
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

.create-entity {
  font-size: 1rem;
  padding-block: 10em;

  &__container {
    display: flex;
    column-gap: 10em;
  }

  &__left {
    flex: 0 1 17%;
  }

  &__content {
    flex: 1 1 33%;
  }

  &__right {
    flex: 0 1 33%;
  }

  @include tablet {
    &__left {
      display: none;
    }

    &__container {
      max-width: var(--desktop-content-width);
      margin-inline: auto;
    }

    &__content {
      flex-basis: 60%;
    }

    &__right {
      flex-basis: 40%;
    }
  }

  @include mobile {
    padding-block: 3.5rem 10rem;

    &__container {
      max-width: var(--mobile-content-width);
      flex-direction: column;
      row-gap: 2rem;
    }
  }
}



</style>


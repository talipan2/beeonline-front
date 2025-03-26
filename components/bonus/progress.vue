<template>
  <div
    class="card bonus-progress"
    :class="{
      'bonus-progress_loading': loading,
    }"
  >
    <div class="bonus-progress__content bonus-progress__content_center">
      <template v-if="level">
        <BonusIcon class="bonus-progress__image" :src="level.image"/>
        <div class="bonus-progress__title">{{ level.name }}</div>
      </template>
      <div @click="handleOpenLevelModal" class="bonus-progress__level">
        Уровень {{ levelNumber }}
      </div>
    </div>

    <div class="bonus-progress__content">
      <div class="bonus-progress__block">
        <div class="bonus-progress__text">
          <div class="bonus-progress__value">Прогресс уровня</div>
          <div class="bonus-progress__value">{{ levelProgress }}%</div>
        </div>
        <div class="bonus-progress__line">
          <div
            class="bonus-progress__line-complete"
            :style="{
              width: levelProgress + '%',
            }"
          ></div>
        </div>
      </div>

      <div class="bonus-progress__block bonus-progress__block_center">
        <SvgoCount class="bonus-progress__achievements-icon"/>
        <div class="bonus-progress__achievements-count">
          {{ achievementsOrgCount }}/{{ achievementsAllCount }}
        </div>
        <div class="bonus-progress__achievements-text">Достижения</div>
      </div>
    </div>

    <a
      href="javascript:;"
      class="bonus-progress__btn btn btn-block btn-pink"
      @click="settingStore.bonusInfoModal = true"
      ><span>Как получить уровень?</span></a
    >

    <BonusLevelsModal :levelGroups="levelGroups" :level="level" :levelNumber="levelNumber" :levelProgress="levelProgress"/>
    <BonusInfoModal />
  </div>

</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';


const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  levelGroups: {
    type: Array,
    default: () => ([]),
  },
  level: {
    type: Object,
    default: () => ({}),
  },
  levelNumber: {
    type: Number,
    default: null,
  },
  levelProgress: {
    type: Number,
    default: null,
  },
  achievementsOrgCount: {
    type: Number,
    default: null,
  },
  achievementsAllCount: {
    type: Number,
    default: null,
  },
})

const settingStore = useSettingStore();

const handleOpenLevelModal = () => {
  settingStore.bonusLevelModal = true;
}

</script>

<style lang="scss">
.bonus-how {
  font-size: 1rem;
  text-align: center;
  margin-top: 4em;

  &__image {
    font-size: 7.2em;
    width: 1em;
  }
}

.bonus-progress {
  text-align: center;
  gap: 2.4em;
  margin-bottom: 0;

  &_loading {
    pointer-events: none;
    opacity: 0.6;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 1.6em;

    &_center {
      align-items: center;
    }
  }

  & &__image {
    font-size: 1em;
  }

  &__title {
    font-size: 2em;
    line-height: 1.3;
    font-weight: 600;
  }

  &__level {
    cursor: pointer;
    font-size: 1.4em;
    line-height: 1.4;
    font-weight: 500;
    padding: 0.3em 1em;
    color: rgba(255, 255, 255, 0.8);
    border-radius: 2em;
    background: rgb(232, 63, 170);
    background: linear-gradient(
      110deg,
      rgba(232, 63, 170, 1) 0%,
      rgba(97, 57, 241, 1) 100%
    );
    transform: scale(1);
    transition: transform 0.2s ease-in-out;

    &:hover {
      transform: scale(1.2);
    }
  }

  &__block {
    background-color: #f1f3f9;
    border-radius: 1.2em;
    padding: 1.4em 1.6em;
    display: flex;
    flex-direction: column;
    gap: 1.2em;

    &_center {
      align-items: center;
    }
  }

  &__text {
    font-size: 1.2em;
    line-height: 1.2;
    font-weight: 700;
    display: flex;
    justify-content: space-between;
  }

  &__line {
    position: relative;
    width: 100%;
    font-size: 0.6em;
    height: 1em;
    border-radius: 1em;
    background-color: #fff;
    overflow: hidden;

    &-complete {
      position: absolute;
      background-color: var(--primary-color);
      border-radius: 1em;
      height: 100%;
      left: 0;
      top: 0;
    }
  }

  &__achievements {
    &-icon {
      width: 3em;
      height: 3em;
    }

    &-count {
      font-size: 2em;
      line-height: 1;
      font-weight: 700;
      color: var(--primary-color);
    }

    &-text {
      font-size: 1.4em;
      line-height: 1;
      font-weight: 700;
    }
  }

  &__btn {
    font-size: 1em;
    color: var(--primary-color);
    border-radius: 1.2em;
    height: 4.8em;
    text-transform: none;
    background-color: #f1e7f7;
    border-color: #f1e7f7;

    &:hover {
      background-color: #e0caed;
      border-color: #e0caed;
      color: var(--text-color-primary);
    }

    span {
      font-size: 1.4em;
      font-weight: 600;
    }
  }
}

.bonus-progress-modal {
  display: flex;
  gap: 2.4em;
  margin-top: 2.4em;

  @include mobile {
      flex-direction: column;
  }

  &__level {
    flex: 1 1 35%;
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 0.9em;
    padding: 0.8em 1.4em;

    &-image {
      flex: 0 0 auto;
      font-size: 0.48em;
    }

    &-title {
      font-size: 1.4em;
      line-height: 1.4;
      white-space: nowrap;
    }

    &-name {
      font-size: 1.4em;
      line-height: 1.4;
      font-weight: 700;
      white-space: nowrap;
    }
  }

  &__progress {
    flex: 1 1 100%;
  }
}

.levels {
  font-size: 1em;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1.6em;

  &__level {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.8em;
    padding: 2.4em;
    border-radius: 1.2em;
    opacity: 0.5;
    box-shadow: 0 1px 2em 0 rgba(0, 0, 0, 0.04), inset 0 0 0 1px #f5f5f7;
    background-color: #fff;
    transition: opacity 0.2s ease-in-out;

    @include mobile {
        font-size: max(7px, 1.7vw);
    }

    &:hover {
      opacity: 1;
    }

    &.active {
      opacity: 1;
    }
  }

  &__image {
    margin-bottom: 1.6em;

    @include mobile {
        grid-template-columns: 1fr 1fr;
    }
  }

  &__name {
    font-size: 1.8em;
    line-height: 1.4;
    font-weight: 700;
  }

  &__num {
    font-size: 1.6em;
    line-height: 1.4;
  }

  @include tablet {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @include mobile {
    grid-template-columns: 1fr 1fr;
  }
}
</style>

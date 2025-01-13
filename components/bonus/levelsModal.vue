<template>
  <UiModal class="bonus-modal modal" v-model="settingStore.bonusLevelModal" title="" @confirm="() => confirm()" colClass="card">
    <template #content>
      <div class="card__container">
        <div class="card__content">
          <h2 class="card__title">Уровни</h2>
          <div class="bonus-progress-modal">
            <div class="bonus-progress-modal__level bonus-progress__block" v-if="level">
              <div class="bonus-progress-modal__level-image">
                <BonusIcon />
              </div>
              <div class="bonus-progress-modal__level-body">
                <div class="bonus-progress-modal__level-title">
                  Текущий уровень
                  {{ levelNumber }}
                </div>
                <div class="bonus-progress-modal__level-name">
                  {{ level.name }}
                </div>
              </div>
            </div>

            <div class="bonus-progress-modal__progress bonus-progress__block" v-if="level">
              <div class="bonus-progress__text">
                <div class="bonus-progress__value">
                  Прогресс уровня
                </div>
                <div class="bonus-progress__value">
                  {{ levelProgress }}%
                </div>
              </div>
              <div class="bonus-progress__line">
                <div class="bonus-progress__line-complete" :style="{
                  width: levelProgress + '%',
                }"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="card__content">
          <div class="tabs tabs_slim">
            <template v-for="(title, type) in filterTypes" :key="type">
              <div class="tabs__tab" :class="{
                active: filter.type === type,
              }" @click="filter.type = type">
                <span>{{ title }}</span>
              </div>
            </template>
          </div>
        </div>

        <div class="card__content card__content_scroll" 
          v-if="levelGroups && levelGroups.length" 
          ref="levelGroupsContent" 
          :style="contentHeight ? { height: contentHeight + 'px' } : {}"
        >
          <div class="levels">
            <template v-for="(level, index) in levelGroups" :key="index">
              <div :class="{ levels__level: true, active: levelNumber >= level.from_level, }"
                v-if="filter.type === 'all' || levelNumber >= level.from_level">
                <BonusIcon class="levels__image" />
                <div class="levels__name">
                  {{ level.name }}
                </div>
                <div class="levels__num">
                  Уровень {{ level.from_level }}
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </template>
  </UiModal>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';

const props = defineProps({
  level: {
    type: Object,
    default: null,
  },
  levelNumber: {
    type: Number,
    default: 0,
  },
  levelProgress: {
    type: Number,
    default: 0,
  },
  levelGroups: {
    type: Array,
    default: [],
  }
})
const settingStore = useSettingStore();

const filter = ref({type: 'all'});
const filterTypes = {
  all: "Все",
  completed: "Полученные",
}

const contentHeight = ref(0);
const levelGroupsContent = ref(null);

const confirm = () => {
  settingStore.bonusLevelModal = false;
};

watch(() => levelGroupsContent.value, (newVal) => {
  if(filter.value.type === 'all' && settingStore.bonusLevelModal) {
    contentHeight.value = newVal.offsetHeight;
  }
}, {deep: true})

</script>

<style lang="scss">

.bonus-modal {
  .modal-dialog {
    box-shadow: none;
    width: 55%;
  }

  .card__container {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  .modal-close {
    font-size: 1rem;
    right: 2em;
    top: 2em;
    border-radius: 100%;
    background-color: #f1f3f9;
    padding: .8em;
    svg {
      width: 2em;
      height: 2em;
    }

    &:hover {
      background-color: #d6dcee;}
  }

  @include mobile {
    .modal-dialog {
      width: 80%;
    }
  }
}

</style>
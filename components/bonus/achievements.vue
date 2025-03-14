<template>
  <div class="card" :class="{
    card_loading: loading,
  }">
    <div class="card__content">
      <h2 class="card__title">Достижения</h2>
      <div class="card__subtitle">
        Соберите всю коллекцию достижений и продемонстрируйте свой
        профессионализм!
      </div>

      <div class="tabs tabs_slim">
        <template v-for="(item, index) in filterTypes" :key="index">
          <div class="tabs__tab"
            :class="{active: filter.type === item.type,}"
            @click="changeFilter('type', item.type)">
            <span>{{ item.title }}</span>
          </div>
        </template>
      </div>
    </div>
    <div class="card__content" v-if="bonuses.length">
      <div class="bonus-achievement-types">
        <template v-for="(bonus, index) in bonuses" :key="index">
          <UiButton
            type="button"
            class="bonus-btn"
            variant="secondary"
            size="small"
            @click="changeFilter('bonus', bonus.id)"
            :class="{active: filter.bonus === bonus.id}"
          >
            {{ bonus.name }}
          </UiButton>
        </template>
      </div>
    </div>

    <div class="card__content">
      <div class="achievements">
        <template v-for="(achievement, index) in achievements" :key="index">
          <BonusAchievement :achievement="achievement" :bonuses="bonuses" />
        </template>
        <div class="achievements__alert alert alert-primary" v-if="!loading && !achievements.length">Достижений нет
        </div>
        <div class="achievements__more" v-if="filter.page < lastPage">
          <UiButton type="button" variant="quinary" class="bonus-more-btn" size="large" @click="loadMore">Загрузить еще</UiButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBonusStore } from '~/store/bonusStore';

const props = defineProps({
  organizationId: {
    type: Number,
    default: null,
  },
})

const bonusStore = useBonusStore();
const loading = ref(false);
const filter = ref({
  type: 'all',
  bonus: null,
  page: 1,
})

const achievements = ref([]);
const bonuses = ref([]);
const lastPage = ref(1);

const filterTypes = [
  {id: 1, title: 'Все', type: 'all'},
  {id: 2, title: 'Полученные', type: 'completed'},
]

const changeFilter = (type, value) => {
  filter.value[type] = value;
  if(type === 'type') {
    filter.value.bonus = null;
  }
}

// получение списка бонусов
const getBonuses = (organizationId, filterType) => {
  loading.value = true;
  bonusStore.getBonuses(organizationId, filterType)
    .then(res => {
      if(res) {
        bonuses.value = res;
      }
    })
    .finally(() => loading.value = false);
}

// Получение ачивок
const getAchievements = (organizationId, filterList) => {
  loading.value = true;
  bonusStore.getAchievements(organizationId, filterList)
    .then(res => {
      if(res.meta.current_page === 1) {
        achievements.value = res.data;
      } else if (res.meta.current_page > 1) {
        achievements.value = [...achievements.value, ...res.data];
      }
      lastPage.value = res.meta.last_page;
      filter.value.page = res.meta.current_page
    })
    .finally(() => loading.value = false);
}

function loadMore() {
  filter.value.page += 1;
  getAchievements(props.organizationId, filter.value);
}

// получение бонусов по типу
watch(() => filter.value.type, (newVal) => {
  getBonuses(props.organizationId, { type: newVal });
}, {deep: true})

// получение ачивок по фильтрам типа ачивок и типа бонусов
watch(() => [filter.value.bonus, filter.value.type], (newVal) => {
  getAchievements(props.organizationId, { bonus: filter.value.bonus, type: filter.value.type });
}, {deep: true})

onMounted(() => {
  loading.value = true;
  if(props.organizationId) {
    getBonuses(props.organizationId);
    getAchievements(props.organizationId, filter.value);
  }
})


</script>

<style lang="scss">
.bonus-achievement-types {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.bonus-btn.active {
  background-color: #cdd4ea;
  border-color: #cdd4ea;
  color: #212529;
}

.achievements {
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.6em;

  &__alert {
    font-size: 1.4rem;
  }

  &__more {
    text-align: center;
    margin-top: 1em;
    font-size: 1.6em;
    display: flex;
    justify-content: center;
  }
}

.achievement {
  position: relative;
  font-size: 1rem;
  font-family: "fira-sans", sans-serif;
  display: flex;
  gap: 2.4em;
  flex-direction: column;

  background-color: #fff;
  border-radius: 1.2em;
  padding: 2.4em;
  border: 1px solid #f3f4f9;
  box-shadow: 0 1px 2em 0 rgba(0, 0, 0, 0.04);

  &__content {
    position: relative;
    display: flex;
    gap: 2.4em;
  }

  & &__image {
    font-size: 1em;
  }

  &__info {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.8em;
  }

  &__title {
    font-size: 1.8em;
    line-height: 1.4;
    font-weight: 600;
  }

  &__description {
    font-size: 1.6em;
    line-height: 1.5;
  }

  &__action {
    position: absolute;
    top: -0.8em;
    right: 0;
  }

  &__action-mobile {
    display: none;
  }

  &__completed {
    position: absolute;
    top: 0;
    right: 0;
    width: 2.8em;
    height: 2.8em;
    background: transparent no-repeat center/cover;
    border-radius: 3em;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28' fill='none'%3E%3Ccircle cx='14' cy='14' r='14' fill='%2354c18b'/%3E%3Cpath d='M8 13l4.5 4.5 8-8' stroke='%23fff' stroke-width='2'/%3E%3C/svg%3E");
  }

  &__progress {
    display: flex;
    flex-direction: column;
    gap: 0.8em;

    &-line {
      position: relative;
      width: 100%;
      font-size: 0.6em;
      height: 1em;
      border-radius: 1em;
      background-color: #f1f3f9;
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

    &-text {
      display: flex;
      font-family: "lato", sans-serif;
      justify-content: space-between;
      font-size: 12px;
      line-height: 1.2;
      font-weight: 700;
    }

    &-value {
      color: #2a1947;
    }

    &-complete {
      color: #747087;
      text-align: right;
    }

  }

  @include mobile {
    font-size: .8rem;

    & &__image {
      font-size: 5.6px;
    }
  }
}

@media screen and (max-width: 991px) {
  .achievement {
    &__action {
      display: none;
    }

    &__action-mobile {
      display: block;
      width: fit-content;
      font-size: 1.2rem;
      a {
        color: var(--text-color-primary);
        font-weight: 400;
      }
    }
  }
}
</style>

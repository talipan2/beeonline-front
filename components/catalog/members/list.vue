<template>
  <div class="members" 
    :class="{ 
      'members_type_grid': currentViewSetting === 'grid',
      'members_type_list': currentViewSetting === 'list', 
      'members_type_map': currentViewSetting === 'map'
    }"
  >
    <div class="members__header">
      <div class="members__sort">
        <div class="members__sort-title" v-if="currentViewSetting === 'grid' || currentViewSetting === 'list'">Сортировать:</div>
        <UiNewDropdown
          :arrow="false"
          :placement="'bottom-start'"
          :offset="[0, 0]"
          ref="sortDropdown"
          v-if="currentViewSetting === 'grid' || currentViewSetting === 'list'"
        >
          <button class="members__sort-btn">
            {{ currentSortList.value }}
            <SvgoDropDown class="svg-m" />
          </button>
          <template #content>
            <div class="dropdown__container">
              <button
                @click="changeSortList(item.id)"
                class="dropdown__item"
                v-for="item in sortList"
                :key="item.id"
              >
                {{ item.name }}
              </button>
            </div>
          </template>
        </UiNewDropdown>
      </div>
      <div class="members__count">
        <p class="members__count-text">{{ currentListLength + ' ' + plural(currentListLength, { one: 'компания', few: 'компании', many: 'компаний'}) }} из {{ 546 }}</p>
      </div>
      <div class="members__view-setting">
        <UiButton
          type="button"
          @click="changeViewSetting('grid')"
          variant="tertiary"
          size="around"
          class="members__view-btn"
          :class="{
            'members__view-btn_type_active': currentViewSetting === 'grid',
          }"
        >
          <SvgoViewGrid class="svg-m" />
        </UiButton>
        <UiButton
          type="button"
          @click="changeViewSetting('list')"
          variant="tertiary"
          size="around"
          class="members__view-btn"
          :class="{
            'members__view-btn_type_active': currentViewSetting === 'list',
          }"
        >
          <SvgoList class="svg-m" />
        </UiButton>
        <UiButton
          type="button"
          @click="changeViewSetting('map')"
          variant="tertiary"
          size="around"
          class="members__view-btn"
          :class="{
            'members__view-btn_type_active': currentViewSetting === 'map',
          }"
        >
          <SvgoMap class="svg-m" />
        </UiButton>
      </div>
    </div>

    <!-- grid -->
    <CatalogMembersListDefault v-if="currentViewSetting === 'grid'" :data="data"/>

    <!-- list -->
    <div class="members__list" v-if="currentViewSetting === 'list'">
      <div class="members__item" v-for="(item, index) in data" :key="index">
        <CatalogMembersListCard :data="item" />
      </div>
    </div>

    <!-- map -->
    <div class="members__list" v-if="currentViewSetting === 'map'">
      <CatalogMembersMap class="members__map" v-model="currentPubCard"/>
      <div class="members__card" ref="membersCard">
        <CardsPublic :is-props-visible="true" :is-description="true" v-if="currentPubCard !== null" :isList="true"/>
        <p class="members__card-title" v-else>Выберите точку на карте</p>
      </div>
    </div>

    <CommonPagination v-if="isPagination"/>
  </div>



</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  isPagination: {
    type: Boolean,
    default: false
  }
});

const settingStore = useSettingStore();
const router = useRouter();
const sortDropdown = ref(null);
const currentViewSetting = ref(null);
const currentPubCard = ref(null);
const currentListLength = computed(() => [props.data].length);
const membersCard = ref(null);

const currentSortList = ref({
  id: 1,
  name: "По просмотрам",
  value: "по просмотрам",
});

const sortList = [
  { id: 1, name: "По просмотрам", value: "по просмотрам" },
  { id: 2, name: "По количеству услуг", value: "по количеству услуг" },
  { id: 3, name: "По рейтингу", value: "по рейтингу" },
];

const changeViewSetting = (item) => {
  switch (item) {
    case "grid":
      currentViewSetting.value = "grid";
      router.replace({ query: { view: "grid" } });
      break;
    case "list":
      currentViewSetting.value = "list";
      router.replace({ query: { view: "list" } });

      break;
    case "map":
      currentViewSetting.value = "map";
      router.replace({ query: { view: "map" } });

      break;
  }
};

const changeSortList = (item) => {
  switch (item) {
    case 1:
      currentSortList.value = {
        id: 1,
        name: "По просмотрам",
        value: "по просмотрам",
      };
      break;
    case 2:
      currentSortList.value = {
        id: 2,
        name: "По количеству услуг",
        value: "по количеству услуг",
      };
      break;
    case 3:
      currentSortList.value = {
        id: 3,
        name: "По Рейтингу",
        value: "по рейтингу",
      };
      break;
    default:
      currentSortList.value = {
        id: 1,
        name: "По просмотрам",
        value: "по просмотрам",
      };
      break;
  }
  sortDropdown.value.tippy.hide();
};

watch(() => currentPubCard.value, (newVal) => {
  if (newVal !== null && window.innerWidth < 887) {
    const rect = membersCard.value.getBoundingClientRect(); 
    const offset = window.scrollY + rect.top - settingStore.headerHeight - (window.innerHeight / 2);
    smoothScroll(offset);
  }
})

onMounted(() => {
  if (router.currentRoute.value.query.view) {
    switch (router.currentRoute.value.query.view) {
      case "grid":
        currentViewSetting.value = "grid";
        break;
      case "list":
        currentViewSetting.value = "list";
        break;
      case "map":
        currentViewSetting.value = "map";
        break;
    }
  } else {
    currentViewSetting.value = "grid";
  }
})



</script>

<style lang="scss">


.members {
  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 3rem;
    justify-content: space-between;
  }

  &__item {
    flex: 0 1 48%;
  }

  &__header {
    display: flex;
    align-items: center;
    column-gap: 3em;
    padding-bottom: 1.5em;
  }

  &__count {
    flex: 0 1 auto;
    font-size: 1.6em;
  }

  &__view-setting {
    flex: 0 1 auto;
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
  }

  &__view-btn {
    svg {
      width: 2em;
      height: 2em;
      fill: var(--text-color-ternary);
    }
  }

  &__view-btn_type_active {
    background-color: var(--button-background-primary);
    svg {
      fill: var(--text-color-octonary);
    }
  }

  &__sort {
    flex: 1 0 auto;
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
    font-size: 1.6em;
  }

  &__sort-btn {
    color: var(--text-color-primary);
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
  }

  &__card-title {
    font-size: 1.6em;
  }

  @include mobile {
    &__item {
      flex: 0 1 100%;
    }
  }

}

.members_type_grid {
  .members__header {
    padding-bottom: 3.5em;
    margin-bottom: 5em;
    border-bottom: 1px solid var(--border-color-secondary);
  }

  .members__item {
    display: flex;
    flex-direction: column;
  }
}

.members_type_list .members__list {
  flex-direction: column;
  row-gap: 0;

  .members__item {
    border-bottom: 1px solid var(--border-color-secondary);
  }

  .members__item:first-child {
    border-top: 1px solid var(--border-color-secondary);

  }
}

.members_type_map {

  .members__list {
    display: flex;

    .members__map {
      flex: 0 1 61%;
      max-width: 61%;
    }
    .members__card {
      flex: 0 1 36%;
    }
  }

  .members__header {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 1.5em;
    justify-content: end;
  }
}

.members_type_list .members__header {
  border: none;
  margin-bottom: 1.5em;
  padding-bottom: 0;
}

@include tablet {
  .members {
    &__list {
      gap: 2rem;
    }
  }
}

@include mobile {
  .members {

    &__header {
      flex-wrap: wrap;
      row-gap: 1em;
    }

    &_type_grid &__header {
      column-gap: 1.5rem;
      padding-bottom: 3rem;
      margin-bottom: 4rem;
    }

    &__sort-title {
      font-size: 1.4rem;
    }

    &__sort-btn {
      font-size: 1.4rem;
    }

    [data-tippy-root] {
      min-width: 23rem;
    }

    .dropdown__item {
      font-size: 1.2rem;
    }

    &__count-text {
      font-size: 1.4rem;
    }

    &__view-btn {
      padding: .5rem;
    }

    &__map {
      flex: 1 1 100%;
      max-width: 100%;
    }
  }

  .members_type_map {
    .members__list {
      .members__map {
        flex: 1 1 100%;
        max-width: 100%;
        height: 514px;
      }
      .members__card {
        flex: 1 1 100%;
      }
    }
  }
}

</style>

<template>
  <div class="members" :class="{ 'members_type_list': currentViewSetting === 'list', 'members_type_map': currentViewSetting === 'map'}">
    <div class="members__header">
      <div class="members__sort">
        <div class="members__sort-title">Сортировать:</div>
        <UiNewDropdown
          :arrow="false"
          :placement="'bottom-start'"
          :offset="[0, 0]"
          ref="sortDropdown"
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
        <p class="members__count-text">{{ 10 }} компаний из {{ 546 }}</p>
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
    <div class="members__list" v-if="currentViewSetting === 'grid'">
      <div class="members__item" v-for="item in 2" :key="item">
        <CardsPublic :is-props-visible="true" :is-description="true" />
      </div>
    </div>

    <!-- list -->
    <div class="members__list" v-if="currentViewSetting === 'list'">
      <div class="members__item" v-for="item in 2" :key="item">
        <CatalogMembersListCard />
      </div>
    </div>

    <CommonPagination />
  </div>



</template>

<script setup>
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

const sortDropdown = ref(null);
const currentViewSetting = ref("grid");

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
      break;
    case "list":
      currentViewSetting.value = "list";
      break;
    case "map":
      currentViewSetting.value = "map";
      break;
    default:
      currentViewSetting.value = "grid";
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
</script>

<style lang="scss">


.members {
  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 3rem;
  }

  &__item {
    flex: 0 1 48%;
  }

  &__header {
    display: flex;
    align-items: center;
    column-gap: 3em;
    padding-bottom: 3.5em;
    border-bottom: 1px solid var(--border-color-secondary);
    margin-bottom: 5em;
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



.members_type_list .members__header {
  border: none;
  margin-bottom: 1.5em;
  padding-bottom: 0;
}
</style>

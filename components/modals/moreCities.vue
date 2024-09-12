<template>
  <UiNewDropdown>
    <a class="register__check-company-more link" ref="moreCities" href="javascript:;">
      {{ list.length > 1
        ? '+ еще&nbsp;' + (list.length - 1)
        : ''
      }}
    </a>
    <template #content>
      <div class="cities">
        <h4 class="cities__title">{{ title }}</h4>
        <ul class="cities__list">
          <li class="cities__item" v-for="item in list.slice(1)" :key="item.id">
            <!-- {{ city.city }}, {{ city.region }}, {{ city.country }} -->
            {{ item }}
          </li>
        </ul>
      </div>
    </template>
  </UiNewDropdown>
</template>

<script setup>
import { useOrganizationStore } from '~/store/organizationStore';


const props = defineProps({
  placement: {
    type: String,
    default: 'top',
  },
  title: {
    type: String,
    default: 'Регионы',
  },
  list: {
    type: Object,
    default: () => [],
  }
});

const organizationStore = useOrganizationStore();

</script>

<style lang="scss">

.cities {
  padding: 2.4rem;

  &__check-company-more {
    white-space: nowrap;
  }

  &__title {
    font-size: 1.8rem;
    padding-bottom: 1.2em;
    margin-bottom: 1.2em;
    border-bottom: 1px solid #e9ecef;
  }

  &__list {
    display: flex;
    flex-direction: column;
    row-gap: .72rem;
    padding-left: 2.8rem
  }

  &__item {
    font-size: 1.4rem;
  }
}

</style>

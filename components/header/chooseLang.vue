<template>
  <div class="choose-lang">
    <UiNewDropdown
      placement="bottom"
      :arrow="false"
      class="header__lang-dropdown"
      :offset="[0, 0]"
      translate="no"
    >
      <div>
        <button class="header__lang">
          <component
            :is="selectedOption.img"
            v-if="selectedOption.img"
            class="header__lang-icon"
          />
          {{ selectedOption.label }}
          <SvgoDropDownNew class="svg-s header__lang-dropdown-icon" />
        </button>
      </div>
      <template #content>
        <div class="header__lang-list">
          <button
            class="header__lang-item"
            :class="{'active': selectedOption.value === button.value}"
            v-for="(button, index) in dropdownOptions"
            :key="index"
            @click="handleChangeLang(button)"
            translate="no"
          >
            <component
              :is="button.img"
              v-if="button.img"
              class="header__lang-icon"
            />
            {{ button.label }}
          </button>
        </div>
      </template>
    </UiNewDropdown>
  </div>
</template>

<script setup>
import { useTranslateStore } from "~/store/translateStore";

const translateStore = useTranslateStore();

const dropdownOptions = computed(() => translateStore.options);
const selectedOption = computed(() => translateStore.getSelectedOption());

const handleChangeLang = (lang) => {
    translateStore.setLang(lang.value);
};

onMounted(() => {
    translateStore.initGoogleTranslate();
});

</script>

<style lang="scss">

.header__lang {
  align-items: center;
  display: flex;
  padding: 0.357em;
  background-color: inherit;
  border: none;
  font-size: 1em;
  font-weight: 500;
  color: var(--text-color-primary);
  column-gap: 0.285em;

  @include hover {
    color: var(--text-color-ternary);

    .header__lang-dropdown {
      path {
        fill: var(--text-color-ternary);
      }
    }
  }
}

.choose-lang {
  min-width: 61px;
  position: relative;
  [data-tippy-root] {
    min-width: auto;
    max-width: auto;
    width: 100%;
  }
}

.header__lang-icon {
  background-color: #fff;
  border-radius: 1.07em;
  box-shadow: 0 0 0 2px #fff;
  height: 1.07em;
  min-width: 1.07em;
  width: 1.07em;
}

.header__lang-item {
  border: none;
  width: 100%;
  font-size: 1em;
  display: flex;
  align-items: center;
  column-gap: 0.5em;
  padding-inline: 0.7em;
  padding-block: 0.357em;
  background-color: inherit;

  svg {
    background-color: #fff;
    border-radius: 1.07em;
    box-shadow: 0 0 0 2px #fff;
    height: auto;
    min-width: 1.07em;
    width: 1.07em;
  }

  @include hover {
    background-color: var(--button-background-tertiary-hover);
  }
}

.header__lang-item.active {
  background-color: var(--button-background-primary);
  color: var(--text-color-octonary);
}

@include mobile {
  .header__lang {
    font-size: 1.4em;
    column-gap: 0.285em;
    color: var(--text-color-octonary);
  }

  .header__lang-dropdown-icon {
    path {
      fill: var(--text-color-octonary);
    }
  }

  .header__lang-item {
    font-size: 1.4em;
    column-gap: 0.285em;
  }
}
</style>

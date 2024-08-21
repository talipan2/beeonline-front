<template>
  <UiDropDown :options="dropdownOptions" v-model="selectedOption">
    <template #trigger>
      <button class="header__lang">
        <component :is="selectedOptionChosen.img" v-if="selectedOptionChosen.img" class="header__lang-icon" />
        {{ selectedOptionChosen.label }}
        <SvgoDropDownNew class="svg-s header__lang-dropdown"/>
      </button>
    </template>
    <template #default="{ item }">
      <button class="header__lang-item">
        <component :is="item.img" v-if="item.img" />
        {{ item.label }}
      </button>
    </template>
  </UiDropDown>
</template>

<script setup>
import SvgoRuIcon from '~/assets/svg/ru-icon.svg';
import SvgoEnIcon from '~/assets/svg/en-icon.svg';
import SvgoDeIcon from '~/assets/svg/de-icon.svg';
import SvgoItIcon from '~/assets/svg/it-icon.svg';

const dropdownOptions = [
  { label: 'RU', value: 'RU', img: SvgoRuIcon},
  { label: 'EN', value: 'EN', img: SvgoEnIcon},
  { label: 'DE', value: 'DE', img: SvgoDeIcon},
  { label: 'IT', value: 'IT', img: SvgoItIcon},
];

const selectedOption = ref(dropdownOptions[0]);

const selectedOptionChosen = computed(() => {
  const selected = dropdownOptions.find(option => option.value === selectedOption.value);
  return selected ? selected : dropdownOptions[0];
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

.header__lang-icon {
  background-color: #fff;
  border-radius: 1.07em;
  box-shadow: 0 0 0 2px #fff;
  height: 1.07em;
  min-width: 1.07em;
  width: 1.07em;
}

.header__lang-dropdown {
  width: 0.571em;
  height: auto;
}

.header__lang-item {
  border: none;
  width: 100%;
  font-size: 1em;
  display: flex;
  align-items: center;
  column-gap: 0.28em;
  padding-inline: 0.642em;
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
}


@include mobile {
  .header__lang {
    font-size: 1.4em;
    column-gap: 0.285em;
    color: var(--text-color-octonary);
  }

  .header__lang-dropdown {
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
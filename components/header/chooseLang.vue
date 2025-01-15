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
import SvgoRuIcon from "~/assets/svg/ru-icon.svg";
import SvgoEnIcon from "~/assets/svg/en-icon.svg";
import SvgoDeIcon from "~/assets/svg/de-icon.svg";
import SvgoItIcon from "~/assets/svg/it-icon.svg";

const dropdownOptions = [
  { label: "RU", value: "ru", img: markRaw(SvgoRuIcon) },
  { label: "EN", value: "en", img: markRaw(SvgoEnIcon) },
  { label: "DE", value: "de", img: markRaw(SvgoDeIcon) },
  { label: "IT", value: "it", img: markRaw(SvgoItIcon) },
];

const selectedOption = ref(dropdownOptions[0]);

const handleChangeLang = (lang) => {
  selectedOption.value = dropdownOptions.find(
    (item) => item.value === lang.value
  );

  if (lang.value === config.langDefault) {
    clearTranslateCookies();
    location.reload();
  } else {
    clearTranslateCookies();
    setTranslateCookie(lang.value);
    location.reload();
    if(!document.querySelector('script[src*="translate.google.com"]')) {
      initGoogleTranslate();
    }
  }

};

const config = {
  lang: "ru",
  langDefault: "ru",
};

function setTranslateCookie(lang) {
  const cookieValue = `/${config.langDefault}/${lang}`;
  document.cookie = `googtrans=${cookieValue}; path=/; domain=${location.hostname};`;
  document.cookie = `googtrans2=${cookieValue}; path=/; domain=${location.hostname};`;
}

function clearTranslateCookies() {
  const cookieValue = `/${config.langDefault}/${config.lang}`;
  document.cookie = `googtrans=${cookieValue}; max-age=-1; path=/; domain=` + location.hostname;
  document.cookie = `googtrans2=${cookieValue}; max-age=-1; path=/; domain=` + location.hostname;
}

function initGoogleTranslate() {
  if (!document.querySelector('script[src*="translate.google.com"]')) {
    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateCallback";
    script.async = true;
    document.head.appendChild(script);
  }
}

window.googleTranslateCallback = function () {
  new google.translate.TranslateElement({
    pageLanguage: config.langDefault,
    includedLanguages: "ru,en,de,it",
  });
};

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

onMounted(() => {
  const cookie = getCookie("googtrans");
  if (cookie) {
    selectedOption.value = dropdownOptions.find((item) => item.value === cookie.split('/').pop());
    initGoogleTranslate();
  } 
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

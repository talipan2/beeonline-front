<template>
  <div class="file">
    <div class="file__list">
      <div class="divider" v-if="changed && dataList.length && divider || topDivider"></div>
      <div class="file__item" :class="{'add-divider': divider}" v-for="item in dataList" :key="item.id">
        <div class="file__data">
          <svg class="file__icon" :class="selectIconClass(item.type)" width="50" height="50" viewBox="0 0 50 50">
            <text x="13" y="33" :class="selectIconClass(item.type)">{{ item.type }}</text>
            <g>
              <path d="M13 23V6h17m0 0l7 7m-7-7v7h7m0 0v10M13 36v8h24v-8" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </g>
          </svg>
          <a class="file__name" :href="item.url" download>{{ item.name }}<span v-if="downloadText"
              class="file__download"><br />Скачать</span></a>
        </div>
        <button v-if="changed" class="file__remove link" type="button" @click="removeFile(item.id)"></button>
      </div>
      <div class="progress doc-new-attach__progress" v-if="settingStore.uploadLoading">
        <div class="progress-bar progress-bar-striped progress-bar-animated" :style="{
          // width: file.progress + '%',
          width: '100%',
        }"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';


const props = defineProps({
  dataList: {
    type: Array,
    default: () => [],
  },
  changed: {
    type: Boolean,
    default: false
  },
  divider: {
    type: Boolean,
    default: true,
  },
  topDivider: {
    type: Boolean,
    default: false
  },
  downloadText: {
    type: Boolean,
    default: false
  },
  variant: {
    type: String,
    validator: value => ['default', 'dark', 'light'].includes(value),
    default: 'default',
  }

})
const settingStore = useSettingStore();
const emit = defineEmits(['removeFile']);

function selectIconClass(type) {
  if (props.variant === 'default') {
    switch (type) {
      case 'jpg':
        return 'file__icon_jpg';
      case 'jpeg':
        return 'file__icon_jpeg';
      case 'bmp':
        return 'file__icon_bmp';
      case 'svg':
        return 'file__icon_svg';
      case 'png':
        return 'file__icon_png';
      case 'doc':
        return 'file__icon_doc';
      case 'docx':
        return 'file__icon_docx';
      case 'xml':
        return 'file__icon_xml';
      case 'pdf':
        return 'file__icon_pdf';
      default:
        return 'file__icon_image';
    }
  }
  if (props.variant === 'dark') {
    return 'file__icon_dark';
  }
  if (props.variant === 'light') {
    return 'file__icon_light';
  }
}

function removeFile(id) {
  emit('removeFile', id);
}

</script>

<style lang="scss">

.file {
  &__list {
    display: flex;
    flex-direction: column;
    font-size: 1.3em;
    margin-bottom: 1em;
  }

  .divider {
    margin: 0;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    // border-top: 1px solid var(--border-color-secondary);
  }

  &__item:not(:last-child) {
    border-bottom: 1px solid var(--border-color-secondary);
  }

  &__data {
    flex: 1;
    display: flex;
    align-items: center;
    padding: .76em 1.5em .76em 0;
    cursor: pointer;

    svg {
      text {
        font-size: .61em;
        text-transform: uppercase;
      }
    }

    &:hover {
      .file__name {
        color: var(--text-color-hover-primary);
      }
    }
  }

  &__name {
    font-size: 1.23em;
    overflow-wrap: anywhere;
    flex: 0 1 100%;
  }

  &__download {
    font-size: .8em;
  }

  &__remove {
    position: relative;
    width: 2em;
    height: 2em;
  }

  &__remove:hover {
    &::before,
    &::after {
      background-color: #44246c;
    }
  }
    

  &__remove::before,
  &__remove::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 1.4em;
    height: 2px;
    border-radius: 2px;
    background-color: #565263;
    transition: background-color 0.2s ease;
  }

  &__remove::after {
    transform: rotate(-45deg);
  }

  &__remove::before {
    transform: rotate(45deg);
  }

  &__icon {
    flex: 0 0 15%;
  }

  &__icon_image,
  &__icon_png,
  &__icon_jpg,
  &__icon_jpeg,
  &__icon_bmp,
  &__icon_svg {
      color: #ED6C59;
      fill: #ED6C59;
  }

  &__icon_doc,
  &__icon_docx,
  &__icon_xml {
      color: #2980B9;
      fill: #2980B9;
  }

  &__icon_pdf {
      color: #FA8E23;
      fill: #FA8E23;
  }

  &__icon_dark {
    color: var(--text-color-ternary);
    fill: var(--text-color-ternary);
  }

  &__icon_light {
    color: #fff;
    fill: #fff;
  }
}

.progress {
  background-color: #e9ecef;
  border-radius: 1px;
  font-size: 1.2rem;
  height: 1rem;
  line-height: 0
}

.progress,.progress-bar {
  display: flex;
  overflow: hidden
}

.progress-bar {
  background-color: #6937a5;
  color: #fff;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  transition: width .6s ease;
  white-space: nowrap
}

.progress-bar-striped {
  background-image: linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.15) 0,hsla(0,0%,100%,.15) 75%,transparent 0,transparent);
  background-size: 1rem 1rem
}

.progress-bar-animated {
  animation: progress-bar-stripes 1s linear infinite
}

@keyframes progress-bar-stripes {
  0% {
      background-position: 1rem 0
  }

  to {
      background-position: 0 0
  }
}

@media (prefers-reduced-motion:reduce) {
  .progress-bar {
      transition: none
  }
  .progress-bar-animated {
    animation: none
  }
}

</style>
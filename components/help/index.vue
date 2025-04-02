<template>
  <div class="help-container">
    <div class="help-container__left-side">
      <div class="help-container__questions" :style="{ top: `${settingStore.headerHeight}px` }">
        <div class="help-container__question" v-for="(chapter, index) in chapters" :key="index">
          <UiButton type="button" class="help-container__question-btn"
            :class="{'active': isActiveChapter === index}" variant="default" size="large"
            @click="handleActiveChapter(index)">
            {{chapter.name}}
            <SvgoDropDownNew class="svg-m" />
          </UiButton>
          <ul class="help-container__question-list" v-if="isActiveChapter === index">
            <li v-for="(question, indexQuestion) in chapter.items" :key="indexQuestion">
              <UiButton type="button" class="link" variant="default" size="large"
                :class="{'active': isActiveQuestion.question === indexQuestion && isActiveQuestion.chapter === index}"
                @click="handleClickQuestion(indexQuestion)">
                {{ question.question }}
              </UiButton>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="help-container__content" ref="helpContent">
      <h4>{{ isActiveQuestion.title }}</h4>
      <div v-html="isActiveQuestion.answer"></div>
    </div>
    </div>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';

const settingStore = useSettingStore();
const router = useRouter();
const helpContent = ref(null)
const chapters = ref([]);
const offset = ref(null);

const isActiveChapter = ref(0);
const isActiveQuestion = ref({
  chapter: 0,
  question: 0,
  answer: '',
  title: '',
})



const handleActiveChapter = (id) => {
  if(isActiveChapter.value !== id) {
    isActiveChapter.value = id
  } else {
    isActiveChapter.value = null
  }
}

const handleClickQuestion = (id) => {
  if(isActiveQuestion.value.question !== id) {
    isActiveQuestion.value.question = id
    isActiveQuestion.value.chapter = isActiveChapter.value
    isActiveQuestion.value.answer = chapters.value[isActiveChapter.value].items[isActiveQuestion.value.question].answer
    isActiveQuestion.value.title = chapters.value[isActiveChapter.value].items[isActiveQuestion.value.question].question

    // скролл на начало страницы при выборе вопроса
    if (helpContent.value) {
      const rect = helpContent.value.getBoundingClientRect(); 
      const offset = window.scrollY + rect.top - settingStore.headerHeight;
      smoothScroll(offset);
    }

    router.push({query: {question: isActiveQuestion.value.question, chapter: isActiveQuestion.value.chapter}})
  }

}

onMounted(() => {
  settingStore.getHelps().then(res => {
    if(res) {
      chapters.value = res

      if(router.currentRoute.value.query.chapter && router.currentRoute.value.query.question) {
        isActiveChapter.value = Number(router.currentRoute.value.query.chapter)
        isActiveQuestion.value.question = Number(router.currentRoute.value.query.question)
        isActiveQuestion.value.answer = chapters.value[isActiveChapter.value].items[isActiveQuestion.value.question].answer
        isActiveQuestion.value.title = chapters.value[isActiveChapter.value].items[isActiveQuestion.value.question].question
      } else {
        isActiveQuestion.value.answer = chapters.value[isActiveQuestion.value.chapter].items[isActiveQuestion.value.question].answer
        isActiveQuestion.value.title = chapters.value[isActiveQuestion.value.chapter].items[isActiveQuestion.value.question].question
      }

      handleClickQuestion(isActiveQuestion.value.question)
    }
  })
})

</script>

<style lang="scss">

.help-container {
  display: flex;
  font-size: 1.6rem;
  column-gap: 2em;

  &__left-side {
    flex: 0 0 27%;
    max-width: 27%;
  }

  &__questions {
    position: sticky;
  }

  &__question-btn {
    font-size: 1em;
    justify-content: space-between;
    border-radius: 0;
    width: 100%;
    color: var(--primary-color);

    svg {
      transform: rotate(-90deg); 
      flex-shrink: 0;
    }

    &:hover {
      background-color: var(--primary-color);
      color: #fff !important;

      svg {
        path {
          fill: #fff;
        }
      }
    }
  }

  .active {
    svg {
      transform: rotate(0);
    }
  } 

  &__question-list {
    font-family: 'fira-sans', sans-serif;
    font-size: .875em;
    padding-block: .75em;

    .btn {
      text-wrap: wrap;
      text-align: left;
    }

    .active {
      color: var(--primary-color);
    }
  }

  &__content {
    flex: 0 1 50%;

    h4 {
      font-size: 1.5em;
      margin-block: 1.25em .83em;
    }
  }

  &__question-btn {
    text-wrap: wrap;
    text-align: left;
  }
}

.attachment--preview {
  max-width: 100%;
  text-align: center;
  border: 2px solid #dee2e6;
  cursor: pointer;
  margin: 0 0 1em;

  img {
    max-width: 100%;
    width: auto;
  }
}

figure.attachment figcaption {
  display: none;
}

@include tablet {
  .help-container {
    &__content {
      flex-grow: 1;
    }

    &__left-side {
      flex: 0 0 30%;
      max-width: 30%;
    }

    &__question-btn {
      font-size: 16px;
    }

    &__question-list {
      font-size: 1.6rem;
    }
  }
}

@include mobile {
  .help-container {
    flex-direction: column;

    &__left-side {
      flex-basis: 100%;
      max-width: 100%;
    }

    &__question-btn {
      font-size: 1.4rem;
    }

    &__question-list {
      font-size: 1.4rem;
    }

    &__content {
      font-size: 1.4rem;
      h4 {
        font-size: 1.6rem;
      }
    }
  }
}

</style>
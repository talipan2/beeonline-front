<template>
  <div class="help-container">
    <div class="help-container__left-side">
      <div class="help-container__questions" :style="{ top: `${settingStore.headerHeight}px` }">
        <div class="help-container__question" v-for="(chapter) in chapters" :key="chapter.id">
          <UiButton type="button" class="help-container__question-btn"
            :class="{'active': isActiveChapter === chapter.id}" variant="default" size="large"
            @click="handleActiveChapter(chapter.id)">
            {{chapter.label}}
            <SvgoDropDownNew class="svg-m" />
          </UiButton>
          <ul class="help-container__question-list" v-if="isActiveChapter === chapter.id">
            <li v-for="question in chapter.questions" :key="question.id">
              <UiButton type="button" class="link" variant="default" size="large"
                :class="{'active': isActiveQuestion.question === question.id}"
                @click="handleClickQuestion(question.id)">
                {{ question.label }}
              </UiButton>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="help-container__content" ref="helpContent">
      <h4 class="">Кто является создателем бизнес-платформы BEE-online.ru?</h4>
        <div>В меню личного кабинета, в разделе «Профиль», кликните на «Изменить» в «Карточке компании»<br>
          <figure
            data-trix-attachment="{contentType:image/png,filename:image.png,filesize:162803,height:522,href:https://bee-online.ru/storage/lmXKxBeDG4k0UDkWtRiarthlrQIUAAKTCf4T8xyL.png,url:https://bee-online.ru/storage/lmXKxBeDG4k0UDkWtRiarthlrQIUAAKTCf4T8xyL.png,width:1034}"
            data-trix-content-type="image/png" data-trix-attributes="{presentation:gallery}"
            class="attachment attachment--preview attachment--png"><a
              href="https://bee-online.ru/storage/lmXKxBeDG4k0UDkWtRiarthlrQIUAAKTCf4T8xyL.png"><img
                src="https://bee-online.ru/storage/lmXKxBeDG4k0UDkWtRiarthlrQIUAAKTCf4T8xyL.png" width="1034"
                height="522">
              <figcaption class="attachment__caption"><span class="attachment__name">image.png</span> <span
                  class="attachment__size">158.99 KB</span></figcaption>
            </a></figure>
            2. Ниже вы увидите кнопку «Добавить выставку
        </div>
        <div>
          <figure
            data-trix-attachment="{contentType:image/png,filename:image.png,filesize:19363,height:179,href:https://bee-online.ru/storage/Lz3y07uMGreql19aISuYzZSiRuWygXLN25LcBpaS.png,url:https://bee-online.ru/storage/Lz3y07uMGreql19aISuYzZSiRuWygXLN25LcBpaS.png,width:462}"
            data-trix-content-type="image/png" data-trix-attributes="{presentation:gallery}"
            class="attachment attachment--preview attachment--png"><a
              href="https://bee-online.ru/storage/Lz3y07uMGreql19aISuYzZSiRuWygXLN25LcBpaS.png"><img
                src="https://bee-online.ru/storage/Lz3y07uMGreql19aISuYzZSiRuWygXLN25LcBpaS.png" width="462"
                height="179">
              <figcaption class="attachment__caption"><span class="attachment__name">image.png</span> <span
                  class="attachment__size">18.91 KB</span></figcaption>
            </a></figure>3. Выберите выставку из списка доступных, нажав на «Выберите Выставку».
        </div>
        <div>
          <figure
            data-trix-attachment="{contentType:image/png,filename:image.png,filesize:22030,height:480,href:https://bee-online.ru/storage/YmOV7kSciku2h5GZ201kvFCcfhWSHChda9qMUgDd.png,url:https://bee-online.ru/storage/YmOV7kSciku2h5GZ201kvFCcfhWSHChda9qMUgDd.png,width:413}"
            data-trix-content-type="image/png" data-trix-attributes="{presentation:gallery}"
            class="attachment attachment--preview attachment--png"><a
              href="https://bee-online.ru/storage/YmOV7kSciku2h5GZ201kvFCcfhWSHChda9qMUgDd.png"><img
                src="https://bee-online.ru/storage/YmOV7kSciku2h5GZ201kvFCcfhWSHChda9qMUgDd.png" width="413"
                height="480">
              <figcaption class="attachment__caption"><span class="attachment__name">image.png</span> <span
                  class="attachment__size">21.51 KB</span></figcaption>
            </a></figure>
        </div>
        <div>Добавьте ссылку на страницу вашей компании в каталоге выставки с описанием, какие услуги вы оказываете и
          какую продукцию привезете на мероприятие. Ваши партнеры по платформе смогут встретиться с вами лично и
          ознакомиться с товарами офлайн.</div>
      </div>
    </div>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';


const chapters = ref([
  {
    id: 1, 
    label: "Общие вопросы",
    questions: [
      {id: 1, label: "Уто является создателем бизнес-платформы BEE-online.ru?"},
      {id: 2, label: "Кто является исполнителями заказов?"},
      {id: 3, label: "Кто является заказчиками услуг?"},
      {id: 4, label: "Кто является исполнителями заказов?"},
      {id: 5, label: "Кто является заказчиками услуг?"},
      {id: 6, label: "Кто является исполнителями заказов?"},
      {id: 7, label: "Кто является заказчиками услуг?"},
      {id: 8, label: "Кто является исполнителями заказов?"},
      {id: 9, label: "Кто является заказчиками услуг?"},
      {id: 10, label: "Кто является исполнителями заказов?"},
      {id: 11, label: "Кто является заказчиками услуг?"},
    ]
  },
  {
    id: 2, 
    label: "Информация для исполнителей",
    questions: [
      {id: 1, label: "Могу ли я разместить свое предложение в каталоге BEE-online.ru?"},
      {id: 2, label: "Как разместить объявление в каталоге услуг?"},
    ]
  },
  {
    id: 3, 
    label: "Информация для заказчиков",
    questions: [
      {id: 1, label: "Могу ли я разместить объявление о поиске исполнителя в каталоге BEE-online.ru?"},
      {id: 2, label: "Я хочу найти производителя. Что мне надо сделать?"},
      {id: 3, label: "Как разместить заказ на платформе BEE-online.ru?"},
    ]
  },
]);

const isActiveChapter = ref(null)
const isActiveQuestion = ref({
  chapter: 1,
  question: 1
})
const helpContent = ref(null)
const settingStore = useSettingStore();
const router = useRouter();

const handleActiveChapter = (id) => {
  if(isActiveChapter.value === id) {
    isActiveChapter.value = null
  } else {
    isActiveChapter.value = id
    isActiveQuestion.value.chapter = id
  }
}

const handleClickQuestion = (id) => {
  if(isActiveQuestion.value.question !== id) {
    isActiveQuestion.value.question = id
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
  if(router.currentRoute.value.query.chapter && router.currentRoute.value.query.question) {
    isActiveQuestion.value.chapter = Number(router.currentRoute.value.query.chapter)
    isActiveQuestion.value.question = Number(router.currentRoute.value.query.question)
  }
  handleClickQuestion(isActiveQuestion.value.question)
  handleActiveChapter(isActiveQuestion.value.chapter)
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
      color: #fff;

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
    font-size: 1em;

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
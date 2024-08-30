<template>
  <RegisterLayout title="Данные организации"
    description="Указанные данные не разглашаются третьим лицам и необходимы для успешной работы на сервисе.">
    <form @submit="handleSubmit">
      <label class="register__label register__label_type_select register__label_type_location">
        Выберите вашу страну*
        <UiSelect v-model="organizationStore.registerOrg.location" :options="locationList" />
      </label>
      <UiCheckbox v-if="organizationStore.registerOrg.location === 1" class="register__checkbox" variant="round" v-model="organizationStore.registerOrg.selfEmployed">
        Я самозанятый
      </UiCheckbox>

      <div class="register__inputs-list"
        v-if="organizationStore.registerOrg.selfEmployed && organizationStore.registerOrg.location === 1">
        <label class="register__label">
          ИНН *
          <UiInput class="register__input" type="text" placeholder="Компания" :required="!skipInn"
            v-model="organizationStore.registerOrg.inn" />
        </label>
        <label class="register__label">
          Название компании или ФИО *
          <UiInput class="register__input" type="text" placeholder="Компания" :required="true"
            v-model="organizationStore.registerOrg.companyName" />
        </label>
        <label class="register__label">
          Адрес регистрации *
          <UiInput class="register__input" type="text" placeholder="Компания" :required="true"
            v-model="organizationStore.registerOrg.registerAddress" />
        </label>
      </div>

      <div class="register__inputs-list"
        v-else-if="organizationStore.registerOrg.location === 1 && !organizationStore.registerOrg.selfEmployed">
        <label class="register__label">
          ИНН организации* <span>(Введите ИНН и нажмите на кнопку поиска, чтобы система определила вас)</span>
          <div class="register__input-inn">
            <UiInput class="register__input" type="text" placeholder="____________" :required="!skipInn"
              v-model="organizationStore.registerOrg.inn" />
            <UiButton class="register__search-btn" variant="tertiary">
              <SvgoSearchIcon class="svg-m" />
            </UiButton>
          </div>
        </label>
        <div class="register__input-list">
          <label class="register__label">
            Юридическое название организации *
            <UiInput class="register__input" type="text" placeholder="Компания" :required="true"
              v-model="organizationStore.registerOrg.companyName" />
          </label>
          <label class="register__label">
            КПП *
            <UiInput class="register__input" type="text" placeholder="____________" :disabled="true"
              v-model="organizationStore.registerOrg.kpp" :required="!skipInn" />
          </label>
          <label class="register__label register__label_type_select">
            Форма организации *
            <UiSelect v-model="organizationStore.registerOrg.organizationForm" :options="formOrganization" />
          </label>
          <label class="register__label">
            ОГРН *
            <UiInput class="register__input" type="text" placeholder="____________" :required="!skipInn"
              :disabled="true" v-model="organizationStore.registerOrg.ogrn" />
          </label>
        </div>
        <label class="register__label">
          Юридический адрес *
          <UiInput class="register__input" type="text" placeholder="" :required="!skipInn" :disabled="true"
            v-model="organizationStore.registerOrg.legalAddress" />
        </label>
      </div>

      <div class="register__inputs-list" v-if="organizationStore.registerOrg.location !== 1">
        <label class="register__label">
          Идентификационный номер организации* <span>(Введите номер и нажмите на кнопку поиска, чтобы система определила
            вас)</span>
          <div class="register__input-inn">
            <UiInput class="register__input" type="text" placeholder="____________" :required="!skipInn"
              v-model="organizationStore.registerOrg.inn" />
            <UiButton class="register__search-btn" variant="tertiary">
              <SvgoSearchIcon class="svg-m" />
            </UiButton>
          </div>
        </label>
        <div class="register__input-list">
          <label class="register__label">
            Юридическое название организации *
            <UiInput class="register__input" type="text" placeholder="Компания" :required="true"
              v-model="organizationStore.registerOrg.companyName" />
          </label>
          <label class="register__label">
            Юридический адрес *
            <UiInput class="register__input" type="text" placeholder="____________" :disabled="true"
              v-model="organizationStore.registerOrg.kpp" :required="!skipInn" />
          </label>
        </div>
        <div>
          <label class="add-file">
            <SvgoClip class="svg-m"/>
            <span>Прикрепите ИНН и ОГРН для верификации. Разрешено загружать файлы форматом - doc, .docx, .xls, .xlsx,
              .ppt, .pptx, .rtf, .pdf, .jpeg, .png, .jpg, .gif, .psd, .djvu, .fb2, .ps, .zip, .rar</span>
            <input type="file" multiple="" data-files-input=""
              accept=".doc, .docx, .xls, .xlsx, .ppt, .pptx, .rtf, .pdf, .jpeg, .png, .jpg, .gif, .psd, .djvu, .fb2, .ps, .zip, .rar">
          </label>
        </div>
      </div>

      <div class="register__btn-container">
        <UiButton type="submit" class="register__btn" variant="quinary" size="large" @click="skipInn = true">Пропустить
          ввод инн</UiButton>
        <UiButton type="submit" class="register__btn" variant="quinary" size="large" @click="skipInn = false">Далее
          <SvgoBtnArrow class="svg-lx" />
        </UiButton>
      </div>
    </form>
  </RegisterLayout>
</template>

<script setup>
import { useOrganizationStore } from '~/store/organizationStore';

const router = useRouter();
const organizationStore = useOrganizationStore();

const skipInn = ref(false);

const locationList = ref([
  { id:1, label: 'Россия'},
  { id:2, label: 'Казахстан'},
  { id:3, label: 'Беларусь'},
  { id:4, label: 'Армения'},
  { id:5, label: 'Узбекистан'},
  { id:6, label: 'Киргизия'},
  { id:7, label: 'Испания'},
  { id:8, label: 'Тунис'},
]);

const formOrganization = ref([
  { id:1, value:'ooo', label: 'ООО'},
  { id:2, value:'ip', label: 'ИП'},
  { id:3, value:'other', label: 'Другое'},
])

const handleSubmit = (event) => {
  event.preventDefault();
  router.push({ path: '/register/step2' })
};


</script>

<style lang="scss">
  .register  {

    .register__label_type_select {
      display: flex;
      flex-direction: column;
      flex: 1 0 40%;
      font-size: 1.6em;
      line-height: 1em;
    }
    
    .register__label_type_location {
      margin-bottom: 1em;
    }

    &__input-inn {
      display: flex;

      .register__input {
        flex: 1;
      }
    }

    &__search-btn {
      border-radius: 0 300px 300px 0;
      padding: 10px 5px;
      margin-top: 5px;
      width: 40px;
      box-sizing: border-box;
      justify-content: center;

      &:hover {
        svg {
          path {
            fill: #fff;

          }
        }
      }
    }

    &__btn-container {
      margin-top: 2.5em;
      display: flex;
      column-gap: 3em;
    }

    &__btn {
      flex: 1;
      font-size: 1.2em;
      padding: 0.83em;

      svg {
        margin-block: -1em;
      }
    }

    &__inputs-list {
      display: flex;
      flex-direction: column;
      row-gap: 1em;
    }
  }

.add-file {
  display: flex;
  align-items: center;
  position: relative;
  color: #565263;
  word-break: break-word;
  line-height: 1;
  font-size: 1.3em;
  margin-inline: -1em;
  margin-block: 1.53em 3.07em;
}

.add-file svg {
  background-color: #6937a5;
  color: #fff;
  margin-right: 10px;
  flex-shrink: 0;
  -ms-flex-item-align: baseline;
  align-self: baseline;
  width: 3em;
}

.add-file input {
  opacity: 0;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
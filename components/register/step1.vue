<template>
  <RegisterLayout title="Данные организации"
    description="Указанные данные не разглашаются третьим лицам и необходимы для успешной работы на сервисе.">
    <form @submit="handleSubmit">
      <div class="form-group__data register__label_type_location">
        <label class="form-group__title">
          Выберите вашу страну*
          <UiSelect class="form-group__value" v-model="organizationStore.registerOrg.location" :options="locationList" />
        </label>
      </div>
      <UiCheckbox class="form-group-title register__checkbox"  v-if="organizationStore.registerOrg.location === 1" variant="round" v-model="organizationStore.registerOrg.selfEmployed">
        Я самозанятый
      </UiCheckbox>

      <div class="form-group" v-if="organizationStore.registerOrg.selfEmployed && organizationStore.registerOrg.location === 1">
        <label class="form-group__title">
          ИНН *
          <UiInput class="form-group__value" type="text" placeholder="Компания" :required="!skipInn"
            v-model="organizationStore.registerOrg.inn" />
        </label>
        <label class="form-group__title">
          Название компании или ФИО *
          <UiInput class="form-group__value" type="text" placeholder="Компания" :required="true"
            v-model="organizationStore.registerOrg.companyName" />
        </label>
        <label class="form-group__title">
          Адрес регистрации *
          <UiInput class="form-group__value" type="text" placeholder="Компания" :required="true"
            v-model="organizationStore.registerOrg.registerAddress" />
        </label>
      </div>

      <div class="form-group" v-else-if="organizationStore.registerOrg.location === 1 && !organizationStore.registerOrg.selfEmployed">
        <label class="form-group__title">
          ИНН организации* <span>(Введите ИНН и нажмите на кнопку поиска, чтобы система определила вас)</span>
          <div class="form-group__value register__input-inn">
            <UiInput class="register__input" type="text" placeholder="____________" :required="!skipInn"
              v-model="organizationStore.registerOrg.inn" />
            <UiButton class="register__search-btn" variant="tertiary">
              <SvgoSearchIcon class="svg-m" />
            </UiButton>
          </div>
        </label>
        <div class="form-group">
          <label class="form-group-data form-group__title">
            Юридическое название организации *
            <UiInput class="form-group__value" type="text" placeholder="Компания" :required="true"
              v-model="organizationStore.registerOrg.companyName" />
          </label>
          <label class="form-group-data form-group__title">
            КПП *
            <UiInput class="form-group__value" type="text" placeholder="____________" 
              v-model="organizationStore.registerOrg.kpp" :required="!skipInn" />
          </label>
          <label class="form-group-data form-group__title register__label_type_select">
            Форма организации *
            <UiSelect class="form-group__value" v-model="organizationStore.registerOrg.organizationForm" :options="formOrganization" />
          </label>
          <label class="form-group-data form-group__title">
            ОГРН *
            <UiInput class="form-group__value" type="text" placeholder="____________" :required="!skipInn"
               v-model="organizationStore.registerOrg.ogrn" />
          </label>
        </div>
        <label class="form-group-data form-group__title">
          Юридический адрес *
          <UiInput class="form-group__value" type="text" placeholder="" :required="!skipInn" 
            v-model="organizationStore.registerOrg.legalAddress" />
        </label>
      </div>

      <div class="form-group" v-if="organizationStore.registerOrg.location !== 1">
        <label class="form-group__title">
          Идентификационный номер организации* <span>(Введите номер и нажмите на кнопку поиска, чтобы система определила
            вас)</span>
          <div class="form-group__value register__input-inn">
            <UiInput class="register__input" type="text" placeholder="____________" :required="!skipInn"
              v-model="organizationStore.registerOrg.inn" />
            <UiButton class="register__search-btn" variant="tertiary">
              <SvgoSearchIcon class="svg-m" />
            </UiButton>
          </div>
        </label>
        <label class="form-group__title">
          Юридическое название организации *
          <UiInput class="form-group__value" type="text" placeholder="Компания" :required="true"
            v-model="organizationStore.registerOrg.companyName" />
        </label>
        <label class="form-group__title">
          Юридический адрес *
          <UiInput class="form-group__value" type="text" placeholder="____________" 
            v-model="organizationStore.registerOrg.kpp" :required="!skipInn" />
        </label>
        <div>
          <CommonDocumentLoader text="Прикрепите ИНН и ОГРН для верификации. Разрешено загружать файлы форматом - doc, .docx, .xls, .xlsx,
              .ppt, .pptx, .rtf, .pdf, .jpeg, .png, .jpg, .gif, .psd, .djvu, .fb2, .ps, .zip, .rar" />
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

    // &__inputs-list {
    //   display: flex;
    //   flex-direction: column;
    //   row-gap: 1em;
    // }
  }

  .register .add-file {
    margin-inline: -1em;
  }

</style>
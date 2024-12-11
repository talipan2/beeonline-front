<template>
  <RegisterLayout
    :blockTitle="blockTitle"
    title="Данные организации"
    description="Указанные данные не разглашаются третьим лицам и необходимы для успешной работы на сервисе."
  >
    <Form @submit="handleSubmit" v-slot="{ }">
      <div class="form-group__data register__label_type_location">
        <label class="form-group__title">
          Выберите вашу страну*
          <UiSelect
            name="location"
            class="form-group__value"
            v-model="organizationStore.registerOrg.location"
            :options="locationList"
            :errorShow="false"
          />
        </label>
      </div>
      <UiCheckbox
        name="isSelfEmployed"
        class="form-group-title register__checkbox"
        v-if="organizationStore.registerOrg.location === 1"
        variant="round"
        v-model="organizationStore.registerOrg.selfEmployed"
      >
        Я самозанятый
      </UiCheckbox>

      <div
        class="form-group"
        v-if="
          organizationStore.registerOrg.selfEmployed &&
          organizationStore.registerOrg.location === 1
        "
      >
        <label class="form-group__title">
          ИНН *
          <UiInput
            :rules="{ required: true, min: 10 }"
            name="inn"
            label="ИНН"
            class="form-group__value"
            type="number"
            placeholder="ИНН"
            :required="!skipInn"
            v-model="organizationStore.registerOrg.inn"
          />
        </label>
        <label class="form-group__title">
          Название компании или ФИО *
          <UiInput
            :rules="{ required: true, min: 2 }"
            name="name"
            label="Название компании или ФИО"
            class="form-group__value"
            type="text"
            placeholder="Название компании или ФИО"
            :required="true"
            v-model="organizationStore.registerOrg.companyName"
          />
        </label>
        <label class="form-group__title">
          Адрес регистрации *
          <UiInput
            :rules="{ required: true, min: 2 }"
            name="legal_address"
            label="Адрес регистрации"
            class="form-group__value"
            type="text"
            placeholder="Адрес регистрации"
            :required="true"
            v-model="organizationStore.registerOrg.registerAddress"
          />
        </label>
      </div>

      <div
        class="form-group"
        v-else-if="
          organizationStore.registerOrg.location === 1 &&
          !organizationStore.registerOrg.selfEmployed
        "
      >
        <label class="form-group__title">
          ИНН организации*
          <span
            >(Введите ИНН и нажмите на кнопку поиска, чтобы система определила
            вас)</span
          >
          <div class="form-group__value register__input-inn">
            <UiInput
              :rules="{ required: true, min: 10 }"
              name="inn"
              label="ИНН"
              class="register__input"
              type="text"
              placeholder="____________"
              :required="!skipInn"
              v-model="organizationStore.registerOrg.inn"
              :maxLength="10"
              inputType="number"
            >
            <template #action>
              <UiButton class="register__search-btn" variant="tertiary">
                <SvgoSearchIcon class="svg-m" />
              </UiButton>
            </template>
            </UiInput>
          </div>
        </label>
        <div class="form-group">
          <label class="form-group-data form-group__title">
            Юридическое название организации *
            <UiInput
              :rules="{ required: true, min: 2 }"
              name="name"
              label="Юридическое название организации"
              class="form-group__value"
              type="text"
              placeholder="Компания"
              :required="true"
              v-model="organizationStore.registerOrg.companyName"
            />
          </label>
          <label class="form-group-data form-group__title">
            КПП *
            <UiInput
              :rules="{ required: true, min: 9 }"
              name="kpp"
              label="КПП"
              class="form-group__value"
              type="text"
              placeholder="____________"
              v-model="organizationStore.registerOrg.kpp"
              :required="!skipInn"
              :maxLength="9"
              inputType="number"
            />
          </label>
          <label
            class="form-group-data form-group__title register__label_type_select"
          >
            Форма организации *
            <UiSelect
              name="organizationForm"
              class="form-group__value"
              v-model="organizationStore.registerOrg.organizationForm"
              :options="formOrganization"
            />
          </label>
          <label class="form-group-data form-group__title">
            ОГРН *
            <UiInput
              :rules="{ required: true, min: 13 }"
              name="ogrn"
              label="ОГРН"
              class="form-group__value"
              type="text"
              inputType="number"
              placeholder="____________"
              :required="!skipInn"
              v-model="organizationStore.registerOrg.ogrn"
              :maxLength="13"
            />
          </label>
        </div>
        <label class="form-group-data form-group__title">
          Юридический адрес *
          <UiInput
            :rules="{ required: true, min: 5 }"
            name="legal_address"
            label="Юридический адрес"
            class="form-group__value"
            type="text"
            placeholder=""
            :required="!skipInn"
            v-model="organizationStore.registerOrg.legalAddress"
          />
        </label>
      </div>

      <div
        class="form-group"
        v-if="organizationStore.registerOrg.location !== 1"
      >
        <label class="form-group__title">
          Идентификационный номер организации*
          <span
            >(Введите номер и нажмите на кнопку поиска, чтобы система определила
            вас)</span
          >
          <div class="form-group__value register__input-inn">
            <UiInput
              :rules="{ required: true, min: 2 }"
              name="inn"
              label="ИНН"
              class="register__input"
              type="text"
              placeholder="____________"
              :required="!skipInn"
              v-model="organizationStore.registerOrg.inn"
            >
              <template #action>
                <UiButton class="register__search-btn" variant="tertiary">
                  <SvgoSearchIcon class="svg-m" />
                </UiButton>
              </template>
            </UiInput>
          </div>
        </label>
        <label class="form-group__title">
          Юридическое название организации *
          <UiInput
            :rules="{ required: true, min: 2 }"
            name="name"
            label="Юридическое название организации"
            class="form-group__value"
            type="text"
            placeholder="Компания"
            :required="true"
            v-model="organizationStore.registerOrg.companyName"
          />
        </label>
        <label class="form-group__title">
          Юридический адрес *
          <UiInput
            :rules="{ required: true, min: 2 }"
            name="legal_address"
            label="Юридический адрес"
            class="form-group__value"
            type="text"
            placeholder="____________"
            v-model="organizationStore.registerOrg.kpp"
            :required="!skipInn"
          />
        </label>
        <div>
          <CommonDocumentLoader
            text="Прикрепите ИНН и ОГРН для верификации. Разрешено загружать файлы форматом - doc, .docx, .xls, .xlsx,
              .ppt, .pptx, .rtf, .pdf, .jpeg, .png, .jpg, .gif, .psd, .djvu, .fb2, .ps, .zip, .rar"
          />
        </div>
      </div>

      <div class="register__btn-container">
        <UiButton
          type="submit"
          class="register__btn"
          variant="quinary"
          size="large"
          @click="skipInn = true"
          >Пропустить ввод инн</UiButton
        >
        <UiButton
          type="submit"
          class="register__btn"
          variant="quinary"
          size="large"
          @click="skipInn = false"
          >Далее
          <SvgoBtnArrow class="svg-lx" />
        </UiButton>
      </div>
    </Form>
  </RegisterLayout>
</template>

<script setup>
import { useOrganizationStore } from "~/store/organizationStore";
import { useUserStore } from "~/store/userStore";

const props = defineProps({
  blockTitle: {
    type: String,
    default: "",
  },
});

const router = useRouter();
const organizationStore = useOrganizationStore();
const userStore = useUserStore();

const role = computed(() => userStore.role);
const skipInn = ref(false);

const locationList = ref([
  { id: 1, label: "Россия" },
  { id: 2, label: "Казахстан" },
  { id: 3, label: "Беларусь" },
  { id: 4, label: "Армения" },
  { id: 5, label: "Узбекистан" },
  { id: 6, label: "Киргизия" },
  { id: 7, label: "Испания" },
  { id: 8, label: "Тунис" },
]);

const formOrganization = ref([
  { id: 1, value: "ooo", label: "ООО" },
  { id: 2, value: "ip", label: "ИП" },
  { id: 3, value: "other", label: "Другое" },
]);

const handleSubmit = () => {
  router.push({ path: "/register/step2" });
};
</script>

<style lang="scss">
.register {
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
    height: 40px;
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

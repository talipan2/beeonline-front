<template>
  <RegisterLayout
    :blockTitle="blockTitle"
    title="Данные организации"
    description="Указанные данные не разглашаются третьим лицам и необходимы для успешной работы на сервисе."
  >
    <Form @submit="handleSubmit" v-slot="{validate}">
      <div :class="{'animation-loading': isSearchInn}">
        <div class="form-group__data register__label_type_location">
          <label class="form-group__title">
            Выберите вашу страну*
            <UiSelect
              name="location"
              class="form-group__value"
              v-model="data.countryId"
              :options="locationList"
              :errorShow="false"
            />
          </label>
        </div>
        <UiCheckbox
          name="isSelfEmployed"
          class="form-group-title register__checkbox"
          v-if="data.countryId === 1"
          variant="round"
          v-model="data.selfEmployed"
        >
          Я самозанятый
        </UiCheckbox>

        <div
          class="form-group"
          v-if="
            data.selfEmployed &&
            data.countryId === 1
          "
        >
          <label class="form-group__title">
            ИНН *
            <UiInput
              :rules="getSkipInnRules"
              name="inn"
              label="ИНН"
              class="form-group__value"
              type="number"
              placeholder="ИНН"
              :required="!skipInn"
              v-model="data.inn"
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
              v-model="data.companyName"
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
              v-model="data.registerAddress"
            />
          </label>
        </div>

        <div
          class="form-group"
          v-else-if="
          data.countryId === 1 &&
            !data.selfEmployed
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
                :rules="getSkipInnRules"
                name="inn"
                label="ИНН"
                class="register__input"
                type="text"
                placeholder="____________"
                v-model="data.inn"
                :maxLength="10"
                inputType="number"
              >
              <template #action>
                <UiButton type="button" class="register__search-btn" variant="tertiary" @click="handleSearchOrgByInn(data.inn)">
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
                v-model="data.organizationName"
              />
            </label>
            <label class="form-group-data form-group__title">
              КПП *
              <UiInput
                :rules="getSkipInnRules"
                name="kpp"
                label="КПП"
                class="form-group__value"
                type="text"
                placeholder="____________"
                v-model="data.kpp"
                :required="!skipInn"
                :maxLength="9"
                :disabled="true"
                inputType="number"
              />
            </label>
            <label
              class="form-group-data form-group__title register__label_type_select"
            >
              Форма организации *
              <UiSelect
                :rules="{ required: true }"
                name="organizationForm"
                class="form-group__value"
                v-model="data.organizationForm"
                :options="formOrganization"
                :disabled="true"
              />
            </label>
            <label class="form-group-data form-group__title">
              ОГРН *
              <UiInput
                :rules="getSkipInnRules"
                name="ogrn"
                label="ОГРН"
                class="form-group__value"
                type="text"
                inputType="number"
                placeholder="____________"
                :required="!skipInn"
                v-model="data.ogrn"
                :maxLength="13"
                :disabled="true"
              />
            </label>
          </div>
          <label class="form-group-data form-group__title">
            Юридический адрес *
            <UiInput
              :rules="getSkipInnRules"
              name="legal_address"
              label="Юридический адрес"
              class="form-group__value"
              type="text"
              placeholder=""
              :required="!skipInn"
              v-model="data.legalAddress"
              :disabled="true"
            />
          </label>
        </div>

        <div
          class="form-group"
          v-if="data.countryId !== 1"
        >
          <label class="form-group__title">
            Идентификационный номер организации*
            <span
              >(Введите номер и нажмите на кнопку поиска, чтобы система определила
              вас)</span
            >
            <div class="form-group__value register__input-inn">
              <UiInput
                :rules="getSkipInnRules"
                name="inn"
                label="ИНН"
                class="register__input"
                type="text"
                placeholder="____________"
                :required="!skipInn"
                v-model="data.inn"
              >
                <template #action>
                  <UiButton type="button" class="register__search-btn" variant="tertiary" @click="handleSearchOrgByInn(data.inn)">
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
              v-model="data.organizationName"
            />
          </label>
          <label class="form-group__title">
            Юридический адрес *
            <UiInput
              :rules="getSkipInnRules"
              name="legal_address"
              label="Юридический адрес"
              class="form-group__value"
              type="text"
              placeholder="____________"
              v-model="data.kpp"
              :required="!skipInn"
              :disabled="true"
            />
          </label>
          <div>
            <CommonDocumentLoaderAndList 
              :extension="['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'rtf', 'pdf', 'jpeg', 'png', 'jpg', 'gif', 'psd', 'djvu', 'fb2', 'ps', 'zip', 'rar']"
              text="Прикрепите ИНН и ОГРН для верификации. Разрешено загружать файлы форматом - doc, .docx, .xls, .xlsx,
                .ppt, .pptx, .rtf, .pdf, .jpeg, .png, .jpg, .gif, .psd, .djvu, .fb2, .ps, .zip, .rar"
              v-model="data.verificationFiles"
            />
          </div>
        </div>
      </div>

      <div class="register__btn-container">
        <UiButton
          type="submit"
          class="register__btn"
          variant="quinary"
          size="large"
          @click="handleClick(true, validate)"
          >Пропустить ввод инн</UiButton
        >
        <UiButton
          type="submit"
          class="register__btn"
          variant="quinary"
          size="large"
          @click="handleClick(false, validate)"
          >Далее
          <SvgoBtnArrow class="svg-lx" />
        </UiButton>
      </div>
    </Form>
    <InfoModal :text="innModalText" title="Ошибка"/>
  </RegisterLayout>
</template>

<script setup>
import { useOrganizationStore } from "~/store/organizationStore";
import { useSettingStore } from "~/store/settingStore";
import { useUserStore } from "~/store/userStore";

const props = defineProps({
  blockTitle: {
    type: String,
    default: "",
  },
  modelValue: {
    type: Object,
    default: () => ({}),
    required: true,
  }
});

const router = useRouter();
const organizationStore = useOrganizationStore();
const settingStore = useSettingStore();
const userStore = useUserStore();
const emit = defineEmits(['update:modelValue']);

const getSkipInnRules = computed(() => {
  return skipInn.value ? {} : { required: true }
})

const handleClick = async(innSkip, validate) => {
  skipInn.value = innSkip;
  await nextTick();
  getErrorsList(validate)
}

const data = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  }
});

const role = computed(() => userStore.role);
const skipInn = ref(false);
const innModalText = ref("");
const isSearchInn = ref(false);

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

const handleSearchOrgByInn = (inn) => {
  if( inn === null || inn.length === 0 ) {
    innModalText.value = "Укажите ИНН";
    settingStore.infoModal = true;
    return;
  }
  isSearchInn.value = true;
  organizationStore.searchOrgByInn(inn)
  .then((res) => {
    if(res && res.data) {
      data.value.kpp = res.data.kpp;
      data.value.ogrn = res.data.ogrn;
      data.value.legalAddress = res.data.address;
      data.value.organizationName = res.data.name;
      data.value.companyName = res.data.name;
      data.value.organizationForm = organizationStore.getOrganizationFormByValue(res.data.org_form);
    }
  })
  .catch(err => {
    data.value.kpp = '';
    data.value.ogrn = ''
    data.value.legalAddress = '';
    data.value.organizationName = '';
    data.value.companyName = '';
    data.value.organizationForm = organizationStore.getOrganizationFormByValue('Другое');
    innModalText.value = "Организация не найдена";
    settingStore.infoModal = true;
    console.log(err);
  })
  .finally(() => isSearchInn.value = false);
}

const handleSubmit = async (value, form) => {
  await organizationStore.setOrganization({
    userId: userStore.userData.id,
    name: data.value.organizationName,
    organizationForm: data.value.organizationForm,
    inn: data.value.inn,
    kpp: data.value.kpp,
    ogrn: data.value.ogrn,
    legalAddress: data.value.legalAddress,
    selfEmployed: data.value.selfEmployed,
    countryId: data.value.countryId,
    currencyId: 1,
  }, form).then((res) => {
    userStore.checkAuth().then(() => {
      router.push("/register/step2");
    });
  });
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

<template>
  <RegisterLayout
    :blockTitle="blockTitle"
    :title="title"
    description="Указанные данные не разглашаются третьим лицам и необходимы для успешной работы на сервисе."
  >
    <UiForm :submit="handleSubmit">
      <div :class="{'animation-loading': isSearchInn}" class="register__step-one">
        <template v-if="router.currentRoute.value.path.includes('performer-register')">
          <h2 class="register__subtitle register__subtitle_type_performer">Данные организации</h2>
          <p class="register__text register__text_type_performer">Указанные данные не разглашаются третьим лицам и необходимы для успешной работы на сервисе.</p>
        </template>
        <div class="form-group__data register__label_type_location">
          <label class="form-group__title">
            Выберите вашу страну*
            <UiSelect
              name="countryId"
              class="form-group__value"
              v-model="data.countryId"
              :options="locationList"
              :errorShow="false"
            />
          </label>
        </div>
        <UiCheckbox
          name="selfEmployed"
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
            ИНН {{ innRequired ? '*' : '' }}
            <UiInput
              :rules="{required: innRequired}"
              name="inn"
              label="ИНН"
              class="form-group__value"
              type="number"
              placeholder="ИНН"
              v-model="data.inn"
              inputType="number"
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
              v-model="data.organizationName"
            />
          </label>
          <label class="form-group__title">
            Адрес регистрации
            <UiInput
              :rules="{ }"
              name="legalAddress"
              label="Адрес регистрации"
              class="form-group__value"
              type="text"
              placeholder="Адрес регистрации"
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
            ИНН организации
            <span
              >(Введите ИНН и нажмите на кнопку поиска, чтобы система определила
              вас){{ innRequired ? '*' : '' }}</span
            >
            <div class="form-group__value register__input-inn">
              <UiInput
                :rules="{required: innRequired}"
                name="inn"
                label="ИНН"
                class="register__input"
                type="number"
                placeholder="____________"
                v-model="data.inn"
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
              КПП
              <UiInput
                :rules="{}"
                name="kpp"
                label="КПП"
                class="form-group__value"
                type="text"
                placeholder="____________"
                v-model="data.kpp"
                inputType="number"
              />
            </label>
            <label
              class="form-group-data form-group__title register__label_type_select"
            >
              Форма организации
              <UiSelect
                :rules="{ }"
                name="organizationForm"
                class="form-group__value"
                v-model="data.organizationForm"
                :options="formOrganization"
              />
            </label>
            <label class="form-group-data form-group__title">
              ОГРН / ОГРНИП
              <UiInput
                :rules="{}"
                name="ogrn"
                label="ОГРН"
                class="form-group__value"
                type="text"
                inputType="number"
                placeholder="____________"
                :required="false"
                v-model="data.ogrn"
              />
            </label>
          </div>
          <label class="form-group-data form-group__title">
            Юридический адрес
            <UiInput
              :rules="{}"
              name="legalAddress"
              label="Юридический адрес"
              class="form-group__value"
              type="text"
              placeholder=""
              v-model="data.legalAddress"
            />
          </label>
        </div>

        <div
          class="form-group"
          v-if="data.countryId !== 1"
        >
          <label class="form-group__title">
            Идентификационный номер организации
            <span
              >(Введите номер и нажмите на кнопку поиска, чтобы система определила
              вас){{ innRequired ? '*' : '' }}</span
            >
            <div class="form-group__value register__input-inn">
              <UiInput
                :rules="{required: innRequired}"
                name="inn"
                label="ИНН"
                class="register__input"
                type="text"
                placeholder="____________"
                v-model="data.inn"
                inputType="text"
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
            Юридический адрес
            <UiInput
              :rules="{}"
              name="legalAddress"
              label="Юридический адрес"
              class="form-group__value"
              type="text"
              placeholder="____________"
              v-model="data.legalAddress"
            />
          </label>
          <label
              class="form-group-data form-group__title register__label_type_select"
            >
              Форма организации
              <UiSelect
                :rules="{ }"
                name="organizationForm"
                class="form-group__value"
                v-model="data.organizationForm"
                :options="formOrganization"
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
        <div class="form-group">
          <label class="form-group__title">
            Почта для закрывающих документов
            <UiInput
              :rules="{email: true}"
              name="email_docs"
              label="Почта для закрывающих документов"
              class="form-group__value"
              type="text"
              placeholder=""
              v-model="data.closedDocumentsEmail"
            />
          </label>
        </div>
      </div>

      <div class="register__btn-container">
        <!-- <UiButton
          type="submit"
          class="register__btn"
          variant="quinary"
          size="large"
          @click="handleClick(true)"
          >Пропустить ввод инн</UiButton
        > -->
        <UiButton
          type="submit"
          class="register__btn"
          variant="quinary"
          size="large"
          @click="handleClick(false)"
          >{{submitBtnText || 'Далее'}}
          <SvgoBtnArrow class="svg-lx" />
        </UiButton>
      </div>
    </UiForm>
    <InfoModal :text="innModalText" title="Ошибка"/>
  </RegisterLayout>
</template>

<script setup>
import { useOrganizationStore } from "~/store/organizationStore";
import { useSettingStore } from "~/store/settingStore";
import { useUserStore } from "~/store/userStore";
import { useLocationStore } from "~/store/locationStore";
import { useTranslateStore } from "~/store/translateStore";

const props = defineProps({
  blockTitle: {
    type: String,
    default: "",
  },
  modelValue: {
    type: Object,
    default: () => ({}),
    required: true,
  },
  title: {
    type: String,
    default: "Данные организации",
  },
  submitBtnText: {
    type: String,
    default: '',
  }
});

const router = useRouter();
const organizationStore = useOrganizationStore();
const settingStore = useSettingStore();
const userStore = useUserStore();
const locationStore = useLocationStore();
const translateStore = useTranslateStore();
const emit = defineEmits(['update:modelValue']);

const getSkipInnRules = computed(() => {
  return skipInn.value ? {} : { required: true }
})

const handleClick = async(innSkip) => {
  skipInn.value = innSkip;
}

const innRequired = computed(() => {
  return userStore.role == 'performer'
})

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
const registerCountries = ref([]);

const formOrganization = computed(function () {
    if (translateStore.lang == 'ru') {
        return [
            {
                id: 1,
                label: 'ИП',
                value: 'ip',
            },
            {
                id: 2,
                label: 'ООО',
                value: 'ooo',
            },
            {
                id: 4,
                label: 'Другое',
                value: 'other',
            },
        ];
    } else {
        return [
            {
                id: 1,
                label: 'Sole Proprietor',
                value: 'ip',
            },
            {
                id: 2,
                label: 'LLC',
                value: 'ooo',
            },
            {
                id: 4,
                label: 'Other',
                value: 'other',
            },
        ];
    }
})

const locationList = computed(function () {
  if (translateStore.lang == 'ru') {
    return registerCountries.value.map(item => {
      return {
        id: item.id,
        label: item.name,
      }
    })
  } else {
    return registerCountries.value.map(item => {
      return {
        id: item.id,
        label: item.name_en,
      }
    })
  }
})

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
  })
  .finally(() => isSearchInn.value = false);
}

const handleSubmit = async (value, form) => {
  if(userStore.userData.organization_id) {
    await organizationStore.editOrganization({
      ...value,
      id: userStore.userData.organization_id,
      name: data.value.organizationName,
      inn: data.value.inn ? String(data.value.inn) : "",
      organizationForm: data.value.selfEmployed ? 3 : data.value.organizationForm,
    }, form).then((res) => {
      if(res.data) {
        userStore.userOrganization = res.data;

        if(userStore.userData && userStore.userData.organization) {
          userStore.userData.organization = res.data;
        }

        if(userStore.role == 'performer') {
          router.push("/performer-register/step2");
        } else {
          router.push("/register/step2");
        }
      }
    })

    if(data.value.verificationFiles && data.value.verificationFiles.length > 0) {
      organizationStore.setVerificationDocuments(res.data.id, data.value.verificationFiles)
    }
  } else {
    await organizationStore.setOrganization({
      ...value,
      userId: userStore.userData.id,
      name: data.value.organizationName,
      organizationForm: data.value.selfEmployed ? 3 : data.value.organizationForm,
      inn: data.value.inn ? String(data.value.inn) : "",
    }, form)
    .then((res) => {
      if (res.data && res.data.id) {
        userStore.userData.organization_id = res.data.id;

        if(data.value.verificationFiles && data.value.verificationFiles.length > 0) {
          organizationStore.setVerificationDocuments(res.data.id, data.value.verificationFiles)
        }

        userStore.userOrganization = res.data;

        if(userStore.userData && userStore.userData.organization) {
          userStore.userData.organization = res.data;
        }

        if(userStore.role == 'performer') {
          router.push("/performer-register/step2");
        } else {
          router.push("/register/step2");
        }
      }
    })
  }
};

onMounted(() => {
    locationStore.getRegisterCountries()
    .then(res => {
        registerCountries.value = res;
    })
})

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

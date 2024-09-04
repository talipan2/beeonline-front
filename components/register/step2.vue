<template>
  <RegisterLayout title="Карточка организации" description="Указанные данные увидят другие участники портала.">
    <form @submit="handleSubmit">
      <div class="register__input-container">
        <label class="register__label ">
          Название компании *
          <UiInput class="register__input" type="text" v-model="organizationStore.registerOrg.companyName" placeholder="Компания" :required="true" />
        </label>
        <div class="register__input-list register__input-list_type_company">
          <CommonImageLoad class="register__label" title="Загрузить логотип компании" />
          <label class="register__label">Описание *
            <div class="register__textarea">
              <textarea v-model="organizationStore.registerOrg.companyDescription" class="" name="description" rows="5"></textarea>
            </div>
          </label>
        </div>
        <div class="register__btn-container">
          <UiButton type="button" class="register__btn" variant="senary" size="large" @click="router.back">Назад</UiButton>
          <UiButton type="submit" class="register__btn" variant="quinary" size="large">Далее
            <SvgoBtnArrow class="svg-lx" />
          </UiButton>
        </div>
      </div>
    </form>
  </RegisterLayout>
</template>

<script setup>
import { useOrganizationStore } from '~/store/organizationStore';
import { useUserStore } from '~/store/userStore';

const router = useRouter();
const userStore = useUserStore();
const organizationStore = useOrganizationStore();

const imagePreview = ref(null);

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    imagePreview.value = URL.createObjectURL(file);
    organizationStore.registerOrg.companyLogo = imagePreview.value
  } else {
    console.log('Invalid file type');
  }
};


const handleSubmit = (e) => {
  e.preventDefault();
  router.push('/register/step3');
}

</script>

<style lang="scss">
.register {

  &__input-list_type_company {
    margin-top: 1em;
  }

  &__company-image {
    margin-top: .5em;
    display: flex;
    flex-direction: column;
    border: 1px solid #c4c4c4;
    position: relative;
    cursor: pointer;
    padding-bottom: 63%;

    input {
      position: absolute;
      width: 0;
    }

    span {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    min-height: 15%;
    padding: 1em;
    line-height: 1;
    font-size: 12px;

    }

    img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      height: 100%;
      width: 100%;
      object-fit: contain;
      padding: 1em;
      box-sizing: border-box;
    }
  }

  &__textarea {
    padding-bottom: 63.1%;
    position: relative;
    margin-top: .5em;

    textarea {
      width: 100%;
      height: 100%;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      position: absolute;
      resize: none;
      font-size: 1.23em;
      padding: 0.625em;
      box-sizing: border-box;
      color: rgb(102, 112, 133);

      &:focus {
        outline: none;
      }
    }
  }
}
</style>
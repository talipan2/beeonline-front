<template>
  <RegisterLayout
    :title="title"
    :description="description"
    :block-title="blockTitle"
  >
    <Form @submit="handleSubmit" v-slot="{validate}">
      <label class="form-group__title" for="name"
        >Название компании *
        <UiInput
          :rules="{ required: true, min: 2 }"
          name="name"
          label="Название компании"
          class="form-group__value"
          type="text"
          id="name"
          v-model="data.companyName"
          placeholder="Компания"
          :required="true"
        />
      </label>
      <label class="form-group__title" for="site"
        >Ссылка на сайт
        <UiInput
          :rules="{ url: true }"
          name="site"
          label="Ссылка на сайт"
          class="form-group__value"
          type="text"
          id="site"
          v-model="data.siteUrl"
          placeholder="Компания"
        />
      </label>
      <div class="form-group register__input-list_type_company">
        <CommonImageLoad
          class="form-group-data"
          title="Загрузить логотип компании"
          v-model="data.companyLogo"
        />
        <div class="form-group-data">
          <label class="form-group__title">Описание * </label>
          <UiTextArea
            :rules="{ required: true, min: 5 }"
            name="description-text"
            label="Описание"
            v-model="data.description" 
            :rows="5"
          />
        </div>
      </div>
      <div
        class="register__btn-container"
        v-if="router.currentRoute.value.path.includes('/register')"
      >
        <UiButton
          type="button"
          class="register__btn"
          variant="senary"
          size="large"
          @click="router.back"
          >Назад
        </UiButton>
        <UiButton
          type="submit"
          class="register__btn"
          variant="quinary"
          size="large"
          @click="getErrorsList(validate)"
          >Далее
          <SvgoBtnArrow class="svg-lx" />
        </UiButton>
      </div>
      <slot></slot>
    </Form>
  </RegisterLayout>
</template>

<script setup>

const props = defineProps({
  blockTitle: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "Карточка организации",
  },
  description: {
    type: String,
    default: "Указанные данные увидят другие участники портала.",
  },
  modelValue: {
    type: Object,
    required: true,
  },
  submitFunc: {
    type: Function,
    default: null,
  }
});

const router = useRouter();
const emit = defineEmits(['update:modelValue']);

const data = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  }
});


const handleSubmit = () => {
  if(props.submitFunc) {
    props.submitFunc();
  } else {
    router.push("/register/step3");
  } 
};

</script>

<style lang="scss">
.register__input-list_type_company {
  margin-top: 1em;

  .load-image {
    padding-bottom: 62%;
  }

  .text-area__container {
    padding-bottom: 62%;
  }
}

.register__company-image {
  margin-top: 0.5em;
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

.register__textarea {
  padding-bottom: 63.1%;
  position: relative;
  margin-top: 0.5em;

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

@include mobile {
  .register {
    &__input-list_type_company {
      .load-image {
        flex: 0 1 50%;
        max-width: 50%;
        padding-bottom: 50%;
      }
    }

  }
  .register__input-list_type_company {
    .text-area__container {
      padding-bottom: 50%;
    }
  }

}

@include small-mobile {
  .register {
    &__input-list_type_company {
      flex-direction: row;

      .form-group-data {
        flex-basis: 100%;
      }
    }

    &__btn-container {
      flex-direction: column;
    }
  }
}
</style>

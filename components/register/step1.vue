<template>
  <RegisterLayout title="Данные организации" description="Указанные данные не разглашаются третьим лицам и необходимы для успешной работы на сервисе.">
    <label class="register__label register__label_type_select">
      Выберите вашу страну*
      <select>
        <option v-for="location in locationList" :key="location.id" :value="location.id">{{ location.location }}</option>
      </select>
    </label>
    <div class="register__checkbox">
      <input type="checkbox" v-model="isEmployed" id="employed">
      <label for="employed">Я самозанятый</label>
    </div>
    <div v-if="isEmployed">
      <label class="register__label">
          ИНН *
          <UiInput class="register__input" type="text" placeholder="Компания" :required="true" />
        </label>
        <label class="register__label">
          Название компании или ФИО *
          <UiInput class="register__input" type="text" placeholder="Компания" :required="true" />
        </label>
        <label class="register__label">
          Адрес регистрации *
          <UiInput class="register__input" type="text" placeholder="Компания" :required="true" />
        </label>
    </div>
    <div v-else>
      <label class="register__label">
        ИНН организации* <span>(Введите ИНН и нажмите на кнопку поиска, чтобы система определила вас)</span>
        <div class="register__input-inn">
          <UiInput class="register__input" type="text" placeholder="____________" :required="true" />
          <UiButton class="register__search-btn" variant="tertiary">
            <SvgoSearchIcon class="svg-m" />
          </UiButton>
        </div>
      </label>
      <div class="register__input-list">
        <label class="register__label">
          Юридическое название организации *
          <UiInput class="register__input" type="text" placeholder="Компания" :required="true" />
        </label>
        <label class="register__label">
          КПП *
          <UiInput class="register__input" type="text" placeholder="____________" disabled="true" />
        </label>
        <label class="register__label register__label_type_select">
          Форма организации *
          <select disabled>
            <option v-for="location in locationList" :key="location.id" :value="location.id">{{ location.location }}
            </option>
          </select>
        </label>
        <label class="register__label">
          ОГРН *
          <UiInput class="register__input" type="text" placeholder="____________" :required="true" disabled="true" />
        </label>
      </div>
      <label class="register__label">
        Юридический адрес *
        <UiInput class="register__input" type="text" placeholder="" :required="true" disabled="true" />
      </label>
    </div>

    <div class="register__btn-container">
      <UiButton class="register__btn" variant="quinary" size="large">Пропустить ввод инн</UiButton>
      <UiButton class="register__btn" variant="quinary" size="large">Далее
        <SvgoBtnArrow class="svg-lx" />
      </UiButton>
    </div>
  </RegisterLayout>
</template>

<script setup>

const isEmployed = ref(false);

const locationList = ref([
  { id:1, location: 'Россия'},
  { id:1, location: 'Казахстан'},
  { id:1, location: 'Беларусь'},
  { id:1, location: 'Армения'},
  { id:1, location: 'Узбекистан'},
  { id:1, location: 'Киргизия'},
  { id:1, location: 'Испания'},
  { id:1, location: 'Тунис'},

]);

</script>

<style lang="scss">
  .register  {

    &__label_type_select {
      display: flex;
      flex-direction: column;
      flex: 1 0 40%;

      font-size: 1.4em;
      
      select {
        padding: 0.71em;
        border: 1px solid var(--border-color-secondary);
        appearance: none;
        background: #fff 
          url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15'%3E%3Cpath stroke='%23343a40' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' d='m12 6-4.5 4L3 6' fill='none'/%3E%3C/svg%3E") 
          right 1rem center/15px 15px no-repeat;

        &:focus {
          outline: none;
        }

      }
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
      margin-top: 2em;
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


  }
</style>

<template>
  <section class="register container">
    <div class="register__container">
      <RegisterCheckList class="register__checklist sticky" ref="leftSide"/>
      <div class="register__main">
        <RegisterDefaultRegisterComponent />
      </div>
      <div class="register__right-side" >
        <div class="register__right-side-container sticky" ref="rightSide">
          <Advice class="register__advice">
            <p class="advice__text">ИНН используется в нашем сервисе:</p>
            <ul>
              <li>для автоматического заполнения вашего профиля</li>
              <li>для вывода вашей компании на карте</li>
              <li>для формирования платежных документов</li>
              <li>и наконец вы получаете галочку верифицированного пользователя, что повышает вас в поиске</li>
            </ul>
          </Advice>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';

const settingStore = useSettingStore();

const rightSide = ref(null);
const leftSide = ref(null);



const onScrollPage = () => {
  if (rightSide.value) {
    rightSide.value.style.top = `${settingStore.headerHeight + 70}px`;
    leftSide.value.$el.style.top = `${settingStore.headerHeight + 70}px`;
  } else {
    console.log('Element not found');
  }
}

onMounted(() => {
  onScrollPage();
  window.addEventListener("scroll", onScrollPage)
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScrollPage)
});

</script>

<style lang="scss">
.register {
  padding-block: 10em;
  position: relative;

  &__container {
    display: flex;
    justify-content: space-between;
    column-gap: 14.2em;
  }
  
  &__main {
    flex: 1 1 100%;
  }

  &__title {
    font-size: 3.2em;
    margin-bottom: 1.71em;
  }

  &__subtitle {
    font-size: 3em;
    margin-bottom: .66em;
  }

  &__text {
    font-size: 1.3em;
    margin-bottom: 1.46em;
  }

  &__input-list {
    display: flex;
    column-gap: 3em;
    row-gap: 1em;
    flex-wrap: wrap;
    margin-bottom: 2em;
  }

  &__input {
    margin-top: 0.31em;
  }

  &__label {
    font-size: 1.3em;
    flex: 1 0 40%;
  }

  &__checkbox {
    margin-bottom: 3.6em;
  }

  &__btn {
    column-gap: .71em;
    max-width: 55%;
    text-transform: uppercase;
    justify-content: center;  
    margin-bottom: 2.85em;
    font-size: 1.4rem;

    svg {
      path {
        fill: #fff;
      }
    }
  }

  &__btn_type_secondary {
    width: 100%;
    max-width: 66%;
    
    svg {
      margin: 0;
    }
  }

  &__checklist, &__advice {
    margin-top: 7em;
  }

}

.register__checklist {
  max-width: 25.5em;
  flex: 1 0 25.5em;
}

.register__advice {
  max-width: 40em;
  height: fit-content;

  .advice__text {
    margin-bottom: 1.8em;
  }
}

.sticky {
  position: sticky;
  top:0;
}


</style>
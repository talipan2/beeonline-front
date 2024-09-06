
<template>
  <section class="register container">
    <div class="register__container">
      <CommonCheckList class="register__checklist sticky" ref="leftSide"/>
      <div class="register__main">
        <RegisterDefaultRegisterComponent />
      </div>
      <div class="register__right-side" >
        <div class="register__right-side-container sticky" ref="rightSide">
          <CommonAdvice class="register__advice">
            <p class="advice__text">ИНН используется в нашем сервисе:</p>
            <ul>
              <li>для автоматического заполнения вашего профиля</li>
              <li>для вывода вашей компании на карте</li>
              <li>для формирования платежных документов</li>
              <li>и наконец вы получаете галочку верифицированного пользователя, что повышает вас в поиске</li>
            </ul>
          </CommonAdvice>
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
}


.register__container {
    display: flex;
    justify-content: space-between;
    column-gap: 14.2em;
  }
  
  .register__main {
    flex: 1 1 100%;
  }

  .register__title {
    font-size: 3.2em;
    margin-bottom: 1.71em;
  }

  .register__subtitle {
    font-size: 3em;
    margin-bottom: .66em;
  }

  .register__text {
    font-size: 1.3em;
    margin-bottom: 1.46em;
  }

  // .register__input-list {
  //   display: flex;
  //   column-gap: 3em;
  //   row-gap: 1em;
  //   flex-wrap: wrap;
  //   margin-bottom: 2em;
  // }

  // .register__input {
  //   margin-top: 0.31em;
  // }

  .register__label {
    font-size: 1.3em;
    flex: 1 0 40%;
  }

  .register__checkbox {
    margin-bottom: 3.6em;
  }

  .register__btn {
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

  .register__checklist, .register__advice {
    margin-top: 7em;
  }

  .register__btn_type_secondary {
    width: 100%;
    max-width: 66%;
    
    svg {
      margin: 0;
    }
  }

  .register__checklist, .register__advice {
    margin-top: 7em;
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





</style>
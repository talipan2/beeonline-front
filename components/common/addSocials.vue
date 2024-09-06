<template>
  <div class="add-socials">
    <h2 class="add-socials__title">Социальные сети</h2>
    <div class="add-socials__container">
      <div class="add-socials__item">
        <label class="form-group-data form-group__title">
          Telegram
        </label>
        <div class="add-socials__input">
          <SvgoTelegram class="svg-lx" />
          <UiInput class="form-group__value" type="text" placeholder="" />
        </div>
      </div>
      <div class="add-socials__item">
        <label class="form-group-data form-group__title">
          VK
        </label>
        <div class="add-socials__input">
          <SvgoVk class="svg-lx" />
          <UiInput class="form-group__value" type="text" placeholder="" />
        </div>
      </div>
      <div class="add-socials__item">
        <label class="form-group-data form-group__title">
          Youtube
        </label>
        <div class="add-socials__input">
          <SvgoYoutube class="svg-lx" />
          <UiInput class="form-group__value" type="text" placeholder="" />
        </div>
      </div>
    </div>
  </div>  
</template>

<style lang="scss">

.add-socials {
  margin-bottom: 2em;
  &__title {
    margin-bottom: .78em;
  }

  &__container {
    display: flex;
    flex-direction: column;

    label {
      margin-left: 3.46em;
      margin-bottom: 0;
    }
  }

  &__item {
    margin-bottom: 1em;
  }

  &__input {
    display: flex;
    align-items: center;
    column-gap: 1.5em;
  }


}

</style>
<template>
  <div class="soc-reg">
    <div class="soc-reg__divider">
      <p>Или</p>
    </div>
    <p class="soc-reg__text">Зарегистрируйтесь через:</p>
    <div class="soc-reg__links">
      <a href="javascript:;">
        <SvgoGoogle class="svg-lx" />
      </a>
      <a href="javascript:;">
        <SvgoVkontakte class="svg-lx" />
      </a>
    </div>
  </div>
</template>

<style lang="scss">

.soc-reg {

  &__divider {
    display: flex;
    align-items: center;
    margin-bottom: 2.1em;

    &::before,
    &::after {
      content: "";
      display: block;
      flex: 1 1 100%;
      height: 1px;
      background-color: #F0F0F0;
      width: 100%;
    }

    p {
      white-space: nowrap;
      font-size: 1.2em;
    }

  }

  &__text {
    font-size: 1.3em;
    text-align: center;
  }

  &__links {
    padding-block: 1em;
    margin-bottom: 3em;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 1em;

    svg {
      border-radius: 3em;
    }

    a:hover {
      svg {
        box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.3);
      }

    }

  }

}
</style>
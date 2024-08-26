<template>
  <div class="checklist">
    <div class="checklist__header">
      <div class="checklist__header-left">
        <div class="checklist__head">
          <div class="checklist__title">Заполнение профиля</div>
          <div class="checklist__status">низкое</div>
        </div>
        <div class="checklist__progress">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
    <Advice class="checklist__advice">
      <p class="advice__text">Полностью заполненный профиль выше в списке поиска</p>
    </Advice>
    <div class="checklist__collapse">
      <ul class="checklist__steps">
        <li class="checklist__step checklist__step_current">Регистрационные данные</li>
        <li class="checklist__step">Данные организации</li>
        <li class="checklist__step">Карточка организации</li>
        <li class="checklist__step">Города фактического производства</li>
        <li class="checklist__step">Проверка</li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
.checklist__header {
  display: flex;
}

.checklist__header-left {
    flex: 1 1 auto;
}

.checklist__header-right {
    display: flex;
    flex: 0 1 auto;
    margin-bottom: 5px;
    margin-left: 2em;
}

.checklist__toggle {
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3em;
    height: 3em;
    color: #6937a5;
    background-color: #FFF;
    border: 1px solid #6937a5;
    text-decoration: none;
    border-radius: 3em;
}

.checklist__toggle:hover {
    color: #6937a5;
    text-decoration: none;
}

.checklist__toggle i {
    transform: rotate(-90deg);
    transition: transform .2s ease-in-out;
}

.checklist__toggle.active i {
    transform: rotate(90deg);
}

.checklist__head {
    display: flex;
    align-items: center;
}

.checklist__title {
    font-size: 1.6em;
    margin-right: .5em;
}

.checklist__status {
    font-size: 1.2em;
    color: #EF3520;
    margin-left: auto;
}

.checklist_50 .checklist__status {
    color: #FBBC05;
}

.checklist_80 .checklist__status {
    color: #BCBF2F;
}

.checklist_100 .checklist__status {
    color: #6DBF2F;
}


.checklist__progress {
    display: flex;
    margin: 1em -.3em 2em;
}

.checklist__progress > div {
    flex-basis: 0;
    flex-grow: 1;
    max-width: 100%;
    padding: 0 .3em;
}

.checklist__progress > div:before {
    content: "";
    display: block;
    background-color: #D9D9D9;
    height: .8em;
}

.checklist__progress > div.active:before {
    background-color: #EF3520;
}

.checklist_50 .checklist__progress > div.active:before {
    background-color: #FBBC05;
}

.checklist_80 .checklist__progress > div.active:before {
    background-color: #BCBF2F;
}

.checklist_100 .checklist__progress > div.active:before {
    background-color: #6DBF2F;
}

.checklist__advice {
  font-size: 1em;
}

.checklist__steps {
    list-style: none;
    padding: 0 0 1px;
    margin: 0;
    margin-top: 5em;
    font-weight: 400;
}

.checklist__step {
    position: relative;
    font-size: 1.6em;
    padding-left: 1.875em;
    margin-bottom: .75em;
    line-height: 1em;
}

.checklist__step_title {
    font-weight: 500;
}

.checklist__step:before {
    content: "";
    position: absolute;
    font-size: 1.25em;
    top: -.1em;
    left: 0;
    width: 1em; height: 1em;
    background: no-repeat center/contain;
}

.checklist__step_passed:before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='none'%3E%3Cpath d='M16 5.334l-7.119 8L4 8.593' stroke='%236dbf2f' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
}

.checklist__step_current:before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='%23d52b1e'%3E%3Ccircle cx='5' cy='10' r='1'/%3E%3Ccircle cx='15' cy='10' r='1'/%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3C/svg%3E");
}

.checklist__step_crossed:before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='none'%3E%3Cpath d='M5 5L15 15M5 15L15 5' stroke='%23de5434' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E%0A");
}

@media (min-width: 768px) {
    .checklist__header-right {
        display: none;
    }
}

@media (max-width: 767px) {
    .checklist__collapse {
        display: none;
    }
}
</style>
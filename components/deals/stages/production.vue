<template>
  <div class="stage-production">
    <p>
      Мы подготовили для вас удобный инструмент мониторинга производства. Рекомендуем вам отмечать галочками завершённые
      этапы производства, чтобы уведомить заказчика о процессе изготовления заказа. Это увеличит лояльность вашего
      клиента и избавит от лишних вопросов, связанных со степенью готовности заказа. Вы можете отмечать только те этапы
      производства, которые соответствуют вашей технологической цепочке. Если на каком-то из этапов у вас возникли
      непредвиденные трудности, вы всегда можете уведомить об этом менеджера поддержки и вашего клиента.
    </p>
    <h3 class="stage-production__title">Процесс производства заказа:</h3>
    <ul class="stage-production__checkbox">
      <li v-for="status in prodStatuses" :key="status.id">
        <UiCheckbox
          :label="status.name"
          :modelValue="status.checked"
          :disabled="!status.active"
          @update:modelValue="handleSelected(status.id, $event)"
        >
          {{ status.name }}
        </UiCheckbox>
      </li>
    </ul>
    <UiButton class="stage-production__btn" type="button" variant="quinary" @click="handleSave">Готовность к отгрузке</UiButton>
  </div>
</template>

<script setup>

const props = defineProps({
  id: {
    type: Number,
    default: null,
  },
  isManager: {
    type: Boolean,
    default: false,
  }
});

const prodStatuses = ref([
  { id: 1, active: 1, name: "Контрагент приступил к исполнению заказа", sort: 100 },
  { id: 2, active: 1, name: "Получение и проверка сырья на фабрике", sort: 200 },
  { id: 3, active: 1, name: "Декатировка ткани", sort: 300, created_at: "2024-01-09T08:52:02.000000Z" },
  { id: 4, active: 1, name: "Предоставление первого сигнального образца", sort: 400 },
  { id: 5, active: 1, name: "Утверждение образца в работу", sort: 500 },
  { id: 6, active: 1, name: "Раскрой", sort: 600, created_at: "2024-01-09T08:52:02.000000Z" },
  { id: 7, active: 1, name: "Запуск производства", sort: 700, created_at: "2024-01-09T08:52:02.000000Z" },
  { id: 8, active: 1, name: "Дополнительная отделка, операции (вышивка, печать и др.)", sort: 800 },
  { id: 9, active: 1, name: "Финишная обработка", sort: 900, created_at: "2024-01-09T08:52:02.000000Z" },
  { id: 10, active: 1, name: "ВТО обработка", sort: 1000, created_at: "2024-01-09T08:52:02.000000Z" },
  { id: 11, active: 1, name: "Стирка", sort: 1100, created_at: "2024-01-09T08:52:02.000000Z" },
  { id: 12, active: 1, name: "Контроль качества", sort: 1200, created_at: "2024-01-09T08:52:02.000000Z" },
  { id: 13, active: 1, name: "Предоставление отгрузочного образца", sort: 1300 },
  { id: 14, active: 1, name: "Предоставление сертификатов", sort: 1400 },
  { id: 15, active: 1, name: "Упаковка и маркировка", sort: 1500 }
]);

const selectedStatus = ref();

function handleSelected(id, isChecked) {
  if (!id) return;
  
  if (isChecked) {
    selectedStatus.value = id;
    prodStatuses.value.forEach(status => {
      if(status.id <= id) status.checked = true
    })
  } else {
    if(id === 1) {
      selectedStatus.value = null;
      prodStatuses.value.forEach(status => {
        status.checked = false
      })
      return
    }
    const prevChecked = prodStatuses.value
      .filter(status => status.id < id)
      .map(status => status.id)
      .pop();

    selectedStatus.value = prevChecked ?? null;

    prodStatuses.value.forEach(status => {
      if(status.id > prevChecked) status.checked = false
    })
  }
}

</script>

<style lang="scss">


.stage-production {
  font-size: 1.6em;
  p {
    margin-bottom: 2em;
  }

  &__title {
    font-size: 1.6em;
    margin-bottom: 1em;
  }

  &__checkbox {
    flex-direction: column;
    margin-bottom: 1em;

    label {
      font-size: 1em;
    }
  }

  &__btn {
    font-size: .75em;
    width: 50%;
    margin-bottom: 1em;

    @include mobile {
      width: 100%;
    }
  }
}

</style>
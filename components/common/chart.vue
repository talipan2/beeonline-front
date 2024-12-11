<template>
  <div class="line-chart">
    <Line ref="lineChart" :data="chartData" :options="chartOptions" ></Line>
  </div>
</template>

<script setup>
import { Bar, Line, } from 'vue-chartjs';

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  }
})

const lineChart = ref(null);

// Начальные данные для графика
const chartData = ref({
  labels: Array.from({ length: 15 }, (_, i) => i.toString()), // Assuming these are your labels
  datasets: [
    {
      label: 'Статистика',
      data: [...props.data], 
      borderColor: '#6937a5',
      backgroundColor: (ctx) => {
        const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 100);
        gradient.addColorStop(0, 'rgba(105, 55, 165, 0.45)');
        gradient.addColorStop(1, 'rgba(105, 55, 165, 0)');
        return gradient;
      },
      borderWidth: 2,
      tension: 0.1,
      fill: true,
      cubicInterpolationMode: 'monotone',
    }
  ]
});

// Опции для графика
const chartOptions = {
  responsive: false,
  plugins: {
    legend: {
      display: false // Отключаем легенду
    },
    tooltip: {
      enabled: false // Отключаем всплывающие подсказки
    }
  },
  elements: {
    point: {
      radius: 0,
      backgroundColor: '#6937a5',
      hoverBackgroundColor: '#6937a5'
    }
  },
  interaction: {
    intersect: false
  },
  scales: {
    x: {
      display: false
    },
    y: {
      display: false,
      offset: true
    }
  }
};

watch(() => props.data, (newVal) => {
  lineChart.value.chart.data.datasets[0].data = [...newVal];
  lineChart.value.chart.update();
});

</script>

<style lang="scss">

.line-chart {
  canvas {
    width: 100% !important;
    height: 100% !important;
  }
}

</style>
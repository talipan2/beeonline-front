import { Chart, Title, Tooltip, Legend, CategoryScale, LinearScale, LineElement, PointElement, Filler } from 'chart.js'

export default defineNuxtPlugin(() => {
    Chart.register(Filler, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)
})
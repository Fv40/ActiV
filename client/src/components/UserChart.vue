<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { TODAY, THIS_WEEK, ALL_TIME, getUserStats } from '@/models/userStats'
import { refSession } from '@/models/connection/session'

Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps<{
  stat: 'caloriesConsumed' | 'timeWorkedOut' | 'activitiesCompleted'
  label: string
  color?: string
}>()

const currentUser = refSession().value.user
const chartData = ref({
  labels: [TODAY, THIS_WEEK, ALL_TIME],
  datasets: [
    {
      label: props.label,
      backgroundColor: props.color || 'rgba(33,150,243,0.8)',
      data: [0, 0, 0],
    },
  ],
})

const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: true, text: props.label },
  },
  scales: {
    x: { stacked: false },
    y: { beginAtZero: true },
  },
})

onMounted(async () => {
  const userStats = await getUserStats(currentUser!.user_id)
  chartData.value = {
    ...chartData.value,
    datasets: [
      {
        ...chartData.value.datasets[0],
        data: userStats.map(s => s.userStats[props.stat]),
      },
    ],
  }
})
</script>

<template>
  <div class="bar-chart-container">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>
.bar-chart-container {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 0;
}
</style>
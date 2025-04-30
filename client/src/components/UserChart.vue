<script setup lang="ts">
import { ref, onMounted } from 'vue'
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

const currentUser = refSession().value.user
const stats = ref<any[]>([])

const barColors = [
  'rgba(250,138,10,0.8)',
  'rgba(200,200,0,0.8)',
  'rgba(33,150,243,0.8)',
]

const chartData = ref({
  labels: [TODAY, THIS_WEEK, ALL_TIME],
  datasets: [
    {
      label: 'Calories Consumed',
      backgroundColor: barColors[0],
      data: [0, 0, 0],
    },
    {
      label: 'Time Worked Out (min)',
      backgroundColor: barColors[1],
      data: [0, 0, 0],
    },
    {
      label: 'Activities Completed',
      backgroundColor: barColors[2],
      data: [0, 0, 0],
    },
  ],
})

const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: { position: "top" as const },
    title: { display: true, text: 'Your Activity Statistics' },
  },
  scales: {
    x: { stacked: false },
    y: { beginAtZero: true },
  },
})

onMounted(async () => {
  const userStats = await getUserStats(currentUser!.user_id)
  stats.value = userStats

  chartData.value = {
    ...chartData.value,
    datasets: [
      {
        ...chartData.value.datasets[0],
        data: userStats.map(s => s.userStats.caloriesConsumed),
      },
      {
        ...chartData.value.datasets[1],
        data: userStats.map(s => s.userStats.timeWorkedOut),
      },
      {
        ...chartData.value.datasets[2],
        data: userStats.map(s => s.userStats.activitiesCompleted),
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
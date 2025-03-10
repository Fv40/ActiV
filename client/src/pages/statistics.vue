<script setup lang="ts">
import { ref } from 'vue'
import { Pie } from 'vue-chartjs'
import { Chart, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js'
import { TODAY, THIS_WEEK, getUserStats } from '@/models/userStats'
import { currentUser } from '@/models/users'

Chart.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale)

const userStats = getUserStats().value.get(currentUser.value!.id)
const statsToday = userStats![0].userStats
const statsWeek = userStats![1].userStats
const statsAllTime = userStats![2].userStats

const pieColors = ['rgba(222,33,33,1.0)', 'rgba(250,138,10,1.0)', 'rgba(200,200,0,1.0)']

const chartCalories = ref({
  labels: [TODAY, THIS_WEEK, 'This Month'],
  datasets: [
    {
      label: 'Calories Consumed',
      backgroundColor: pieColors,
      data: [
        statsToday.caloriesConsumed,
        statsWeek.caloriesConsumed - statsToday.caloriesConsumed,
        statsAllTime.caloriesConsumed - statsWeek.caloriesConsumed,
      ],
    },
  ],
})

const chartTimeWorked = ref({
  labels: [TODAY, THIS_WEEK, 'This Month'],
  datasets: [
    {
      label: 'Time Spent Working Out',
      backgroundColor: pieColors,
      data: [
        statsToday.timeWorkedOut,
        statsWeek.timeWorkedOut - statsToday.timeWorkedOut,
        statsAllTime.timeWorkedOut - statsWeek.timeWorkedOut,
      ],
    },
  ],
})

const chartDistanceWalked = ref({
  labels: [TODAY, THIS_WEEK, 'This Month'],
  datasets: [
    {
      label: 'Distance Walked',
      backgroundColor: pieColors,
      data: [
        statsToday.distanceWalked,
        statsWeek.distanceWalked - statsToday.distanceWalked,
        statsAllTime.distanceWalked - statsWeek.distanceWalked,
      ],
    },
  ],
})
</script>

<template>
  <div class="columns is-multiline">
    <div class="column is-one-third">
      <div class="chart-container">
        <h2 class="title">Calories Consumed</h2>
        <Pie :data="chartCalories" />
      </div>
    </div>
    <div class="column is-one-third">
      <div class="chart-container">
        <h2 class="title">Time Spent Working Out (min)</h2>
        <Pie :data="chartTimeWorked" />
      </div>
    </div>
    <div class="column is-one-third">
      <div class="chart-container">
        <h2 class="title">Distance Walked (mi)</h2>
        <Pie :data="chartDistanceWalked" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.columns {
  margin-top: 20px;
}

.chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 700px;
}

.chart-container h2 {
  text-align: center;
  margin-bottom: 20px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

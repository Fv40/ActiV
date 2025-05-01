<script setup lang="ts">
import UserChart from '@/components/UserChart.vue'
</script>

<template>
  <div class="bar-chart-container">
    <UserChart stat="caloriesConsumed" label="Calories Consumed" color="rgba(250,138,10,0.8)" />
    <UserChart stat="timeWorkedOut" label="Time Worked Out (min)" color="rgba(200,200,0,0.8)" />
    <UserChart stat="activitiesCompleted" label="Activities Completed" color="rgba(33,150,243,0.8)" />
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
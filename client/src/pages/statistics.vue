<script setup lang="ts">
import UserChart from '@/components/UserChart.vue'
</script>

<template>
  <div class="bar-chart-container">
    <UserChart />
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
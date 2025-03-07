<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <header>
    <NavBar />
  </header>

  <RouterView />
</template>

<style scoped>
body {
  background-color: rgba(46, 46, 46, 0.993);
}

.body-container {
  background-color: rgb(87, 87, 87);
  height: 100vh;
  padding: 1rem;
}
</style>

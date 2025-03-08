<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import ActivityBox from '@/components/ActivityBox.vue'

</script>

<template>
  <div class="columns is-centered">
    <ActivityBox />
    <h1>{{ $route.params.userId }}</h1>
  </div>
</template>

<style scoped></style>

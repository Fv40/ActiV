<script setup lang="ts">
import { ref } from 'vue'
import { getUserById, currentUser } from '@/models/users.ts'
import { getActivities } from '@/models/activity.ts'
import ActivityBox from '@/components/ActivityBox.vue'

const activities = ref(getActivities())
</script>

<template>
  <div class="columns is-multiline mt-3">
    <div v-if="currentUser" v-for="activity in activities" :key="activity.title" class="column is-full is-centered">
      <ActivityBox :activity="activity" :user="getUserById(activity.userId)!"/>
    </div>
  </div>
</template>

<style scoped></style>

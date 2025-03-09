<script setup lang="ts">
import { currentUser } from '@/models/users.ts'
import { getActivitiesForUser } from '@/models/activity'
import ActivityBox from '@/components/ActivityBox.vue'

const activities = getActivitiesForUser(currentUser.value.id)
</script>

<template>
  <div class="columns is-multiline mt-3">
    <div v-if="currentUser" v-for="activity in activities" :key="activity.title" class="column is-full is-centered">
      <ActivityBox :activity="activity" :user="currentUser"/>
    </div>
  </div>
</template>

<style scoped></style>

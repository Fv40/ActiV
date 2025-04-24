<script setup lang="ts">
import { ref } from 'vue'
import { refSession } from '@/models/connection/session'
import { getUserById, getUsers, type User } from '@/models/users.ts'
import { getActivities } from '@/models/activity.ts'
import ActivityBox from '@/components/ActivityBox.vue'

const activities = ref(getActivities())

const users = ref<User[]>([])
getUsers().then((data) => {
  users.value = data
})

const currentUser = refSession().value.user
</script>

<template>
  <div class="columns is-multiline mt-3" v-if="(users.length > 0)">
    <div
      v-if="currentUser"
      v-for="activity in activities"
      :key="activity.title"
      class="column is-full is-centered"
    >
      <ActivityBox
        :activity="activity"
        :user="users.find((user) => user.user_id === activity.userId)!"
      />
    </div>
  </div>
  <div v-else class="has-text-centered py-6">
    <span class="icon is-large has-text-info">
      <i class="fas fa-spinner fa-pulse fa-3x"></i>
    </span>
    <h1 class="title is-4 mt-4">Loading Activities...</h1>
  </div>
</template>

<style scoped></style>

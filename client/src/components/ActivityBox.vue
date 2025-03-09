<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { getUsers } from '@/models/users'
import type { User } from '@/models/users'
import type { Activity } from '@/models/activity'

const props = defineProps<{
  activity: Activity
  user: User
}>()

const timeDifference = computed(() => {
  const now = new Date()

  const activityDate = new Date(props.activity.date)
  const diffInMs = now.getTime() - activityDate.getTime()
  const diffInMinutes = Math.floor(diffInMs / 60000)
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)

  if (diffInDays > 0) {
    return `${diffInDays} day(s) ago`
  } else if (diffInHours > 0) {
    return `${diffInHours} hour(s) ago`
  } else {
    return `${diffInMinutes} minute(s) ago`
  }
})
</script>

<template>
  <div class="card activity-card">
    <div class="card-image">
      <figure class="image is-4by3">
        <img v-bind:src="activity.imageSource" alt="Workout image" />
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img v-bind:src="user.profilePictureSource" alt="Profile picture" />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{ user.name }}</p>
        </div>
      </div>

      <div class="content" style="margin-top: -30px; font-size: 20px">
        {{ activity.title }}
        <br />
        <u>{{ activity.type }}</u>
        <br />
        <time style="opacity: 70%">{{ timeDifference }}</time>
      </div>
    </div>
  </div>
</template>

<style scoped>
.activity-card {
  max-width: 600px;
  margin: 0 auto;
}
</style>

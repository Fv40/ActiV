<script setup lang="ts">
import { defineProps, computed } from 'vue'
import type { User } from '@/models/users'
import type { Activity } from '@/models/activity'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
dayjs.extend(duration)

const props = defineProps<{
  activity: Activity
  user: User
}>()

const activityDuration = computed(() => {
  const dur = dayjs.duration(props.activity.duration_m, 'minutes')
  const hours = dur.hours()
  const minutes = dur.minutes()
  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }
  return `${minutes}m`
})
</script>

<template>
  <div class="card activity-card">
    <div class="card-image">
      <figure class="image is-4by3">
        <img v-bind:src="activity.thumbnail_src" alt="Workout image" />
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img v-bind:src="user.profile_picture_source" alt="Profile picture" />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{ user.username }}</p>
        </div>
      </div>

      <div class="content" style="margin-top: -20px; font-size: 20px">
        {{ activity.activity_description }}
        <br />
        <u>{{ activity.activity_type }}</u>
          {{ activityDuration }}
        <br />
        <time style="opacity: 70%">{{ dayjs(activity.activity_date).fromNow() }}</time>
      </div>
    </div>
  </div>
</template>

<style scoped>
.activity-card {
  max-width: 600px;
  margin: 0 auto;
}

.activity-card .image.is-48x48 img {
  object-fit: cover;
  object-position: center;
}

.activity-card .image.is-48x48 img {
  width: 48px;
  height: 48px;
  object-fit: fill;
  /* stretches the image to fill the square */
}
</style>

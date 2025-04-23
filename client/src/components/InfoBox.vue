<script setup lang="ts">
import { refSession } from '@/models/connection/session'
import { getUserStats } from '@/models/userStats'

let currentSession = refSession()
let currentUser = currentSession.value.user

const userWorkoutStats = currentUser ? getUserStats().value.get(currentUser.user_id) : null

function formatTime(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  return `${hours}h: ${remainingMinutes}m`
}
</script>

<template>
  <ul>
    <li v-for="item in userWorkoutStats" :key="item.timePeriod">
      <div class="card mt-6">
        <div class="card-content has-text-info card-color=light">
          <div>
            <h1 class="list-title">
              <strong>{{ item.timePeriod }}</strong>
            </h1>
            <div class="columns is-mobile is-centered">
              <div class="column has-text-centered">
                <p class="entry-title">
                  <u>Distance<br />Walked</u>
                </p>
                <p class="entry">{{ item.userStats.distanceWalked }} mi</p>
              </div>
              <div class="column has-text-centered">
                <p class="entry-title">
                  <u>Time<br />Worked</u>
                </p>
                <p class="entry" style="white-space: nowrap">
                  {{ formatTime(item.userStats.timeWorkedOut) }}
                </p>
              </div>
              <div class="column has-text-centered">
                <p class="entry-title">
                  <u>Calories<br />Consumed</u>
                </p>
                <p class="entry">{{ item.userStats.caloriesConsumed }} cal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<style scoped>
h1.list-title {
  font-size: 40px;
  margin-bottom: 10px;
  text-align: center;
}

p.entry-title {
  font-size: 30px;
  margin-top: 30px;
}

p.entry {
  font-size: 30px;
  margin-top: 30px;
  margin-bottom: 10px;
}

.card {
  background-color: #28343b63;
  border-radius: 10px;
  box-shadow: 10 4px 8px 0 rgba(0, 0, 0, 0.2);
}
</style>

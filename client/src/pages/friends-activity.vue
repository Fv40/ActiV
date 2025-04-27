<script setup lang="ts">
import { ref } from 'vue'
import { refSession } from '@/models/connection/session'
import { getUsers, type User } from '@/models/users.ts'
import { getActivities, getActivitiesForFriendgroup, getActivitiesForFriendgroups, type Activity } from '@/models/activity.ts'
import { type Friendgroup, getFriendgroupsForUser } from '@/models/friendgroups'
import ActivityBox from '@/components/ActivityBox.vue'

const currentUser = refSession().value.user
const friendgroups = ref<Friendgroup[]>([])
const activities = ref<Activity[]>([])

getFriendgroupsForUser(refSession().value.user!.user_id).then((data) => {
  friendgroups.value = data
})

const filter = ref(0)
const filterText = ref('All Activities')

function generateFilterText(newFilterGroupId: number) {
  filter.value = newFilterGroupId
  const friendgroup = friendgroups.value.find((group) => group.group_id === filter.value)

  if (filter.value > 0) {
    filterText.value = friendgroup!.group_name

    getActivitiesForFriendgroup(newFilterGroupId).then((data) => {
      activities.value = data
    })
  } else {
    getActivitiesForFriendgroups(currentUser!.friendgroups).then((data) => {
      activities.value = data
    })

    filterText.value = 'All Activities'
  }
}

getActivitiesForFriendgroups(currentUser!.friendgroups).then((data) => {
  activities.value = data
})

const users = ref<User[]>([])
getUsers().then((data) => {
  users.value = data
})

const dropdownActive = ref(false)
</script>

<template>
  <div class="columns is-multiline mt-3" v-if="currentUser">
    <div style="margin-left: 40px;" class="dropdown" v-bind:class="{ 'is-active': dropdownActive }">
      <div class="dropdown-trigger">
        <button class="button" aria-haspopup="true" aria-controls="dropdown-menu"
          @click="dropdownActive = !dropdownActive">
          <span>{{ filterText }}</span>
          <span class="icon is-small">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <div class="dropdown-menu" id="dropdown-menu" role="menu">
        <div class="dropdown-content">
          <div>
            <a class="dropdown-item" @click="generateFilterText(0), dropdownActive = false">
              All Activities
            </a>
          </div>
          <div v-for="friendgroup in friendgroups" :key="friendgroup.group_id"
            @click="generateFilterText(friendgroup.group_id)">
            <a class="dropdown-item" @click="dropdownActive = false">
              {{ friendgroup.group_name }}
            </a>
          </div>
        </div>
      </div>
    </div>
    <div v-if="currentUser" v-for="activity in activities" :key="activity.activity_description"
      class="column is-full is-centered">
      <ActivityBox :activity="activity" :user="users.find((user) => user.user_id === activity.user_id)!" />
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

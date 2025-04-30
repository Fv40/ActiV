<script setup lang="ts">
import { ref, computed } from 'vue'
import { refSession } from '@/models/connection/session'
import { getUsers, type User } from '@/models/users.ts'
import { getActivities, getActivitiesForFriendgroup, getActivitiesForFriendgroups, type Activity } from '@/models/activity.ts'
import { type Friendgroup, getFriendgroupsForUser } from '@/models/friendgroups'
import ActivityBox from '@/components/ActivityBox.vue'
import CalorieInfo from '@/components/CalorieInfo.vue'

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

const showOwnActivity = ref(true)
const filteredActivities = computed(() =>
  showOwnActivity.value
    ? activities.value
    : activities.value.filter(a => a.user_id !== currentUser?.user_id)
)

const displayedUsers = computed(() => {
  if (filter.value === 0) {
    const userIds = new Set<number>()

    friendgroups.value.forEach(group => {
      group.group_members.forEach((id: number) => userIds.add(id))
      userIds.add(group.owner_id)
    })

    return users.value.filter(u => userIds.has(u.user_id))
  } else {
    const group = friendgroups.value.find(g => g.group_id === filter.value)

    if (!group) {
      return []
    }

    const userIds = new Set<number>(group.group_members)

    userIds.add(group.owner_id)
    return users.value.filter(u => userIds.has(u.user_id))
  }
})
</script>

<template>
  <div v-if="currentUser">
    <div class="container">
      <div class="is-flex is-align-items-center mt-4 filter-row">
        <div class="dropdown" :class="{ 'is-active': dropdownActive }">
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
              <a class="dropdown-item" :class="{ 'is-active': filter === 0 }"
                @click="generateFilterText(0); dropdownActive = false">
                All Activities
              </a>
              <a v-for="group in friendgroups" :key="group.group_id" class="dropdown-item"
                :class="{ 'is-active': filter === group.group_id }"
                @click="generateFilterText(group.group_id); dropdownActive = false">
                {{ group.group_name }}
              </a>
            </div>
          </div>
        </div>
        <div class="field mb-0 ml-5">
          <label class="checkbox">
            <input type="checkbox" v-model="showOwnActivity" />
            Show my activity
          </label>
        </div>
      </div>
      <div class="columns mt-4 main-activity-cols" v-if="activities">
        <div class="column is-two-thirds activity-col">
          <div style="width: 100%; max-width: 600px; margin: 0 auto;">
            <div v-for="activity in filteredActivities" :key="activity.activity_id" class="mb-4">
              <ActivityBox :activity="activity" :user="users.find(user => user.user_id === activity.user_id)!" />
            </div>
          </div>
        </div>
        <div class="column is-one-third calorie-col">
          <div v-for="user in displayedUsers" :key="user.user_id" class="mb-6 mr-6"
            style="width: 100%; max-width: 320px;">
            <CalorieInfo :user="user" />
          </div>
        </div>
      </div>
      <div v-else class="has-text-centered py-6">
        <span class="icon is-large has-text-info">
          <i class="fas fa-spinner fa-pulse fa-3x"></i>
        </span>
        <h1 class="title is-4 mt-4">Loading Activities...</h1>
      </div>
    </div>
  </div>
</template>

<style scoped>
.filter-row {
  gap: 2rem;
  margin-top: 24px;
  justify-content: center;
}

.main-activity-cols {
  margin-left: 0;
  margin-right: 0;
  justify-content: center;
}

.activity-col {
  padding-right: 3rem !important;
  display: flex;
  justify-content: center;
}

.calorie-col {
  padding-left: 3rem !important;
  align-items: flex-end;
  display: flex;
  flex-direction: column;
}
</style>

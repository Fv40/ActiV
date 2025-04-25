<script setup lang="ts">
import { ref } from 'vue'
import * as session from '@/models/connection/session'
import { getActivitiesForUser, addActivity } from '@/models/activity'
import ActivityBox from '@/components/ActivityBox.vue'
import type { Activity } from '@/models/activity'

let currentUser = session.refSession().value!.user
const showModal = ref(false)

const newActivity = ref<Activity>({
  user_id: currentUser!.user_id,
  thumbnail_src: 'https://picsum.photos/500/500',
  activity_description: 'My workout',
  activity_type: 'Cardio',
  activity_date: new Date(),
})

const activities = ref<Activity[]>([])

getActivitiesForUser(currentUser!.user_id).then((data) => {
  activities.value = data
})

function openModal() {
  newActivity.value = {
    user_id: currentUser!.user_id,
    thumbnail_src: '',
    activity_description: 'My workout',
    activity_type: 'Cardio',
    activity_date: new Date(),
  }

  showModal.value = true
}

function saveActivity() {
  // Set default values if user has left them blank
  newActivity.value.activity_description =
    newActivity.value.activity_description || `My ${newActivity.value.activity_type.toLocaleLowerCase()} workout`
  newActivity.value.thumbnail_src =
    newActivity.value.thumbnail_src ||
    'https://mir-s3-cdn-cf.behance.net/project_modules/fs/73674f80778075.5ceb8de9562bc.jpg'

  addActivity({ ...newActivity.value })
  //activities = getActivitiesForUser(currentUser!.user_id)
  showModal.value = false
}
</script>

<template>
  <div class="columns is-multiline mt-3">
    <div v-if="activities" v-for="activity in activities" :key="activity.activity_id" class="column is-full is-centered">
      <ActivityBox :activity="activity" :user="currentUser!" />
    </div>
    <div v-else class="has-text-centered py-6">
      <span class="icon is-large has-text-info">
        <i class="fas fa-spinner fa-pulse fa-3x"></i>
      </span>
      <h1 class="title is-4 mt-4">Loading Activities...</h1>
    </div>
  </div>

  <div class="columns is-flex is-justify-content-space-between is-align-items-flex-end">
    <div class="column is-narrow">
      <button class="button is-warning is-light is-outlined is-rounded add-activity-button" @click="openModal">
        <span><i class="fa-solid fa-plus mr-2"></i></span>Add Activity
      </button>
    </div>
  </div>

  <div class="modal" :class="{ 'is-active': showModal }">
    <div class="modal-background" @click="showModal = !showModal"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Add Activity</p>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label class="label">Image URL</label>
          <div class="control">
            <input class="input" type="text" v-model="newActivity.thumbnail_src" />
          </div>
        </div>
        <div class="field">
          <label class="label">Title</label>
          <div class="control">
            <input class="input" type="text" v-model="newActivity.activity_description" />
          </div>
        </div>
        <div class="field">
          <label class="label">Type</label>
          <div class="control">
            <div class="select">
              <select v-model="newActivity.activity_type">
                <option>Cardio</option>
                <option>Strength</option>
              </select>
            </div>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="saveActivity">Save</button>
        <button class="button is-danger" @click="showModal = !showModal">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.add-activity-button {
  position: fixed;
  bottom: 90px;
  right: 50px;
  z-index: 1000;
}
</style>

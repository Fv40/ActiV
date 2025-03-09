<script setup lang="ts">
import { ref } from 'vue'
import { currentUser } from '@/models/users.ts'
import { getActivitiesForUser, addActivity } from '@/models/activity'
import ActivityBox from '@/components/ActivityBox.vue'
import type { Activity } from '@/models/activity'

const showModal = ref(false)

const newActivity = ref<Activity>({
  userId: currentUser.value!.id,
  imageSource: 'https://picsum.photos/500/500',
  title: 'My workout',
  type: 'Cardio',
  date: new Date()
})

let activities = getActivitiesForUser(currentUser.value!.id)

function openModal() {
  newActivity.value = {
    userId: currentUser.value!.id,
    imageSource: '',
    title: 'My workout',
    type: 'Cardio',
    date: new Date()
  }
  showModal.value = true
}

function saveActivity() {
  // Set default values if user has left them blank
  newActivity.value.title = newActivity.value.title || `My ${newActivity.value.type.toLocaleLowerCase()} workout`
  newActivity.value.imageSource = newActivity.value.imageSource || 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/73674f80778075.5ceb8de9562bc.jpg'

  addActivity({ ... newActivity.value })
  activities = getActivitiesForUser(currentUser.value!.id)
  showModal.value = false
}
</script>

<template>
  <div class="columns is-multiline mt-3">
    <div v-if="currentUser" v-for="activity in activities" :key="activity.title" class="column is-full is-centered">
      <ActivityBox :activity="activity" :user="currentUser"/>
    </div>
  </div>

  <div class="columns is-flex is-justify-content-space-between is-align-items-flex-end">
    <div class="column is-narrow">
      <button class="button is-warning is-light is-outlined is-rounded add-activity-button" @click="openModal"><span><i class="fa-solid fa-plus mr-2"></i></span>Add Activity</button>
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
            <input class="input" type="text" v-model="newActivity.imageSource">
          </div>
        </div>
        <div class="field">
          <label class="label">Title</label>
          <div class="control">
            <input class="input" type="text" v-model="newActivity.title">
          </div>
        </div>
        <div class="field">
          <label class="label">Type</label>
          <div class="control">
            <div class="select">
              <select v-model="newActivity.type">
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

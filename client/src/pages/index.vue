<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import InfoBox from '@/components/InfoBox.vue'
import NotificationList from '@/components/NotificationList.vue'
import MealInterface from '@/components/MealInterface.vue'
import * as session from '@/models/connection/session'

const router = useRouter()
const currentUser = session.refSession().value?.user
</script>

<template>
  <div v-if="currentUser" class="home">
    <div class="container">
      <div class="columns is-centered is-paddingless">
        <div class="column is-half">
          <h1 class="column-title" style="margin-bottom: -35px">Summary</h1>
          <InfoBox />
        </div>
        <div class="column is-half">
          <h1 class="column-title">Notifications</h1>
          <NotificationList :user-id="currentUser.user_id"/>

          <h1 class="column-title">Meals</h1>
          <MealInterface />
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    {{ router.push('/logged-out') }}
  </div>
</template>

<style scoped>
h1.column-title {
  font-family:
    'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-size: 40px;
  text-align: center;
}
</style>

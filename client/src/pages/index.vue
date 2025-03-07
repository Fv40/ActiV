<script setup lang="ts">
import InfoBox from '@/components/InfoBox.vue'
import NotificationList from '@/components/NotificationList.vue'
</script>

<template>
  <div class="home">
    <div class="container">
      <div class="columns is-centered is-paddingless">
        <div class="column is-half">
          <h1 class="column-title" style="margin-bottom: -35px">Summary</h1>
          <InfoBox />
        </div>
        <div class="column is-half">
          <h1 class="column-title">Notifications</h1>
          <NotificationList />
        </div>
      </div>
    </div>
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

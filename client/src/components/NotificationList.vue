<script setup lang="ts">
import { ref } from 'vue'

const notifications = ref([
  { text: 'Fake Success Notification', type: 'success' },
  { text: 'Fake Info Notification', type: 'info' },
  { text: 'Fake Warning Notification', type: 'warning' },
  { text: 'Fake Danger Notification', type: 'danger' },
])

function removeNotification(index: number) {
  notifications.value.splice(index, 1)
}
</script>

<template>
  <div>
    <div
      v-for="(message, index) in notifications"
      :key="index"
      class="notification is-dark column is-12 mt-2"
      :class="`is-${message.type}`"
    >
      <button class="delete" @click="removeNotification(index)"></button>
      {{ message.text }}
    </div>
  </div>
</template>

<style scoped></style>

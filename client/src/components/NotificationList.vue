<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { getInvitesForUser, setInviteRead, type Invite } from '@/models/notifications'
import { addUserToFriendgroup } from '@/models/friendgroups' // <-- Add this import

const props = defineProps<{ userId: number }>()

const invites = ref<Invite[]>([])

async function fetchInvites() {
  if (!props.userId) return
  invites.value = await getInvitesForUser(props.userId)
}

async function handleResponse(invite_id: number, index: number, accepted: boolean) {
  if (accepted) {
    const invite = invites.value[index]
    
    if (invite) {
      await addUserToFriendgroup(invite.group_id, invite.user_id)
    }
  }
  await setInviteRead(invite_id)
  invites.value.splice(index, 1)
}

onMounted(fetchInvites)
watch(() => props.userId, fetchInvites)
</script>

<template>
  <div>
    <div
      v-for="(invite, index) in invites"
      :key="invite.invite_id"
      class="notification is-info column is-12 mt-2 is-flex is-justify-content-space-between is-align-items-center"
      style="display: flex; justify-content: space-between; align-items: center;"
    >
      <div>
        You have been invited to group #{{ invite.group_id }}
      </div>
      <div class="buttons ml-4">
        <button class="button is-success is-small" @click="handleResponse(invite.invite_id, index, true)">
          Accept
        </button>
        <button class="button is-danger is-small" @click="handleResponse(invite.invite_id, index, false)">
          Decline
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
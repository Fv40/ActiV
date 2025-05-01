<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { getInvitesForUser, setInviteRead, type Invite } from '@/models/notifications'
import { addUserToFriendgroup, getFriendgroup, type Friendgroup } from '@/models/friendgroups'
import { getUserById, type User } from '@/models/users'

const props = defineProps<{ userId: number }>()

const invites = ref<Invite[]>([])
const groupInfo = ref<Record<number, Friendgroup>>({})
const ownerInfo = ref<Record<number, User>>({})

async function fetchInvites() {
  if (!props.userId) return
  invites.value = await getInvitesForUser(props.userId)

  const groupIds = Array.from(new Set(invites.value.map(i => i.group_id)))
  const groupFetches = groupIds.map(async id => {
    if (!groupInfo.value[id]) {
      groupInfo.value[id] = await getFriendgroup(id)
    }
  })

  await Promise.all(groupFetches)

  const ownerIds = Array.from(new Set(groupIds.map(id => groupInfo.value[id]?.owner_id).filter(Boolean)))
  const ownerFetches = ownerIds.map(async id => {
    if (id && !ownerInfo.value[id]) {
      ownerInfo.value[id] = await getUserById(id)
    }
  })
  await Promise.all(ownerFetches)
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
    <div v-for="(invite, index) in invites" :key="invite.invite_id"
      class="notification is-info column is-12 mt-2 is-flex is-justify-content-space-between is-align-items-center"
      style="display: flex; justify-content: space-between; align-items: center;">
      <div>
        You have been invited to
        <b>
          "{{ groupInfo[invite.group_id]?.group_name }}"
        </b>
        by
        <b>
          {{ ownerInfo[groupInfo[invite.group_id]?.owner_id]?.username }}
        </b>
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
    <div v-if="invites.length === 0" class="has-text-centered has-text-grey mt-4">
      All caught up!
    </div>
  </div>
</template>

<style scoped></style>
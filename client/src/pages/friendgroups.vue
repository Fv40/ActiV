<script setup lang="ts">
import { refSession } from '@/models/connection/session'
import { ref } from 'vue'
import { getFriendgroupsForUser, type Friendgroup } from '@/models/friendgroups'

const currentUser = refSession().value!.user
const currentUserFriendGroups = ref<Friendgroup[]>([])

getFriendgroupsForUser(currentUser!.user_id).then((data) => {
    currentUserFriendGroups.value = data
})

function removeUserFromGroup(groupId: number) {
    console.log(`Removing user from group with ID: ${groupId}`)
}
</script>

<template>
    <div class="container">
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th></th>
                    <th>Group name</th>
                    <th>Group members</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="friendgroup in currentUserFriendGroups" :key="friendgroup.group_id">
                    <td><img class="image is-48x48" v-bind:src="friendgroup.group_picture_source" /></td>
                    <td>{{ friendgroup.group_name }}</td>
                    <td>{{ friendgroup.group_members }}</td>
                    <td>
                        <div class="column">
                            <button class="button is-danger mr-2"
                                @click="removeUserFromGroup(currentUser!.user_id)">
                                <i class="fa-solid fa-right-from-bracket"></i>Leave Group
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped></style>
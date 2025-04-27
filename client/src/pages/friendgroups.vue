<script setup lang="ts">
import { refSession } from '@/models/connection/session'
import { ref } from 'vue'
import { getFriendgroupsForUser, removeUserFromFriendgroup, type Friendgroup } from '@/models/friendgroups'

const currentUser = refSession().value!.user
const currentUserFriendGroups = ref<Friendgroup[]>([])

getFriendgroupsForUser(currentUser!.user_id).then((data) => {
    currentUserFriendGroups.value = data
})

function removeUserFromGroup(groupId: number) {
    removeUserFromFriendgroup(currentUser!.user_id, groupId).then(() => {
        getFriendgroupsForUser(currentUser!.user_id).then((data) => {
            currentUserFriendGroups.value = data
        })
    })
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
                                @click="removeUserFromGroup(friendgroup.group_id)">
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
<script setup lang="ts">
import { refSession } from '@/models/connection/session'
import { getBulkUsers, type User } from '@/models/users'
import { getFriendgroup, removeUserFromFriendgroup, type Friendgroup } from '@/models/friendgroups'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const route = useRoute('/friendgroups/[id]')

const session = refSession()
const currentUser = session.value!.user

const groupId = route.params.id as string

const currentFriendGroup = ref<Friendgroup>()
const groupMembers = ref<User[]>([])

getFriendgroup(Number(groupId)).then((data) => {
    currentFriendGroup.value = data
    getBulkUsers(currentFriendGroup.value!.group_members).then((data) => {
        groupMembers.value = data
    })
})
</script>

<template>
    <div>
        <h1 class="title is-4 mt-4">Friendgroup: {{ currentFriendGroup?.group_name }}</h1>
    
    </div>
    <div>
        <div class="container" v-if="currentFriendGroup">
            <table class="table is-fullwidth">
                <thead>
                    <tr>
                        <th></th>
                        <th>User Name</th>
                        <th>User Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in groupMembers" :key="user.user_id">
                        <td><img class="image is-48x48" v-bind:src="user.profile_picture_source" /></td>
                        <td>{{ user.username }}</td>
                        <td>{{ user.email }}</td>
                        <td>
                            <div class="column">
                                <button class="button is-danger mr-2"
                                    @click="removeUserFromFriendgroup(currentFriendGroup!.group_id, user.user_id)">
                                    <i class="fa-solid fa-right-from-bracket"></i>Leave Group
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else class="has-text-centered py-6">
            <span class="icon is-large has-text-info">
                <i class="fas fa-spinner fa-pulse fa-3x"></i>
            </span>
            <h1 class="title is-4 mt-4">Loading Friendgroup...</h1>
        </div>
    </div>
</template>

<style scoped>

</style>
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
        <img v-bind:src="currentFriendGroup?.group_picture_source"></img>
        <h1 class="title is-4 mt-4 mb-6"><u>{{ currentFriendGroup?.group_name }}</u></h1>
        <h1 class="title is-6 mb-6">{{ currentFriendGroup?.group_description }}</h1>
        <h1 class="title is-6 mb-6">Group members: {{ currentFriendGroup?.group_members.length }}</h1>
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
                    <tr v-if="groupMembers" v-for="user in groupMembers" :key="user.user_id">
                        <td><img class="image is-48x48" v-bind:src="user.profile_picture_source" /></td>
                        <td>{{ user.username }}</td>
                        <td>{{ user.email }}</td>
                        <td>
                            <div class="column">
                                <button class="button is-danger mr-2"
                                    @click="removeUserFromFriendgroup(currentFriendGroup!.group_id, user.user_id)">
                                    <i class="fa-solid fa-right-from-bracket mr-2"></i>Remove user from group
                                </button>
                            </div>
                        </td>
                    </tr>
                    <div v-else>
                        <span class="icon is-large has-text-info">
                            <i class="fas fa-spinner fa-pulse fa-3x"></i>
                        </span>
                        <h1 class="title is-4 mt-4">Loading members...</h1>
                    </div>
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
h1 {
    text-align: center;
}
</style>
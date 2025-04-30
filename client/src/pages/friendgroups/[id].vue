<script setup lang="ts">
import { refSession } from '@/models/connection/session'
import { getBulkUsers, getUserById, type User } from '@/models/users'
import { getFriendgroup, removeUserFromFriendgroup, type Friendgroup } from '@/models/friendgroups'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'

const route = useRoute('/friendgroups/[id]')

const session = refSession()
const currentUser = session.value!.user

const groupId = route.params.id as string

const currentFriendGroup = ref<Friendgroup>()
const groupMembers = ref<User[]>([])
const groupOwner = ref<User>()

getFriendgroup(Number(groupId)).then((friendgroup) => {
    currentFriendGroup.value = friendgroup
    getBulkUsers(currentFriendGroup.value!.group_members).then((users) => {
        groupMembers.value = users
    })

    getUserById(currentFriendGroup.value!.owner_id).then((user) => {
        groupOwner.value = user
    })
})

function removeUserFromgroup(groupId: number, userId: number) {
    removeUserFromFriendgroup(groupId, userId).then(() => {
        groupMembers.value = groupMembers.value.filter((user) => user.user_id !== userId)
    })
}
</script>

<template>
    <div>
        <div style="text-align: center;">
            <img class="group-image" v-bind:src="currentFriendGroup?.group_picture_source"></img>
        </div>
        <h1 class="title is-4 mt-4 mb-6"><u>{{ currentFriendGroup?.group_name }}</u></h1>
        <h1 class="title is-6 mb-6">{{ currentFriendGroup?.group_description }}</h1>
        <h1 class="title is-6 mb-6">Group members: {{ currentFriendGroup!.group_members.length + 1}}</h1>
    </div>

    <div class="card owner-card mb-5">
            <div class="card-content">
                <div class="media is-align-items-center">
                    <div class="media-left">
                        <figure class="image is-96x96">
                            <img :src="groupOwner?.profile_picture_source" alt="Owner profile picture" style="object-fit: cover; border-radius: 50%;" />
                        </figure>
                    </div>
                    <div class="media-content">
                        <p class="title is-5 mb-1">Group Owner</p>
                        <p class="subtitle is-6 mb-0">{{ groupOwner?.username }}</p>
                        <p class="has-text-grey is-size-7">{{ groupOwner?.email }}</p>
                    </div>
                </div>
            </div>
        </div>
    <div>
        <div class="container" v-if="currentFriendGroup">
            <table class="table is-fullwidth">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="groupMembers" v-for="user in groupMembers" :key="user.user_id">
                        <td><img class="image is-48x48" v-bind:src="user.profile_picture_source" /></td>
                        <td>{{ user.username }}</td>
                        <td>{{ user.email }}</td>
                        <td>
                            <div class="column"
                                v-if="(currentUser?.isAdmin || currentUser?.user_id === currentFriendGroup?.owner_id) && currentUser?.user_id !== user.user_id">
                                <button class="button is-danger mr-2"
                                    @click="removeUserFromgroup(currentFriendGroup!.group_id, user.user_id)">
                                    Remove user from group<i class="fa-solid fa-user-minus ml-2"></i>
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

.group-image {
    width: 1500px;
    height: 600px;
}

.owner-card {
    max-width: 400px;
    margin: 0 auto 2rem auto;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
</style>
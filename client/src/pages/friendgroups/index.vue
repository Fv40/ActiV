<script setup lang="ts">
import { refSession } from '@/models/connection/session'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getFriendgroupsForUser, removeUserFromFriendgroup, type Friendgroup } from '@/models/friendgroups'

const router = useRouter()

const currentUser = refSession().value!.user
const currentUserFriendGroups = ref<Friendgroup[]>([])

getFriendgroupsForUser(currentUser!.user_id).then((data) => {
    currentUserFriendGroups.value = data
})

// TODO WEB-49: Use vue.watch here?
function removeUserFromGroup(groupId: number) {
    removeUserFromFriendgroup(groupId, currentUser!.user_id).then(() => {
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
                    <th>Total members</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="friendgroup in currentUserFriendGroups" :key="friendgroup.group_id"
                    class="position-relative">
                    <td>
                        <RouterLink :to="`/friendgroups/${friendgroup.group_id}`" class="custom-router-link">
                            <img class="image is-48x48" v-bind:src="friendgroup.group_picture_source" />
                        </RouterLink>
                    </td>
                    <td>{{ friendgroup.group_name }}</td>
                    <td class="members-count">{{ friendgroup.group_members.length }}</td>
                    <td>
                        <div class="column">
                            <button class="button is-danger mr-2" @click="removeUserFromGroup(friendgroup.group_id)">
                                <i class="fa-solid fa-right-from-bracket"></i>Leave Group
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.custom-router-link {
    text-decoration: none;
    color: inherit;
    border-radius: 10px;
}

.custom-router-link {
    position: absolute;
    top: 0;
    right: 600px;
    bottom: 0;
    left: 0;
    z-index: 1;
    pointer-events: auto;
    content: "";
    background-color: rgba(0, 0, 0, 0);
    display: flex;
    align-items: center;
    padding-left: 30px;
}

.position-relative {
    position: relative;
}

.custom-router-link:hover {
    background: #f0f4ff5d;
}

td {
    padding-left: 0;
}
td:first-child,
td:nth-child(2) {
    padding-left: 50px;
}

th {
    padding-left: 50px;
}

.members-count {
    text-align: center;
    vertical-align: middle;
    padding-left: 0 !important;
    padding-right: 0 !important;
    width: 0px;
}

img {
    border-radius: 10px;
}

thead {
    padding-left: 50px;
}
</style>
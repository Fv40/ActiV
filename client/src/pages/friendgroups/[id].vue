<script setup lang="ts">
import { refSession } from '@/models/connection/session'
import { searchUsers, getBulkUsers, getUserById, getUsers, type User } from '@/models/users'
import { getFriendgroup, removeUserFromFriendgroup, type Friendgroup } from '@/models/friendgroups'
import { getInvitesForUser, createInvite } from '@/models/notifications'
import { useRoute } from 'vue-router'
import { ref, computed, onMounted, watch } from 'vue'
import Vue3SimpleTypeahead from 'vue3-simple-typeahead'

const route = useRoute('/friendgroups/[id]')

const session = refSession()
const currentUser = session.value!.user

const groupId = route.params.id as string

const currentFriendGroup = ref<Friendgroup>()
const groupMembers = ref<User[]>([])
const groupOwner = ref<User>()
const showInviteModal = ref(false)
const inviteUserId = ref<number | null>(null)
const inviteError = ref<string | null>(null)
const allUsers = ref<User[]>([])
const invites = ref<any[]>([])
const searchQuery = ref('')
const suggestions = ref<User[]>([])

getFriendgroup(Number(groupId)).then((friendgroup) => {
    currentFriendGroup.value = friendgroup
    getBulkUsers(currentFriendGroup.value!.group_members).then((users) => {
        groupMembers.value = users
    })
    getUserById(currentFriendGroup.value!.owner_id).then((user) => {
        groupOwner.value = user
    })
    getUsers().then(users => {
        allUsers.value = users
    })
})

async function fetchInvites() {
    const allInvites = await Promise.all(
        allUsers.value.map(u => getInvitesForUser(u.user_id))
    )
    invites.value = allInvites.flat().filter(i => i.group_id === Number(groupId) && !i.is_read)
}

onMounted(async () => {
    await fetchInvites()
})

watch(allUsers, fetchInvites)

const nonMembers = computed(() => {
    if (!currentFriendGroup.value) return []
    const memberIds = new Set([
        ...currentFriendGroup.value.group_members,
        currentFriendGroup.value.owner_id
    ])

    return allUsers.value.filter(
        u =>
            !memberIds.has(u.user_id) &&
            !invites.value.some(i => i.user_id === u.user_id)
    )
})

function removeUserFromgroup(groupId: number, userId: number) {
    removeUserFromFriendgroup(groupId, userId).then(() => {
        groupMembers.value = groupMembers.value.filter((user) => user.user_id !== userId)
    })
}

const itemProjectionFunction = (item: User) => item.username

const fetchSuggestions = async (query: string) => {
    if (!query) {
        suggestions.value = []
        return
    }
    try {
        const data = await searchUsers(query)
        suggestions.value = data
    } catch (error) {
        console.error('Error fetching suggestions:', error)
    }
}

const filteredSuggestions = computed(() => {
    const memberIds = new Set([
        ...(currentFriendGroup.value?.group_members || []),
        currentFriendGroup.value?.owner_id,
    ])
    return suggestions.value.filter(
        (user) => !memberIds.has(user.user_id) && !invites.value.some((invite) => invite.user_id === user.user_id)
    )
})

const selectItemEventHandler = (selectedItem: User) => {
    inviteUserId.value = selectedItem.user_id // Set the selected user's ID
    searchQuery.value = selectedItem.username // Update the input field with the selected user's name
}

async function handleInvite() {
    inviteError.value = null
    if (!inviteUserId.value) {
        inviteError.value = "Please select a user to invite."
        return
    }
    try {
        await createInvite(Number(groupId), inviteUserId.value)
        showInviteModal.value = false
        inviteUserId.value = null
    } catch (error) {
        inviteError.value = "Failed to send invite."
    }
}
</script>

<template>
    <div>
        <div style="text-align: center;">
            <img class="group-image" v-bind:src="currentFriendGroup?.group_picture_source"></img>
        </div>
        <h1 class="title is-4 mt-4 mb-6"><u>{{ currentFriendGroup?.group_name }}</u></h1>
        <h1 class="title is-6 mb-6">{{ currentFriendGroup?.group_description }}</h1>
        <h1 class="title is-6 mb-6">Group members: {{ currentFriendGroup!.group_members.length + 1 }}</h1>
    </div>

    <div class="card owner-card mb-5">
        <div class="card-content">
            <div class="media is-align-items-center">
                <div class="media-left">
                    <figure class="image is-96x96">
                        <img :src="groupOwner?.profile_picture_source" alt="Owner profile picture"
                            style="object-fit: cover; border-radius: 50%;" />
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
        <div>
            <div v-if="currentUser?.user_id === currentFriendGroup?.owner_id" class="mb-4" style="text-align:center;">
                <button class="button is-link" @click="showInviteModal = true">
                    Invite User to Group
                </button>
            </div>

            <div class="modal" :class="{ 'is-active': showInviteModal }">
                <div class="modal-background" @click="showInviteModal = false"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Invite User</p>
                        <button class="delete" aria-label="close" @click="showInviteModal = false"></button>
                    </header>
                    <section class="modal-card-body">
                        <div class="field">
                            <label class="label">Search User</label>
                            <p class="help">Start typing a name and click on a suggestion to select a user.</p>
                            <vue3-simple-typeahead id="typeahead_id" placeholder="Start typing..."
                                :items="filteredSuggestions" :minInputLength="1" v-model="searchQuery"
                                :itemProjection="itemProjectionFunction" @selectItem="selectItemEventHandler"
                                @onInput="() => fetchSuggestions(searchQuery)" />
                            <div v-if="inviteUserId" class="mt-2" style="display: flex; align-items: center;">
                                <img v-if="suggestions.find(u => u.user_id === inviteUserId)?.profile_picture_source"
                                    :src="suggestions.find(u => u.user_id === inviteUserId)?.profile_picture_source"
                                    alt="Profile" class="image is-32x32 mr-2"
                                    style="border-radius: 50%; object-fit: cover;" />
                                <span>
                                    {{
                                        suggestions.find(u => u.user_id === inviteUserId)?.username
                                    }}
                                </span>
                            </div>
                        </div>
                        <p v-if="inviteError" class="has-text-danger">{{ inviteError }}</p>
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button is-success" @click="handleInvite">Send Invite</button>
                        <button class="button" @click="showInviteModal = false">Cancel</button>
                    </footer>
                </div>
            </div>
            <p v-if="inviteError" class="has-text-danger">{{ inviteError }}</p>
            <footer class="modal-card-foot">
                <button class="button is-success" @click="handleInvite">Send Invite</button>
                <button class="button" @click="showInviteModal = false">Cancel</button>
            </footer>
        </div>
    </div>
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
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
</style>
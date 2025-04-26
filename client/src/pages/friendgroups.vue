<script setup lang="ts">
import { refSession } from '@/models/connection/session'

const currentUser = refSession().value!.user
const 
</script>

<template>
    <div class="container">
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th></th>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Admin</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.user_id">
                    <td><img class="image is-48x48" v-bind:src="user.profile_picture_source" /></td>
                    <td>{{ user.user_id }}</td>
                    <td>{{ user.username }}</td>
                    <td>{{ user.isAdmin ? 'Yes' : 'No' }}</td>
                    <td>
                        <div class="column">
                            <button v-if="!user.isAdmin" class="button is-danger mr-2"
                                @click="removeUser(user.user_id)">
                                <i class="fa-solid fa-trash-can pr-2"></i>Delete User
                            </button>
                            <button class="button is-info ml-2"
                                @click="((showModal = true), (selectedUser = ref({ ...user }).value))">
                                <i class="fa-solid fa-user-pen pr-2"></i>Edit User
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped></style>
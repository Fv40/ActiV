<script setup lang="ts">
import { ref } from 'vue'
import { getUsers, deleteUser, currentUser } from '@/models/users'
import type { User } from '@/models/users'

const users = ref<User[]>(getUsers())
const showModal = ref(false)
const selectedUser = ref<User>({ 'id': 0, 'profilePictureSource': '', 'name': '', 'isAdmin': false })

function removeUser(userId: number) {
    deleteUser(userId)
    users.value = getUsers()
}

function saveUser() {
  if (selectedUser.value) {
    const userIndex = users.value.findIndex(user => user.id === selectedUser.value!.id)
    if (userIndex !== -1) {
      users.value[userIndex] = { ...selectedUser.value }
    }
    showModal.value = false
  }
}
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
            <tr v-for="user in users" :key="user.id">
            <td><img class="image is-48x48" v-bind:src="user.profilePictureSource"></td>
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.isAdmin ? 'Yes' : 'No' }}</td>
            <td>
                <div class="column">
                    <button v-if="!(user.isAdmin)" class="button is-danger mr-2" @click="removeUser(user.id)"><i class="fa-solid fa-trash-can pr-2"></i>Delete User</button>
                    <button class="button is-info ml-2" @click="showModal = true, selectedUser = { ... user }"><i class="fa-solid fa-user-pen pr-2"></i>Edit User</button>
                </div>
            </td>
            </tr>
        </tbody>
      </table>
    </div>

    <div class="modal" :class="{ 'is-active': showModal }">
    <div class="modal-background" @click="showModal = false"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Edit User</p>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input class="input" type="text" v-model="selectedUser!.name" placeholder="Enter new name">
          </div>
        </div>
        <div class="field">
          <label class="label">Admin</label>
          <div class="control">
            <label v-if="currentUser" class="checkbox" :class="{ 'admin-revokation-message': selectedUser.id === currentUser?.id }" :data-tooltip="selectedUser && selectedUser.id === currentUser!.id ? 'You cannot revoke your own admin status' : ''">
              <input type="checkbox" v-model="selectedUser!.isAdmin" :disabled="selectedUser && selectedUser.id === currentUser?.id">
              Is Admin
            </label>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="saveUser">Save</button>
        <button class="button" @click="showModal = false">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.admin-revokation-message[data-tooltip]:hover::after {
  content: attr(data-tooltip);
  position: absolute;
  background: #333;
  color: #fff;
  padding: 5px;
  border-radius: 3px;
  white-space: nowrap;
  z-index: 1000;
  bottom: 100%;
  left: 120%;
  transform: translateX(-50%);
  margin-bottom: 5px;
  font-size: 12px;
}
</style>

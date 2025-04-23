<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { getUsers, type User } from '@/models/users'
import * as session from '@/models/connection/session'

let currentSession = session.refSession()
let users = ref<User[]>([])

getUsers().then((data) => {
  users.value = data
})

const router = useRouter()
const navbarBurgerActive = ref(false)
const loginDropdownActive = ref(false)

function generateRoute(route: string) {
  if (session.isLoggedIn()) {
    return `/${route}`
  } else {
    return '/logged-out'
  }
}

function login(userId: number) {
  session.login(userId).then(() => {
    router.push('/')
  })
}
</script>

<template>
  <nav class="navbar is-warning" role="navigation">
    <div class="container">
      <div class="navbar-brand">
        <RouterLink to="/" class="navbar-item pr-3 pl-4 router-link-active router-link-exact-active"
          ><img class="logo" src="@/assets/newlogo.svg" width="40"
        /></RouterLink>

        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          :class="{ 'is-active': navbarBurgerActive }"
          @click="navbarBurgerActive = !navbarBurgerActive"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu" :class="{ 'is-active': navbarBurgerActive }">
        <div class="navbar-start">
          <RouterLink
            :to="generateRoute('my-activity')"
            class="navbar-item pr-3 pl-4 router-link-active router-link-exact-active"
            ><span class="icon"><i class="fa-solid fa-person"></i></span>My Activity</RouterLink
          >
          <RouterLink :to="generateRoute('friends-activity')" class="navbar-item pr-3"
            ><span class="icon"><i class="fa-solid fa-people-group"></i></span>Friends'
            Activity</RouterLink
          >
          <RouterLink :to="generateRoute('statistics')" class="navbar-item pr-3"
            ><span class="icon"><i class="fa-solid fa-chart-area"></i></span>Statistics</RouterLink
          >
          <RouterLink to="/" class="navbar-item pr-3"
            ><span class="icon"><i class="fa-solid fa-magnifying-glass"></i></span>Search for
            Friends</RouterLink
          >
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div v-if="session.isLoggedIn()" class="buttons">
              <span>
                <RouterLink
                  v-if="session.isAdmin()"
                  to="/admin"
                  class="navbar-item navbar-admin mr-3"
                >
                  <span><i class="fa-solid fa-triangle-exclamation pr-2"></i></span
                  ><strong><i>Admin Access</i></strong>
                </RouterLink>

                <span><i class="fa-solid fa-user pr-2"></i></span> {{ currentSession.user?.username }}
                <button class="pl-2" @click="(router.push('/logged-out'), session.logout())">
                  <u>Log out</u>
                </button>
              </span>
            </div>
            <div v-else class="buttons">
              <a
                class="button is-link dropdown"
                :class="{ 'is-active': loginDropdownActive }"
                @click="loginDropdownActive = !loginDropdownActive"
              >
                <div class="dropdown-trigger">
                  <span><i class="fa-regular fa-user pr-2"></i></span> Log in
                  <span class="pl-2"><i class="fas fa-angle-down"></i></span>
                </div>
                <div class="dropdown-menu" role="menu">
                  <div class="dropdown-content">
                    <a
                      v-for="user in users"
                      :key="user.user_id"
                      class="dropdown-item"
                      @click="login(user.user_id)"
                    >
                      {{ user.username }}
                    </a>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar-admin {
  color: rgb(255, 255, 255);
  display: inline;
}
</style>

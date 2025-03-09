<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { getUsers, selectUser, currentUser } from '@/models/users'

const users = getUsers()
const router = useRouter()
const navbarBurgerActive = ref(false)
const loginDropdownActive = ref(false)

const activityLink = computed(() => {
  if (currentUser.value) {
    return `/my-activity`
  } else {
    return '/logged-out'
  }
})

function logout() {
  router.push('/logged-out')
  selectUser(null)
}

function login(user) {
  selectUser(user)
  router.push('/')
}
</script>

<template>
  <nav class="navbar is-warning" role="navigation">
    <div class="container">
      <div class="navbar-brand">
        <RouterLink
            to="/"
            class="navbar-item pr-3 pl-4 router-link-active router-link-exact-active"
            ><img class="logo" src="@/assets/newlogo.svg" width="40" /></RouterLink
          >

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
            :to="activityLink"
            class="navbar-item pr-3 pl-4 router-link-active router-link-exact-active"
            ><span class="icon"><i class="fa-solid fa-person"></i></span>My Activity</RouterLink
          >
          <RouterLink to="/friends-activity" class="navbar-item pr-3"
            ><span class="icon"><i class="fa-solid fa-people-group"></i></span>Friends'
            Activity</RouterLink
          >
          <RouterLink to="/" class="navbar-item pr-3"
            ><span class="icon"><i class="fa-solid fa-chart-area"></i></span>Statistics</RouterLink
          >
          <RouterLink to="/" class="navbar-item pr-3"
            ><span class="icon"><i class="fa-solid fa-magnifying-glass"></i></span
            >Search</RouterLink
          >
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div v-if="currentUser">
              <span>
                <span><i class="fa-solid fa-user pr-2"></i></span> {{ currentUser.name }}
                <button class="pl-2" @click="logout">
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
                      :key="user.id"
                      class="dropdown-item"
                      @click="login(user)"
                    >
                      {{ user.name }}
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

<style scoped></style>

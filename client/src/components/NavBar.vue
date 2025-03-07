<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router';

const navbarBurgerActive = ref(false);
</script>

<template>
    <nav class="navbar is-warning" role="navigation">
        <div class="container">
            <div class="navbar-brand">
                <a class="navbar-item" href="/">
                    <img class="logo" src="@/assets/newlogo.svg" width="40">
                </a>
                
                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" :class="{ 'is-active': navbarBurgerActive }" @click="navbarBurgerActive = !navbarBurgerActive">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div class="navbar-menu" :class="{ 'is-active': navbarBurgerActive }">
                <div class="navbar-start">
                    <RouterLink to="/my-activity" class="navbar-item pr-3 pl-4"><span class="icon"><i class="fa-solid fa-person"></i></span>My Activity</RouterLink>
                    <RouterLink to="/friends-activity" class="navbar-item pr-3"><span class="icon"><i class="fa-solid fa-people-group"></i></span>Friends' Activity</RouterLink>
                    <RouterLink to="/" class="navbar-item pr-3"><span class="icon"><i class="fa-solid fa-chart-area"></i></span>Statistics</RouterLink>
                    <RouterLink to="/" class="navbar-item pr-3"><span class="icon"><i class="fa-solid fa-magnifying-glass"></i></span>Search</RouterLink>
                </div>

                <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <a class="button is-link">
                            <span><i class="fa-regular fa-user pr-2"></i></span> Log in
                        </a>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </nav>
</template>

<style scoped>

</style>
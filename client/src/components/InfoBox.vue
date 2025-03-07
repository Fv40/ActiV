<script setup lang="ts">
import { ref } from 'vue'

const workoutStats = ref({
    dayStats: {
        title: 'Today',
        distance: 10,
        duration: 11,
        calories: 12
    },
    weekStats: {
        title: 'This Week',
        distance: 20,
        duration: 21,
        calories: 22
    },
    allStats: {
        title: 'All Time',
        distance: 30,
        duration: 32,
        calories: 34
    }
})
</script>

<template>
    <ul>
        <li v-for="item in workoutStats" :key="item.calories">
            <div class="card column is-6 ml-6 mt-6">
                <div class="card-content has-text-info">
                    <div> 
                        <h1 class="list-title">
                            <strong>{{ item.title }}</strong>
                        </h1>
                        <div class="columns is-mobile is-centered">
                            <div class="column has-text-centered">
                                <p><u>Distance Walked</u></p>
                                <p>{{ item.distance }} mi</p>
                            </div>
                            <div class="column has-text-centered">
                                <p><u>Time Worked</u></p>
                                <p>{{ item.duration }} min</p>
                            </div>
                            <div class="column has-text-centered">
                                <p><u>Calories Consumed</u></p>
                                <p>{{ item.calories }} cal</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    </ul>
</template>

<style scoped>  
h1.list-title {
    font-size: 40px;
    margin-bottom: 10px;
    text-align: center;
}

p {
    font-size: 30px;
    margin-top: 30px;
    margin-bottom: 10px;
}


</style>
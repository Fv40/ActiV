<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getMealsForUser, addMeal, type Meal } from '@/models/meals'
import { refSession } from '@/models/connection/session'

let currentUser = refSession().value.user

const meals = ref<Meal[]>([])
const showAddMeal = ref(false)
const newMeal = ref<Partial<Meal>>({
    calories: 0,
    description: '',
})

function fetchMeals() {
    if (currentUser) {
        getMealsForUser(currentUser.user_id).then(data => {
            meals.value = data
        })
    }
}

function handleAddMeal() {
    if (currentUser && newMeal.value.calories && newMeal.value.description) {
        addMeal({
            user_id: currentUser.user_id,
            calories: Number(newMeal.value.calories),
            description: newMeal.value.description,
        }).then(() => {
            showAddMeal.value = false
            newMeal.value = { calories: 0, description: '' }
            fetchMeals()
        })
    }
}

onMounted(fetchMeals)
</script>

<template>
    <div class="box mt-5">
        <h2 class="subtitle">Your Meals</h2>
        <table class="table is-fullwidth is-striped is-hoverable">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Calories</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="meal in meals" :key="meal.meal_id">
                    <td>{{ meal.description }}</td>
                    <td>{{ meal.calories }} cal</td>
                </tr>
                <tr v-if="meals.length === 0">
                    <td colspan="2" class="has-text-centered has-text-grey-light">No meals logged yet.</td>
                </tr>
            </tbody>
        </table>
        <button class="button is-primary mt-3" @click="showAddMeal = !showAddMeal">
            Add Meal
        </button>
        <div v-if="showAddMeal" class="mt-3">
            <input class="input mb-2" type="number" min="0" v-model="newMeal.calories" placeholder="Calories" />
            <input class="input mb-2" type="text" v-model="newMeal.description" placeholder="Name" />
            <button class="button is-success" @click="handleAddMeal">Save</button>
            <button class="button ml-2" @click="showAddMeal = false">Cancel</button>
        </div>
    </div>
</template>
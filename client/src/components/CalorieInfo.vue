<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { getTotalCaloriesForUserOnDate, getMealsForUser, type Meal } from '@/models/meals'
import { type User } from '@/models/users'

const props = defineProps<{
  user: User
}>()

const today = new Date().toISOString().slice(0, 10)
const calories = ref<number | null>(null)
const meals = ref<Meal[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

function fetchCaloriesAndMeals() {
  if (!props.user.user_id) return
  loading.value = true
  error.value = null
  Promise.all([
    getTotalCaloriesForUserOnDate(props.user.user_id, today),
    getMealsForUser(props.user.user_id, today)
  ])
    .then(([calorieRes, mealsRes]) => {
      calories.value = calorieRes.totalCalories
      meals.value = mealsRes
      loading.value = false
    })
    .catch(e => {
      error.value = 'Could not fetch data'
      loading.value = false
    })
}

onMounted(fetchCaloriesAndMeals)
watch(() => props.user.user_id, fetchCaloriesAndMeals)
</script>

<template>
  <div class="box calorie-info">
    <div class="user-header mb-3">
      <img
        :src="user.profile_picture_source"
        alt="Profile picture"
        class="is-rounded"
        width="60"
        height="60"
      />
      <h2 class="subtitle mb-2 ml-3">{{ user.username }}'s Calories</h2>
    </div>
    <div v-if="loading" class="has-text-grey-light">Loading...</div>
    <div v-else-if="error" class="has-text-danger">{{ error }}</div>
    <div v-else>
      <div class="calorie-total mb-3">
        <span class="has-text-weight-bold calorie-number">{{ calories ?? 0 }}</span>
        <span class="has-text-grey calorie-unit">cal</span>
      </div>
      <div class="mt-3">
        <h3 class="is-size-6 has-text-grey mb-2">Meals:</h3>
        <ul v-if="meals.length > 0" class="meal-list">
          <li v-for="meal in meals" :key="meal.meal_id" class="meal-entry">
            <span class="meal-desc">{{ meal.description }}</span>
            <span class="meal-calories">{{ meal.calories }} cal</span>
          </li>
        </ul>
        <div v-else class="has-text-grey-light">No meals logged today.</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calorie-info {
  min-width: 220px;
  text-align: center;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(50, 115, 220, 0.07);
  border-radius: 12px;
  background: #383838;
}

.user-header {
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-header img {
  flex-shrink: 0;
  border: 2px solid #3273dc;
  background: #fff;
}

.user-header h2 {
  margin-bottom: 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.calorie-total {
  display: flex;
  align-items: baseline;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.calorie-number {
  font-size: 2.2rem;
  color: #c5a801;
  margin-right: 0.3em;
}

.calorie-unit {
  font-size: 1.1rem;
}

.meal-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.meal-entry {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff3f;
  border-radius: 6px;
  padding: 6px 12px;
  margin-bottom: 6px;
  font-size: 1rem;
}

.meal-desc {
  color: #ffffff;
  font-weight: 500;
}

.meal-calories {
  color: #ffffff;
  font-weight: 600;
}
</style>
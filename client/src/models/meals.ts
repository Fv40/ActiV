import { api } from '@/models/connection/session'

export interface Meal {
  meal_id?: number
  user_id: number
  calories: number
  meal_time?: string
  description: string
}

const MEAL_ENDPOINT = '/meals'

export function addMeal(meal: Meal): Promise<Meal> {
  return api('post', MEAL_ENDPOINT, meal)
}

export function getMealsForUser(userId: number, date?: string): Promise<Meal[]> {
  const url = date
    ? `${MEAL_ENDPOINT}/user/${userId}?date=${date}`
    : `${MEAL_ENDPOINT}/user/${userId}`
  return api('get', url, {})
}

export function getMealById(mealId: number): Promise<Meal> {
  return api('get', `${MEAL_ENDPOINT}/${mealId}`, {})
}

export function updateMeal(mealId: number, updates: Partial<Meal>): Promise<Meal> {
  return api('put', `${MEAL_ENDPOINT}/${mealId}`, updates)
}

export function deleteMeal(mealId: number): Promise<void> {
  return api('delete', `${MEAL_ENDPOINT}/${mealId}`, {})
}

export function getTotalCaloriesForUserOnDate(userId: number, date: string): Promise<{ totalCalories: number }> {
  return api('get', `${MEAL_ENDPOINT}/user/${userId}/calories?date=${date}`, {})
}

export function getTotalCaloriesForUserInRange(userId: number, startDate: string, endDate: string): Promise<{ totalCalories: number }> {
  return api('get', `${MEAL_ENDPOINT}/user/${userId}/calories?startDate=${startDate}&endDate=${endDate}`, {})
}
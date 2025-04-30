const connection = require("./connection.js");

const TABLE = "meals";
const mealTable = () => connection.connect().from(TABLE);

async function createMeal(meal) {
  const { data: newMeal, error } = await mealTable()
    .insert(meal)
    .select("*")
    .single();

  if (error) throw error;
  return newMeal;
}

async function getMealsForUser(user_id, date = null) {
  let query = mealTable().select("*").eq("user_id", user_id);
  if (date) {
    query = query.gte("meal_time", date + " 00:00:00").lte("meal_time", date + " 23:59:59");
  }
  const { data: meals, error } = await query.order("meal_time", { ascending: false });
  if (error) throw error;
  return meals;
}

async function getMealById(meal_id) {
  const { data: meal, error } = await mealTable()
    .select("*")
    .eq("meal_id", meal_id)
    .single();
  if (error) throw error;
  return meal;
}

async function updateMeal(meal_id, updates) {
  const { data: updatedMeal, error } = await mealTable()
    .update(updates)
    .eq("meal_id", meal_id)
    .select("*")
    .single();
  if (error) throw error;
  return updatedMeal;
}

async function deleteMeal(meal_id) {
  const { data: deletedMeal, error } = await mealTable()
    .delete()
    .eq("meal_id", meal_id)
    .select("*")
    .single();
  if (error) throw error;
  return deletedMeal;
}

async function getTotalCaloriesForUserOnDate(user_id, date) {
  const { data, error } = await mealTable()
    .select("calories")
    .eq("user_id", user_id)
    .gte("meal_time", date + " 00:00:00")
    .lte("meal_time", date + " 23:59:59");

  if (error) throw error;
  const total = data.reduce((sum, meal) => sum + meal.calories, 0);
  return total;
}

async function getTotalCaloriesForUserInRange(user_id, startDate, endDate) {
    const { data, error } = await mealTable()
      .select("calories")
      .eq("user_id", user_id)
      .gte("meal_time", startDate + " 00:00:00")
      .lte("meal_time", endDate + " 23:59:59");
  
    if (error) throw error;
    const total = data.reduce((sum, meal) => sum + meal.calories, 0);
    return total;
  }

module.exports = {
  createMeal,
  getMealsForUser,
  getMealById,
  updateMeal,
  deleteMeal,
  getTotalCaloriesForUserOnDate,
  getTotalCaloriesForUserInRange
};
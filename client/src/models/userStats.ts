import { getMealsForUser } from './meals'
import { getActivitiesForUser } from './activity'

export const TODAY = 'Today'
export const THIS_WEEK = 'This Week'
export const ALL_TIME = 'All Time'

interface UserStats {
  timeWorkedOut: number
  caloriesConsumed: number
  activitiesCompleted: number
}

export interface UserStatOverTime {
  timePeriod: string
  userStats: UserStats
}

function getDateString(date: Date) {
  return date.toISOString().slice(0, 10)
}

function getWeekStart(date: Date) {
  const d = new Date(date)
  d.setDate(d.getDate() - d.getDay())
  return getDateString(d)
}

function getWeekEnd(date: Date) {
  const d = new Date(date)
  d.setDate(d.getDate() + (6 - d.getDay()))
  return getDateString(d)
}

export async function getUserStats(userId: number): Promise<UserStatOverTime[]> {
  const today = new Date()
  const todayStr = getDateString(today)
  const weekStart = getWeekStart(today)
  const weekEnd = getWeekEnd(today)

  const [mealsToday, mealsAll, activitiesAll] = await Promise.all([
    getMealsForUser(userId, todayStr),
    getMealsForUser(userId),
    getActivitiesForUser(userId), 
  ])

  // Activities
  const activitiesTodayArr = activitiesAll.filter(activity => {
    const date = getDateString(new Date(activity.activity_date))
    return date === todayStr
  })
  
  const activitiesWeekArr = activitiesAll.filter(activity => {
    const date = getDateString(new Date(activity.activity_date))
    return date >= weekStart && date <= weekEnd
  })

  // Calories
  const caloriesToday = mealsToday.reduce((sum, m) => sum + m.calories, 0)
  const caloriesWeek = mealsAll
    .filter((m) => m.meal_time && m.meal_time >= weekStart && m.meal_time <= weekEnd)
    .reduce((sum, m) => sum + m.calories, 0)
  const caloriesAll = mealsAll.reduce((sum, m) => sum + m.calories, 0)

  const timeToday = activitiesTodayArr.reduce((sum, a) => sum + (a.duration_m || 0), 0)
  const timeWeek = activitiesWeekArr.reduce((sum, a) => sum + (a.duration_m || 0), 0)
  const timeAll = activitiesAll.reduce((sum, a) => sum + (a.duration_m || 0), 0)

  return [
    {
      timePeriod: TODAY,
      userStats: {
        timeWorkedOut: timeToday,
        caloriesConsumed: caloriesToday,
        activitiesCompleted: activitiesTodayArr.length,
      },
    },
    {
      timePeriod: THIS_WEEK,
      userStats: {
        timeWorkedOut: timeWeek,
        caloriesConsumed: caloriesWeek,
        activitiesCompleted: activitiesWeekArr.length,
      },
    },
    {
      timePeriod: ALL_TIME,
      userStats: {
        timeWorkedOut: timeAll,
        caloriesConsumed: caloriesAll,
        activitiesCompleted: activitiesAll.length,
      },
    },
  ]
}
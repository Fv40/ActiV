import { ref } from 'vue'

export const TODAY = 'Today'
export const THIS_WEEK = 'This Week'
export const ALL_TIME = 'All Time'

interface UserStats {
  distanceWalked: number
  timeWorkedOut: number
  caloriesConsumed: number
}

export interface UserStatOverTime {
  timePeriod: string
  userStats: UserStats
}

let userStatMap = new Map<number, UserStatOverTime[]>()

userStatMap.set(1, [
  { timePeriod: TODAY, userStats: { distanceWalked: 5, timeWorkedOut: 30, caloriesConsumed: 900 } },
  {
    timePeriod: THIS_WEEK,
    userStats: { distanceWalked: 35, timeWorkedOut: 210, caloriesConsumed: 1400 },
  },
  {
    timePeriod: ALL_TIME,
    userStats: { distanceWalked: 150, timeWorkedOut: 900, caloriesConsumed: 5000 },
  },
])

userStatMap.set(2, [
  { timePeriod: TODAY, userStats: { distanceWalked: 3, timeWorkedOut: 20, caloriesConsumed: 950 } },
  {
    timePeriod: THIS_WEEK,
    userStats: { distanceWalked: 21, timeWorkedOut: 140, caloriesConsumed: 1250 },
  },
  {
    timePeriod: ALL_TIME,
    userStats: { distanceWalked: 90, timeWorkedOut: 600, caloriesConsumed: 4500 },
  },
])

userStatMap.set(3, [
  { timePeriod: TODAY, userStats: { distanceWalked: 4, timeWorkedOut: 25, caloriesConsumed: 180 } },
  {
    timePeriod: THIS_WEEK,
    userStats: { distanceWalked: 55, timeWorkedOut: 175, caloriesConsumed: 1260 },
  },
  {
    timePeriod: ALL_TIME,
    userStats: { distanceWalked: 70, timeWorkedOut: 750, caloriesConsumed: 5400 },
  },
])

userStatMap.set(4, [
  { timePeriod: TODAY, userStats: { distanceWalked: 6, timeWorkedOut: 35, caloriesConsumed: 220 } },
  {
    timePeriod: THIS_WEEK,
    userStats: { distanceWalked: 42, timeWorkedOut: 245, caloriesConsumed: 1540 },
  },
  {
    timePeriod: ALL_TIME,
    userStats: { distanceWalked: 180, timeWorkedOut: 1050, caloriesConsumed: 6600 },
  },
])

const userStats = ref(userStatMap)

export function getUserStats() {
  return userStats
}

export { userStatMap }

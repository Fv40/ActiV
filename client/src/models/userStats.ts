import { ref } from 'vue'

const TODAY = 'Today'
const THIS_WEEK = 'This Week'
const ALL_TIME = 'All Time'

interface UserStats {
  distanceWalked: number
  timeWorkedOut: number
  caloriesConsumed: number
}

interface UserStatOverTime {
  timePeriod: string
  userStats: UserStats
}

let userStatMap = new Map<number, UserStatOverTime[]>()

userStatMap.set(1, [
  { timePeriod: TODAY, userStats: { distanceWalked: 5, timeWorkedOut: 30, caloriesConsumed: 200 } },
  {
    timePeriod: THIS_WEEK,
    userStats: { distanceWalked: 35, timeWorkedOut: 210, caloriesConsumed: 1400 },
  },
  {
    timePeriod: ALL_TIME,
    userStats: { distanceWalked: 150, timeWorkedOut: 900, caloriesConsumed: 6000 },
  },
])

userStatMap.set(2, [
  { timePeriod: TODAY, userStats: { distanceWalked: 3, timeWorkedOut: 20, caloriesConsumed: 150 } },
  {
    timePeriod: THIS_WEEK,
    userStats: { distanceWalked: 21, timeWorkedOut: 140, caloriesConsumed: 1050 },
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
    userStats: { distanceWalked: 28, timeWorkedOut: 175, caloriesConsumed: 1260 },
  },
  {
    timePeriod: ALL_TIME,
    userStats: { distanceWalked: 120, timeWorkedOut: 750, caloriesConsumed: 5400 },
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

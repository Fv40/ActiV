import { api } from '@/models/connection/session'

export interface Activity {
  activity_id?: number
  user_id: number
  thumbnail_src: string
  activity_description: string
  activity_type: string
  duration_m: number
  activity_date: Date
}

const ACTIVITY_ENDPOINT = '/activities'

export function getActivities(): Promise<Activity[]> {
  return api('get', ACTIVITY_ENDPOINT, {})
}

export function getActivitiesForUser(userId: number): Promise<Activity[]> {
  return api('get', `${ACTIVITY_ENDPOINT}/${userId}`, {})
}

export function addActivity(activity: Activity): Promise<Activity[]> {
  return api('post', ACTIVITY_ENDPOINT, activity)
}

export function getActivitiesForFriendgroup(group_id: number): Promise<Activity[]> {
  return api('get', `${ACTIVITY_ENDPOINT}/friendgroups/${group_id}`, {})
}

export function getActivitiesForFriendgroups(groupIds: number[]): Promise<Activity[]> {
  return api('get', `${ACTIVITY_ENDPOINT}/friendgroups?ids=${groupIds}`, {})
}

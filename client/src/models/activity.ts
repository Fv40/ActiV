import * as session from '@/models/connection/session'

export interface Activity {
  activity_id?: number
  user_id: number
  thumbnail_src: string
  activity_description: string
  activity_type: string
  activity_date: Date
}

export function getActivities(): Promise<Activity[]> {
  return session.api("get", "/activities", {})
}

export function getActivitiesForUser(userId: number): Promise<Activity[]> {
  return session.api("get", `/activities/${userId}`, {})
}

export function addActivity(activity: Activity):Promise<Activity[]> {
  return session.api("post", "/activities", {
    activity
  })
}

import { api } from '@/models/connection/session'

export interface Invite {
  invite_id: number
  group_id: number
  user_id: number
  invite_date: string
  is_read: boolean
}

const NOTIFICATION_ENDPOINT = '/notifications'

export function getInvitesForUser(userId: number): Promise<Invite[]> {
  return api('get', `${NOTIFICATION_ENDPOINT}/${userId}`, {})
}

export function createInvite(group_id: number, user_id: number): Promise<Invite> {
  return api('post', NOTIFICATION_ENDPOINT, { group_id, user_id })
}

export function setInviteRead(invite_id: number): Promise<Invite> {
  return api('patch', `${NOTIFICATION_ENDPOINT}/${invite_id}/read`, {})
}
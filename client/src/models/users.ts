import { api } from './connection/session'

export interface User {
  user_id: number
  profile_picture_source: string
  username: string
  email: string
  isAdmin: boolean
  friendgroups: number[]
}

const USER_ENDPOINT = '/users'

export function getUsers(): Promise<User[]> {
  return api<User[]>('get', USER_ENDPOINT, {})
}

export function getUserById(id: number): Promise<User> {
  return api<User>('get', `${USER_ENDPOINT}/${id}`, {})
}

export function getBulkUsers(ids: number[]): Promise<User[]> {
  return api<User[]>('get', `${USER_ENDPOINT}/bulk?ids=${ids}`, {})
}

export function updateUser(id: number, updateBody: object): Promise<User> {
  return api<User>('put', `${USER_ENDPOINT}/${id}`, updateBody)
}

export function deleteUser(id: number): Promise<User> {
  return api<User>('delete', `${USER_ENDPOINT}/${id}`, {})
}

export function searchUsers(query: string): Promise<User[]> {
  return api<User[]>('get', `${USER_ENDPOINT}/search?query=${query}`, {})
}
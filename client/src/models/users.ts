import { ref } from 'vue'
import { api } from './connection/session'

export interface User {
  user_id: number
  profile_picture_source: string
  username: string
  email: string
  isAdmin: boolean
}

export function getUsers(): Promise<User[]> {
  return api<User[]>('get', '/users', {})
}

export function getUserById(id: number): Promise<User> {
  return api<User>('get', `/users/${id}`, {})
}

export function updateUser(id: number, updateBody: object): Promise<User> {
  return api<User>('put', `/users/${id}`, updateBody)
}

export function deleteUser(id: number): Promise<User> {
  return api<User>('delete', `/users/${id}`, {})
}

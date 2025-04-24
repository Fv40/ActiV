import { ref } from 'vue'
import * as connection from './connection'
import { getUserById, type User } from '../users'

export function api<T>(method: string, action: string, body: object): Promise<T> {
  return connection.api<T>(method, action, body)
}

const session = ref({
  user: null as User | null,
})

export function refSession() {
  return session
}

export const isAdmin = () => session.value?.user?.isAdmin

export const isLoggedIn = () => session.value?.user !== null

export function login(id: number) {
  return getUserById(id).then((user) => {
    session.value.user = user
  })
}

export function logout() {
  session.value.user = null
}
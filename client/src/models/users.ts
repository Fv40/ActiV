import { ref } from 'vue'

interface User {
  id: number
  name: string
  isAdmin: boolean
}

const users = ref<User[]>([
  {
    id: 1,
    name: 'John Doe',
    isAdmin: false,
  },
  {
    id: 2,
    name: 'Jane Doe',
    isAdmin: false,
  },
  {
    id: 3,
    name: 'John Smith',
    isAdmin: false,
  },
  {
    id: 4,
    name: 'Spongebob',
    isAdmin: true,
  },
])

export const currentUser = ref<User | null>(null)

export function getUsers() {
  return users
}

export function selectUser(user: User) {
  currentUser.value = user
}

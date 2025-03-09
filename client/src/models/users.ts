import { ref } from 'vue'
import { useRouter } from 'vue-router'

export interface User {
  id: number,
  profilePictureSource: string
  name: string
  isAdmin: boolean
}

const users = ref<User[]>([
  {
    id: 1,
    profilePictureSource: 'https://i.pinimg.com/736x/c0/27/be/c027bec07c2dc08b9df60921dfd539bd.jpg',
    name: 'John Doe',
    isAdmin: false,
  },
  {
    id: 2,
    profilePictureSource: 'https://st2.depositphotos.com/6169132/9571/v/450/depositphotos_95710278-stock-illustration-cartoon-woman-stock-photos.jpg',
    name: 'Jane Doe',
    isAdmin: false,
  },
  {
    id: 3,
    profilePictureSource: 'https://thumbs.dreamstime.com/z/happy-old-man-29332682.jpg',
    name: 'John Smith',
    isAdmin: false,
  },
  {
    id: 4,
    profilePictureSource: 'https://static.wikia.nocookie.net/aee701d9-e062-4ef6-90f2-ba0eb431cf79',
    name: 'Spongebob',
    isAdmin: true,
  },
])

export const currentUser = ref<User | null>(null)

export function getUsers() {
  return users
}

export function getUserById(id: number) {
  return users.value.find(user => user.id === id)
}

export function selectUser(user: User | null) {
  currentUser.value = user
}
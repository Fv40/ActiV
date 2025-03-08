import { ref } from 'vue'

interface Activity {
  user_id: number
  image_location: string
  name: string
  description: string
  date: Date
}

const activities = ref<Activity[]>([
  {  },
])

export function getActivities() {
  return activities
}
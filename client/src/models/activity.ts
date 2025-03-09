import { ref } from 'vue'

export interface Activity {
  userId: number
  imageSource: string
  title: string
  type: string
  date: Date
}

const activities = ref<Activity[]>([
  {
    userId: 1,
    imageSource: 'https://static2.bigstockphoto.com/5/3/9/large2/93519371.jpg',
    title: 'Ran down the road',
    type: 'Cardio',
    date: new Date(2025, 2, 9),
  },
  {
    userId: 1,
    imageSource:
      'https://web-back.perfectgym.com/sites/default/files/styles/900x/public/equipment%20(6).jpg?itok=UbaJqjIr',
    title: 'Lifted dumbells',
    type: 'Strength',
    date: new Date(2025, 2, 7),
  },
  {
    userId: 2,
    imageSource:
      'https://halfmarathonforbeginners.com/wp-content/uploads/2017/06/AdobeStock_91059214.jpeg',
    title: 'Ran a marathon',
    type: 'Cardio',
    date: new Date(2025, 2, 5),
  },
  {
    userId: 3,
    imageSource:
      'https://www.proteinreview.com.au/wp-content/uploads/2018/08/how-to-deadlift-hero.jpg',
    title: 'Deadlifts',
    type: 'Strength',
    date: new Date(2025, 2, 8),
  },
  {
    userId: 4,
    imageSource:
      'https://images6.fanpop.com/image/photos/43300000/Spongebob-jellyfishing-spongebob-squarepants-43381957-1200-1203.jpg',
    title: 'Jellyfishing',
    type: 'Cardio',
    date: new Date(2025, 2, 6),
  },
  {
    userId: 4,
    imageSource: 'https://backend.everyfra.me/spongebob/s1e1/258.png',
    title: 'Weightlifting',
    type: 'Strength',
    date: new Date(2025, 2, 2),
  },
])

export function getActivities() {
  return activities.value.sort((a, b) => b.date.getTime() - a.date.getTime())
}

export function getActivitiesForUser(userId: number) {
  return activities.value
    .filter((activity) => activity.userId === userId)
    .sort((a, b) => b.date.getTime() - a.date.getTime())
}

export function addActivity(activity: Activity) {
  activities.value.push(activity)
}

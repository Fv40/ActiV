import { ref } from 'vue'

const users = ref([
    { 
        id: 1,
        name: 'John Doe',
        isAdmin: false
    },
    { 
        id: 2, 
        name: 'Jane Doe', 
        isAdmin: false
    },
    { 
        id: 3, 
        name: 'John Smith', 
        isAdmin: false
    },
    { 
        id: 4, 
        name: 'Spongebob',
        isAdmin: true
    }
])

export function getUsers() {
    return users
}
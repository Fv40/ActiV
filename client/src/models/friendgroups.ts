import { api } from '@/models/connection/session'

export type Friendgroup = {
    group_id: number
    group_name: string
    group_picture_source: string
    group_description: string
    group_members: number[]
    owner_id: number
}

const FRIENDGROUP_ENDPOINT = '/friendgroups'

export function getFriendgroupsForUser(user_id: number): Promise<Friendgroup[]> {
    return api<Friendgroup[]>('get', `${FRIENDGROUP_ENDPOINT}/user/${user_id}`, {})
}

export function removeUserFromFriendgroup(group_id: number, user_id: number): Promise<Friendgroup> {
    return api<Friendgroup>('delete', `${FRIENDGROUP_ENDPOINT}/${group_id}/user/${user_id}`, {})
}
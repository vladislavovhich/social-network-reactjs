import { AxiosError } from "axios"
import { Credentials, LoginType, UserOne, UserProfile } from "../types/user.types"
import { api } from "./api"
import { ErrorResponse } from "../types/user.types"
import { GroupFull, GroupRule } from "../types/group.types"

export const GroupApi = {
    get: async (groupId: number): Promise<GroupFull> => {
        const response = await api.get(`/groups/${groupId}`)
        const group = response.data as GroupFull

        return group
    },

    getGroupModerators: async (groupId: number): Promise<UserOne[]> => {
        const response = await api.get(`/groups/${groupId}/moderators`)
        const moderators = response.data as UserOne[]

        return moderators
    },

    getGroupRules: async (groupId: number): Promise<GroupRule[]> => {
        const response = await api.get(`/groups/${groupId}/rules`)
        const moderators = response.data as GroupRule[]

        return moderators
    }
}
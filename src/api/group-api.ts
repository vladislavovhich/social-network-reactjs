import { AxiosError } from "axios"
import { Credentials, LoginType, UserOne, UserProfile } from "../types/user.types"
import { api } from "./api"
import { ErrorResponse } from "../types/user.types"
import { GroupFull, GroupPost, GroupRule, PaginationResponse, PostSearchParams } from "../types/group.types"

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
    },

    getGroupPosts: async (groupId: number, postSearchParams: PostSearchParams): Promise<PaginationResponse<GroupPost>> => {
        const params = new URLSearchParams()

        if (postSearchParams.page) {
            params.append("page", postSearchParams.page.toString())
        }

        if (postSearchParams.pageSize) {
            params.append("pageSize", postSearchParams.pageSize.toString())
        }

        params.append("date", postSearchParams.date)
        params.append("post", postSearchParams.post)

        const response = await api.get(`/groups/${groupId}/posts`, { params })
        const posts = response.data as PaginationResponse<GroupPost>

        return posts
    }
}
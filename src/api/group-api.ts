import { AxiosError } from "axios"
import { Credentials, LoginType, UserOne, UserProfile } from "../types/user.types"
import { api } from "./api"
import { ErrorResponse } from "../types/user.types"
import { BanUser, CreateGroup, GetGroupUsersParams, Group, GroupFull, GroupPost, GroupRule, GroupSuggestPostsParams, PaginationResponse, PostSearchParams, UnbanUser, UserBanned } from "../types/group.types"

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
    },

    votePost: async (postId: number, value: number) => {
        if (value == 1) {
            const response = await api.put(`/posts/${postId}/upvote`)
        } else if (value == -1) {
            const response = await api.put(`/posts/${postId}/downvote`)
        }
    },

    markPostAsViewd: async (postId: number) => {
        const response = await api.post(`/posts/${postId}/view`)
    },

    getNotPublishedPosts: async (data: GroupSuggestPostsParams) => {
        const params = new URLSearchParams()

        if (data.page) {
            params.append("page", data.page.toString())
        }

        if (data.pageSize) {
            params.append("pageSize", data.pageSize.toString())
        }

        const response = await api.get(`/groups/${data.groupId}/posts-not-published`, { params })

        const posts = response.data as PaginationResponse<GroupPost>

        return posts
    },

    createPost: async (formData: FormData, groupId: number) => {
        const response = await api.post(`/groups/${groupId}/posts`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })  
    },


    publishPost: async (postId: number) => {
        const response = api.get(`/posts/${postId}/publish`)
    },

    getBannedUsers: async (data: GetGroupUsersParams): Promise<PaginationResponse<UserBanned>> => {
        const params = new URLSearchParams()

        if (data.page) {
            params.append("page", data.page.toString())
        }

        if (data.pageSize) {
            params.append("pageSize", data.pageSize.toString())
        }

        const response = await api.get(`/groups/${data.groupId}/banned-users`, { params })
        
        const users = response.data as PaginationResponse<UserBanned>
        
        return users
    },

    getSubscribers: async (data: GetGroupUsersParams): Promise<PaginationResponse<UserOne>> => {
        const params = new URLSearchParams()

        if (data.page) {
            params.append("page", data.page.toString())
        }

        if (data.pageSize) {
            params.append("pageSize", data.pageSize.toString())
        }

        const response = await api.get(`/groups/${data.groupId}/subscribers`, { params })
        const users = response.data as PaginationResponse<UserOne>
        
        return users
    },

    unbanUser: async (data: UnbanUser) => {
        const response = await api.put(`/groups/${data.groupId}/unban-user/${data.userId}`)
    },

    banUser: async (data: BanUser) => {
        const response = await api.put(`/groups/${data.groupId}/ban-user/${data.userId}`, {reason: data.reason, time: data.time})
    },

    subscribe: async (groupId: number) => {
        const response = await api.put(`/group/${groupId}/subscribe`) 
    },

    unsubscribe: async (groupId: number) => {
        const response = await api.put(`/group/${groupId}/unsubscribe`)
    },

    createGroup: async (data: CreateGroup) => {
        const {name, description, file, rules, categories} = data

        const formData = new FormData()

        formData.append("name", name)
        formData.append("description", description)
        formData.append("categories", categories.join(","))

        if (file) {
            formData.append("file", file)
        }

        const response = await api.post(`/groups/`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })

        const group = response.data as Group

        for (let rule of rules) {
            await api.post(`/groups/${group.id}/rules`, {title: rule.header, text: rule.body})
        }
    }
}
import { Pfp, UserOne } from "./user.types"

export type Tag = {
    id: number
    name: string
}

export type Image = {
    id: number
    url: string
}

export type Category = {
    id: number
    name: string
}

export type Group = {
    id: number
    name: string
    pfp: Pfp 
}

export type GroupFull = {
    id: number,
    name: string,
    description: string,
    totalSubs: number,
    created_at: string,
    admin: UserOne
    pfp: Pfp
    categories: Category[]
}

export type GroupRule = {
    id: number
    order: number
    title: string
    text: string
}

export interface PostSearchParams extends PaginationParams {
    date: string
    post: string
}

export type GroupPost = {
    id: number
    text: string
    views: number
    votes: number
    comments: number
    created_at: string
    publisher: UserOne
    images: Image[]
    tags: Tag[]
    currentUserVote: number | null
}

export type PaginationParams = {
    page?: number
    pageSize?: number
}

export interface GroupSuggestPostsParams extends PaginationParams {
    groupId: number
    setPostsEmpty?: boolean
}

export interface GetGroupUsersParams extends PaginationParams {
    groupId: number
    setUsersEmpty?: boolean
}

export type PaginationResponse<T> = {
    items: T[]
    nextPage?: number
    prevPage?: number
}

export type PostVote = {
    postId: number
    value: number
}

export type SearchPostsThunkParams = {
    groupId: number
    params: PostSearchParams
    setPostsEmpty?: boolean
}

export type UserBanned = {
    bannedAt: string
    unbatAt: string
    reason: string
    user: UserOne
}

export type GroupRuleCreate = {
    order: string,
    header: string,
    body: string
}

export type BanUser = {
    userId: number
    groupId: number
    reason: string
    time: string
}

export type UnbanUser = {
    userId: number
    groupId: number
}

export type CreatePost = {
    groupId: number
    files: string[]
    tags: string[]
    text: string
}

export type PostTag = {
    id: string
    value: string
}
export type CreateGroup = {
    name: string
    description: string
    file?: Blob | null
    categories: string[]
    rules: GroupRuleCreate[]
}
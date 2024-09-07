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

export type PostSearchParams = {
    page?: number
    pageSize?: number
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
}

export type PaginationResponse<T> = {
    items: T[]
    nextPage?: number
    prevPage?: number
}

export type SearchPostsThunkParams = {
    groupId: number
    params: PostSearchParams
    setPostsEmpty?: boolean
}
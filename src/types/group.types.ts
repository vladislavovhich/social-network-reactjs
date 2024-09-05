import { Pfp, UserOne } from "./user.types"

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
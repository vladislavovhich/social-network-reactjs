import { Group } from "./group.types"

export type LoginType = {
    email: string
    password: string
}

export type Pfp = {
    id: number
    url: string
} | null

export type UserOne = {
    id: 0,
    username: string,
    pfp: Pfp
    isVerified: boolean
}

export type UserProfile = {
    id: number,
    username: string,
    email: string,
    birthDate: string,
    created_at: string,
    pfp: Pfp
    groups: Group[]
    isVerified: boolean
}

export type Credentials = {
    email: string,
    password: string
}

export interface ErrorResponse {
    statusCode: number
    message: string
}

export type LoginType = {
    email: string
    password: string
}

export type Pfp = {
    id: number
    url: string
} | null

export type Group = {
    id: number
    name: string
    pfp: Pfp 
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
    
    status: number
    message: string
}
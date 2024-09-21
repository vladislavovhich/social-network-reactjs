import { AxiosError } from "axios"
import { Credentials, LoginType, UserProfile } from "../types/user.types"
import { api } from "./api"
import { ErrorResponse } from "../types/user.types"

export const UserApi = {
    getUser: async (userId: number): Promise<UserProfile> => {
        const response = await api.get(`/users/${userId}/profile`)
        
        const user = response.data as UserProfile

        return user
    },
}
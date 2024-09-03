import { AxiosError } from "axios"
import { Credentials, LoginType, UserProfile } from "../types/user.types"
import { api } from "./api"

export const AuthApi = {
    auth: async (data: Credentials): Promise<UserProfile> => {
        const response = await api.post("/auth/sign-in", JSON.stringify(data))
        const user = response.data as UserProfile

        return user
    },

    authMe: async (): Promise<UserProfile> => {
        const response = await api.get("/users/profile")
        const user = response.data as UserProfile

        return user
    },

    logout: async () => {
        const response = await api.get("/auth/log-out")
    }
}
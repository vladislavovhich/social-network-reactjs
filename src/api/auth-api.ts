import { AxiosError } from "axios"
import { Credentials, LoginType, UserProfile } from "../types/user.types"
import { api } from "./api"
import { ErrorResponse } from "../types/user.types"

export const AuthApi = {
    auth: async (data: Credentials): Promise<UserProfile> => {
        try {
            const response = await api.post("/auth/sign-in", JSON.stringify(data))
            const user = response.data as UserProfile

            return user
        } catch (e: any) {
            throw "Incorrect login or password"
        }
    },

    authMe: async (): Promise<UserProfile> => {
        const response = await api.get("/users/profile")
        const user = response.data as UserProfile

        return user
    },

    register: async (formData: FormData): Promise<UserProfile> => {
        try {
            const response = await api.post("/auth/sign-up", formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })

            const user = response.data as UserProfile

            return user
        } catch (e: any) {
            const error = e as AxiosError<ErrorResponse>

            throw error.response?.data?.message || 'Unknown error occurred';
        }
    },

    logout: async () => {
        const response = await api.get("/auth/log-out")
    }
}
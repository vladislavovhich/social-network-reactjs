import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "../../types/user.types";
import { createAppAsyncThunk, GetThunkState, ThunkType } from "../withTypes";
import { UserApi } from "../../api/user-api";

interface UserState {
    user: UserProfile | null
    getUserThunk: ThunkType
}

const state: UserState = {
    user: null,
    getUserThunk: GetThunkState(),
}

export const getUser = createAppAsyncThunk(
    'user/get-user',
    async (userId: number) => {
        const user = UserApi.getUser(userId)

        return user
    }
)

export const userSlice = createSlice({
    name: "user",
    initialState: state,
    reducers: {
        setUser(state, action: PayloadAction<UserProfile>) {
            state.user = action.payload
        }
    },

    extraReducers: builder => {
        builder
            .addCase(getUser.pending, (state, action) => {
                state.getUserThunk.status = 'pending'
            })

            .addCase(getUser.fulfilled, (state, action) => {
                state.getUserThunk.status = 'succeeded'
                state.user = action.payload
            })

            .addCase(getUser.rejected, (state, action) => {
                state.getUserThunk.status = 'rejected'
                state.getUserThunk.error = action.error.message ?? 'Unknown Error'
            })
    }
})

export const {setUser} = userSlice.actions
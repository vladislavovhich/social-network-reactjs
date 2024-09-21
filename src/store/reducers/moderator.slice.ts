import { createSlice } from "@reduxjs/toolkit";
import { GroupApi } from "../../api/group-api";
import { UserOne } from "../../types/user.types";
import { createAppAsyncThunk, GetThunkState, ThunkType } from "../withTypes";

interface IState {
    moderators: UserOne[]
    getModerators: ThunkType
}

const state: IState = {
    moderators: [],
    getModerators: GetThunkState()
}

export const getModerators = createAppAsyncThunk<UserOne[], number>(
    'moderator/get-moderators',
    async (groupId: number) => {
        const moderators = await GroupApi.getGroupModerators(groupId)

        return moderators
    }
)

export const moderatorSlice = createSlice({
    name: "moderator",
    initialState: state,
    reducers: {},
    extraReducers: builder => {
        builder

        .addCase(getModerators.pending, (state, action) => {
            state.getModerators.status = 'pending'
        })

        .addCase(getModerators.fulfilled, (state, action) => {
            state.getModerators.status = 'succeeded'
            state.moderators = action.payload
        })

        .addCase(getModerators.rejected, (state, action) => {
            state.getModerators.status = 'rejected'
            state.getModerators.error = action.error.message ?? 'Unknown Error'
        })
    }
})
import { createSlice } from "@reduxjs/toolkit";
import { GroupFull, GroupRule } from "../types/group.types";
import { createAppAsyncThunk, GetThunkState, ThunkType } from "./withTypes";
import { GroupApi } from "../api/group-api";
import { UserOne } from "../types/user.types";

interface IGroupState {
    group: GroupFull | null
    rules: GroupRule[] | null
    moderators: UserOne[] | null
    getGroupThunk: ThunkType
    getModeratorsThunk: ThunkType
    getRulesThunk: ThunkType
}

const groupState: IGroupState = {
    group: null,
    rules: null,
    moderators: null,
    getGroupThunk: GetThunkState(),
    getModeratorsThunk: GetThunkState(),
    getRulesThunk: GetThunkState(),
}

export const getGroup = createAppAsyncThunk<GroupFull, number>(
    'group/get-one-group',
    async (groupId: number) => {
        const group = await GroupApi.get(groupId)

        return group
    }
)

export const getModerators = createAppAsyncThunk<UserOne[], number>(
    'group/get-moderators',
    async (groupId: number) => {
        const moderators = await GroupApi.getGroupModerators(groupId)

        return moderators
    }
)

export const getRules = createAppAsyncThunk<GroupRule[], number>(
    'group/get-rules',
    async (groupId: number) => {
        const rules = await GroupApi.getGroupRules(groupId)

        return rules
    }
)

export const groupSlice = createSlice({
    name: 'group',
    initialState: groupState,
    reducers: {

    },
    
    extraReducers: builder => {
        builder
            .addCase(getGroup.pending, (state, action) => {
                state.getGroupThunk.status = 'pending'
            })

            .addCase(getGroup.fulfilled, (state, action) => {
                state.getGroupThunk.status = 'succeeded'
                state.group = action.payload
            })

            .addCase(getGroup.rejected, (state, action) => {
                state.getGroupThunk.status = 'rejected'
                state.getGroupThunk.error = action.error.message ?? 'Unknown Error'
            })


            .addCase(getModerators.pending, (state, action) => {
                state.getModeratorsThunk.status = 'pending'
            })

            .addCase(getModerators.fulfilled, (state, action) => {
                state.getModeratorsThunk.status = 'succeeded'
                state.moderators = action.payload
            })

            .addCase(getModerators.rejected, (state, action) => {
                state.getModeratorsThunk.status = 'rejected'
                state.getModeratorsThunk.error = action.error.message ?? 'Unknown Error'
            })


            .addCase(getRules.pending, (state, action) => {
                state.getRulesThunk.status = 'pending'
            })

            .addCase(getRules.fulfilled, (state, action) => {
                state.getRulesThunk.status = 'succeeded'
                state.rules = action.payload
            })

            .addCase(getRules.rejected, (state, action) => {
                state.getRulesThunk.status = 'rejected'
                state.getRulesThunk.error = action.error.message ?? 'Unknown Error'
            })
    }
})
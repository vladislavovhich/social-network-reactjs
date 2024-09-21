import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetGroupUsersParams, GroupFull, GroupPost, GroupRule, GroupSuggestPostsParams, PostSearchParams, PostVote, SearchPostsThunkParams, UserBanned } from "../../types/group.types";
import { createAppAsyncThunk, GetThunkState, ThunkType } from "../withTypes";
import { GroupApi } from "../../api/group-api";
import { UserOne } from "../../types/user.types";

interface IGroupState {
    group: GroupFull | null
    rules: GroupRule[] | null
    getGroup: ThunkType
    getRules: ThunkType

    getBannedUsers: ThunkType
    getSubscribers: ThunkType

    subscribers: UserOne[]
    subsPage: number
    subsPageSize: number
    subsNextPage: number | null

    bannedUsers: UserBanned[]
    bannedPage: number
    bannedPageSize: number
    bannedNextPage: number | null,
}

const groupState: IGroupState = {
    bannedUsers: [],
    bannedPage: 1,
    bannedPageSize: 5,
    bannedNextPage: null,
    subscribers: [],
    subsPage: 1,
    subsPageSize: 5,
    subsNextPage: null,
    group: null,
    rules: null,    
    getGroup: GetThunkState(),
    getRules: GetThunkState(),
    getBannedUsers: GetThunkState(),
    getSubscribers: GetThunkState(),
}

export const getGroup = createAppAsyncThunk<GroupFull, number>(
    'group/get-one-group',
    async (groupId: number) => {
        const group = await GroupApi.get(groupId)

        return group
    }
)

export const getRules = createAppAsyncThunk<GroupRule[], number>(
    'group/get-rules',
    async (groupId: number) => {
        const rules = await GroupApi.getGroupRules(groupId)

        return rules
    }
)


export const getBannedUsers = createAppAsyncThunk(
    'group/get-banned-users',
    async (data: GetGroupUsersParams) => {
        const result = await GroupApi.getBannedUsers(data)

        return {result, setUsersEmpty: data.setUsersEmpty}
    }
)

export const getSubscribers = createAppAsyncThunk(
    'group/get-subscribers',
    async (data: GetGroupUsersParams) => {
        const result = await GroupApi.getSubscribers(data)

        return {result, setUsersEmpty: data.setUsersEmpty}
    }
)

export const groupSlice = createSlice({
    name: 'group',
    initialState: groupState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getBannedUsers.pending, (state, action) => {
                state.getBannedUsers.status = 'pending'
            })
            .addCase(getBannedUsers.fulfilled, (state, action) => {
                state.getBannedUsers.status = 'succeeded'

                if (!action.payload.setUsersEmpty) {
                    state.bannedUsers = [...state.bannedUsers, ...action.payload.result.items]
                } else {
                    state.bannedUsers = action.payload.result.items
                }

                if (action.payload.result.nextPage) {
                    state.bannedNextPage = action.payload.result.nextPage
                } else {
                    state.bannedNextPage = null
                }
            })
            .addCase(getBannedUsers.rejected, (state, action) => {
                state.getBannedUsers.status = 'rejected'
                state.getBannedUsers.error = action.error.message ?? 'Unknown Error'
            })


            .addCase(getSubscribers.pending, (state, action) => {
                state.getSubscribers.status = 'pending'
            })
            .addCase(getSubscribers.fulfilled, (state, action) => {
                state.getSubscribers.status = 'succeeded'

                if (!action.payload.setUsersEmpty) {
                    state.subscribers = [...state.subscribers, ...action.payload.result.items]
                } else {
                    state.subscribers = action.payload.result.items
                }

                if (action.payload.result.nextPage) {
                    state.subsNextPage = action.payload.result.nextPage
                } else {
                    state.subsNextPage = null
                }
            })
            .addCase(getSubscribers.rejected, (state, action) => {
                state.getSubscribers.status = 'rejected'
                state.getSubscribers.error = action.error.message ?? 'Unknown Error'
            })


            .addCase(getGroup.pending, (state, action) => {
                state.getGroup.status = 'pending'
            })

            .addCase(getGroup.fulfilled, (state, action) => {
                state.getGroup.status = 'succeeded'
                state.group = action.payload
            })

            .addCase(getGroup.rejected, (state, action) => {
                state.getGroup.status = 'rejected'
                state.getGroup.error = action.error.message ?? 'Unknown Error'
            })


            .addCase(getRules.pending, (state, action) => {
                state.getRules.status = 'pending'
            })

            .addCase(getRules.fulfilled, (state, action) => {
                state.getRules.status = 'succeeded'
                state.rules = action.payload
            })

            .addCase(getRules.rejected, (state, action) => {
                state.getRules.status = 'rejected'
                state.getRules.error = action.error.message ?? 'Unknown Error'
            })
    }
})

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GroupFull, GroupPost, GroupRule, PostSearchParams, SearchPostsThunkParams } from "../types/group.types";
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
    getPostsThunk: ThunkType
    postDateBy: string | null
    postSortBy: string | null
    postsPage: number
    postsPageSize: number
    postsNextPage: number | null
    posts: GroupPost[]
}

const groupState: IGroupState = {
    group: null,
    rules: null,
    moderators: null,
    postDateBy: null,
    postSortBy: null,
    posts: [],
    postsPage: 1,
    postsPageSize: 5,
    postsNextPage: null,
    getGroupThunk: GetThunkState(),
    getModeratorsThunk: GetThunkState(),
    getRulesThunk: GetThunkState(),
    getPostsThunk: GetThunkState()
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

export const getPosts = createAppAsyncThunk(
    'group/get-posts',
    async (data: SearchPostsThunkParams, {getState}) => {
        const {groupId, params} = data

        const paginationResponse = await GroupApi.getGroupPosts(groupId, params)

        return {data: paginationResponse, setEmptyPosts: data.setPostsEmpty}
    }
)
export const groupSlice = createSlice({
    name: 'group',
    initialState: groupState,
    reducers: {
        setPostsDateBy(state, action: PayloadAction<string | null>) {
            state.postDateBy = action.payload
        },
        setPostsSortBy(state, action: PayloadAction<string | null>) {
            state.postSortBy = action.payload
        },
        setPosts(state, action: PayloadAction<[]>) {
            state.posts = action.payload
        }
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


            .addCase(getPosts.pending, (state, action) => {
                state.getPostsThunk.status = 'pending'
            })

            .addCase(getPosts.fulfilled, (state, action) => {
                state.getPostsThunk.status = 'succeeded'

                if (action.payload.setEmptyPosts) {
                    state.posts = action.payload.data.items
                } else {
                    state.posts = [...state.posts, ...action.payload.data.items]
                }
                
                if (action.payload.data.nextPage) {
                    state.postsNextPage = action.payload.data.nextPage
                } else {
                    state.postsNextPage = null
                }
            })

            .addCase(getPosts.rejected, (state, action) => {
                state.getPostsThunk.status = 'rejected'
                state.getPostsThunk.error = action.error.message ?? 'Unknown Error'
            })
    }
})

export const {setPostsSortBy, setPostsDateBy, setPosts} = groupSlice.actions
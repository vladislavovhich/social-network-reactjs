import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { GroupApi } from "../../api/group-api"
import { CreatePost, GroupPost, GroupSuggestPostsParams, PostTag, PostVote, SearchPostsThunkParams } from "../../types/group.types"
import { createAppAsyncThunk, GetThunkState, ThunkType } from "../withTypes"

interface State {
    getPosts: ThunkType
    getSuggestPosts: ThunkType
    publishPost: ThunkType
    votePost: ThunkType

    postDateBy: string
    postSortBy: string

    postsPage: number
    postsPageSize: number
    postsNextPage: number | null
    posts: GroupPost[]

    suggestPosts: GroupPost[]
    suggestPostsPage: number
    suggestPostsPageSize: number
    suggestPostsNextPage: number | null
}

const state: State = {
    getPosts: GetThunkState(),
    getSuggestPosts: GetThunkState(),
    publishPost: GetThunkState(),
    votePost: GetThunkState(),

    postDateBy: "month",
    postSortBy: "now",
    postsPage: 1,
    postsPageSize: 5,
    postsNextPage: null,
    posts: [],

    suggestPosts: [],
    suggestPostsPage: 1,
    suggestPostsPageSize: 5,
    suggestPostsNextPage: null,
}

export const getPosts = createAppAsyncThunk(
    'post/get-posts',
    async (data: SearchPostsThunkParams, {getState}) => {
        const {groupId, params} = data

        const paginationResponse = await GroupApi.getGroupPosts(groupId, params)

        return {data: paginationResponse, setEmptyPosts: data.setPostsEmpty}
    }
)

export const getSuggestPosts = createAppAsyncThunk(
    'post/get-suggest-posts',
    async (data: GroupSuggestPostsParams) => {
        const paginationResponse = await GroupApi.getNotPublishedPosts(data)

        return {data: paginationResponse, setEmptyPosts: data.setPostsEmpty}
    }
)

export const publishPost = createAppAsyncThunk(
    'post/publish-post',
    async (postId: number) => {
        const response = await GroupApi.publishPost(postId)

        return postId
    }
)

export const votePost = createAppAsyncThunk(
    'post/upvote-post',
    async (data: PostVote) => {
        const {postId, value} = data

        await GroupApi.votePost(postId, value)

        return data
    }
)

export const postSlice = createSlice({
    name: "post",
    initialState: state,
    reducers: {
        setPostsDateBy(state, action: PayloadAction<string>) {
            state.postDateBy = action.payload
        },

        setPostsSortBy(state, action: PayloadAction<string>) {
            state.postSortBy = action.payload
        },

        setPosts(state, action: PayloadAction<[]>) {
            state.posts = action.payload
        },
    },
    
    extraReducers: builder => {
        builder

        .addCase(votePost.pending, (state, action) => {
            state.votePost.status = 'pending'
        })
        .addCase(votePost.fulfilled, (state, action) => {
            state.votePost.status = 'succeeded'
            
            const {postId, value} = action.payload

            state.posts.forEach(post => {
                if (post.id != postId) {
                    return
                }
                
                post.votes += value
                post.currentUserVote = value
            })
        })
        .addCase(votePost.rejected, (state, action) => {
            state.votePost.status = 'rejected'
            state.votePost.error = action.error.message ?? 'Unknown Error'
        })


        .addCase(publishPost.pending, (state, action) => {
            state.publishPost.status = 'pending'
        })

        .addCase(publishPost.fulfilled, (state, action) => {
            state.publishPost.status = 'succeeded'
            state.suggestPosts = state.suggestPosts.filter((post) => post.id != action.payload)
        })

        .addCase(publishPost.rejected, (state, action) => {
            state.publishPost.status = 'rejected'
            state.publishPost.error = action.error.message ?? 'Unknown Error'
        })

        .addCase(getSuggestPosts.pending, (state, action) => {
            state.getSuggestPosts.status = 'pending'
        })
        .addCase(getSuggestPosts.fulfilled, (state, action) => {
            state.getSuggestPosts.status = 'succeeded'

            if (action.payload.setEmptyPosts) {
                state.suggestPosts = action.payload.data.items
            } else {
                state.suggestPosts = [...state.suggestPosts, ...action.payload.data.items]
            }

            if (action.payload.data.nextPage) {
                state.suggestPostsNextPage = action.payload.data.nextPage
            } else {
                state.suggestPostsNextPage = null
            }
        })
        .addCase(getSuggestPosts.rejected, (state, action) => {
            state.getSuggestPosts.status = 'rejected'
            state.getSuggestPosts.error = action.error.message ?? 'Unknown Error'
        })


        .addCase(getPosts.pending, (state, action) => {
            state.getPosts.status = 'pending'
        })
        .addCase(getPosts.fulfilled, (state, action) => {
            state.getPosts.status = 'succeeded'

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
            state.getPosts.status = 'rejected'
            state.getPosts.error = action.error.message ?? 'Unknown Error'
        })
    }
})

export const {setPosts, setPostsDateBy, setPostsSortBy} = postSlice.actions
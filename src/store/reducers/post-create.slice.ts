import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { GroupApi } from "../../api/group-api"
import { CreatePost, PostTag } from "../../types/group.types"
import { createAppAsyncThunk, GetThunkState, ThunkType } from "../withTypes"

interface State {
    postText: string
    postTags: string[]
    postTagText: string,

    createPost: ThunkType
}

const state: State = {
    postText: "",
    postTags: [],
    postTagText: "",

    createPost: GetThunkState()
}

export const createPost = createAppAsyncThunk(
    'post-create/create',
    async (data: CreatePost) => {
        const {files, tags, text, groupId} = data

        const formData = new FormData()

        formData.append("text", text)
        
        if (files.length) {
            for (let file of files) {
                const res = await fetch(file)
                const blob = await res.blob()
    
                formData.append("files", blob)
            }
        }

        if (tags.length) {
            formData.append("tags", tags.join(","))
        }

        await GroupApi.createPost(formData, groupId)
        
    }
)

export const postCreateSlice = createSlice({
    name: "post-create",
    initialState: state,
    reducers: {
        setPostTagText(state, action: PayloadAction<string>) {
            state.postTagText = action.payload
        },

        setPostText(state, action: PayloadAction<string>) {
            state.postText = action.payload
        },

        addPostTag(state, action: PayloadAction<string>) {
            if (state.postTags.includes(action.payload)) {
                return
            }

            state.postTags.push(action.payload)
        },

        removePostTag(state, action: PayloadAction<string>) {
            state.postTags = state.postTags.filter(item => item != action.payload)
        }
    },
    extraReducers: builder => {
        builder
        
        .addCase(createPost.pending, (state, action) => {
            state.createPost.status = 'pending'
        })

        .addCase(createPost.fulfilled, (state, action) => {
            state.createPost.status = 'succeeded'
        })

        .addCase(createPost.rejected, (state, action) => {
            state.createPost.status = 'rejected'
            state.createPost.error = action.error.message ?? 'Unknown Error'
        })
    }
})

export const {setPostTagText, setPostText, addPostTag, removePostTag} = postCreateSlice.actions
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CommonState {
    notFoundError: string | null
}

const commonState: CommonState = {
    notFoundError: null
}

export const commonSlice = createSlice({
    name: 'group',
    initialState: commonState,
    reducers: {
        setNotFoundError(state, action: PayloadAction<string | null>) {
            state.notFoundError = action.payload
        }
    },
})

export const {setNotFoundError} = commonSlice.actions
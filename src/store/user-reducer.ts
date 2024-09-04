import { createSlice } from "@reduxjs/toolkit";
import { UserProfile } from "../types/user.types";
import { GetThunkState, ThunkType } from "./withTypes";

interface UserState {
    user: UserProfile | null
    getUserThunk: ThunkType
}

const state: UserState = {
    user: null,
    getUserThunk: GetThunkState(),
}

export const userSlice = createSlice({
    name: "user",
    initialState: state,
    reducers: {
        
    }
})
import { createAction, createAsyncThunk, createReducer, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Credentials, UserProfile } from '../types/user.types'
import { AuthApi } from '../api/auth-api'
import { createAppAsyncThunk, GetThunkState, ThunkType } from './withTypes'


interface AuthState {
    authThunk: ThunkType
    authMeThunk: ThunkType
    logoutThunk: ThunkType
    login: string 
    password: string
    isAuthorized: boolean
    loading: boolean;
    error: string | null   
    user: UserProfile | null 
}

const authState: AuthState = {
    authThunk: GetThunkState(),
    authMeThunk: GetThunkState(),
    logoutThunk: GetThunkState(),
    login: "",
    password: "",
    isAuthorized: false,
    loading: false,
    error: null,
    user: null
}

export const auth = createAppAsyncThunk<UserProfile, Credentials>(
    "auth/auth-thunk",
    async (data: Credentials) => {
        const result = await AuthApi.auth(data)

        return result
    }
)

export const authMe = createAppAsyncThunk<UserProfile>(
    'auth/auth-me-thunk',
    async () => {
        const result = await AuthApi.authMe()

        return result
    }
) 

export const logout = createAppAsyncThunk(
  'auth/logout-thunk',
  async () => {
    await AuthApi.logout()
  }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState: authState,
    reducers: {
        setLogin(state, action: PayloadAction<string>) {
            state.login = action.payload
        },

        setPassword(state, action: PayloadAction<string>) {
            state.password = action.payload
        },
    },
    extraReducers: builder => {
        builder
          .addCase(auth.pending, (state, action) => {
            state.authThunk.status = 'pending'
          })
          .addCase(auth.fulfilled, (state, action) => {
            state.authThunk.status = 'succeeded'
            state.isAuthorized = true
            state.user = action.payload
          })
          .addCase(auth.rejected, (state, action) => {
            state.authThunk.status = 'rejected'
            state.error = action.error.message ?? 'Unknown Error'
          })

          .addCase(authMe.fulfilled, (state, action) => {
            state.authMeThunk.status = 'succeeded'
            state.isAuthorized = true
            state.user = action.payload
          })
          .addCase(authMe.pending, (state, action) => {
            state.authMeThunk.status = 'pending'
          })
          .addCase(authMe.rejected, (state, action) => {
            state.authMeThunk.status = 'rejected'
            state.authMeThunk.error = action.error.message ?? 'Unknown Error'
          })

          .addCase(logout.fulfilled, (state, action) => {
            state.logoutThunk.status = 'succeeded'
            state.isAuthorized = false
            state.user = null
          })
          .addCase(logout.pending, (state, action) => {
            state.logoutThunk.status = 'pending'
          })
          .addCase(logout.rejected, (state, action) => {
            state.logoutThunk.status = 'rejected'
            state.logoutThunk.error = action.error.message ?? 'Unknown Error'
          })
      }
})

export const {setLogin, setPassword} = authSlice.actions
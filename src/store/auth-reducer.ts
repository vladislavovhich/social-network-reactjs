import { createAction, createAsyncThunk, createReducer, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Credentials, UserProfile } from '../types/user.types'
import { AuthApi } from '../api/auth-api'
import { createAppAsyncThunk, GetThunkState, ThunkType } from './withTypes'
import { AxiosError } from 'axios'

interface AuthState {
    authThunk: ThunkType
    authMeThunk: ThunkType
    logoutThunk: ThunkType
    registerThunk: ThunkType
    login: string 
    password: string
    isAuthorized: boolean
    user: UserProfile | null 
    username: string
    birthDate: string | null
    filePreview: string | null
}

const authState: AuthState = {
    authThunk: GetThunkState(),
    authMeThunk: GetThunkState(),
    logoutThunk: GetThunkState(),
    registerThunk: GetThunkState(),
    login: "",
    password: "",
    isAuthorized: false,
    user: null,
    username: "",
    birthDate: null,
    filePreview: null
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

export const register = createAppAsyncThunk<UserProfile, FormData>(
  'auth/register-thunk',
  async (formData: FormData) => {
    const result = await AuthApi.register(formData)

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
        setFilePreview(state, action: PayloadAction<string>) {
          state.filePreview = action.payload
          state.registerThunk.error = null
        },

        setDate(state, action: PayloadAction<string>) {
          state.birthDate = action.payload
          state.registerThunk.error = null
        },

        setUsername(state, action: PayloadAction<string>) {
          state.username = action.payload
          state.registerThunk.error = null
        },

        setLogin(state, action: PayloadAction<string>) {
            state.login = action.payload
            state.authThunk.error = null
        },

        setPassword(state, action: PayloadAction<string>) {
            state.password = action.payload
            state.authThunk.error = null
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
            state.authThunk.error = action.error.message ?? 'Unknown Error'
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

          .addCase(register.fulfilled, (state, action) => {
            state.registerThunk.status = 'succeeded'
            state.isAuthorized = true
            state.user = action.payload
          })
          .addCase(register.pending, (state, action) => {
            state.registerThunk.status = 'pending'
          })
          .addCase(register.rejected, (state, action) => {
            state.registerThunk.status = 'rejected'
            state.registerThunk.error = action.error.message ?? 'Unknown Error'
          })
      }
})

export const {setLogin, setPassword, setDate, setUsername, setFilePreview} = authSlice.actions
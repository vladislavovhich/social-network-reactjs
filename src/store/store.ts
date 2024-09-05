import { Action, configureStore, createAsyncThunk, ThunkAction } from '@reduxjs/toolkit'
import { authSlice } from './auth-reducer'
import { userSlice } from './user-reducer'
import { groupSlice } from './group-reducer'
import { commonSlice } from './common-reducer'

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    user: userSlice.reducer,
    group: groupSlice.reducer,
    common: commonSlice.reducer
  },
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export default store
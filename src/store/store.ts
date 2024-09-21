import { Action, configureStore, createAsyncThunk, ThunkAction } from '@reduxjs/toolkit'
import { authSlice } from './reducers/auth.slice'
import { groupSlice } from './reducers/group.slice'
import { moderatorSlice } from './reducers/moderator.slice'
import { postSlice } from './reducers/post.slice'
import { userSlice } from './reducers/user.slice'
import { fileSlice } from './reducers/file.slice'
import { groupCreateSlice } from './reducers/group-create.slice'
import { postCreateSlice } from './reducers/post-create.slice'

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    group: groupSlice.reducer,
    moderator: moderatorSlice.reducer,
    post: postSlice.reducer,
    user: userSlice.reducer,
    file: fileSlice.reducer,
    groupCreate: groupCreateSlice.reducer,
    postCreate: postCreateSlice.reducer
  },
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export default store
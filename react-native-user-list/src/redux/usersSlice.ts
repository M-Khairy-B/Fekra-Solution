import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import type { User } from '../types'

const LIMIT = 5

interface UsersState {
  cachedUsers:    User[]
  displayedCount: number
  searchQuery:    string
}

const initialState: UsersState = {
  cachedUsers:    [],
  displayedCount: LIMIT,
  searchQuery:    '',
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAllUsers(state, action: PayloadAction<User[]>) {
      state.cachedUsers = action.payload
    },
    showMore(state) {
      state.displayedCount += LIMIT
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload
    },
    resetDisplay(state) {
      state.displayedCount = LIMIT
    },
  },
})

export const { setAllUsers, showMore, setSearchQuery, resetDisplay } =
  usersSlice.actions
export default usersSlice.reducer

export const selectCachedUsers    = (state: RootState) => state.users.cachedUsers ?? []
export const selectDisplayedCount = (state: RootState) => state.users.displayedCount
export const selectSearchQuery    = (state: RootState) => state.users.searchQuery

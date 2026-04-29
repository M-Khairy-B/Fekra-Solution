import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { usersApi }  from './usersApi'
import usersReducer  from './usersSlice'

const persistConfig = {
  key:       'root',
  storage:   AsyncStorage,
  whitelist: ['users'], // only persist pagination/search state; RTK Query cache stays ephemeral
}

const rootReducer = combineReducers({
  [usersApi.reducerPath]: usersApi.reducer,
  users: usersReducer,
})

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(usersApi.middleware),
})

setupListeners(store.dispatch)

export const persistor  = persistStore(store)
export type RootState   = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

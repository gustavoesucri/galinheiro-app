import { configureStore, combineReducers } from '@reduxjs/toolkit'
import galinhasReducer from './slices/galinhasSlice'

const rootReducer = combineReducers({
  galinhas: galinhasReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

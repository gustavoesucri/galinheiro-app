import { configureStore, combineReducers } from '@reduxjs/toolkit'
import galinhasReducer from './slices/galinhasSlice'
import ninhosReducer from './slices/ninhosSlice'

const rootReducer = combineReducers({
  galinhas: galinhasReducer,
  ninhos: ninhosReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

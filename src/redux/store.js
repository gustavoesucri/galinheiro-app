import { configureStore, combineReducers } from '@reduxjs/toolkit'
import galinhasReducer from './slices/galinhasSlice'
import ninhosReducer from './slices/ninhosSlice'
import galpoesReducer from './slices/galpoesSlice'

const rootReducer = combineReducers({
  galinhas: galinhasReducer,
  ninhos: ninhosReducer,
  galpoes: galpoesReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

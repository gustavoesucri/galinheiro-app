import { configureStore } from '@reduxjs/toolkit'
import galinhasReducer from './slices/galinhasSlice'

export const store = configureStore({
  reducer: {
    galinhas: galinhasReducer,
  },
})

// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit'
import galinhasReducer from './galinhasSlice'

export const store = configureStore({
  reducer: {
    galinhas: galinhasReducer,
  },
})

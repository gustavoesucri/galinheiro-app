import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import galinhasReducer from './slices/galinhasSlice'
import { Platform } from 'react-native'

// 🔸 Storage: AsyncStorage (native) ou localStorage (web)
import AsyncStorage from '@react-native-async-storage/async-storage'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'

const createNoopStorage = () => ({
  getItem: () => Promise.resolve(null),
  setItem: (_key, value) => Promise.resolve(value),
  removeItem: () => Promise.resolve(),
})

// se for web, usa localStorage; se não, AsyncStorage
const storage =
  Platform.OS === 'web'
    ? createWebStorage('local')
    : AsyncStorage || createNoopStorage()

// combina todos os reducers (futuramente pode ter mais)
const rootReducer = combineReducers({
  galinhas: galinhasReducer,
})

// configuração do persist
const persistConfig = {
  key: 'root',
  storage,
  // aqui o whitelist só faz sentido no nível do rootReducer
  whitelist: ['galinhas'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(store)



// PARA LER OS DADOS (galinhas) NO CONSOLE, USE ISTO:

// const persist = JSON.parse(localStorage.getItem('persist:root'))
// const galinhas = JSON.parse(persist.galinhas)
// console.log(galinhas.lista)

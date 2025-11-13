import { configureStore, combineReducers } from '@reduxjs/toolkit'
import galinhasReducer from './slices/galinhasSlice'
import ninhosReducer from './slices/ninhosSlice'
import galpoesReducer from './slices/galpoesSlice'
import ovosReducer from './slices/ovosSlice'
import medicoesAmbienteReducer from './slices/medicaoAmbienteSlice'
import temaReducer from './slices/temaSlice'
import botaoModoReducer from './slices/botaoModoSlice'

const rootReducer = combineReducers({
  galinhas: galinhasReducer,
  ninhos: ninhosReducer,
  galpoes: galpoesReducer,
  ovos: ovosReducer,
  medicoesAmbiente: medicoesAmbienteReducer,
  tema: temaReducer,
  botaoModo: botaoModoReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

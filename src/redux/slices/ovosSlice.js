// src/redux/slices/ovosSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  lista: [],
  status: 'idle',
  error: null,
}

const ovosSlice = createSlice({
  name: 'ovos',
  initialState,
  reducers: {
    setOvos: (state, action) => {
      state.lista = action.payload
    },
    adicionarOvo: (state, action) => {
      state.lista.push(action.payload)
    },
    atualizarOvo: (state, action) => {
      const index = state.lista.findIndex(o => String(o.id) === String(action.payload.id))
      if (index !== -1) state.lista[index] = action.payload
    },
    removerOvo: (state, action) => {
      const idParaRemover = String(action.payload)
      state.lista = state.lista.filter(o => String(o.id) !== idParaRemover)
    },
    limparOvos: (state) => {
      state.lista = []
    },
    setOvosStatus: (state, action) => {
      state.status = action.payload
    },
    setOvosError: (state, action) => {
      state.error = action.payload
    },
  }
})

export const {
  setOvos,
  adicionarOvo,
  atualizarOvo,
  removerOvo,
  limparOvos,
  setOvosStatus,
  setOvosError,
} = ovosSlice.actions
export default ovosSlice.reducer

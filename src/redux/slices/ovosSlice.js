// src/redux/slices/ovosSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  lista: [],
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
      const index = state.lista.findIndex(o => o.id === action.payload.id)
      if (index !== -1) state.lista[index] = action.payload
    },
    removerOvo: (state, action) => {
      state.lista = state.lista.filter(o => o.id !== action.payload)
    },
    limparOvos: (state) => {
      state.lista = []
    },
  }
})

export const { setOvos, adicionarOvo, atualizarOvo, removerOvo, limparOvos } = ovosSlice.actions
export default ovosSlice.reducer

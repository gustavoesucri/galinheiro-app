import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  lista: [],
  status: 'idle',
  error: null,
}

const ninhosSlice = createSlice({
  name: 'ninhos',
  initialState,
  reducers: {
    setNinhos: (state, action) => {
      state.lista = action.payload
    },
    adicionarNinho: (state, action) => {
      state.lista.push(action.payload)
    },
    atualizarNinho: (state, action) => {
      const index = state.lista.findIndex(n => n.id === action.payload.id)
      if (index !== -1) state.lista[index] = action.payload
    },
    removerNinho: (state, action) => {
      state.lista = state.lista.filter(n => n.id !== action.payload)
    },
    limparNinhos: (state) => {
      state.lista = []
    },
    setNinhosStatus: (state, action) => {
      state.status = action.payload
    },
    setNinhosError: (state, action) => {
      state.error = action.payload
    },
  }
})

export const {
  setNinhos,
  adicionarNinho,
  atualizarNinho,
  removerNinho,
  limparNinhos,
  setNinhosStatus,
  setNinhosError,
} = ninhosSlice.actions
export default ninhosSlice.reducer

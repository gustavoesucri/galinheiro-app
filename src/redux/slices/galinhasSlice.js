import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  lista: [],
  status: 'idle',
  error: null,
}

const galinhasSlice = createSlice({
  name: 'galinhas',
  initialState,
  reducers: {
    setGalinhas: (state, action) => {
      state.lista = action.payload
    },
    adicionarGalinha: (state, action) => {
      state.lista.push(action.payload)
    },
    atualizarGalinha: (state, action) => {
      const index = state.lista.findIndex(g => g.id === action.payload.id)
      if (index !== -1) state.lista[index] = action.payload
    },
    removerGalinha: (state, action) => {
      state.lista = state.lista.filter(g => g.id !== action.payload)
    },
    limparGalinhas: (state) => {
      state.lista = []
    },
    setGalinhasStatus: (state, action) => {
      state.status = action.payload
    },
    setGalinhasError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const {
  setGalinhas,
  adicionarGalinha,
  atualizarGalinha,
  removerGalinha,
  limparGalinhas,
  setGalinhasStatus,
  setGalinhasError,
} = galinhasSlice.actions
export default galinhasSlice.reducer

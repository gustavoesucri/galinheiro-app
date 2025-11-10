import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  lista: [],
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
      const index = state.lista.findIndex(g => g.nome === action.payload.nome)
      if (index !== -1) state.lista[index] = action.payload
    },
    removerGalinha: (state, action) => {
      state.lista = state.lista.filter(g => g.nome !== action.payload)
    },
    limparGalinhas: (state) => {
      state.lista = []
    },
  },
})

export const { setGalinhas, adicionarGalinha, atualizarGalinha, removerGalinha, limparGalinhas } = galinhasSlice.actions
export default galinhasSlice.reducer

  import { createSlice } from '@reduxjs/toolkit'

  const initialState = {
    lista: [], // todas as galinhas cadastradas
  }

  const galinhasSlice = createSlice({
    name: 'galinhas',
    initialState,
    reducers: {
      adicionarGalinha: (state, action) => {
        state.lista.push(action.payload)
      },
      removerGalinha: (state, action) => {
        state.lista = state.lista.filter(g => g.nome !== action.payload)
      },
      atualizarGalinha: (state, action) => {
        const index = state.lista.findIndex(g => g.nome === action.payload.nome)
        if (index !== -1) state.lista[index] = action.payload
      },
      limparGalinhas: (state) => {
        state.lista = []
      },
    },
  })

  export const { adicionarGalinha, removerGalinha, atualizarGalinha, limparGalinhas } = galinhasSlice.actions
  export default galinhasSlice.reducer

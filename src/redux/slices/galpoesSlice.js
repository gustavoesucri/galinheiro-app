import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  lista: [],
}

const galpoesSlice = createSlice({
  name: 'galpoes',
  initialState,
  reducers: {
    setGalpoes: (state, action) => {
      state.lista = action.payload
    },
    adicionarGalpao: (state, action) => {
      state.lista.push(action.payload)
    },
    atualizarGalpao: (state, action) => {
      const index = state.lista.findIndex(g => g.id === action.payload.id)
      if (index !== -1) state.lista[index] = action.payload
    },
    removerGalpao: (state, action) => {
      state.lista = state.lista.filter(g => g.id !== action.payload)
    },
    limparGalpoes: (state) => {
      state.lista = []
    },
  },
})

export const { setGalpoes, adicionarGalpao, atualizarGalpao, removerGalpao, limparGalpoes } = galpoesSlice.actions
export default galpoesSlice.reducer

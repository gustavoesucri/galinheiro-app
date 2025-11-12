import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  lista: [],
}

const medicaoAmbienteSlice = createSlice({
  name: 'medicoesAmbiente',
  initialState,
  reducers: {
    setMedicoes: (state, action) => {
      state.lista = action.payload
    },
    adicionarMedicao: (state, action) => {
      state.lista.push(action.payload)
    },
    atualizarMedicao: (state, action) => {
      const index = state.lista.findIndex(m => m.id === action.payload.id)
      if (index !== -1) state.lista[index] = action.payload
    },
    removerMedicao: (state, action) => {
      state.lista = state.lista.filter(m => m.id !== action.payload)
    },
    limparMedicoes: (state) => {
      state.lista = []
    },
  },
})

export const { setMedicoes, adicionarMedicao, atualizarMedicao, removerMedicao, limparMedicoes } =
  medicaoAmbienteSlice.actions

export default medicaoAmbienteSlice.reducer

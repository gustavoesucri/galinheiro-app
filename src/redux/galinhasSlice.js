// src/redux/galinhasSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list: [
    { id: 1, nome: 'Luzia', raca: 'Caipira', estado_saude: 'Boa' },
    { id: 2, nome: 'Margarida', raca: 'Rhode Island', estado_saude: 'Excelente' },
  ],
}

const galinhasSlice = createSlice({
  name: 'galinhas',
  initialState,
  reducers: {
    addGalinhas: (state, action) => {
      state.list.push(action.payload)
    },
  },
})

export const { addGalinhas } = galinhasSlice.actions
export default galinhasSlice.reducer

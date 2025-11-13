import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  botoesClaros: true, // true = botões laranja (padrão), false = botões escuros (tema)
}

const botaoModoSlice = createSlice({
  name: 'botaoModo',
  initialState,
  reducers: {
    alternarModoBotoes: (state) => {
      state.botoesClaros = !state.botoesClaros
    },
  },
})

export const { alternarModoBotoes } = botaoModoSlice.actions
export default botaoModoSlice.reducer

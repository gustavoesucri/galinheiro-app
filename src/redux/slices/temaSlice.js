import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  ativo: 'tema1', // 'tema1' (laranja), 'tema2' (verde), 'tema3' (roxo)
}

const temaSlice = createSlice({
  name: 'tema',
  initialState,
  reducers: {
    trocarTema: (state, action) => {
      state.ativo = action.payload
    },
    alternarTema: (state) => {
      const temas = ['tema1', 'tema2', 'tema3']
      const indiceAtual = temas.indexOf(state.ativo)
      const proximoIndice = (indiceAtual + 1) % temas.length
      state.ativo = temas[proximoIndice]
    },
  },
})

export const { trocarTema, alternarTema } = temaSlice.actions
export default temaSlice.reducer

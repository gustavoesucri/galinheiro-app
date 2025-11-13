import { setConfiguracoes } from '../slices/alertasSlice'

export const carregarConfiguracoes = () => (dispatch, getState) => {
  // Mantém valores do estado inicial; nada para carregar.
  dispatch(setConfiguracoes(getState().alertas))
}

export const salvarConfiguracoes = () => () => {
  // Persistência removida; função mantida por compatibilidade com chamadas existentes.
}

export const atualizarConfiguracaoThunk = (campo, valor) => (dispatch, getState) => {
  dispatch(setConfiguracoes({ ...getState().alertas, [campo]: valor }))
}

import { galinhasApi } from '../../api/resources'
import { fromApiPayload, normalizeApiList, toApiPayload } from '../../api/normalizers'
import {
  setGalinhas,
  adicionarGalinha,
  atualizarGalinha,
  removerGalinha,
  limparGalinhas,
  setGalinhasStatus,
  setGalinhasError,
} from '../slices/galinhasSlice'

const handleError = (dispatch, error) => {
  console.error('Galinhas API error:', error)
  dispatch(setGalinhasStatus('error'))
  dispatch(setGalinhasError(error.message ?? 'Erro desconhecido ao acessar galinhas'))
}

export const carregarGalinhas = () => async (dispatch) => {
  dispatch(setGalinhasStatus('loading'))
  try {
    const lista = await galinhasApi.list()
    dispatch(setGalinhas(normalizeApiList('galinhas', lista)))
    dispatch(setGalinhasError(null))
    dispatch(setGalinhasStatus('idle'))
  } catch (error) {
    handleError(dispatch, error)
  }
}

export const adicionarGalinhaThunk = (galinha) => async (dispatch) => {
  dispatch(setGalinhasStatus('saving'))
  try {
    const { id: _ignoredId, ...restante } = galinha
    const payload = toApiPayload('galinhas', restante)
    const criada = await galinhasApi.create(payload)
    dispatch(adicionarGalinha(fromApiPayload('galinhas', criada)))
    dispatch(setGalinhasError(null))
    dispatch(setGalinhasStatus('idle'))
  } catch (error) {
    handleError(dispatch, error)
  }
}

export const atualizarGalinhaThunk = (galinha) => async (dispatch) => {
  if (!galinha?.id) {
    console.warn('atualizarGalinhaThunk chamado sem ID')
    return
  }
  dispatch(setGalinhasStatus('saving'))
  try {
    const { id, ...restante } = galinha
    const payload = toApiPayload('galinhas', restante)
    const atualizada = await galinhasApi.update(id, payload)
    dispatch(atualizarGalinha(fromApiPayload('galinhas', atualizada)))
    dispatch(setGalinhasError(null))
    dispatch(setGalinhasStatus('idle'))
  } catch (error) {
    handleError(dispatch, error)
  }
}

export const removerGalinhaThunk = (id) => async (dispatch) => {
  if (!id) {
    console.warn('removerGalinhaThunk chamado sem ID')
    return
  }
  dispatch(setGalinhasStatus('saving'))
  try {
    await galinhasApi.remove(id)
    dispatch(removerGalinha(id))
    dispatch(setGalinhasError(null))
    dispatch(setGalinhasStatus('idle'))
  } catch (error) {
    handleError(dispatch, error)
  }
}

export const limparGalinhasThunk = () => (dispatch) => {
  dispatch(limparGalinhas())
  dispatch(setGalinhasStatus('idle'))
  dispatch(setGalinhasError(null))
}

// Função legada mantida para compatibilidade
export const salvarGalinhas = () => async () => {
  // Não faz nada - dados são salvos automaticamente no backend via API
}

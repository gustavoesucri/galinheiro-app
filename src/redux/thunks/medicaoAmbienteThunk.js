import { medicoesAmbienteApi } from '../../api/resources'
import { fromApiPayload, normalizeApiList, toApiPayload } from '../../api/normalizers'
import {
  setMedicoes,
  adicionarMedicao,
  atualizarMedicao,
  removerMedicao,
  limparMedicoes,
  setMedicoesStatus,
  setMedicoesError,
} from '../slices/medicaoAmbienteSlice'

const handleError = (dispatch, error) => {
  console.error('Medições API error:', error)
  dispatch(setMedicoesStatus('error'))
  dispatch(setMedicoesError(error.message ?? 'Erro desconhecido ao acessar medições'))
}

export const carregarMedicoes = () => async (dispatch) => {
  dispatch(setMedicoesStatus('loading'))
  try {
    const lista = await medicoesAmbienteApi.list()
    dispatch(setMedicoes(normalizeApiList('medicoesAmbiente', lista)))
    dispatch(setMedicoesError(null))
    dispatch(setMedicoesStatus('idle'))
  } catch (error) {
    handleError(dispatch, error)
  }
}

export const adicionarMedicaoThunk = (medicao) => async (dispatch) => {
  dispatch(setMedicoesStatus('saving'))
  try {
    const { id: _ignoredId, ...restante } = medicao
    const payload = toApiPayload('medicoesAmbiente', restante)
    const criada = await medicoesAmbienteApi.create(payload)
    dispatch(adicionarMedicao(fromApiPayload('medicoesAmbiente', criada)))
    dispatch(setMedicoesError(null))
    dispatch(setMedicoesStatus('idle'))
  } catch (error) {
    handleError(dispatch, error)
  }
}

export const atualizarMedicaoThunk = (medicao) => async (dispatch) => {
  if (!medicao?.id) {
    console.warn('atualizarMedicaoThunk chamado sem ID')
    return
  }
  dispatch(setMedicoesStatus('saving'))
  try {
    const { id, ...restante } = medicao
    const payload = toApiPayload('medicoesAmbiente', restante)
    const atualizada = await medicoesAmbienteApi.update(id, payload)
    dispatch(atualizarMedicao(fromApiPayload('medicoesAmbiente', atualizada)))
    dispatch(setMedicoesError(null))
    dispatch(setMedicoesStatus('idle'))
  } catch (error) {
    handleError(dispatch, error)
  }
}

export const removerMedicaoThunk = (id) => async (dispatch) => {
  if (!id) {
    console.warn('removerMedicaoThunk chamado sem ID')
    return
  }
  dispatch(setMedicoesStatus('saving'))
  try {
    await medicoesAmbienteApi.remove(id)
    dispatch(removerMedicao(id))
    dispatch(setMedicoesError(null))
    dispatch(setMedicoesStatus('idle'))
  } catch (error) {
    handleError(dispatch, error)
  }
}

export const limparMedicoesThunk = () => (dispatch) => {
  dispatch(limparMedicoes())
  dispatch(setMedicoesStatus('idle'))
  dispatch(setMedicoesError(null))
}

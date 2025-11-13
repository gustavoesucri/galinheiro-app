// ============================================================
// VERSÃO COM BACKEND (INTEGRADO COM API REST)
// ============================================================
import { medicoesAPI } from '../../api/api'
import {
  setMedicoes,
  adicionarMedicao,
  atualizarMedicao,
  removerMedicao,
  limparMedicoes,
} from '../slices/medicaoAmbienteSlice'

export const carregarMedicoes = () => async (dispatch) => {
  try {
    const response = await medicoesAPI.getAll()
    dispatch(setMedicoes(response.data))
  } catch (error) {
    console.log('Erro ao carregar medições:', error.response?.data?.message || error.message)
    throw error
  }
}

export const adicionarMedicaoThunk = (medicao) => async (dispatch) => {
  try {
    const response = await medicoesAPI.create(medicao)
    dispatch(adicionarMedicao(response.data))
    return response.data
  } catch (error) {
    console.log('Erro ao adicionar medição:', error.response?.data?.message || error.message)
    throw error
  }
}

export const atualizarMedicaoThunk = (medicao) => async (dispatch) => {
  try {
    const response = await medicoesAPI.update(medicao.id, medicao)
    dispatch(atualizarMedicao(response.data))
    return response.data
  } catch (error) {
    console.log('Erro ao atualizar medição:', error.response?.data?.message || error.message)
    throw error
  }
}

export const removerMedicaoThunk = (id) => async (dispatch) => {
  try {
    await medicoesAPI.delete(id)
    dispatch(removerMedicao(id))
  } catch (error) {
    console.log('Erro ao remover medição:', error.response?.data?.message || error.message)
    throw error
  }
}

export const limparMedicoesThunk = () => async (dispatch) => {
  dispatch(limparMedicoes())
}

// Função legada mantida para compatibilidade
export const salvarMedicoes = () => async () => {
  // Não faz nada - dados são salvos automaticamente no backend via API
}

// ============================================================
// VERSÃO ANTERIOR COM ASYNCSTORAGE (COMENTADA PARA HISTÓRICO)
// ============================================================
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import { v4 as uuidv4 } from 'uuid'
// 
// const MEDICOES_KEY = '@MEDICOES_AMBIENTE'
// 
// export const carregarMedicoes = () => async (dispatch) => {
//   try {
//     const dados = await AsyncStorage.getItem(MEDICOES_KEY)
//     if (dados) dispatch(setMedicoes(JSON.parse(dados).lista))
//   } catch (error) {
//     console.log('Erro ao carregar medições:', error)
//   }
// }
// 
// export const salvarMedicoes = () => async (dispatch, getState) => {
//   try {
//     const { lista } = getState().medicoesAmbiente
//     await AsyncStorage.setItem(MEDICOES_KEY, JSON.stringify({ lista }))
//   } catch (error) {
//     console.log('Erro ao salvar medições:', error)
//   }
// }
// 
// export const adicionarMedicaoThunk = (medicao) => async (dispatch) => {
//   const medicaoComId = { ...medicao, id: uuidv4() }
//   dispatch(adicionarMedicao(medicaoComId))
//   dispatch(salvarMedicoes())
// }
// 
// export const atualizarMedicaoThunk = (medicao) => async (dispatch) => {
//   dispatch(atualizarMedicao(medicao))
//   dispatch(salvarMedicoes())
// }
// 
// export const removerMedicaoThunk = (id) => async (dispatch) => {
//   dispatch(removerMedicao(id))
//   dispatch(salvarMedicoes())
// }
// 
// export const limparMedicoesThunk = () => async (dispatch) => {
//   dispatch(limparMedicoes())
//   dispatch(salvarMedicoes())
// }

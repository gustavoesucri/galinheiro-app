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
    // Garantir tipos corretos e serializar data para ISO string se for um objeto Date
    const medicaoParaEnviar = {
      ...medicao,
      temperatura: parseFloat(medicao.temperatura) || 0,
      umidade: parseFloat(medicao.umidade) || 0,
      luminosidade: parseInt(medicao.luminosidade) || 0,
      data_medicao: medicao.data_medicao instanceof Date 
        ? medicao.data_medicao.toISOString() 
        : medicao.data_medicao
    }
    
    console.log('📤 Enviando medição para backend:', medicaoParaEnviar)
    console.log('📊 Tipos dos dados:', {
      temperatura: typeof medicaoParaEnviar.temperatura,
      umidade: typeof medicaoParaEnviar.umidade,
      luminosidade: typeof medicaoParaEnviar.luminosidade,
      data_medicao: typeof medicaoParaEnviar.data_medicao
    })
    const response = await medicoesAPI.create(medicaoParaEnviar)
    dispatch(adicionarMedicao(response.data))
    return response.data
  } catch (error) {
    console.log('❌ Erro ao adicionar medição:', error.response?.data?.message || error.message)
    if (error.response?.data) {
      console.log('📋 Detalhes do erro:', JSON.stringify(error.response.data, null, 2))
    }
    throw error
  }
}

export const atualizarMedicaoThunk = (medicao) => async (dispatch) => {
  try {
    // Garantir tipos corretos e serializar data para ISO string se for um objeto Date
    const medicaoParaEnviar = {
      ...medicao,
      temperatura: parseFloat(medicao.temperatura) || 0,
      umidade: parseFloat(medicao.umidade) || 0,
      luminosidade: parseInt(medicao.luminosidade) || 0,
      data_medicao: medicao.data_medicao instanceof Date 
        ? medicao.data_medicao.toISOString() 
        : medicao.data_medicao
    }
    
    const response = await medicoesAPI.update(medicao.id, medicaoParaEnviar)
    dispatch(atualizarMedicao(response.data))
    return response.data
  } catch (error) {
    console.log('❌ Erro ao atualizar medição:', error.response?.data?.message || error.message)
    if (error.response?.data) {
      console.log('📋 Detalhes do erro:', JSON.stringify(error.response.data, null, 2))
    }
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

// ============================================================
// VERSÃO COM BACKEND (INTEGRADO COM API REST)
// ============================================================
import { galpoesAPI } from '../../api/api'
import { setGalpoes, adicionarGalpao, atualizarGalpao, removerGalpao, limparGalpoes } from '../slices/galpoesSlice'
import { removerNinho } from '../slices/ninhosSlice'
import { salvarNinhos } from './ninhosThunk'

// Carregar galpões do backend
export const carregarGalpoes = () => async (dispatch) => {
  try {
    const response = await galpoesAPI.getAll()
    dispatch(setGalpoes(response.data))
  } catch (error) {
    console.log('Erro ao carregar galpões:', error.response?.data?.message || error.message)
    throw error
  }
}

// Adicionar galpão no backend
export const adicionarGalpaoThunk = (galpao) => async (dispatch) => {
  try {
    const response = await galpoesAPI.create(galpao)
    dispatch(adicionarGalpao(response.data))
    return response.data
  } catch (error) {
    console.log('Erro ao adicionar galpão:', error.response?.data?.message || error.message)
    throw error
  }
}

// Atualizar galpão no backend
export const atualizarGalpaoThunk = (galpao) => async (dispatch) => {
  try {
    const response = await galpoesAPI.update(galpao.id, galpao)
    dispatch(atualizarGalpao(response.data))
    return response.data
  } catch (error) {
    console.log('Erro ao atualizar galpão:', error.response?.data?.message || error.message)
    throw error
  }
}

// Remover galpão do backend (cascata é tratada pelo banco com ON DELETE CASCADE)
export const removerGalpaoThunk = (id) => async (dispatch, getState) => {
  try {
    await galpoesAPI.delete(id)
    
    // Remover ninhos vinculados localmente (mantido para compatibilidade do Redux)
    const { lista: ninhos } = getState().ninhos
    const ninhosVinculados = ninhos.filter(n => String(n.galpaoId) === String(id))
    ninhosVinculados.forEach(ninho => {
      dispatch(removerNinho(ninho.id))
    })
    
    dispatch(removerGalpao(id))
  } catch (error) {
    console.log('Erro ao remover galpão:', error.response?.data?.message || error.message)
    throw error
  }
}

// Limpar estado local (não afeta banco de dados)
export const limparGalpoesThunk = () => async (dispatch) => {
  dispatch(limparGalpoes())
}

// Função legada mantida para compatibilidade
export const salvarGalpoes = () => async () => {
  // Não faz nada - dados são salvos automaticamente no backend via API
}

// ============================================================
// VERSÃO ANTERIOR COM ASYNCSTORAGE (COMENTADA PARA HISTÓRICO)
// ============================================================
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import { v4 as uuidv4 } from 'uuid'
// 
// const GALPOES_KEY = '@GALPOES'
// 
// // Carregar galpões do AsyncStorage
// export const carregarGalpoes = () => async (dispatch) => {
//   try {
//     const dados = await AsyncStorage.getItem(GALPOES_KEY)
//     if (dados) dispatch(setGalpoes(JSON.parse(dados).lista))
//   } catch (error) {
//     console.log('Erro ao carregar galpões:', error)
//   }
// }
// 
// // Salvar galpões no AsyncStorage
// export const salvarGalpoes = () => async (dispatch, getState) => {
//   try {
//     const { lista } = getState().galpoes
//     await AsyncStorage.setItem(GALPOES_KEY, JSON.stringify({ lista }))
//   } catch (error) {
//     console.log('Erro ao salvar galpões:', error)
//   }
// }
// 
// // Adicionar e salvar
// export const adicionarGalpaoThunk = (galpao) => async (dispatch) => {
//   const galpaoComId = { ...galpao, id: uuidv4() }
//   dispatch(adicionarGalpao(galpaoComId))
//   dispatch(salvarGalpoes())
// }
// 
// // Atualizar e salvar
// export const atualizarGalpaoThunk = (galpao) => async (dispatch) => {
//   dispatch(atualizarGalpao(galpao))
//   dispatch(salvarGalpoes())
// }
// 
// // Remover e salvar (com remoção em cascata de ninhos)
// export const removerGalpaoThunk = (id) => async (dispatch, getState) => {
//   // Buscar ninhos vinculados a este galpão
//   const { lista: ninhos } = getState().ninhos
//   const ninhosVinculados = ninhos.filter(n => String(n.galpaoId) === String(id))
//   
//   // Remover ninhos vinculados
//   ninhosVinculados.forEach(ninho => {
//     dispatch(removerNinho(ninho.id))
//   })
//   
//   // Salvar ninhos atualizados
//   if (ninhosVinculados.length > 0) {
//     await dispatch(salvarNinhos())
//   }
//   
//   // Remover galpão
//   dispatch(removerGalpao(id))
//   dispatch(salvarGalpoes())
// }
// 
// // Limpar tudo e salvar
// export const limparGalpoesThunk = () => async (dispatch) => {
//   dispatch(limparGalpoes())
//   dispatch(salvarGalpoes())
// }

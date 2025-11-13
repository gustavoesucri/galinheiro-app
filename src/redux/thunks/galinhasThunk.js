// ============================================================
// VERSÃO COM BACKEND (INTEGRADO COM API REST)
// ============================================================
import { galinhasAPI } from '../../api/api'
import { 
  setGalinhas, 
  adicionarGalinha, 
  atualizarGalinha, 
  removerGalinha, 
  limparGalinhas 
} from '../slices/galinhasSlice'

// Carregar do backend
export const carregarGalinhas = () => async (dispatch) => {
  try {
    const response = await galinhasAPI.getAll()
    dispatch(setGalinhas(response.data))
  } catch (error) {
    console.log('Erro ao carregar galinhas:', error.response?.data?.message || error.message)
    throw error
  }
}

// Adicionar no backend
export const adicionarGalinhaThunk = (galinha) => async (dispatch) => {
  try {
    const response = await galinhasAPI.create(galinha)
    dispatch(adicionarGalinha(response.data))
    return response.data
  } catch (error) {
    console.log('Erro ao adicionar galinha:', error.response?.data?.message || error.message)
    throw error
  }
}

// Atualizar no backend
export const atualizarGalinhaThunk = (galinha) => async (dispatch) => {
  try {
    const response = await galinhasAPI.update(galinha.id, galinha)
    dispatch(atualizarGalinha(response.data))
    return response.data
  } catch (error) {
    console.log('Erro ao atualizar galinha:', error.response?.data?.message || error.message)
    throw error
  }
}

// Remover do backend
export const removerGalinhaThunk = (id) => async (dispatch) => {
  try {
    await galinhasAPI.delete(id)
    dispatch(removerGalinha(id))
  } catch (error) {
    console.log('Erro ao remover galinha:', error.response?.data?.message || error.message)
    throw error
  }
}

// Limpar estado local (não afeta banco de dados)
export const limparGalinhasThunk = () => async (dispatch) => {
  dispatch(limparGalinhas())
}

// Função legada mantida para compatibilidade
export const salvarGalinhas = () => async () => {
  // Não faz nada - dados são salvos automaticamente no backend via API
}

// ============================================================
// VERSÃO ANTERIOR COM ASYNCSTORAGE (COMENTADA PARA HISTÓRICO)
// ============================================================
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import { v4 as uuidv4 } from 'uuid'
// 
// const GALINHAS_KEY = '@GALINHAS'
// 
// // Carregar do AsyncStorage
// export const carregarGalinhas = () => async (dispatch) => {
//   try {
//     const dados = await AsyncStorage.getItem(GALINHAS_KEY)
//     if (dados) {
//       dispatch(setGalinhas(JSON.parse(dados).lista))
//     }
//   } catch (error) {
//     console.log('Erro ao carregar galinhas:', error)
//   }
// }
// 
// // Salvar no AsyncStorage
// export const salvarGalinhas = () => async (dispatch, getState) => {
//   try {
//     const { lista } = getState().galinhas
//     await AsyncStorage.setItem(GALINHAS_KEY, JSON.stringify({ lista }))
//   } catch (error) {
//     console.log('Erro ao salvar galinhas:', error)
//   }
// }
// 
// // Adicionar e salvar
// export const adicionarGalinhaThunk = (galinha) => async (dispatch) => {
//   const galinhaComId = { ...galinha, id: uuidv4() }
//   dispatch(adicionarGalinha(galinhaComId))
//   dispatch(salvarGalinhas())
// }
// 
// // Atualizar e salvar
// export const atualizarGalinhaThunk = (galinha) => async (dispatch) => {
//   dispatch(atualizarGalinha(galinha))
//   dispatch(salvarGalinhas())
// }
// 
// // Remover e salvar
// export const removerGalinhaThunk = (id) => async (dispatch) => {
//   dispatch(removerGalinha(id))
//   dispatch(salvarGalinhas())
// }
// 
// // Limpar tudo e salvar
// export const limparGalinhasThunk = () => async (dispatch) => {
//   dispatch(limparGalinhas())
//   dispatch(salvarGalinhas())
// }

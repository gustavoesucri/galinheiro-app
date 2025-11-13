// ============================================================
// VERSÃO COM BACKEND (INTEGRADO COM API REST)
// ============================================================
import { ninhosAPI } from '../../api/api'
import { setNinhos, adicionarNinho, atualizarNinho, removerNinho, limparNinhos } from '../slices/ninhosSlice'

// Carregar ninhos do backend
export const carregarNinhos = () => async (dispatch) => {
  try {
    const response = await ninhosAPI.getAll()
    dispatch(setNinhos(response.data))
  } catch (error) {
    console.log('Erro ao carregar ninhos:', error.response?.data?.message || error.message)
    throw error
  }
}

// Adicionar ninho no backend
export const adicionarNinhoThunk = (ninho) => async (dispatch) => {
  try {
    const response = await ninhosAPI.create(ninho)
    dispatch(adicionarNinho(response.data))
    return response.data
  } catch (error) {
    console.log('Erro ao adicionar ninho:', error.response?.data?.message || error.message)
    throw error
  }
}

// Atualizar ninho no backend
export const atualizarNinhoThunk = (ninho) => async (dispatch) => {
  try {
    const response = await ninhosAPI.update(ninho.id, ninho)
    dispatch(atualizarNinho(response.data))
    return response.data
  } catch (error) {
    console.log('Erro ao atualizar ninho:', error.response?.data?.message || error.message)
    throw error
  }
}

// Remover ninho do backend
export const removerNinhoThunk = (id) => async (dispatch) => {
  try {
    await ninhosAPI.delete(id)
    dispatch(removerNinho(id))
  } catch (error) {
    console.log('Erro ao remover ninho:', error.response?.data?.message || error.message)
    throw error
  }
}

// Limpar estado local (não afeta banco de dados)
export const limparNinhosThunk = () => async (dispatch) => {
  dispatch(limparNinhos())
}

// Função legada mantida para compatibilidade
export const salvarNinhos = () => async () => {
  // Não faz nada - dados são salvos automaticamente no backend via API
}

// ============================================================
// VERSÃO ANTERIOR COM ASYNCSTORAGE (COMENTADA PARA HISTÓRICO)
// ============================================================
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import { v4 as uuidv4 } from 'uuid'
// 
// const NINHOS_KEY = '@NINHOS'
// 
// // Carregar ninhos do AsyncStorage
// export const carregarNinhos = () => async (dispatch) => {
//   try {
//     const dados = await AsyncStorage.getItem(NINHOS_KEY)
//     if (dados) {
//       dispatch(setNinhos(JSON.parse(dados).lista))
//     }
//   } catch (error) {
//     console.log('Erro ao carregar ninhos:', error)
//   }
// }
// 
// // Salvar ninhos no AsyncStorage
// export const salvarNinhos = () => async (dispatch, getState) => {
//   try {
//     const { lista } = getState().ninhos
//     await AsyncStorage.setItem(NINHOS_KEY, JSON.stringify({ lista }))
//   } catch (error) {
//     console.log('Erro ao salvar ninhos:', error)
//   }
// }
// 
// // Adicionar e salvar
// export const adicionarNinhoThunk = (ninho) => async (dispatch) => {
//   const ninhoComId = { ...ninho, id: uuidv4() }
//   dispatch(adicionarNinho(ninhoComId))
//   dispatch(salvarNinhos())
// }
// 
// // Atualizar e salvar
// export const atualizarNinhoThunk = (ninho) => async (dispatch) => {
//   dispatch(atualizarNinho(ninho))
//   dispatch(salvarNinhos())
// }
// 
// // Remover e salvar
// export const removerNinhoThunk = (id) => async (dispatch) => {
//   dispatch(removerNinho(id))
//   dispatch(salvarNinhos())
// }
// 
// // Limpar tudo e salvar
// export const limparNinhosThunk = () => async (dispatch) => {
//   dispatch(limparNinhos())
//   dispatch(salvarNinhos())
// }

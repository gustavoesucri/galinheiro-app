// ============================================================
// VERSÃO COM BACKEND (INTEGRADO COM API REST)
// ============================================================
import { ovosAPI } from '../../api/api'
import { setOvos, adicionarOvo, atualizarOvo, removerOvo, limparOvos } from '../slices/ovosSlice'

export const carregarOvos = () => async (dispatch) => {
  try {
    const response = await ovosAPI.getAll()
    dispatch(setOvos(response.data))
  } catch (error) {
    console.log('Erro ao carregar ovos:', error.response?.data?.message || error.message)
    throw error
  }
}

export const adicionarOvoThunk = (ovo) => async (dispatch) => {
  try {
    const response = await ovosAPI.create(ovo)
    dispatch(adicionarOvo(response.data))
    return response.data
  } catch (error) {
    console.log('Erro ao adicionar ovo:', error.response?.data?.message || error.message)
    throw error
  }
}

export const atualizarOvoThunk = (ovo) => async (dispatch) => {
  try {
    // RN-038: Data de coleta é imutável no backend também
    const response = await ovosAPI.update(ovo.id, ovo)
    dispatch(atualizarOvo(response.data))
    return response.data
  } catch (error) {
    console.log('Erro ao atualizar ovo:', error.response?.data?.message || error.message)
    throw error
  }
}

export const removerOvoThunk = (id) => async (dispatch) => {
  try {
    await ovosAPI.delete(id)
    dispatch(removerOvo(id))
  } catch (error) {
    console.log('Erro ao remover ovo:', error.response?.data?.message || error.message)
    throw error
  }
}

export const limparOvosThunk = () => async (dispatch) => {
  dispatch(limparOvos())
}

// Função legada mantida para compatibilidade
export const salvarOvos = () => async () => {
  // Não faz nada - dados são salvos automaticamente no backend via API
}

// ============================================================
// VERSÃO ANTERIOR COM ASYNCSTORAGE (COMENTADA PARA HISTÓRICO)
// ============================================================
// import AsyncStorage from '@react-native-async-storage/async-storage'
// 
// const OVOS_KEY = '@OVOS'
// 
// export const carregarOvos = () => async (dispatch) => {
//   try {
//     const dados = await AsyncStorage.getItem(OVOS_KEY)
//     if(dados) dispatch(setOvos(JSON.parse(dados).lista))
//   } catch(e) { console.log('Erro ao carregar ovos', e) }
// }
// 
// export const salvarOvos = () => async (dispatch, getState) => {
//   try {
//     const { lista } = getState().ovos
//     await AsyncStorage.setItem(OVOS_KEY, JSON.stringify({ lista }))
//   } catch(e) { console.log('Erro ao salvar ovos', e) }
// }
// 
// export const adicionarOvoThunk = (ovo) => async (dispatch) => {
//   dispatch(adicionarOvo(ovo))
//   dispatch(salvarOvos())
// }
// 
// export const atualizarOvoThunk = (ovo) => async (dispatch, getState) => {
//   // RN-038: Data de coleta é imutável - preserva data original
//   const { lista } = getState().ovos
//   const ovoOriginal = lista.find(o => o.id === ovo.id)
//   
//   if (ovoOriginal) {
//     const ovoAtualizado = {
//       ...ovo,
//       data: ovoOriginal.data // Preserva data original
//     }
//     dispatch(atualizarOvo(ovoAtualizado))
//   } else {
//     dispatch(atualizarOvo(ovo))
//   }
//   
//   dispatch(salvarOvos())
// }
// 
// export const removerOvoThunk = (id) => async (dispatch) => {
//   dispatch(removerOvo(id))
//   await dispatch(salvarOvos())
// }
// 
// export const limparOvosThunk = () => async (dispatch) => {
//   dispatch(limparOvos())
//   dispatch(salvarOvos())
// }

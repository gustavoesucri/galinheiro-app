import AsyncStorage from '@react-native-async-storage/async-storage'
import { setGalinhas, adicionarGalinha, atualizarGalinha, removerGalinha, limparGalinhas } from '../slices/galinhasSlice'

const GALINHAS_KEY = '@GALINHAS'

// Carregar galinhas do AsyncStorage
export const carregarGalinhas = () => async (dispatch) => {
  try {
    const dados = await AsyncStorage.getItem(GALINHAS_KEY)
    if (dados) {
      dispatch(setGalinhas(JSON.parse(dados).lista))
    }
  } catch (error) {
    console.log('Erro ao carregar galinhas:', error)
  }
}

// Salvar galinhas no AsyncStorage
export const salvarGalinhas = () => async (dispatch, getState) => {
  try {
    const { lista } = getState().galinhas
    await AsyncStorage.setItem(GALINHAS_KEY, JSON.stringify({ lista }))
  } catch (error) {
    console.log('Erro ao salvar galinhas:', error)
  }
}

// Exemplo: adicionar e já salvar
export const adicionarGalinhaThunk = (galinha) => async (dispatch) => {
  dispatch(adicionarGalinha(galinha))
  dispatch(salvarGalinhas())
}

// Atualizar e salvar
export const atualizarGalinhaThunk = (galinha) => async (dispatch) => {
  dispatch(atualizarGalinha(galinha))
  dispatch(salvarGalinhas())
}

// Remover e salvar
export const removerGalinhaThunk = (nome) => async (dispatch) => {
  dispatch(removerGalinha(nome))
  dispatch(salvarGalinhas())
}

// Limpar tudo e salvar
export const limparGalinhasThunk = () => async (dispatch) => {
  dispatch(limparGalinhas())
  dispatch(salvarGalinhas())
}

import AsyncStorage from '@react-native-async-storage/async-storage'
import { v4 as uuidv4 } from 'uuid'
import { 
  setGalinhas, 
  adicionarGalinha, 
  atualizarGalinha, 
  removerGalinha, 
  limparGalinhas 
} from '../slices/galinhasSlice'

const GALINHAS_KEY = '@GALINHAS'

// Carregar do AsyncStorage
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

// Salvar no AsyncStorage
export const salvarGalinhas = () => async (dispatch, getState) => {
  try {
    const { lista } = getState().galinhas
    await AsyncStorage.setItem(GALINHAS_KEY, JSON.stringify({ lista }))
  } catch (error) {
    console.log('Erro ao salvar galinhas:', error)
  }
}

// Adicionar e salvar
export const adicionarGalinhaThunk = (galinha) => async (dispatch) => {
  const galinhaComId = { ...galinha, id: uuidv4() }
  dispatch(adicionarGalinha(galinhaComId))
  dispatch(salvarGalinhas())
}

// Atualizar e salvar
export const atualizarGalinhaThunk = (galinha) => async (dispatch) => {
  dispatch(atualizarGalinha(galinha))
  dispatch(salvarGalinhas())
}

// Remover e salvar
export const removerGalinhaThunk = (id) => async (dispatch) => {
  dispatch(removerGalinha(id))
  dispatch(salvarGalinhas())
}

// Limpar tudo e salvar
export const limparGalinhasThunk = () => async (dispatch) => {
  dispatch(limparGalinhas())
  dispatch(salvarGalinhas())
}

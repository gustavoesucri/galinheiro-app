import AsyncStorage from '@react-native-async-storage/async-storage'
import { setNinhos, adicionarNinho, atualizarNinho, removerNinho, limparNinhos } from '../slices/ninhosSlice'

const NINHOS_KEY = '@NINHOS'

// Carregar ninhos do AsyncStorage
export const carregarNinhos = () => async (dispatch) => {
  try {
    const dados = await AsyncStorage.getItem(NINHOS_KEY)
    if (dados) {
      dispatch(setNinhos(JSON.parse(dados).lista))
    }
  } catch (error) {
    console.log('Erro ao carregar ninhos:', error)
  }
}

// Salvar ninhos no AsyncStorage
export const salvarNinhos = () => async (dispatch, getState) => {
  try {
    const { lista } = getState().ninhos
    await AsyncStorage.setItem(NINHOS_KEY, JSON.stringify({ lista }))
  } catch (error) {
    console.log('Erro ao salvar ninhos:', error)
  }
}

// Adicionar e salvar
export const adicionarNinhoThunk = (ninho) => async (dispatch) => {
  dispatch(adicionarNinho(ninho))
  dispatch(salvarNinhos())
}

// Atualizar e salvar
export const atualizarNinhoThunk = (ninho) => async (dispatch) => {
  dispatch(atualizarNinho(ninho))
  dispatch(salvarNinhos())
}

// Remover e salvar
export const removerNinhoThunk = (id) => async (dispatch) => {
  dispatch(removerNinho(id))
  dispatch(salvarNinhos())
}

// Limpar tudo e salvar
export const limparNinhosThunk = () => async (dispatch) => {
  dispatch(limparNinhos())
  dispatch(salvarNinhos())
}

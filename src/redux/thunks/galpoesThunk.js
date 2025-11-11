import AsyncStorage from '@react-native-async-storage/async-storage'
import { setGalpoes, adicionarGalpao, atualizarGalpao, removerGalpao, limparGalpoes } from '../slices/galpoesSlice'

const GALPOES_KEY = '@GALPOES'

// Carregar galpões do AsyncStorage
export const carregarGalpoes = () => async (dispatch) => {
  try {
    const dados = await AsyncStorage.getItem(GALPOES_KEY)
    if (dados) dispatch(setGalpoes(JSON.parse(dados).lista))
  } catch (error) {
    console.log('Erro ao carregar galpões:', error)
  }
}

// Salvar galpões no AsyncStorage
export const salvarGalpoes = () => async (dispatch, getState) => {
  try {
    const { lista } = getState().galpoes
    await AsyncStorage.setItem(GALPOES_KEY, JSON.stringify({ lista }))
  } catch (error) {
    console.log('Erro ao salvar galpões:', error)
  }
}

// Adicionar e salvar
export const adicionarGalpaoThunk = (galpao) => async (dispatch) => {
  dispatch(adicionarGalpao(galpao))
  dispatch(salvarGalpoes())
}

// Atualizar e salvar
export const atualizarGalpaoThunk = (galpao) => async (dispatch) => {
  dispatch(atualizarGalpao(galpao))
  dispatch(salvarGalpoes())
}

// Remover e salvar
export const removerGalpaoThunk = (id) => async (dispatch) => {
  dispatch(removerGalpao(id))
  dispatch(salvarGalpoes())
}

// Limpar tudo e salvar
export const limparGalpoesThunk = () => async (dispatch) => {
  dispatch(limparGalpoes())
  dispatch(salvarGalpoes())
}

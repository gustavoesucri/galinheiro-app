import AsyncStorage from '@react-native-async-storage/async-storage'
import { v4 as uuidv4 } from 'uuid'
import {
  setMedicoes,
  adicionarMedicao,
  atualizarMedicao,
  removerMedicao,
  limparMedicoes,
} from '../slices/medicaoAmbienteSlice'

const MEDICOES_KEY = '@MEDICOES_AMBIENTE'

export const carregarMedicoes = () => async (dispatch) => {
  try {
    const dados = await AsyncStorage.getItem(MEDICOES_KEY)
    if (dados) dispatch(setMedicoes(JSON.parse(dados).lista))
  } catch (error) {
    console.log('Erro ao carregar medições:', error)
  }
}

export const salvarMedicoes = () => async (dispatch, getState) => {
  try {
    const { lista } = getState().medicoesAmbiente
    await AsyncStorage.setItem(MEDICOES_KEY, JSON.stringify({ lista }))
  } catch (error) {
    console.log('Erro ao salvar medições:', error)
  }
}

export const adicionarMedicaoThunk = (medicao) => async (dispatch) => {
  const medicaoComId = { ...medicao, id: uuidv4() }
  dispatch(adicionarMedicao(medicaoComId))
  dispatch(salvarMedicoes())
}

export const atualizarMedicaoThunk = (medicao) => async (dispatch) => {
  dispatch(atualizarMedicao(medicao))
  dispatch(salvarMedicoes())
}

export const removerMedicaoThunk = (id) => async (dispatch) => {
  dispatch(removerMedicao(id))
  dispatch(salvarMedicoes())
}

export const limparMedicoesThunk = () => async (dispatch) => {
  dispatch(limparMedicoes())
  dispatch(salvarMedicoes())
}

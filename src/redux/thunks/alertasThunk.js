import AsyncStorage from '@react-native-async-storage/async-storage'
import { setConfiguracoes } from '../slices/alertasSlice'

const ALERTAS_KEY = '@ALERTAS_CONFIGURACOES'

// Carregar do AsyncStorage
export const carregarConfiguracoes = () => async (dispatch) => {
  try {
    const dados = await AsyncStorage.getItem(ALERTAS_KEY)
    if (dados) {
      dispatch(setConfiguracoes(JSON.parse(dados)))
    }
  } catch (error) {
    console.log('Erro ao carregar configurações de alertas:', error)
  }
}

// Salvar no AsyncStorage
export const salvarConfiguracoes = () => async (dispatch, getState) => {
  try {
    const configuracoes = getState().alertas
    await AsyncStorage.setItem(ALERTAS_KEY, JSON.stringify(configuracoes))
  } catch (error) {
    console.log('Erro ao salvar configurações de alertas:', error)
  }
}

// Atualizar e salvar
export const atualizarConfiguracaoThunk = (campo, valor) => async (dispatch, getState) => {
  dispatch(setConfiguracoes({ ...getState().alertas, [campo]: valor }))
  dispatch(salvarConfiguracoes())
}

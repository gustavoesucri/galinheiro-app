import AsyncStorage from '@react-native-async-storage/async-storage'
import { setOvos, adicionarOvo, atualizarOvo, removerOvo, limparOvos } from '../slices/ovosSlice'

const OVOS_KEY = '@OVOS'

export const carregarOvos = () => async (dispatch) => {
  try {
    const dados = await AsyncStorage.getItem(OVOS_KEY)
    if(dados) dispatch(setOvos(JSON.parse(dados).lista))
  } catch(e) { console.log('Erro ao carregar ovos', e) }
}

export const salvarOvos = () => async (dispatch, getState) => {
  try {
    const { lista } = getState().ovos
    await AsyncStorage.setItem(OVOS_KEY, JSON.stringify({ lista }))
  } catch(e) { console.log('Erro ao salvar ovos', e) }
}

export const adicionarOvoThunk = (ovo) => async (dispatch) => {
  dispatch(adicionarOvo(ovo))
  dispatch(salvarOvos())
}

export const atualizarOvoThunk = (ovo) => async (dispatch, getState) => {
  // RN-038: Data de coleta é imutável - preserva data original
  const { lista } = getState().ovos
  const ovoOriginal = lista.find(o => o.id === ovo.id)
  
  if (ovoOriginal) {
    const ovoAtualizado = {
      ...ovo,
      data: ovoOriginal.data // Preserva data original
    }
    dispatch(atualizarOvo(ovoAtualizado))
  } else {
    dispatch(atualizarOvo(ovo))
  }
  
  dispatch(salvarOvos())
}

export const removerOvoThunk = (id) => async (dispatch) => {
  dispatch(removerOvo(id))
  await dispatch(salvarOvos())
}

export const limparOvosThunk = () => async (dispatch) => {
  dispatch(limparOvos())
  dispatch(salvarOvos())
}

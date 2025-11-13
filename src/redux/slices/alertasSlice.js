import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  temperaturaAlta: 30,
  temperaturaBaixa: 15,
  umidadeAlta: 80,
  umidadeBaixa: 40,
  diasSemLimpeza: 7,
  percentualGalinhasAdoecidas: 5,
  idadeMaximaGalinhas: 365,
  
  // Checkboxes para ativar/desativar alertas
  alertaGalpoesInativos: true,
  alertaTemperaturaAlta: true,
  alertaTemperaturaBaixa: true,
  alertaUmidadeAlta: true,
  alertaUmidadeBaixa: true,
  alertaDiasSemLimpeza: true,
  alertaVentilacaoDesativada: true,
  alertaGalinhasAdoecidas: true,
  alertaIdadeMaximaGalinhas: true,
}

const alertasSlice = createSlice({
  name: 'alertas',
  initialState,
  reducers: {
    setConfiguracoes: (state, action) => {
      return { ...state, ...action.payload }
    },
    atualizarConfiguracao: (state, action) => {
      const { campo, valor } = action.payload
      state[campo] = valor
    },
  },
})

export const { setConfiguracoes, atualizarConfiguracao } = alertasSlice.actions
export default alertasSlice.reducer

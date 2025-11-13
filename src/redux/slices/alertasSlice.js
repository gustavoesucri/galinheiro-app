import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  temperaturaAlta: 30,
  temperaturaBaixa: 15,
  umidadeAlta: 80,
  umidadeBaixa: 40,
  diasSemLimpeza: 7,
  percentualGalinhasAdoecidas: 5,
  
  // Checkboxes para ativar/desativar alertas
  alertaTemperaturaAlta: true,
  alertaTemperaturaBaixa: true,
  alertaUmidadeAlta: true,
  alertaUmidadeBaixa: true,
  alertaDiasSemLimpeza: true,
  alertaVentilacaoDesativada: true,
  alertaGalinhasAdoecidas: true,
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

import * as yup from 'yup'

export const alertasSchema = yup.object({
  temperaturaAlta: yup
    .number()
    .min(0, 'Temperatura mínima é 0°C')
    .max(60, 'Temperatura máxima é 60°C')
    .required('Informe a temperatura alta'),
  
  temperaturaBaixa: yup
    .number()
    .min(-20, 'Temperatura mínima é -20°C')
    .max(50, 'Temperatura máxima é 50°C')
    .required('Informe a temperatura baixa'),
  
  umidadeAlta: yup
    .number()
    .min(0, 'Umidade mínima é 0%')
    .max(100, 'Umidade máxima é 100%')
    .required('Informe a umidade alta'),
  
  umidadeBaixa: yup
    .number()
    .min(0, 'Umidade mínima é 0%')
    .max(100, 'Umidade máxima é 100%')
    .required('Informe a umidade baixa'),
  
  diasSemLimpeza: yup
    .number()
    .min(1, 'Mínimo 1 dia')
    .max(90, 'Máximo 90 dias')
    .required('Informe os dias sem limpeza'),
  
  percentualGalinhasAdoecidas: yup
    .number()
    .min(0, 'Mínimo 0%')
    .max(100, 'Máximo 100%')
    .required('Informe o percentual'),
  
  idadeMaximaGalinhas: yup
    .number()
    .min(1, 'Mínimo 1 dia')
    .max(8030, 'Máximo 8030 dias')
    .required('Informe a idade máxima'),
  
  alertaTemperaturaAlta: yup.boolean(),
  alertaTemperaturaBaixa: yup.boolean(),
  alertaUmidadeAlta: yup.boolean(),
  alertaUmidadeBaixa: yup.boolean(),
  alertaDiasSemLimpeza: yup.boolean(),
  alertaVentilacaoDesativada: yup.boolean(),
  alertaGalinhasAdoecidas: yup.boolean(),
  alertaIdadeMaximaGalinhas: yup.boolean(),
})

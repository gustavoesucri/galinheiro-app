import * as yup from 'yup'
import { validarDataMedicao } from '../utils/businessRules'

export const medicaoAmbienteSchema = yup.object({
  data_medicao: yup
    .date()
    .required('Informe a data e hora da medição')
    .typeError('Data inválida')
    .test('data-futura', 'Data da medição não pode ser futura', function(value) {
      const resultado = validarDataMedicao(value)
      return resultado.valido
    }),
  temperatura: yup
    .number()
    .min(-10, 'Temperatura mínima: -10°C')
    .max(50, 'Temperatura máxima: 50°C')
    .required('Informe a temperatura')
    .typeError('Temperatura deve ser um número'),
  umidade: yup
    .number()
    .min(0, 'Umidade mínima: 0%')
    .max(100, 'Umidade máxima: 100%')
    .required('Informe a umidade')
    .typeError('Umidade deve ser um número'),
  luminosidade: yup
    .number()
    .min(0, 'Luminosidade mínima: 0 lux')
    .max(100000, 'Luminosidade máxima: 100000 lux')
    .required('Informe a luminosidade')
    .typeError('Luminosidade deve ser um número'),
  ventilacao_ativa: yup.boolean().required('Ventilação ativa é obrigatória'),
  usa_ventilacao: yup.boolean().required('Usa ventilação é obrigatório'),
  galpaoId: yup.string().required('Selecione o galpão medido'),
})

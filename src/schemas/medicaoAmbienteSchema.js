import * as yup from 'yup'

export const medicaoAmbienteSchema = yup.object({
  data_medicao: yup.date().required('Informe a data e hora da medição'),
  temperatura: yup
    .number()
    .min(-10)
    .max(50)
    .required('Informe a temperatura'),
  umidade: yup
    .number()
    .min(0)
    .max(100)
    .required('Informe a umidade'),
  luminosidade: yup
    .number()
    .min(0)
    .max(100000)
    .required('Informe a luminosidade'),
  ventilacao_ativa: yup.boolean().required(),
  galpao: yup.string().required('Selecione o galpão medido'),
})

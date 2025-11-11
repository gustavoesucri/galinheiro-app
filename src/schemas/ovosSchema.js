import * as yup from 'yup'

export const ovosSchema = yup.object().shape({
  data: yup.date().required('Data é obrigatória').typeError('Data inválida'),
  galinha: yup.string().required('Selecione a galinha'),
  ninho: yup.string().nullable(),
  tamanho: yup.string().oneOf(['Pequeno','Médio','Grande','Extra']).required('Tamanho obrigatório'),
  cor: yup.string().oneOf(['Branco','Marrom','Azul','Verde']).required('Cor obrigatória'),
  qualidade: yup.string().oneOf(['Boa','Quebrado','Defeituoso']).required('Qualidade obrigatória'),
  observacoes: yup.string().max(500, 'Máximo 500 caracteres').nullable(),
})

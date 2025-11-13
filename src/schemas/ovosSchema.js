import * as yup from 'yup'

export const ovosSchema = yup.object().shape({
  data: yup.date().required('Data é obrigatória').typeError('Data inválida'),
  galinhaId: yup.string().required('Selecione a galinha'),
  ninhoId: yup.string().nullable(),
  tamanho: yup.string().oneOf(['Pequeno','Médio','Grande','Extra'], 'Tamanho inválido').required('Tamanho é obrigatório'),
  cor: yup.string().oneOf(['Branco','Marrom','Azul','Verde'], 'Cor inválida').required('Cor é obrigatória'),
  qualidade: yup.string().oneOf(['Boa','Quebrado','Defeituoso'], 'Qualidade inválida').required('Qualidade é obrigatória'),
  observacoes: yup.string().max(500, 'Máximo 500 caracteres').nullable(),
})

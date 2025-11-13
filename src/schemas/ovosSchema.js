import * as yup from 'yup'
import { validarDataOvo } from '../utils/businessRules'

export const ovosSchema = yup.object().shape({
  data: yup
    .date()
    .required('Data é obrigatória')
    .typeError('Data inválida')
    .test('data-futura', 'Data de postura não pode ser futura', function(value) {
      const resultado = validarDataOvo(value)
      return resultado.valido
    }),
  galinhaId: yup.string().required('Selecione a galinha'),
  ninhoId: yup.string().nullable(),
  tamanho: yup.string().oneOf(['Pequeno','Médio','Grande','Extra'], 'Tamanho inválido').required('Tamanho é obrigatório'),
  cor: yup.string().oneOf(['Branco','Marrom','Azul','Verde'], 'Cor inválida').required('Cor é obrigatória'),
  qualidade: yup.string().oneOf(['Boa','Quebrado','Defeituoso'], 'Qualidade inválida').required('Qualidade é obrigatória'),
  observacoes: yup.string().max(500, 'Máximo 500 caracteres').nullable(),
})

import * as yup from 'yup'

export const galinhaSchema = yup.object().shape({
  id: yup.string().optional(),
  nome: yup.string().required('Nome é obrigatório'),
  saude: yup
    .string()
    .oneOf(['Boa', 'Fragilizada', 'Adoecida'], 'Estado de saúde inválido')
    .required('Estado de saúde é obrigatório'),
  ovosHoje: yup
    .number()
    .typeError('Ovos deve ser um número')
    .min(0, 'Não pode ser menor que 0')
    .max(2, 'Não pode ser maior que 2')
    .required('Ovos postos hoje é obrigatório'),
  emQuarentena: yup.boolean().required(),
  local: yup
    .string()
    .oneOf(['galpao', 'campo', 'quarentena'], 'Local inválido')
    .required('Local é obrigatório'),
})

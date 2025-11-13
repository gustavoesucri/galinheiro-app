import * as yup from 'yup'

export const galinhaSchema = yup.object().shape({
  id: yup.string().optional(),
  nome: yup.string().required('Nome é obrigatório'),
  saude: yup
    .string()
    .oneOf(['Boa', 'Fragilizada', 'Adoecida'], 'Estado de saúde inválido')
    .required('Estado de saúde é obrigatório'),
  // ovosHoje removido: o controle de adição de ovos passa a ser feito via OvosForm
  raca: yup.string().optional(),
  emQuarentena: yup.boolean().required(),
  local: yup
    .string()
    .oneOf(['galpao', 'campo', 'quarentena'], 'Local inválido')
    .required('Local é obrigatório'),
})

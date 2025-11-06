import * as Yup from 'yup'

export const galinhaSchema = Yup.object().shape({
  nome: Yup.string().required('Nome é obrigatório'),
  saude: Yup.string()
    .oneOf(['Boa', 'Fragilizada', 'Adoecida'], 'Estado de saúde inválido')
    .required('Estado de saúde é obrigatório'),
  ovosHoje: Yup.number()
    .typeError('Ovos deve ser um número')
    .min(0, 'Não pode ser menor que 0')
    .max(2, 'Não pode ser maior que 2')
    .required('Ovos postos hoje é obrigatório'),
  emQuarentena: Yup.boolean().required(),
  local: Yup.string()
    .oneOf(['galpao', 'campo', 'quarentena'], 'Local inválido')
    .required('Local é obrigatório'),
})

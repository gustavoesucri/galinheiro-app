import * as yup from 'yup'

export const galpoesSchema = yup.object().shape({
  nome: yup.string().required('Nome é obrigatório').max(100, 'Máximo de 100 caracteres'),
  capacidade_maxima_galinhas: yup
    .number()
    .required('Capacidade de galinhas é obrigatória')
    .min(1, 'Deve ser pelo menos 1'),
  capacidade_maxima_ninhos: yup
    .number()
    .required('Capacidade de ninhos é obrigatória')
    .min(1, 'Deve ser pelo menos 1'),
  numero_ninhos_ocupados: yup
    .number()
    .required('Número de ninhos ocupados é obrigatório')
    .min(0, 'Não pode ser negativo'),
  area_m2: yup.number().required('Área é obrigatória').min(1, 'Deve ser pelo menos 1 m²'),
  tipo_piso: yup.string().oneOf(['terra','concreto','serragem'], 'Selecione um tipo válido').required('Tipo de piso é obrigatório'),
  ventilacao: yup.string().oneOf(['natural','forçada','exaustão'], 'Selecione ventilação válida').required('Ventilação é obrigatória'),
  ativo: yup.boolean().required('Status ativo é obrigatório'),
  data_ultima_manutencao: yup.date().required('Data da última manutenção é obrigatória').typeError('Data inválida'),
  observacoes: yup.string().max(500,'Máximo de 500 caracteres').nullable(),
})

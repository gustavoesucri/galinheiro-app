import * as yup from 'yup'

export const ninhosSchema = yup.object().shape({
  identificacao: yup
    .string()
    .required('Identificação é obrigatória')
    .max(50, 'Máximo de 50 caracteres'),
  tipo_material: yup
    .string()
    .oneOf(['Palha', 'Serragem', 'Plástico'], 'Selecione um tipo válido')
    .required('Tipo de material é obrigatório'),
  localizacao: yup
    .string()
    .required('Localização é obrigatória')
    .max(100, 'Máximo de 100 caracteres'),
  ocupado: yup.boolean(),
  observacoes: yup.string().max(500, 'Máximo de 500 caracteres').nullable(),
  galinha: yup.string().nullable(),
})

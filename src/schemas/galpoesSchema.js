import * as yup from 'yup'
import { validarDataManutencao, validarNinhosOcupados, validarDensidadeGalpao } from '../utils/businessRules'

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
    .min(0, 'Não pode ser negativo')
    .test('ninhos-ocupados', 'Ninhos ocupados excede a capacidade', function(value) {
      const { capacidade_maxima_ninhos } = this.parent
      const resultado = validarNinhosOcupados(value, capacidade_maxima_ninhos)
      return resultado.valido || this.createError({ message: resultado.mensagem })
    }),
  area_m2: yup
    .number()
    .required('Área é obrigatória')
    .min(1, 'Deve ser pelo menos 1 m²')
    .test('densidade', 'Densidade inadequada', function(value) {
      const { capacidade_maxima_galinhas } = this.parent
      const resultado = validarDensidadeGalpao(value, capacidade_maxima_galinhas)
      if (resultado.critico) {
        return this.createError({ message: resultado.mensagem })
      }
      // Aviso não bloqueia, apenas informa
      return true
    }),
  tipo_piso: yup.string().oneOf(['terra','concreto','serragem'], 'Selecione um tipo válido').required('Tipo de piso é obrigatório'),
  ventilacao: yup.string().oneOf(['natural','forçada','exaustão'], 'Selecione ventilação válida').required('Ventilação é obrigatória'),
  ativo: yup.boolean().required('Status ativo é obrigatório'),
  data_ultima_manutencao: yup
    .date()
    .required('Data da última manutenção é obrigatória')
    .typeError('Data inválida')
    .test('data-futura', 'Data da manutenção não pode ser futura', function(value) {
      const resultado = validarDataManutencao(value)
      return resultado.valido
    }),
  observacoes: yup.string().max(500,'Máximo de 500 caracteres').nullable(),
})

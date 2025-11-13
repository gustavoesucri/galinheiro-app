/**
 * REGRAS DE NEGÓCIO DO SISTEMA GALINHEIRO
 * 
 * Este arquivo centraliza todas as validações de regras de negócio
 * que devem ser aplicadas tanto no frontend quanto no backend.
 */

// ============================================================================
// 1. REGRAS DE DATAS (RN-001 a RN-005)
// ============================================================================

/**
 * RN-001: Data de nascimento não pode ser futura
 */
export const validarDataNascimento = (dataNascimento) => {
  if (!dataNascimento) return { valido: false, mensagem: 'Data de nascimento é obrigatória' }
  
  const data = new Date(dataNascimento)
  const hoje = new Date()
  hoje.setHours(23, 59, 59, 999) // Fim do dia atual
  
  if (data > hoje) {
    return { valido: false, mensagem: 'Data de nascimento não pode ser futura' }
  }
  
  return { valido: true }
}

/**
 * RN-002: Data da última limpeza não pode ser futura
 */
export const validarDataLimpeza = (dataLimpeza) => {
  if (!dataLimpeza) return { valido: false, mensagem: 'Data da última limpeza é obrigatória' }
  
  const data = new Date(dataLimpeza)
  const agora = new Date()
  
  if (data > agora) {
    return { valido: false, mensagem: 'Data da última limpeza não pode ser futura' }
  }
  
  return { valido: true }
}

/**
 * RN-003: Data de postura de ovo não pode ser futura
 */
export const validarDataOvo = (dataOvo) => {
  if (!dataOvo) return { valido: false, mensagem: 'Data do ovo é obrigatória' }
  
  const data = new Date(dataOvo)
  const hoje = new Date()
  hoje.setHours(23, 59, 59, 999)
  
  if (data > hoje) {
    return { valido: false, mensagem: 'Data de postura não pode ser futura' }
  }
  
  return { valido: true }
}

/**
 * RN-004: Data de medição ambiente não pode ser futura
 */
export const validarDataMedicao = (dataMedicao) => {
  if (!dataMedicao) return { valido: false, mensagem: 'Data da medição é obrigatória' }
  
  const data = new Date(dataMedicao)
  const agora = new Date()
  
  if (data > agora) {
    return { valido: false, mensagem: 'Data da medição não pode ser futura' }
  }
  
  return { valido: true }
}

/**
 * RN-005: Data última manutenção do galpão não pode ser futura
 */
export const validarDataManutencao = (dataManutencao) => {
  if (!dataManutencao) return { valido: false, mensagem: 'Data da manutenção é obrigatória' }
  
  const data = new Date(dataManutencao)
  const agora = new Date()
  
  if (data > agora) {
    return { valido: false, mensagem: 'Data da manutenção não pode ser futura' }
  }
  
  return { valido: true }
}

// ============================================================================
// 2. REGRAS DE CAPACIDADE/OCUPAÇÃO (RN-006 a RN-010)
// ============================================================================

/**
 * RN-006: Ninhos ocupados não pode exceder capacidade máxima
 */
export const validarNinhosOcupados = (numeroNinhosOcupados, capacidadeMaxima) => {
  if (numeroNinhosOcupados > capacidadeMaxima) {
    return {
      valido: false,
      mensagem: `Ninhos ocupados (${numeroNinhosOcupados}) não pode exceder a capacidade máxima (${capacidadeMaxima})`
    }
  }
  return { valido: true }
}

/**
 * RN-007: Número de galinhas no galpão não pode exceder capacidade
 */
export const validarCapacidadeGalinhas = (galinhas, galpaoId, capacidadeMaxima) => {
  const galinhasNoGalpao = galinhas.filter(
    g => g.local === 'galpao' && String(g.galpaoId) === String(galpaoId)
  )
  
  if (galinhasNoGalpao.length > capacidadeMaxima) {
    return {
      valido: false,
      mensagem: `Galpão tem ${galinhasNoGalpao.length} galinhas, mas capacidade máxima é ${capacidadeMaxima}`
    }
  }
  
  return { valido: true, count: galinhasNoGalpao.length }
}

/**
 * RN-008: Densidade mínima por galinha (bem-estar animal)
 * Regra: 0.5m² a 1m² por galinha
 */
export const validarDensidadeGalpao = (areaM2, capacidadeMaximaGalinhas) => {
  const densidadePorGalinha = areaM2 / capacidadeMaximaGalinhas
  
  if (densidadePorGalinha < 0.5) {
    return {
      valido: false,
      mensagem: `Densidade muito alta: ${densidadePorGalinha.toFixed(2)}m²/galinha. Mínimo recomendado: 0.5m²/galinha`,
      critico: true
    }
  }
  
  if (densidadePorGalinha < 1.0) {
    return {
      valido: true,
      mensagem: `Densidade adequada mas justa: ${densidadePorGalinha.toFixed(2)}m²/galinha. Recomendado: 1m²/galinha`,
      aviso: true
    }
  }
  
  return { valido: true, mensagem: `Densidade ideal: ${densidadePorGalinha.toFixed(2)}m²/galinha` }
}

/**
 * RN-009: Ninho só pode ter 1 galinha se estiver ocupado
 */
export const validarOcupacaoNinho = (ocupado, galinhaId) => {
  if (ocupado && !galinhaId) {
    return {
      valido: false,
      mensagem: 'Ninho marcado como ocupado deve ter uma galinha associada'
    }
  }
  
  if (!ocupado && galinhaId) {
    return {
      valido: false,
      mensagem: 'Ninho desocupado não pode ter galinha associada',
      autoCorrigir: true // Indica que pode ser corrigido automaticamente
    }
  }
  
  return { valido: true }
}

/**
 * RN-010: Galinha no ninho deve estar no mesmo galpão
 */
export const validarGalinhaNoNinho = (galinha, ninho) => {
  if (!galinha || !ninho) return { valido: true }
  
  if (galinha.ninhoId && String(galinha.galpaoId) !== String(ninho.galpaoId)) {
    return {
      valido: false,
      mensagem: `Galinha está em galpão diferente do ninho. Galinha: galpão ${galinha.galpaoId}, Ninho: galpão ${ninho.galpaoId}`
    }
  }
  
  return { valido: true }
}

// ============================================================================
// 3. REGRAS DE POSTURA DE OVOS (RN-014)
// ============================================================================

/**
 * RN-014: Galinha muito jovem não bota ovos
 * Galinhas botam a partir de ~120 dias de vida
 */
export const validarIdadeParaPostura = (dataNascimento, dataOvo) => {
  if (!dataNascimento) {
    return { valido: false, mensagem: 'Data de nascimento da galinha é obrigatória' }
  }
  
  const nascimento = new Date(dataNascimento)
  const postura = dataOvo ? new Date(dataOvo) : new Date()
  
  const diffTime = postura - nascimento
  const idadeEmDias = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  
  const IDADE_MINIMA_POSTURA = 120 // dias
  
  if (idadeEmDias < IDADE_MINIMA_POSTURA) {
    return {
      valido: false,
      mensagem: `Galinha muito jovem para botar ovos. Idade: ${idadeEmDias} dias, mínimo: ${IDADE_MINIMA_POSTURA} dias`,
      idadeEmDias
    }
  }
  
  return { valido: true, idadeEmDias }
}

// ============================================================================
// 4. REGRAS DE QUARENTENA E SAÚDE (RN-016, RN-017, RN-018)
// ============================================================================

/**
 * RN-016: Galinha em quarentena não pode estar em galpão comum
 */
export const validarQuarentena = (emQuarentena, local, galpaoId, ninhoId) => {
  if (emQuarentena) {
    if (local === 'galpao') {
      return {
        valido: false,
        mensagem: 'Galinha em quarentena não pode estar no galpão. Altere o local para "Quarentena"'
      }
    }
    
    if (galpaoId || ninhoId) {
      return {
        valido: false,
        mensagem: 'Galinha em quarentena não pode ter galpão ou ninho associado',
        autoCorrigir: true
      }
    }
  }
  
  return { valido: true }
}

/**
 * RN-017: Galinha adoecida deveria estar em quarentena
 */
export const sugerirQuarentenaParaAdoecida = (saude, emQuarentena) => {
  if (saude === 'Adoecida' && !emQuarentena) {
    return {
      sugestao: true,
      mensagem: 'Galinha adoecida deveria estar em quarentena para evitar contágio'
    }
  }
  
  return { sugestao: false }
}

/**
 * RN-018: Alerta se muitas galinhas adoecidas no galpão
 */
export const alertarGalinhasAdoecidasNoGalpao = (galinhas, galpaoId) => {
  const galinhasNoGalpao = galinhas.filter(
    g => g.local === 'galpao' && String(g.galpaoId) === String(galpaoId)
  )
  
  if (galinhasNoGalpao.length === 0) return { alerta: false }
  
  const galinhasAdoecidas = galinhasNoGalpao.filter(g => g.saude === 'Adoecida')
  const percentualAdoecidas = (galinhasAdoecidas.length / galinhasNoGalpao.length) * 100
  
  if (percentualAdoecidas > 20) {
    return {
      alerta: true,
      nivel: 'critico',
      mensagem: `CRÍTICO: ${percentualAdoecidas.toFixed(1)}% das galinhas estão adoecidas (${galinhasAdoecidas.length}/${galinhasNoGalpao.length}). Considere isolá-las!`,
      percentual: percentualAdoecidas,
      quantidade: galinhasAdoecidas.length,
      total: galinhasNoGalpao.length
    }
  }
  
  if (percentualAdoecidas > 10) {
    return {
      alerta: true,
      nivel: 'atencao',
      mensagem: `ATENÇÃO: ${percentualAdoecidas.toFixed(1)}% das galinhas estão adoecidas (${galinhasAdoecidas.length}/${galinhasNoGalpao.length})`,
      percentual: percentualAdoecidas,
      quantidade: galinhasAdoecidas.length,
      total: galinhasNoGalpao.length
    }
  }
  
  return { alerta: false }
}

// ============================================================================
// 7. REGRAS DE RELACIONAMENTO (RN-029)
// ============================================================================

/**
 * RN-029: Ao marcar ninho como desocupado, remover galinhaId
 */
export const autoCorrigirNinhoDesocupado = (ocupado, galinhaId) => {
  if (!ocupado && galinhaId) {
    return {
      corrigir: true,
      novoValor: { galinhaId: null },
      mensagem: 'Ninho desocupado: galinha removida automaticamente'
    }
  }
  
  return { corrigir: false }
}

// ============================================================================
// 8. REGRAS DE CONSISTÊNCIA DE ESTADO (RN-030 a RN-032)
// ============================================================================

/**
 * RN-030: Galinha só pode ter ninhoId se local='galpao'
 */
export const validarNinhoNaGalinha = (local, ninhoId) => {
  if (local !== 'galpao' && ninhoId) {
    return {
      valido: false,
      mensagem: 'Galinha só pode ter ninho se estiver no galpão',
      autoCorrigir: true
    }
  }
  
  return { valido: true }
}

/**
 * RN-031: Galinha com ninhoId deve ter galpaoId
 */
export const validarGalpaoComNinho = (ninhoId, galpaoId) => {
  if (ninhoId && !galpaoId) {
    return {
      valido: false,
      mensagem: 'Galinha com ninho deve ter um galpão associado'
    }
  }
  
  return { valido: true }
}

/**
 * RN-032: Galpão inativo não pode receber novas entidades
 */
export const validarGalpaoAtivo = (galpao, tipo = 'entidade') => {
  if (!galpao) return { valido: true }
  
  if (galpao.ativo === false) {
    return {
      valido: false,
      mensagem: `Galpão "${galpao.nome}" está inativo e não pode receber ${tipo}`
    }
  }
  
  return { valido: true }
}

// ============================================================================
// 9. REGRAS DE NOME/IDENTIFICAÇÃO (RN-033 a RN-035)
// ============================================================================

/**
 * RN-033: Nome de galpão deve ser único
 */
export const validarNomeGalpaoUnico = (nome, galpoes, galpaoAtualId = null) => {
  const nomeNormalizado = nome.trim().toLowerCase()
  
  const duplicado = galpoes.find(g => 
    g.nome.trim().toLowerCase() === nomeNormalizado && 
    String(g.id) !== String(galpaoAtualId)
  )
  
  if (duplicado) {
    return {
      valido: false,
      mensagem: `Já existe um galpão com o nome "${nome}"`
    }
  }
  
  return { valido: true }
}

/**
 * RN-034: Identificação de ninho deve ser única por galpão
 */
export const validarIdentificacaoNinhoUnica = (identificacao, galpaoId, ninhos, ninhoAtualId = null) => {
  const idNormalizada = identificacao.trim().toLowerCase()
  
  const duplicado = ninhos.find(n => 
    n.identificacao.trim().toLowerCase() === idNormalizada &&
    String(n.galpaoId) === String(galpaoId) &&
    String(n.id) !== String(ninhoAtualId)
  )
  
  if (duplicado) {
    return {
      valido: false,
      mensagem: `Já existe um ninho com identificação "${identificacao}" neste galpão`
    }
  }
  
  return { valido: true }
}

/**
 * RN-035: Nome de galinha deve ser único (opcional - permitindo duplicatas por enquanto)
 */
export const validarNomeGalinhaUnico = (nome, galinhas, galinhaAtualId = null, forcar = false) => {
  if (!forcar) return { valido: true } // Por padrão permite nomes duplicados
  
  const nomeNormalizado = nome.trim().toLowerCase()
  
  const duplicado = galinhas.find(g => 
    g.nome.trim().toLowerCase() === nomeNormalizado && 
    String(g.id) !== String(galinhaAtualId)
  )
  
  if (duplicado) {
    return {
      valido: false,
      mensagem: `Já existe uma galinha com o nome "${nome}"`
    }
  }
  
  return { valido: true }
}

// ============================================================================
// 10. REGRAS CALCULADAS/AUTOMÁTICAS (RN-036, RN-037)
// ============================================================================

/**
 * RN-036: Calcular automaticamente numero_ninhos_ocupados
 */
export const calcularNinhosOcupados = (ninhos, galpaoId) => {
  const ninhosDoGalpao = ninhos.filter(n => String(n.galpaoId) === String(galpaoId))
  const ocupados = ninhosDoGalpao.filter(n => n.ocupado === true)
  
  return {
    total: ninhosDoGalpao.length,
    ocupados: ocupados.length,
    disponiveis: ninhosDoGalpao.length - ocupados.length
  }
}

/**
 * RN-037: Status de saúde do galpão baseado em galinhas
 */
export const calcularStatusSaudeGalpao = (galinhas, galpaoId) => {
  const galinhasNoGalpao = galinhas.filter(
    g => g.local === 'galpao' && String(g.galpaoId) === String(galpaoId)
  )
  
  if (galinhasNoGalpao.length === 0) {
    return { status: 'vazio', mensagem: 'Galpão sem galinhas' }
  }
  
  const adoecidas = galinhasNoGalpao.filter(g => g.saude === 'Adoecida').length
  const fragilizadas = galinhasNoGalpao.filter(g => g.saude === 'Fragilizada').length
  const saudaveis = galinhasNoGalpao.filter(g => g.saude === 'Boa').length
  
  const percentualAdoecidas = (adoecidas / galinhasNoGalpao.length) * 100
  const percentualProblemas = ((adoecidas + fragilizadas) / galinhasNoGalpao.length) * 100
  
  if (percentualAdoecidas > 30) {
    return {
      status: 'critico',
      mensagem: 'Crítico',
      detalhes: `${adoecidas} adoecidas, ${fragilizadas} fragilizadas, ${saudaveis} saudáveis`,
      percentualAdoecidas,
      percentualProblemas,
      cor: '#d32f2f'
    }
  }
  
  if (percentualAdoecidas > 10 || percentualProblemas > 40) {
    return {
      status: 'atencao',
      mensagem: 'Atenção',
      detalhes: `${adoecidas} adoecidas, ${fragilizadas} fragilizadas, ${saudaveis} saudáveis`,
      percentualAdoecidas,
      percentualProblemas,
      cor: '#f57c00'
    }
  }
  
  if (percentualProblemas > 20) {
    return {
      status: 'alerta',
      mensagem: 'Alerta',
      detalhes: `${adoecidas} adoecidas, ${fragilizadas} fragilizadas, ${saudaveis} saudáveis`,
      percentualAdoecidas,
      percentualProblemas,
      cor: '#fbc02d'
    }
  }
  
  return {
    status: 'bom',
    mensagem: 'Bom',
    detalhes: `${adoecidas} adoecidas, ${fragilizadas} fragilizadas, ${saudaveis} saudáveis`,
    percentualAdoecidas,
    percentualProblemas,
    cor: '#388e3c'
  }
}

// ============================================================================
// FUNÇÕES AUXILIARES
// ============================================================================

/**
 * Valida múltiplas regras e retorna todos os erros/avisos
 */
export const validarMultiplasRegras = (validacoes) => {
  const erros = []
  const avisos = []
  const sugestoes = []
  
  validacoes.forEach(({ nome, resultado }) => {
    if (resultado.valido === false) {
      erros.push({ regra: nome, mensagem: resultado.mensagem, critico: resultado.critico })
    } else if (resultado.aviso) {
      avisos.push({ regra: nome, mensagem: resultado.mensagem })
    } else if (resultado.sugestao) {
      sugestoes.push({ regra: nome, mensagem: resultado.mensagem })
    }
  })
  
  return {
    valido: erros.length === 0,
    erros,
    avisos,
    sugestoes
  }
}

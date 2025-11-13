import React, { useMemo } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import EggIcon from './EggIcon'
import { typography, colors } from '../../styles/theme'

/**
 * Exibe todos os ovos de uma galinha em um dia específico como ícones clicáveis
 * @param {string} galinhaId - ID da galinha
 * @param {Date} data - Data para filtrar ovos (padrão: hoje)
 * @param {array} ovos - Lista de ovos do Redux
 * @param {function} onEggPress - Callback ao clicar em um ovo (recebe ovo e galinhaId)
 */
export default function EggsList({
  galinhaId,
  data = new Date(),
  ovos = [],
  onEggPress,
}) {
  // Filtra ovos da galinha no dia específico
  const eggsToday = useMemo(() => {
    return ovos.filter(ovo => {
      if (ovo.galinhaId !== galinhaId) return false

      const ovoDate = new Date(ovo.data)
      const filterDate = new Date(data)

      return (
        ovoDate.getFullYear() === filterDate.getFullYear() &&
        ovoDate.getMonth() === filterDate.getMonth() &&
        ovoDate.getDate() === filterDate.getDate()
      )
    })
  }, [galinhaId, data, ovos])

  if (eggsToday.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nenhum ovo hoje</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ovos Hoje: {eggsToday.length}/2</Text>
      <View style={styles.iconsContainer}>
        {eggsToday.map(ovo => (
          <EggIcon
            key={ovo.id}
            tamanho={ovo.tamanho}
            cor={ovo.cor}
            qualidade={ovo.qualidade}
            onPress={() => onEggPress?.(ovo, galinhaId)}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    paddingHorizontal: 4,
  },
  label: {
    ...typography.body,
    color: colors.textPrimary,
    marginBottom: 6,
    fontWeight: '600',
  },
  iconsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  emptyContainer: {
    paddingVertical: 6,
  },
  emptyText: {
    ...typography.small,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
})

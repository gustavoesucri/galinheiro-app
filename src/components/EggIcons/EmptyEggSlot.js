import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useTema } from '../../hooks/useTema'

/**
 * Componente de slot vazio para adicionar ovo
 * Representa um espaço onde um ovo pode ser adicionado
 * @param {function} onPress - Callback ao clicar no slot vazio
 * @param {number} size - Tamanho do ícone (padrão 28)
 */
export default function EmptyEggSlot({ onPress, size = 28 }) {
  const tema = useTema()

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.6}
    >
      <MaterialCommunityIcons
        name="square-rounded-outline"
        size={size}
        color={tema.colors.textSecondary}
        style={{ opacity: 0.3 }}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    marginVertical: 2,
    padding: 4,
  },
})

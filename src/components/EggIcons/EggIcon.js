import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

/**
 * Componente de ícone de ovo customizável
 * @param {string} tamanho - 'Pequeno', 'Médio', 'Grande', 'Extra'
 * @param {string} cor - 'Branco', 'Marrom', 'Azul', 'Verde'
 * @param {string} qualidade - 'Boa', 'Quebrado', 'Defeituoso'
 * @param {function} onPress - Callback ao clicar
 */
export default function EggIcon({ tamanho = 'Médio', cor = 'Branco', qualidade = 'Boa', onPress }) {
  // Mapa de tamanhos para tamanho do ícone
  const sizeMap = {
    'Pequeno': 20,
    'Médio': 28,
    'Grande': 36,
    'Extra': 44,
  }

  // Mapa de cores para cor do ícone (cores suaves, que parecem ovos)
  const colorMap = {
    'Branco': '#F5F5F0',      // Branco marfim
    'Marrom': '#A0826D',      // Marrom natural
    'Azul': '#A8D5E0',        // Azul claro suave
    'Verde': '#B8D4A8',       // Verde claro suave
  }

  // Define o ícone baseado na qualidade
  const getIcon = () => {
    if (qualidade === 'Quebrado') return 'egg-off'
    if (qualidade === 'Defeituoso') return 'egg-broken'
    return 'egg'
  }

  const iconSize = sizeMap[tamanho] || sizeMap['Médio']
  const iconColor = colorMap[cor] || colorMap['Branco']

  // Cor do contorno varia conforme qualidade
  let contourColor = '#2D2B26' // Marrom escuro padrão (Boa)
  if (qualidade === 'Quebrado') contourColor = '#FFB700'   // Laranja para quebrado
  if (qualidade === 'Defeituoso') contourColor = '#D32F2F' // Vermelho para defeituoso

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <MaterialCommunityIcons
        name={getIcon()}
        size={iconSize}
        color={iconColor}
        style={{
          // Contorno leve para definição
          textShadowColor: contourColor,
          textShadowOffset: { width: 0.5, height: 0.5 },
          textShadowRadius: 0.5,
        }}
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

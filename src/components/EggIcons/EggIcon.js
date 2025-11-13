import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useTema } from '../../hooks/useTema'

// Cores específicas dos ovos (não fazem parte do tema)
const EGG_COLORS = {
  eggWhite: '#F5F5F0',  // Branco marfim
  eggBrown: '#A0826D',  // Marrom natural
  eggBlue: '#A8D5E0',   // Azul claro suave
  eggGreen: '#B8D4A8',  // Verde claro suave
}

/**
 * Componente de ícone de ovo customizável
 * @param {string} tamanho - 'Pequeno', 'Médio', 'Grande', 'Extra'
 * @param {string} cor - 'Branco', 'Marrom', 'Azul', 'Verde'
 * @param {string} qualidade - 'Boa', 'Quebrado', 'Defeituoso'
 * @param {function} onPress - Callback ao clicar
 */
export default function EggIcon({ tamanho = 'Médio', cor = 'Branco', qualidade = 'Boa', onPress }) {
  const tema = useTema()
  
  // Mapa de tamanhos para tamanho do ícone
  const sizeMap = {
    'Pequeno': 20,
    'Médio': 28,
    'Grande': 36,
    'Extra': 44,
  }

  // Mapa de cores para cor do ícone (cores suaves, que parecem ovos)
  const colorMap = {
    'Branco': EGG_COLORS.eggWhite,    // Branco marfim
    'Marrom': EGG_COLORS.eggBrown,    // Marrom natural
    'Azul': EGG_COLORS.eggBlue,       // Azul claro suave
    'Verde': EGG_COLORS.eggGreen,     // Verde claro suave
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
  let contourColor = tema.colors.textPrimary     // Padrão (Boa)
  if (qualidade === 'Quebrado') contourColor = tema.colors.warning      // Laranja para quebrado
  if (qualidade === 'Defeituoso') contourColor = tema.colors.error      // Vermelho para defeituoso

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

import React from 'react'
import { TouchableOpacity, Image } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { alternarTema } from '../redux/slices/temaSlice'
import { useTema } from '../hooks/useTema'

// Importar o ícone personalizado de laranja
const orangeIcon = require('../../assets/assets/icons/OrangeIcons/orange64.png')

export default function TemaToggleButton() {
  const dispatch = useDispatch()
  const temaSelecionado = useSelector(state => state.tema.ativo)
  const tema = useTema()

  const handleToggleTema = () => {
    dispatch(alternarTema())
  }

  const getIconName = () => {
    switch (temaSelecionado) {
      case 'tema1': return 'orange'
      case 'tema2': return 'leaf'
      case 'tema3': return 'weather-night'
      case 'dark': return 'moon-waning-crescent'
      default: return 'orange'
    }
  }

  return (
    <TouchableOpacity
      onPress={handleToggleTema}
      style={{ paddingRight: 16, paddingLeft: 8 }}
    >
      {temaSelecionado === 'tema1' ? (
        <Image
          source={orangeIcon}
          style={{
            width: 24,
            height: 24,
          }}
          resizeMode="contain"
        />
      ) : (
        <MaterialCommunityIcons
          name={getIconName()}
          size={24}
          color={tema.colors.textPrimary}
        />
      )}
    </TouchableOpacity>
  )
}

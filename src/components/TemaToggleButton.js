import React from 'react'
import { TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { alternarTema } from '../redux/slices/temaSlice'
import { useTema } from '../hooks/useTema'

export default function TemaToggleButton() {
  const dispatch = useDispatch()
  const temaSelecionado = useSelector(state => state.tema.ativo)
  const tema = useTema()

  const handleToggleTema = () => {
    dispatch(alternarTema())
  }

  const getIconName = () => {
    switch (temaSelecionado) {
      case 'tema1': return 'fruit-citrus'
      case 'tema2': return 'leaf'
      case 'tema3': return 'weather-night'
      case 'dark': return 'moon-waning-crescent'
      default: return 'fruit-citrus'
    }
  }

  return (
    <TouchableOpacity
      onPress={handleToggleTema}
      style={{ paddingRight: 16, paddingLeft: 8 }}
    >
      <MaterialCommunityIcons
        name={getIconName()}
        size={24}
        color={tema.colors.surface}
      />
    </TouchableOpacity>
  )
}

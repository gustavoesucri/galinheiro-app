import React from 'react'
import ButtonPaper from './ButtonPaper'
import { useTema } from '../hooks/useTema'

export default function AddEggButton({ onPress, style }) {
  const tema = useTema()
  
  return (
    <ButtonPaper
      mode="contained"
      icon="plus"
      onPress={onPress}
      style={[tema.layout.button, { borderWidth: 0.5, borderColor: tema.colors.border }, style]}
    >
      Adicionar Ovo
    </ButtonPaper>
  )
}

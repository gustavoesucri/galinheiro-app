import React from 'react'
import { StyleSheet } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { useTema } from '../hooks/useTema'

export default function Button({ children, style, mode = 'contained', fullWidth = true, ...props }) {
  const botoesClaros = useSelector(state => state.botaoModo.botoesClaros)
  const tema = useTema()
  
  // Se botoesClaros=true: usa laranja fixo, senão usa cor do tema
  const buttonColor = botoesClaros ? tema.colors.primaryOrange : tema.colors.primary
  
  // Texto: preto no laranja fixo, branco/preto conforme o tema nos outros
  const textColor = botoesClaros ? tema.colors.black : tema.colors.textOnPrimary

  return (
    <PaperButton
      mode={mode}
      style={[tema.layout.button, !fullWidth && styles.buttonCompact, style]}
      buttonColor={buttonColor}
      textColor={textColor}
      {...props}
    >
      {children}
    </PaperButton>
  )
}

const styles = StyleSheet.create({
  buttonCompact: {
    alignSelf: 'flex-start',
    maxWidth: 250,
  },
})

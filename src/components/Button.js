import React from 'react'
import { StyleSheet } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { useTema } from '../hooks/useTema'
import { layout, colors } from '../styles/theme'

export default function Button({ children, style, mode = 'contained', fullWidth = true, ...props }) {
  const botoesClaros = useSelector(state => state.botaoModo.botoesClaros)
  const tema = useTema()
  
  // Se botoesClaros=true: usa laranja fixo, senão usa cor do tema
  const buttonColor = botoesClaros ? tema.colors.primaryOrange : tema.colors.primary
  
  // Texto branco quando modo escuro (tema verde/roxo), texto padrão quando laranja
  const textColor = botoesClaros ? tema.colors.textOnPrimary : tema.colors.textOnPrimary

  return (
    <PaperButton
      mode={mode}
      style={[layout.button, !fullWidth && styles.buttonCompact, style]}
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

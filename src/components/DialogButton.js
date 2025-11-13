import React from 'react'
import { StyleSheet } from 'react-native'
import ButtonPaper from './ButtonPaper'
import { useSelector } from 'react-redux'
import { useTema } from '../hooks/useTema'

const DialogButton = ({ onPress, children, variant = 'primary' }) => {
  const botoesClaros = useSelector(state => state.botaoModo.botoesClaros)
  const tema = useTema()
  
  const isCancel = variant === 'cancel'
  const isDelete = variant === 'delete'
  
  // Cor para botões "Remover" - laranja fixo ou cor do tema
  const deleteColor = botoesClaros ? tema.colors.primaryOrange : tema.colors.primary
  // Texto: preto no laranja fixo, branco/preto conforme o tema nos outros
  const deleteTextColor = botoesClaros ? tema.colors.black : tema.colors.textOnPrimary

  return (
    <ButtonPaper
      mode={isCancel ? 'outlined' : 'contained'}
      labelStyle={styles.label}
      style={[
        styles.button,
        isCancel && { borderColor: tema.colors.accent },
        isDelete && { backgroundColor: deleteColor },
      ]}
      textColor={isCancel ? tema.colors.accent : (isDelete ? deleteTextColor : tema.colors.textOnPrimary)}
      onPress={onPress}
    >
      {children}
    </ButtonPaper>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    marginHorizontal: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.3,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
})

export default DialogButton


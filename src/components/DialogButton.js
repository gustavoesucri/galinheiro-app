import React from 'react'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { useTema } from '../hooks/useTema'

const DialogButton = ({ onPress, children, variant = 'primary' }) => {
  const botoesClaros = useSelector(state => state.botaoModo.botoesClaros)
  const tema = useTema()
  
  const isCancel = variant === 'cancel'
  const isDelete = variant === 'delete'
  
  // Cor para botões "Remover" - laranja fixo ou cor do tema
  const deleteColor = botoesClaros ? tema.colors.primaryOrange : tema.colors.primary

  return (
    <Button
      mode="contained"
      labelStyle={styles.label}
      style={[
        styles.button,
        isCancel && { backgroundColor: tema.colors.accent, borderColor: tema.colors.accent, borderWidth: 1.5 },
        isDelete && { backgroundColor: deleteColor },
      ]}
      textColor={tema.colors.white}
      onPress={onPress}
    >
      {children}
    </Button>
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


import React from 'react'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

const DialogButton = ({ onPress, children, variant = 'primary' }) => {
  const isCancel = variant === 'cancel'
  const isDelete = variant === 'delete'

  return (
    <Button
      mode={isCancel ? 'contained' : 'outlined'}
      labelStyle={styles.label}
      style={[
        styles.button,
        isCancel && styles.cancelButton,
        isDelete && styles.deleteButton,
      ]}
      textColor={
        isCancel ? '#FFFFFF' : isDelete ? '#D32F2F' : '#8A5E00'
      }
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
  cancelButton: {
    backgroundColor: '#8A5E00',
    borderColor: '#8A5E00',
    borderWidth: 1.5,
  },
  deleteButton: {
    backgroundColor: 'transparent',
    borderColor: '#D32F2F',
    borderWidth: 1.5,
  },
})

export default DialogButton


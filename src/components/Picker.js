import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { useTema } from '../hooks/useTema'

export default function Select({ selectedValue, onValueChange, items, style }) {
  const tema = useTema()
  const { colors } = tema
  
  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: colors.surface, 
        borderColor: colors.border 
      }, 
      style
    ]}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={[styles.picker, { color: colors.textPrimary }]}
      >
        {items.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
  },
  picker: {},
})

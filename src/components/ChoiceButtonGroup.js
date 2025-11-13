import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { useTema } from '../hooks/useTema'

export default function ChoiceButtonGroup({ label, options = [], value, onChange, style }) {
  const botoesClaros = useSelector(state => state.botaoModo.botoesClaros)
  const temaSelecionado = useSelector(state => state.tema.ativo)
  const tema = useTema()
  const { colors, typography } = tema
  
  const selectedColor = botoesClaros ? tema.colors.primaryOrange : tema.colors.primary
  
  // Texto selecionado: preto no laranja, textPrimary no dark, textOnPrimary nos outros
  let selectedTextColor
  if (botoesClaros) {
    selectedTextColor = tema.colors.black
  } else if (temaSelecionado === 'dark') {
    selectedTextColor = tema.colors.textPrimary // #E1E1E1
  } else {
    selectedTextColor = tema.colors.textOnPrimary
  }

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={[styles.label, { color: colors.textSecondary }, typography.body]}>{label}</Text>}
      <View style={styles.buttonsContainer}>
        {options.map((option) => {
          const selected = value === option.value
          return (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.button,
                { 
                  backgroundColor: selected ? selectedColor : colors.surface,
                  borderColor: selected ? selectedColor : colors.border
                },
              ]}
              onPress={() => onChange(option.value)}
            >
              <Text style={[
                styles.buttonText, 
                { color: selected ? selectedTextColor : colors.textPrimary },
                selected && { fontWeight: 'bold' }
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 4,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
  },
})
